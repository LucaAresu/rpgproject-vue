import axios from 'axios'
import constants from './constants'

const registration = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + constants.apiKey
})

const login = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + constants.apiKey
})

const refresh = axios.create({
  baseURL: 'https://securetoken.googleapis.com/v1/token?key=' + constants.apiKey
})

export {
  registration,
  login,
  refresh
}
