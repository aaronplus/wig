

const axios = require('axios').default;
// const fs = require('fs');
const fileDownload = require('js-file-download');

const apiUrl = "http://localhost:5000";
// const headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// };
axios.defaults.headers.common.Authorization = `${localStorage.getItem("jwtToken")}`;

export function getContacts() {
  return axios
    .get(`${apiUrl}/api/contacts/list`)
    .then((res) => {
      return res.data;
    })
}

export function getCampaignList() {
  return axios
    .get(`${apiUrl}/api/campaigns/list`)
    .then((res) => {
      return res.data;
    })
}

export function importContacts(postData) {
  return axios
    .post(`${apiUrl}/api/contacts/upload`, postData)
    .then((res) => {
      return res.data;
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
  url: `${apiUrl}/api/contacts/export`,
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
    return JSON.stringify(exportedData);
})
.join('\n')
.replace(/(^\[)|(\]$)/mg, '');
     fileDownload(csv, `contact_${Math.random().toString(36).substring(7)}.csv`);
  });
}
export function getSchema() {
  return axios
    .get(`${apiUrl}/api/contacts/getSchema`)
    .then((res) => {
      return res.data;
    })
}
export function getCounts() {
  return axios
    .get(`${apiUrl}/api/contacts/getCounts`)
    .then((res) => {
      return res.data;
    })
}
