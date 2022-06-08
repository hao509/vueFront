import axios from 'axios'
export function loginApi (_this, data) {
  return _this.$axios({
    url: '/employee/login',
    method: 'post',
    data
  })
}

export function logoutApi () {
  return axios({
    url: '/employee/logout',
    method: 'post'
  })
}

export function updataApi (_this, data) {
  return axios({
    url: '/employee/updata',
    method: 'post',
    data
  })
}
