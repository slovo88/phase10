import { firebase } from '../'

const database = firebase.database()

// Pregame gamestate

// initialize game
function initializePhase10(userList) {
  return database.ref('game/userList').once('value').then(function(snapshot) {
    let index = 0;
    snapshot.forEach((childSnapshot) => {
      index++
      childSnapshot.child('gameScore').ref.set(0)
      childSnapshot.child('currentPhase').ref.set(1)
      childSnapshot.child('hasLaidPhaseThisRound').ref.set(false)
      childSnapshot.child('currentHand').ref.remove()
      childSnapshot.child('turnOrder').ref.set(index)
      childSnapshot.child('isCurrentTurn').ref.set(false)
      childSnapshot.child('hasDrawnThisTurn').ref.set(false)
      childSnapshot.child('scoreAddedThisRound').ref.set(0)

      userList.find((user) => user.uid === childSnapshot.val().uid).turnOrder = index
    })

    database.ref('game/currentRound').set(0)
    
    initializeRound(userList)
  })
}

function initializeRound(userList) {
  const playersThisRound = userList.length

  // advance round
  database.ref('game/currentRound').once('value', (roundSnapshot) => {
    let currentRound = roundSnapshot.val()
    database.ref('game/currentRound').set(currentRound++)
    
    // create a new deck
    const newDeck = _generateDeck()
    
    // move what the top card will be after dealing to discard pile
    const indexOfTopCardPostDeal = playersThisRound * 10
    database.ref('game/discardPile').set(newDeck.splice(indexOfTopCardPostDeal, 1))
    
    // deal cards to players
    // HACK: more performant than looping and dealing 1 by 1, but also not traditonal deal ¯\_(ツ)_/¯
    userList.forEach((user) => {
      _drawCardsToHand(newDeck, user.uid, 10)
    })
    
    database.ref('game/drawPile').set(newDeck)
    
    // determine turn order
    while (currentRound > playersThisRound) {
      currentRound -= playersThisRound
    }
    
    const uidOfFirstPlayerThisRound = userList.find((user) => user.turnOrder === currentRound).uid;
    database.ref(`game/userList/${uidOfFirstPlayerThisRound}/isCurrentTurn`).set(true)
  })
}

// Round gamestate

// Turn
// start turn -> draw -> play / lay -> discard

// draw from draw or discard pile
function drawFromPile(pile, uid) {
  // get pile from fb
  database.ref(`game/${pile}`).once('value', (snapshot) => {
    let deck = snapshot.val()
    // _drawCardsToHand to users hand
    _drawCardsToHand(deck, uid)

    // if draw pile is empty, shuffle discard pile
    if (deck.length === 0 && pile === 'drawPile') {
      database.ref('game/discardPile').once('value', (snapshot) => {
        deck = _shuffleCards(snapshot.val())
        database.ref(`game/discardPile`).set([])
      })
    } 

    // set pile in FB
    database.ref(`game/${pile}`).set(deck)

    // set hasDrawnThisTurn to true
    database.ref(`game/userList/${uid}/hasDrawnThisTurn`).set(true)
  })
}

// lay down phase
function layDownPhase(uid, handSize, laidCollections) {
  // check handSize for round end
  const countOfCardsLaid = laidCollections.reduce(((acc, curr) => acc + curr.cards.length), 0)

  // set laid value for user to true
  database.ref(`game/userList/${uid}/hasLaidPhaseThisRound`).set(true)
  
  // remove cards from users hand
  laidCollections.forEach((rule) => {
    rule.cards.forEach((card) => {
      database.ref(`game/userList/${uid}/currentHand/${card[0]}`).remove()
    })
  })
  
  // add to laidPhases, with userId as the key
  database.ref(`game/laidPhases/${uid}`).set(laidCollections)

  // if user lays down enough cards to go out, end the round
  if (countOfCardsLaid === handSize) {
    endRound()
  }
}

