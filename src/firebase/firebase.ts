import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyADkImh0Geunj7TN5cSbgkg2EVOwMq5G9c',
  authDomain: 'medicos-de.firebaseapp.com',
  projectId: 'medicos-de',
  storageBucket: 'medicos-de.appspot.com',
  messagingSenderId: '335867679281',
  appId: '1:335867679281:web:40b70729c16f7d9e813b10'
}

firebase.initializeApp(firebaseConfig)

export default firebase
