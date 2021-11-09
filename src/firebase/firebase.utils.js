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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ propmpt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
