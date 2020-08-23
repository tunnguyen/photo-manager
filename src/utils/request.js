import Axios from 'axios';

const API_URL = 'http://localhost:8888';

export const parseJSON = response => {
  return new Promise(resolve => {
    resolve({
      status: response.status,
      statusText: response.statusText,
      json: response.data,
    })
  })
}

export const headers = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
})

export default (method, url, options) => new Promise((resolve, reject) => {
  Axios({
    method: method,
    url: `${ API_URL }${ url }`,
    header: headers(),
    withCredentials: false,
    ...options,
  }).then(parseJSON)
    .then(res => resolve(res.json))
    .catch(err => reject(err))
})