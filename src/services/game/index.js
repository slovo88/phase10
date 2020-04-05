import { firebase } from '../firebase'

// initialize game
function initializePhase10(userList) {
  // get users in game from fb

  // create and shuffle deck
  const newDeck = _generateDeck()
  const shuffledDeck = _shuffleCards(newDeck)

  // deal cards to players in the game
  // for each player
  // _drawCard 10 times

  // discard top card to discard pile

  // determine play order
}

// deck generation
function _generateDeck() {
  const drawDeck = []

  // create cards:
  // Values 1-12 and wilds, 2x each for all four colors
  // Skips, 4x (blue in visual color, but cannot be used as blue card in gameplay)
  // blue: #003882
  // red: #d11021
  // gr: #035c2c
  // yellow: #f5b60b
  const colors = ['red', 'yellow', 'green', 'blue']

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i]

    // creates four skip cards
    drawDeck.push({ value: 'skip', color: 'skip' })

    for (let j = 1; j <= 12; j++) {
      // creates 1-12 of each color, 2x
      drawDeck.push({ value: j, color })
      drawDeck.push({ value: j, color })

      // creates two wilds per color
      if (j === 1 || j === 2) {
        console.log(j, true)
        drawDeck.push({ value: 'wild', color })
      }
    }
  }

  return drawDeck
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
function _drawCard(drawSource, uid, cardsToDraw = 1) {
  // get array of draw source

  // pop appropriate number of items from draw source array

  // update user's hand

  // update draw source
}

export default { initializePhase10 }