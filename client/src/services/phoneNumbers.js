import { SERVER_ADDRESS } from '../config/constants'

const axios = require('axios').default

axios.defaults.headers.common.Authorization = `${localStorage.getItem('jwtToken')}`

export function getList() {
  return axios.get(`${SERVER_ADDRESS}/phoneNumbers/all`).then(res => {
    console.log(res);
    return res.data
  })
}

export function getList1() {
  return axios.get(`${SERVER_ADDRESS}/phoneNumbers/all`).then(res => {
    console.log(res);
    return res.data
  })
}
