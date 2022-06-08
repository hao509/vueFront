import axios from 'axios'
// 查询列表页接口
export const getOrderDetailPag = (params) => {
  return axios({
    url: '/order/page',
    method: 'get',
    params
  })
}

// 查看接口
export const queryOrderDetailById = (id) => {
  return axios({
    url: `/orderDetail/${id}`,
    method: 'get'
  })
}

// 取消，派送，完成接口
export const editOrderDetail = (params) => {
  return axios({
    url: '/order',
    method: 'put',
    data: { ...params }
  })
}
