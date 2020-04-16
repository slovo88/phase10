import React from 'react'
import phaseMap from '../../../constants/phases'
import { CompletedPhase } from './'


function OtherPlayers({ userList, userId }) {

  console.log({userList, userId})
  // TODO: order the users based on who is after player -> who is before
  const thisUser = userList.find((user) => user.uid === userId)
  const otherUsers = userList.filter((user) => user.uid !== userId)

  // ensure users are in numerical turn order
  otherUsers.sort((a,b) => a.turnOrder - b.turnOrder)

  // splice the array at user after this user
  const indexOfFollowingUser = otherUsers.findIndex((user) => user.turnOrder > thisUser.turnOrder)
  const usersAfterThisUser = otherUsers.splice(indexOfFollowingUser)
  const otherUsersInOrder = usersAfterThisUser.concat(otherUsers)

  return (
    <div className="other-players-wrapper">
      {otherUsersInOrder.map((user) => {
  
          return (
            <div key={`other-player-${user.uid}`} className={`turn-indicator ${user.isCurrentTurn && "highlight"}`}>
              <div className="other-player">
                <p><strong>{user.displayName}</strong></p>
                <p>Hand: {Object.keys(user.currentHand).length}</p>
                <p>Phase: {user.currentPhase}</p>
                {user.hasLaidPhaseThisRound ?
                  <CompletedPhase uid={user.uid} />
                  :
                  phaseMap[user.currentPhase].text.map((phaseText) => {
                    return <p key={`${userId}-${phaseText}`} className="phase-text">{phaseText}</p>
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default OtherPlayers