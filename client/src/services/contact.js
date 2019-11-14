import { SERVER_ADDRESS } from '../config/constants'

const axios = require('axios').default
// const fs = require('fs');
const fileDownload = require('js-file-download')

// const headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// };
axios.defaults.headers.common.Authorization = `${localStorage.getItem('jwtToken')}`

export function getContacts(page, limit, filters) {
  const requestUrl = !filters? `${SERVER_ADDRESS}/contacts/list?page=${page}&limit=${limit}` : `${SERVER_ADDRESS}/contacts/list?page=${page}&limit=${limit}&filters=${encodeURIComponent(JSON.stringify(filters))}`;
  return axios.get(requestUrl).then(res => {
    return res.data
  })
}

export function getCampaignList() {
  return axios.get(`${SERVER_ADDRESS}/campaigns/list`).then(res => {
    return res.data
  })
}

export function importContacts(postData) {
  return axios.post(`${SERVER_ADDRESS}/contacts/upload`, postData).then(res => {
    return res.data
  })
}
export async function exportContacts(postData) {
  console.log(postData);
  const {payload: {campaign, propertyState, propertyCity}} = postData;
  const postObj = {};
  if (campaign) {
    postObj.campaign = campaign;
  }
  if (propertyState) {
    postObj.propertyState = propertyState;
  }
  if (propertyCity) {
    postObj.propertyCity = propertyCity;
  }
  return axios({
  method: 'post',
  url: `${SERVER_ADDRESS}/contacts/export`,
  data: {...postObj},
  // responseType: 'stream'
}).then((response) => {
  const headers = Object.keys(response.data[0]);
  delete(headers[0]);
  response.data.unshift(headers);
  const csv = response.data.map((d, key) =>{
    console.log(key);
    delete d._id;
    const exportedData = Object.values(d);

        // if (key === 0) {
        //   const headers = Object.keys(d);
        //   exportedData.unshift(headers);
        //
        // }
        // console.log(exportedData);
        return JSON.stringify(exportedData)
      })
      .join('\n')
      .replace(/(^\[)|(\]$)/gm, '')
    fileDownload(
      csv,
      `contact_${Math.random()
        .toString(36)
        .substring(7)}.csv`,
    )
  })
}
export function getSchema() {
  return axios.get(`${SERVER_ADDRESS}/contacts/getSchema`).then(res => {
    return res.data
  })
}
export function getCounts() {
  return axios.get(`${SERVER_ADDRESS}/contacts/getCounts`).then(res => {
    return res.data
  })
}
export function getFilters(){
  return axios.get(`${SERVER_ADDRESS}/contacts/getFilters`).then(res =>{
    return res.data
  })
}
