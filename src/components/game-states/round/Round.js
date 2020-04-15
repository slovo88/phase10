import React, { useState, useEffect } from 'react'
import { DiscardPile, Hand, DrawPile } from './'
import { game, firebase } from '../../../services'
import { FullScreenModal } from '../../shared'

//discardFromHand(uid, handSize, cardId, turnOrder)
const { drawFromPile, discardFromHand, layDownPhase } = game
const database = firebase.database()

const phaseMap = {
  1: {
    rules: [
      {
        type: "run",
        number: "3",
        text: "first run of 3",
      },
      {
        type: "set",
        number: "3",
        text: "second set of 3"
      }
    ],
    text: [ "2 sets of 3" ]
  }
}

function Round({
  currentHand,
  userId,
  userList,
}) {

  const [ isCurrentTurn, setIsCurrentTurn ] = useState(false)
  const [ currentPhase, setCurrentPhase ] = useState(1)
  const [ hasDrawnThisTurn, setHasDrawnThisTurn ] = useState(false)
  const [ hasLaidPhaseThisRound, setHasLaidPhaseThisRound ] = useState(false)
  const [ isDiscardDrawDisabled, setIsDiscardDrawDisabled ] = useState(false)
  const [ selected, setSelected ] = useState([])
  const [ ruleIndex, setRuleIndex ] = useState(0)
  const [ showModal, toggleModal ] = useState(false)
  const [ modalContent, setModalContent ] = useState('')
  const [ layHand, setLayHand ] = useState([])

  const itemsToBeLaid = []

  // TODO: figure out how to get sorting hand to work - reorder in FB? click and drag?
  // function sortByValue() {
  //   var topUserPostsRef = firebase.database().ref('game/' + userId + '/currentHand').orderByChild('color');

  //   topUserPostsRef.once('value', (snapshot) => console.log(snapshot.val))
  // }

  useEffect(() => {
    setLayHand(currentHand)

    database.ref(`/game/userList/${userId}/`).on('value', (snapshot) => {
      const snapshotValue = snapshot.val()
        setIsCurrentTurn(snapshotValue.isCurrentTurn || false)
        setHasDrawnThisTurn(snapshotValue.hasDrawnThisTurn || false)
        setHasLaidPhaseThisRound(snapshotValue.hasLaidPhaseThisRound || false)
        setCurrentPhase(snapshotValue.currentPhase)
      })
      
    return function cleanup() {
      database.ref(`/game/userList/${userId}/isCurrentTurn`).off()
    }
  }, [])

  function discardInModal(card) {
    discardFromHand(userId, currentHand.length, card[0], userList)
    closeModal()
  }

  function handleDrawPileClick(pile) {
    if (!hasDrawnThisTurn) {
      drawFromPile(pile, userId)
    }
  }

  function toggleInSelection(card) {
    // -1 if not already selected, index number otherwise
    const selectionIndex = selected.findIndex((selection) => selection[0] === card[0])

    const selectedCopy = selected.map((card) => card)

    // check if card has already been selected
    if (selectionIndex === -1) {
      selectedCopy.push(card)
    } else {
      selectedCopy.splice(selectionIndex, 1)
    }
    
    // rerender modal
    setSelected(selectedCopy)
  }

  function validatePhase() {
    const { rules } = phaseMap[currentPhase]
    let error = ''
    
    // check for minimum number of cards for rule
    const ruleMinimum = rules[ruleIndex].number
    
    if (selected.length < ruleMinimum) {
      error = 'Not enough cards selected'
      console.log(error)
      return
    }

    // check if a Skip has been selected
    const hasSkipSelected = selected.findIndex((card) => card[1].value === "Skip") !== -1
    if (hasSkipSelected) {
      error = 'Skips cannot be played in phases'
      console.log(error)
      return
    }

    const ruleType = rules[ruleIndex].type
    const firstNonWildIndex = selected.findIndex((card) => card[1].value !== "Wild")

    if (firstNonWildIndex === -1) {
      // TODO: handle all wilds
    }

    const validatedPhase = {
      cards: selected,
      rules,
      possiblePlays: {
        valueType: '',
        options: []
      }
    }
    
    // TODO: all wilds, more wilds past 12 or under 1
    // run
    if (ruleType === 'run') {
      const firstNumber = selected[firstNonWildIndex][1].value
      let numberCheckStart = firstNumber

      // check if run is valid
      for (let i = firstNonWildIndex; i < selected.length; i++) {
        const compareValue = selected[i][1].value
        if (numberCheckStart !== compareValue && compareValue !== 'Wild') {
          error = 'These cards to do not make a run or may be out of order'
          console.log(error)
          return
        }
        numberCheckStart++
      }

      validatedPhase.possiblePlays.valueType = 'value'
      validatedPhase.possiblePlays.options.push(firstNumber - firstNonWildIndex - 1)
      validatedPhase.possiblePlays.options.push(numberCheckStart)
    } 
    
    // TODO: all wilds
    // set
    if (ruleType === 'set') {
      let setValue = selected[firstNonWildIndex][1].value

      // check if run is valid
      for (let i = firstNonWildIndex; i < selected.length; i++) {
        const compareValue = selected[i][1].value
        if (setValue !== compareValue && compareValue !== 'Wild') {
          error = 'These cards to do not make a run or may be out of order'
          return
        }
      }

      validatedPhase.possiblePlays.valueType = 'value'
      validatedPhase.possiblePlays.options.push(setValue)
    }
    
    // TODO: all wilds
    // color
    if (ruleType === 'color') {
      let setColor = selected[firstNonWildIndex][1].color

      // check if run is valid
      for (let i = firstNonWildIndex; i < selected.length; i++) {
        const { color, value } = selected[i][1]
        if (setColor !== color && value !== 'Wild') {
          error = 'These cards to do not make a run or may be out of order'
          return
        }
      }

      validatedPhase.possiblePlays.valueType = 'color'
      validatedPhase.possiblePlays.options.push(setColor)
    }

    itemsToBeLaid.push(validatedPhase)
    
    if (rules[ruleIndex + 1]) {
      setRuleIndex(ruleIndex + 1)
      
      // filter selected out of lay hand
      const newLayHand = layHand.filter((handCard) => selected.findIndex((selectedCard) => selectedCard[0] === handCard[0]) === -1)

      setLayHand(newLayHand)
      // reset selected
      setSelected([])
    } else {
      layDownPhase(userId, currentHand.length, itemsToBeLaid)
      closeModal()
    }
  }

  function LayingView() {
    const { rules } = phaseMap[currentPhase]

    return (
      <div>
        <h1>Select {rules[ruleIndex].text}</h1>
        {rules[ruleIndex].type === 'run' &&
          <p>Please choose cards in order</p>
        }
        <Hand
          currentHand={layHand}
          onClick={toggleInSelection}
        />

        <p>Selected:</p>
        <div style={{minHeight:"84px"}}>
          <Hand
            currentHand={selected}
            onClick={toggleInSelection}
          />
        </div>

        <button onClick={validatePhase}>
          {ruleIndex === rules.length -1 ?
            "Lay down phase"
            :
            "Next"
          }
        </button>
      </div>
    )
  }

  function DiscardView() {
    return (
      <div>
        <h1>Select card to discard</h1>
        <Hand
          currentHand={currentHand}
          onClick={discardInModal}
        />
      </div>
    )
  }

  function openModal(modalStatus) {
    setModalContent(modalStatus)
    setLayHand(currentHand)
    toggleModal(true)
  }

  function closeModal() {
    setSelected([])
    setRuleIndex(0)
    itemsToBeLaid.length = 0

    toggleModal(false)
  }

  return (
    <div>
      {showModal && 
        <FullScreenModal
          closeModal={closeModal}
        >
          {modalContent === 'laying' ?
            <LayingView />
            :
            modalContent === 'discarding' &&
              <DiscardView />
          }
        </FullScreenModal>
      }

      {/* TODO: Show other player's name, phase, laid down cards, and hand size */}
      {/* <OtherPlayers /> */}

      <div className="round-middle">
        <div className={`card-piles-wrapper ${!hasDrawnThisTurn && 'highlight'}`}>
          <div className="card-piles">
            <DrawPile
              onClick={() => handleDrawPileClick('drawPile')}
            />
            <DiscardPile
              onClick={isDiscardDrawDisabled ? () => {} : () => handleDrawPileClick('discardPile')}
              setIsDiscardDrawDisabled={setIsDiscardDrawDisabled}
            />
          </div>
        </div>
        <div className="players-phase">
          <p>Your phase:</p>  
          {!hasLaidPhaseThisRound ?
            phaseMap[currentPhase].text.map((phaseText) => {
              return <p key={`${userId}-${phaseText}`} className="phase-text">{phaseText}</p>
            })
            :
            <p>placeholder for successful laydown</p>
          }
          
        </div>
      </div>
      
      <p className="your-hand">Your hand:</p>
      <Hand
        currentHand={currentHand}
      />

      {isCurrentTurn && hasDrawnThisTurn ? 
          <div>
            {hasLaidPhaseThisRound ? 
              <button>Hit on laid phase</button>
              :
              <button onClick={() => openModal('laying')}>Lay down phase</button>
            }
            <button onClick={() => openModal('discarding')}>Discard and end turn</button>
          </div>
        :
        <></>
      }
    </div>
  )
}

export default Round;
