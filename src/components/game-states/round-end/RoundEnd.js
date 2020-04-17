import React from 'react'
import { firebase } from '../../../services'

const database = firebase.database()


function RoundEnd({ isHost, children, isEndOfGame }) {
  function startNextRound() {
    database.ref('game/state').set('round')
  }

  function endGame() {
    database.ref('game/state').set('pregame')
  }

  return (
    <>
      <h1>{isEndOfGame ? 'Game' : 'Round'} over!</h1>
      <h2>{isEndOfGame ? 'End' : 'Current'} scores:</h2>
      {children}
      {isHost &&
        <button onClick={isEndOfGame ? endGame : startNextRound}>{isEndOfGame ? 'End game' : 'Next round'}</button>
      }
    </>
  )
}

export default RoundEnd;
