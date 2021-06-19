import firebase from './firebase'
import 'firebase/functions'

const functions = firebase.functions()

// if (process.env.NODE_ENV !== 'production') {
//   functions.useEmulator('localhost', 8080)
// }

export default functions
