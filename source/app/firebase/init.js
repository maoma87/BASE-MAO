import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseApp = firebase.initializeApp({
	apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
})

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export {db,auth,storage}