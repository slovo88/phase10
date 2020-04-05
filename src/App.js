import React, { useState, useEffect } from 'react'
import './App.css'
// import { gameService } from './services'
import { firebase } from './services'


function App() {
  const database = firebase.database()
  
  const [ displayName, setDisplayName ] = useState('')
  const [ isNewUser, setIsNewUser ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ userId, setUserId ] = useState(0)
  const [ userList, setUserList ] = useState([])
  const [ error, setError ] = useState('')

  useEffect(() => {
    // determine user's authentication status
    const localStorageUserId = localStorage.getItem('p10-user-id')
    
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
  }, [])

  function retrieveUserInfo(uid) {
    database.ref(`/users/${uid}/displayName`).on('value', (snapshot) => {
      const displayName = snapshot.val()
      if (displayName) {
        setDisplayName(displayName)
        setIsLoading(false)
        updateUserList(uid, displayName)
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
        userList.push(childSnapshot.val())
      })

      if (userList.length >= 6) {
        setError('There are already 6 people in this game.<br>An update is coming soon to allow watching matches.')
      }  else {
        const existsInUserList = userList.findIndex((user) => user.uid === uid) !== -1
        if (!existsInUserList) {
          const isUserHost = !userList.length
          database.ref(`/game/userList`).push({ 
            displayName, 
            uid, 
            host: isUserHost 
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

  return (
    <div className={`App ${userId}`}>
      <style>
        {`
        li.${userId} {
          font-weight: bold;
          color: seagreen;
        }

        li.${userId}::after {
          content: " (you)"
        }

        li.host::after {
          content: " (host)"
        }

        li.${userId}.host::after {
          content: " (you, host)"
        }
        `}
      </style>
      <header className="App-header">
        <h1>Phase 10</h1>
      </header>
      <main>
        {error && 
          <p dangerouslySetInnerHTML={{__html: error}} />
        }
        {isLoading ?
          <p>loading...</p>
          :
          !isNewUser ?
            <p>{displayName}</p>
          :
          isNewUser &&
            <>
              <h2>Welcome!</h2>
              <p>Please enter a username to join the game</p>
              <label for='display-name'>Name:</label>
              <input 
                id='display-name' 
                type='text' 
                placeholder='Display Name'
              />
              <button onClick={onDisplayNameSubmit}>Submit</button>
            </>
        }
        <ul>
          {
            userList.map((user, index) => (
              <li 
                className={`${user.uid} ${user.host && 'host'}`} 
                key={`userList-${index}`}
              >
                {user.displayName}
              </li>
            ))
          }
        </ul>

      </main>
    </div>
  );
}

export default App;
