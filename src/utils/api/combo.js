import axios from 'axios'
// 查询列表数据tableData
export const getSetmealPage = (params) => {
  return axios({
    url: '/setmeal/page',
    method: 'get',
    params
  })
}

// 删除数据接口
export const deleteSetmeal = (ids) => {
  return axios({
    url: '/setmeal',
    method: 'delete',
    params: { ids }
  })
}

// 修改数据接口
export const editSetmeal = (params) => {
  return axios({
    url: '/setmeal',
    method: 'put',
    data: { ...params }
  })
}

// 新增数据接口
export const addSetmeal = (params) => {
  return axios({
    url: '/setmeal',
    method: 'post',
    data: { ...params }
  })
}

// 查询详情接口
export const querySetmealById = (id) => {
  return axios({
    url: `/setmeal/${id}`,
    method: 'get'
  })
}

// 批量起售禁售
export const setmealStatusByStatus = (params) => {
  return axios({
    url: `/setmeal/status/${params.status}`,
    method: 'post',
    params: { ids: params.ids }
  })
}
