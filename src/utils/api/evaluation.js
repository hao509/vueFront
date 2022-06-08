
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
function BackmsgApi (params) {
  return axios({
    url: '/evaluation/backmsg',
    method: 'get',
    params
  })
}
