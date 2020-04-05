import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD7owlkcXvzdS8vHY2s3mt_Me-93ma2NZI",
  authDomain: "phase10-pemo.firebaseapp.com",
  databaseURL: "https://phase10-pemo.firebaseio.com",
  projectId: "phase10-pemo",
  storageBucket: "phase10-pemo.appspot.com",
  messagingSenderId: "879568671948",
  appId: "1:879568671948:web:fcf63e12d457b22afade69",
  measurementId: "G-M6NSG0LYQ8"
}

firebase.initializeApp(firebaseConfig)

export default firebase