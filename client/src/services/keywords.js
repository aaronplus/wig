import { SERVER_ADDRESS } from '../config/constants'

const axios = require('axios').default

axios.defaults.headers.common.Authorization = `${localStorage.getItem('jwtToken')}`

export function getList() {
  return axios.get(`${SERVER_ADDRESS}/keywords/all`).then(res => {
    console.log(res);
    return res.data
  })
}

export function addNewRecord(data) {
  console.log(data,"Service");
  return axios.post(`${SERVER_ADDRESS}/keywords/`, data).then(res => {
    console.log(res);
    return res.data
  })
}

export function deleteRecord(id) {
  console.log(id,"Service");
  return axios.delete(`${SERVER_ADDRESS}/keywords/${id}`,).then(res => {
    return res.data
  })
}

export function updateRecord(id, data) {
  console.log(data,"Service");
  return axios.put(`${SERVER_ADDRESS}/keywords/${id}`, data).then(res => {
    console.log(res);
    return res.data
  })
}
