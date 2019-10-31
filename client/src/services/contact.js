

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
//   console.log(postData);
//   const response = await axios({
//   method: 'GET',
//   url: 'http://localhost:3000/resources/images/avatars/avatar.png',
//   responseType: 'stream'
// });
//
//
// response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));
//
//   return new Promise((resolve,reject)=>{
//     response.data.on('end',()=>{
//       resolve();
//     });
//     response.data.on('error',(err)=>{
//       reject(err);
//     });
//   });
//   // return axios
//   //   .post(`${apiUrl}/api/contacts/export`, postData)
//   //   .then((res) => {
//   //     return res.data;
//   //   })
//
  return axios({
  method: 'post',
  url: `${apiUrl}/api/contacts/export`,
  data: postData,
  // responseType: 'stream'
}).then((response) => {
  console.log(response.data);
  const csv = response.data.map((d, key) =>{

    delete d._id;
    if (key === 0) {
      const headers = Object.keys(d);
      return JSON.stringify(headers);
    }
    return JSON.stringify(Object.values(d));
})
.join('\n')
.replace(/(^\[)|(\]$)/mg, '');
     fileDownload(csv, 'filename.csv');
  });
}
