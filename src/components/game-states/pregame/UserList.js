import React from 'react'

function UserList({
  userList,
  isHost,
  removeUser,
}) {

  return (
    <ul>
      {
        userList.map((user, index) => (
          <li 
            className={`${user.uid} ${user.host && 'host'}`} 
            key={`userList-${index}`}
          >
            {user.displayName}
            {isHost && !user.host && 
              <button 
                key={`remove-${user.uid}`} 
                className="remove-user" 
                onClick={() => removeUser(user.uid)}
                key={`remove-${user.uid}`}
              >
                Remove user
              </button>
            }
          </li>
        ))
      }
    </ul>
  )
}

export default UserList