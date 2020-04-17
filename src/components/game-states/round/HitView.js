import React, { useState, useEffect } from 'react'
import { game, firebase } from '../../../services'
import { Hand } from './'

const database = firebase.database()
const { hitOnLaidPhase } = game


function HitView({ userId, currentHand, selected, toggleInSelection, closeModal }) {
  const [ hitStage, setHitStage ] = useState('pickPhase')
  const [ laidPhases, setLaidPhases ] = useState([])
  const [ chosenPhase, setChosenPhase ] = useState({})

  useEffect(() => {
    database.ref('game/laidPhases').once('value', (snapshot) => {
      setLaidPhases(Object.entries(snapshot.val()))
    })
  },[])

  function switchToPickCard(laidId, phaseIndex, isRun, phaseCards, possiblePlays) {
    setChosenPhase({ laidId, phaseIndex, isRun, phaseCards, possiblePlays })
    setHitStage('pickCards')
  }

  function isValidForHit(card) {
    const collectionToValidate = card ? [ card ] : selected
    const containsSkip = collectionToValidate.findIndex((card) => card.value === 'Skip') !== -1
    if (containsSkip) {
      // const error = 'Skips cannot be used to hit'
      return false
    }

    const { possiblePlays } = chosenPhase
    const { options, valueType } = possiblePlays
    let isValid = true

    // validate selected
    collectionToValidate.forEach((selectedCard) => {
      const compareValue = selectedCard[1][valueType]
      const isWild = selectedCard[1].value === 'Wild'
      if (!isWild && !options.includes(compareValue)) {
        // const error = 'One or more selected cards do not fit the criteria'
        isValid = false
      }
    })
    return isValid
  }

  function submitHitRun(card, wildValue) {
    const { possiblePlays, isRun, phaseIndex, laidId } = chosenPhase
    const { options } = possiblePlays
    const hasOnlyOneOption = options.includes(0) || options.includes(13)

    if (card[1].value === 'Wild' && !hasOnlyOneOption && !wildValue ) {
      setHitStage('pickWildValue')
    } else {
      if (isValidForHit(card)) {
        const defaultWildValue = card[1].value === 'Wild' ? options[0] : wildValue
        hitOnLaidPhase(userId, currentHand.length, isRun, [card], laidId, phaseIndex, defaultWildValue)
        setHitStage('pickPhase')
        closeModal()
      // function hitOnLaidPhase(uid, handSize, cards, laidId, phaseIndex, wildValue) {
      }
    }
  }

  function submitHitNonRun() {
    const { isRun, phaseIndex, laidId } = chosenPhase

    // submit selected if valid
    if (isValidForHit()) {
      hitOnLaidPhase(userId, currentHand.length, isRun, selected, laidId, phaseIndex)
        setHitStage('pickPhase')
        closeModal()
    }
  }

  function PickPhase() {
    return (
      <>
        <h1>Choose what to hit&nbsp;on</h1>

        <ul>
          {laidPhases.map((usersPhases) => usersPhases[1].map((laidPhase, index) => {
            const { rule, possiblePlays, cards} = laidPhase
            const { type } = rule
            const { options } = possiblePlays

            const isRun = type === 'run'

            // only show if there is a possibilty of playing
            // for instance, a run of 1-12 cannot be played on further
            if (!(options.includes(0) && options.includes(13))) {
              return (
                <li 
                  onClick={() => switchToPickCard(usersPhases[0], index, isRun, cards, possiblePlays)} 
                  key={`hit-${usersPhases[0]}-${index}`}
                >
                  <p>
                    {`${isRun ? 'Run:' : `Set of "${options[0]}"s`}`}
                  </p>

                  <Hand 
                    currentHand={cards}
                  />
                </li>
              )
            }

            return null
          }))}
        </ul>
      </>
    )
  }

  function PickCards() {
    return (
      <>
        <h1>You chose:</h1>

        <Hand
          currentHand={chosenPhase.phaseCards}
        />

        <p>
          {/* TODO: clean up this fucking mess lol */}
          {/* Basically need to run checks for if a run already has a 1 or 12
              since it cannot go lower/higher, then structure messaging properly 
          */}
          {`You can only hit with 
            ${chosenPhase.isRun ? 'a' : ''} 
            "${chosenPhase.possiblePlays.options[0] !== 0 ? 
            chosenPhase.possiblePlays.options[0] :
            chosenPhase.possiblePlays.options[1]}" 
            card${!chosenPhase.isRun ? 's' : 
            chosenPhase.possiblePlays.options[0] !== 0 && chosenPhase.possiblePlays.options[1] !== 13 ? 
            ` or a "${chosenPhase.possiblePlays.options[1]}" card` : 
            ''}`
          }
        </p>
        
        {chosenPhase.isRun &&
          <p>For a run, you can only hit with one card at a time.</p>
        }

        <Hand
          currentHand={currentHand}
          onClick={chosenPhase.isRun ? submitHitRun : toggleInSelection}
        />

        {!chosenPhase.isRun && selected.length > 0 &&
          <>
            <p>Selected:</p>

            <Hand 
              currentHand={selected}
              onClick={toggleInSelection}
            />

            <button onClick={() => submitHitNonRun()}>
              Hit with selected card{selected.length > 1 && 's'}
            </button>
          </>
        }
      </>
    )
  }

  function PickWildValue() {
    return <h1>Select value for Wild card:</h1>
  }

  return (
    <div className="hit-view">
      {hitStage === 'pickPhase' ?
        <PickPhase />
        :
        hitStage === 'pickCards' ?
        <PickCards /> 
        :
        <PickWildValue />
      }
    </div>
  )
}

export default HitView