// play from hand
function hitOnLaidPhase(uid, handSize, cardId, laidId) {
  // TODO: validations to happen in component? or here?
  // add to laidId
  // remove from hand
  // check handSize for round end
    // endRound
}

// discard from hand
function discardFromHand(uid, handSize, cardId, frontEndUserList) {
  // TODO: make skips work
  const cardPath = `game/userList/${uid}/currentHand/${cardId}`
  
  database.ref(cardPath).once('value', (snapshot) => {
    const discardedCard = snapshot.val()
    
    // add to discardPile
    database.ref('game/discardPile').once('value', (snapshot) => {
      const discardPile = snapshot.val() || []

      discardPile.unshift(discardedCard)

      database.ref('game/discardPile').set(discardPile)
      
    })
  })

  // remove from hand
  database.ref(cardPath).remove()

  // check handSize for round end
  if (handSize <= 1) {
    endRound()
  } else {
    // end turn
    const currentPlayer = frontEndUserList.find((user) => user.isCurrentTurn)
    const currentPlusOne = frontEndUserList.find((user) => user.turnOrder === currentPlayer.turnOrder + 1)
    const nextPlayer = currentPlusOne || frontEndUserList.find((user) => user.turnOrder === 1)

    endTurn(currentPlayer.uid, nextPlayer.uid)
  }
}

// end turn
function endTurn(currentPlayer, nextPlayer) {
  // set isCurrentTurn false for current player
  database.ref(`game/userList/${currentPlayer}/isCurrentTurn`).set(false)
  // set hasDrawnThisTurn false for current player
  database.ref(`game/userList/${nextPlayer}/hasDrawnThisTurn`).set(false)
  
  // set isCurrentTurn true for next player
  database.ref(`game/userList/${nextPlayer}/isCurrentTurn`).set(true)
}

// end the round
function endRound() {
  database.ref('game/state').set('round-end')

  // loop through players
  // calculate score based on cards left in hand
  // set to user
  // add to total score
  // TODO: stretch, let users see score breakdown/what cards were left in their hands
  // reset laid down, iscurrentturn, and drawnThisTurn
  // increase phase if laid down that round
    // if someone completed phase 10, endGame
}

// Round-end gamestate

// check for game end
function checkForGameEnd() {
  // if someone completed phase 10, endGame
  // else init round
}

// Game-end gamestate
// don't think there is any specific functions here, but can re-init game

// Utility functions

// deck generation
function _generateDeck() {
  const drawDeck = []

  // create cards:
  // Values 1-12, 2x each for all four colors
  // Skips, 4x
  // Wilds, 8x
  const colors = ['red', 'yellow', 'green', 'blue']

  for (let cardColor = 0; cardColor < colors.length; cardColor++) {
    const color = colors[cardColor]

    // creates four skip cards
    drawDeck.push({ value: 'Skip', color: 'black', corners: 'S' })

    for (let number = 1; number <= 12; number++) {
      // creates 1-12 of each color, 2x
      drawDeck.push({ value: number, color, corners: number })
      drawDeck.push({ value: number, color, corners:number })

      // creates two wilds per color
      if (number === 1 || number === 2) {
        drawDeck.push({ value: 'Wild', color: 'black', corners: 'W' })
      }
    }
  }

  return _shuffleCards(drawDeck)
}

// shuffle array of cards
function _shuffleCards(cards) {
  // Fisher-Yates shuffle - https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards
}

// draw card to user's hand
function _drawCardsToHand(drawSource, uid, cardsToDraw = 1) {
  // TODO: check that enough cards are available to draw

  // splice appropriate number of items from draw source array
  const drawnCards = drawSource.splice(0, cardsToDraw)

  // update user's hand
  drawnCards.forEach((card) => {
    database.ref(`game/userList/${uid}/currentHand`).push(card)
  })
}

export default { initializePhase10, drawFromPile, discardFromHand, layDownPhase }