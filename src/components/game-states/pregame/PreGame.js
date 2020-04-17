import React, { useState, useEffect } from 'react'
// import { firebase, game } from '../../../services'
import { UserList } from '../../shared'


function PreGame({
  error,
  isLoading,
  isNewUser,
  displayName,
  onDisplayNameSubmit,
  startGame,
  userList,
  isHost,
  removeUser,
}) {
  return (
    <>
    <header className="App-header">
      <h1>Phase 10</h1>
    </header>
      {error && 
        <p dangerouslySetInnerHTML={{__html: error}} />
      }
      {isLoading ?
        // TODO: make a loading spinner
        <p>loading...</p>
        :
        !isNewUser ?
          <p>{displayName}</p>
        :
        // TODO: componetize the different game states - // pre-game, round, round-end, game-end
        isNewUser &&
          <>
            <h2>Welcome!</h2>
            <p>Please enter a username to join the game</p>
            <label htmlFor='display-name'>Name:</label>
            <input 
              id='display-name' 
              type='text' 
              placeholder='Display Name'
            />
            <button onClick={onDisplayNameSubmit}>Submit</button>
          </>
      }
      {isHost && !isNewUser && userList.length > 0 &&
        <button onClick={startGame}>Everybody's In</button>
      }
      <UserList
        userList={userList}
        isHost={isHost}
        removeUser={removeUser}
      />
    </>
    
  );
}

export default PreGame;
