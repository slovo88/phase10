import React from 'react'

function UserList({
  userList,
  isHost,
  removeUser,
  isScoreScreen = false,
  isEndScreen = false,
}) {
  // deep copy of userList
  let scoreOrder = userList.map((user) => user)

  if (isScoreScreen) {
    scoreOrder.sort((a, b) => a.gameScore - b.gameScore)
  }
  return (
    <ol className={isScoreScreen ? 'score-list' : 'users-ingame'}>
      {
        scoreOrder.map((user, index) => (
          <li 
            className={`${user.uid} ${user.host && 'host'}`} 
            key={`userList-${index}`}
          >
            <span>{user.displayName}</span>{isScoreScreen ? `: ${user.gameScore}` : ''}{!isEndScreen && isScoreScreen ? ` (+${user.scoreAddedThisRound})` : ''}
            {isHost && !user.host && !isScoreScreen &&
              <button 
                key={`remove-${user.uid}`} 
                className="remove-user" 
                onClick={() => removeUser(user.uid)}
              >
                Remove user
              </button>
            }
          </li>
        ))
      }
    </ol>
  )
}

export default UserList