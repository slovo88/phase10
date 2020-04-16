import React, { useState, useEffect } from 'react'
import { firebase } from '../../../services'

const database = firebase.database()


function CompletedPhase({ uid }) {
  const [ userPhase, setUserPhase ] = useState([])

  useEffect(() => {
    database.ref(`/game/laidPhases/${uid}`).on('value', (snapshot) => {
      if (snapshot.val()) {
        const phaseItems = []
        snapshot.val().forEach((laidRule) => {
          const { possiblePlays, rule } = laidRule
          const { type } = rule
          const { options } = possiblePlays
          
          if (type === 'run') {
            const firstNumber = options[0] + 1
            const lastNumber = options[1] - 1
            // send to phaseItems with "Run: #... #"
            phaseItems.push(`Run: ${firstNumber}... ${lastNumber}`)
          } else {
            // send to phaseItems with "${type}: ${color || number}"
            phaseItems.push(`Set: ${options[0]}'s`)
          }

        })
        setUserPhase(phaseItems)
      }
    })

  }, [])

  return userPhase.map((rule) => {
    return <p key={`${uid}-${rule}`} className="laid-phase">{rule}</p>
  })
}

export default CompletedPhase