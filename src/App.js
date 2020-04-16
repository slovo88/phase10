import React, { useState, useEffect } from 'react'
import './App.css'
import { PreGame, Round } from './components/game-states/'
// import { gameService } from './services'
import { firebase, game } from './services'


function App() {
  const database = firebase.database()
  
  const [ displayName, setDisplayName ] = useState('')
  const [ isNewUser, setIsNewUser ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ gameState, setGameState ] = useState('')
  const [ isHost, setIsHost ] = useState(false)
  const [ userId, setUserId ] = useState(0)
  const [ userList, setUserList ] = useState([])
  const [ error, setError ] = useState('')
  const [ currentHand, setCurrentHand ] = useState([])

  useEffect(() => {
    // determine user's authentication status
    const localStorageUserId = localStorage.getItem('p10-user-id')
    let id = localStorageUserId
    
    if (localStorageUserId) {
      setUserId(localStorageUserId)
      retrieveUserInfo(localStorageUserId)
    } else {
      firebase.auth().signInAnonymously()
        .then(({ user }) => {
          localStorage.setItem('p10-user-id', user.uid)
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode)
        })
  
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const { uid } = user
          setUserId(uid)
          id = uid
        }
      })
      
      retrieveUserInfo(userId)
    }

    // show list of users currently in the game
    database.ref(`/game/userList`).on('value', (snapshot) => {
      const userList = []
      snapshot.forEach((childSnapshot) => {
        userList.push(childSnapshot.val())
      })
      setUserList(userList)
    });

    // show list of users currently in the game
    database.ref(`/game/userList`).on('child_changed', (snapshot) => {
      const newValue = snapshot.val();
      let userInUserList = userList.find(user => user.uid === newValue.uid);
      userInUserList = newValue
    });

    // show list of users currently in the game
    database.ref(`/game/state`).on('value', (snapshot) => {
      setGameState(snapshot.val())
    });

    database.ref(`/game/userList/${id}/currentHand`).on('value', (snapshot) => {
      setCurrentHand(Object.entries(snapshot.val() || {}))
    })

    return function cleanup() {
      database.ref(`/game/userList/${id}/currentHand`).off()
      database.ref(`/game/state`).off()
      database.ref(`/game/userList`).off()
    }
  }, [])

  function retrieveUserInfo(uid) {
    database.ref(`/game/userList/${uid}`).once('value', (snapshot) => {
      const userInfo = snapshot.val()
      if (userInfo) {
        setDisplayName(userInfo.displayName)
        setIsLoading(false)
        updateUserList(uid, userInfo.displayName)
        setCurrentHand(Object.entries(userInfo.currentHand || {}) || [])
      } else {
        setIsNewUser(true)
        setIsLoading(false)
      }
    });
    
  }
  
  
  function updateUserList(uid, displayName) {    
    database.ref(`/game/userList`).once('value', (snapshot) => {      
      const userList = []
      snapshot.forEach((childSnapshot) => {
        const childValue = childSnapshot.val()
        userList.push(childValue)      
        // determine if player is host
        if (childValue.host && uid === childValue.uid) {
          setIsHost(true)
        }
      })

      if (userList.length >= 6) {
        setError('There are already 6 people in this game.<br>An update is coming soon to allow watching matches.')
      }  else {
        const existsInUserList = userList.findIndex((user) => user.uid === uid) !== -1
        if (!existsInUserList) {
          const isUserHost = !userList.length
          setIsHost(isUserHost)
          database.ref(`/game/userList/`).child(uid).set({ 
            displayName, 
            uid, 
            host: isUserHost,
            score: 0,
            gameScore: 0,
            currentPhase: 1,
            hasLaidPhaseThisRound: false,
          })
        }
      }
    })
  }

  function onDisplayNameSubmit(e) {
    e.preventDefault()
    const nameInputValue = document.getElementById('display-name').value
    database.ref(`/users/${userId}/displayName`).set(nameInputValue)
    setDisplayName(nameInputValue)    
    updateUserList(userId, nameInputValue)
    setIsNewUser(false)
  }

  function startGame() {
    game.initializePhase10(userList).then(() => {
      database.ref('game/state').set('round')
    })
  }

  function removeUser(uid) {
    database.ref(`game/userList/${uid}`).remove()
    database.ref(`users/${uid}`).remove()
  }

  return (
    <div className={`App ${userId}`}>
      <style>
        {`
        li.${userId} {
          font-weight: bold;
          color: seagreen;
        }

        li.${userId}::after {
          content: " (you)";
          position: relative;
          top: -3px;
        }

        li.host::after {
          content: " (host)";
          position: relative;
          top: -3px;
        }

        li.${userId}.host::after {
          content: " (you, host)";
          position: relative;
          top: -3px;
        }
        `}
      </style>
      <main>
        {isLoading ?
          // TODO: make a loading spinner
          <p>loading...</p>
          :
          gameState === 'pregame' || isNewUser ? // TODO: figure out better way to handle user entering game after it has started
            <PreGame
            error={error}
            isNewUser={isNewUser}
            onDisplayNameSubmit={onDisplayNameSubmit}
            isHost={isHost}
            userList={userList}
            startGame={startGame}
            removeUser={removeUser}
            />
            :
            gameState === 'round' ?
              <Round 
              currentHand={currentHand}
              userList={userList}
              userId={userId}
              />
              :
              <p>Loading...</p>
        } 
      </main>
    </div>
  );
}

export default App;
