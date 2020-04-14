import React, { useState, useEffect } from 'react'
import { DiscardPile, Card, Hand, DrawPile } from './'
import { game, firebase } from '../../../services'
import { FullScreenModal } from '../../shared'

//discardFromHand(uid, handSize, cardId, turnOrder)
const { drawFromPile, discardFromHand } = game
const database = firebase.database()

function Round({
  currentHand,
  userId,
  userList,
}) {

  const [ isCurrentTurn, setIsCurrentTurn ] = useState(false)
  const [ hasDrawnThisTurn, setHasDrawnThisTurn ] = useState(false)
  const [ hasLaidPhaseThisRound, setHasLaidPhaseThisRound ] = useState(false)
  const [ isDiscardDrawDisabled, setIsDiscardDrawDisabled ] = useState(false)
  const [ showModal, toggleModal ] = useState(false)
  const [ modalContent, setModalContent ] = useState(<div>Something went wrong, reach out to Pemo</div>)

  // TODO: figure out how to get sorting hand to work - reorder in FB? click and drag?
  // function sortByValue() {
  //   var topUserPostsRef = firebase.database().ref('game/' + userId + '/currentHand').orderByChild('color');

  //   topUserPostsRef.once('value', (snapshot) => console.log(snapshot.val))
  // }

  useEffect(() => {
    database.ref(`/game/userList/${userId}/`).on('value', (snapshot) => {
      const snapshotValue = snapshot.val()
        setIsCurrentTurn(snapshotValue.isCurrentTurn || false)
        setHasDrawnThisTurn(snapshotValue.hasDrawnThisTurn || false)
        setHasLaidPhaseThisRound(snapshotValue.hasLaidPhaseThisRound || false)
    })

    return function cleanup() {
      database.ref(`/game/userList/${userId}/isCurrentTurn`).off()
    }
  }, [])

  function doTheThing(e) {
    const cardId = e.target.getAttribute('data-card-id')
    discardFromHand(userId, currentHand.length, cardId, userList)
    toggleModal(false)
  }


  function prepForDiscard() {
    const numberOfCardsInHand = currentHand.length
    if (numberOfCardsInHand > 1) {
      setModalContent(
        <div>
          <h1>Select card to discard</h1>
          <Hand
            currentHand={currentHand}
            onClick={doTheThing}
          />
        </div>
      )
      toggleModal(true)
    } else {
      discardFromHand(userId, numberOfCardsInHand, currentHand[0], userList)
    }
  }

  return (
    <div>
      {showModal && 
        <FullScreenModal 
          toggleModal={toggleModal}
        >
          {modalContent}
        </FullScreenModal>
      }
      {/* TODO: Show other player's name, phase, laid down cards, and hand size */}
      {/* <OtherPlayers /> */}
      <DrawPile />
      <DiscardPile 
        isDiscardDrawDisabled={isDiscardDrawDisabled}
        setIsDiscardDrawDisabled={setIsDiscardDrawDisabled}
      />

      <Hand
        currentHand={currentHand}
      />

      {isCurrentTurn ? 
        !hasDrawnThisTurn ?
          <div>
            <h3>Pick one</h3>
            <button onClick={() => drawFromPile('drawPile', userId)}>Draw from draw pile</button>
            {!isDiscardDrawDisabled &&
              <button onClick={() => drawFromPile('discardPile', userId)}>Draw from discard pile</button>
            }
          </div>
        :
          <div>
            <h3>Pick one</h3>
            {hasLaidPhaseThisRound ? 
              <button>Play on a laid phase</button>
              :
              <button>Lay down phase</button>
            }
            <button onClick={prepForDiscard}>Discard and end turn</button>
          </div>
        :
        <></>
      }
    </div>
  )
}

export default Round;
