import React from 'react'

function UserList({
  userList,
  isHost,
  removeUser,
  isScoreScreen = false,
  isEndScreen = false,
}) {
  // TODO: order by score if score screen
  return (
    <ol className={isScoreScreen ? 'score-list' : 'users-ingame'}>
      {
        userList.map((user, index) => (
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