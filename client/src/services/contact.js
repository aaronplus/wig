

const axios = require('axios').default;

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
    .get(`${apiUrl}/api/campaign/list`)
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
