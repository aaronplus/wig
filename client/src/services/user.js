import jwtDeode from 'jwt-decode'
import firebase from 'firebase/app'
import { notification } from 'antd'
import setAuthToken from '../utils/setAuthToken'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { SET_CURRENT_USER } from './types'
import { SERVER_ADDRESS } from '../config/constants'

const axios = require('axios').default

const firebaseConfig = {
  apiKey: 'AIzaSyA2LHKgdr2GQb_QUBYfhMOaxgOuGjw1z5E',
  authDomain: 'airui-a4b63.firebaseapp.com',
  databaseURL: 'https://airui-a4b63.firebaseio.com',
  projectId: 'airui-a4b63',
  storageBucket: 'airui-a4b63.appspot.com',
  messagingSenderId: '1039460737420',
}
// const headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// };
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp

export async function login(email, password) {
  const postData = { email, password }
  return axios
    .post(`${SERVER_ADDRESS}/users/login`, postData)
    .then(res => {
      console.log(res)
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      // Set token to Auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwtDeode(token)
      // Set current user
      setCurrentUser(decoded)
      return token
    })
    .catch(error => {
      notification.warning({
        message: error.code || error.response.status,
        description: error.response.data.error,
      })
    })
}

export async function currentAccount() {
  return localStorage.getItem('jwtToken')
  // let userLoaded = false
  // function getCurrentUser(auth) {
  //   return new Promise((resolve, reject) => {
  //     if (userLoaded) {
  //       resolve(firebaseAuth.currentUser)
  //     }
  //     const unsubscribe = auth.onAuthStateChanged(user => {
  //       userLoaded = true
  //       unsubscribe()
  //       resolve(user)
  //     }, reject)
  //   })
  // }
  // return getCurrentUser(firebaseAuth())
}

export async function logout() {
  return localStorage.removeItem('jwtToken')
}
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}
