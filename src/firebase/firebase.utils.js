import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyAqBjXiPju6LQcxpTkpfZiFXLEN6glh5X4",
  authDomain: "crwn-db-bb969.firebaseapp.com",
  projectId: "crwn-db-bb969",
  storageBucket: "crwn-db-bb969.appspot.com",
  messagingSenderId: "778041123456",
  appId: "1:778041123456:web:fa191e5ae3e94115be3c65",
  measurementId: "G-DF1W641GGW"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ propmpt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
