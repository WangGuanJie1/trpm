import axios from 'axios'
import qs from 'qs'
import store from '../index'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = ''

const fetch = (options) => {
  const { method = 'get', url } = options
  let { data } = options
  const jobCode = store.state.currentTeacherInfo.teacherInfo.jobCode
  if (data === undefined) data = { handler: jobCode }
  else data.handler = jobCode
  // 每次请求都确保重新获取localstorage中的最新 Token
  axios.defaults.headers.authorization = 'Bearer ' + localStorage.getItem('authorization')
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${data ? `?${qs.stringify(data)}` : ''}`)
    case 'post':
      return axios.post(url, data)
    default:
      return axios(options)
  }
}

// http 异步请求
export default async (options) => {
  return fetch(options)
    .then((res) => {
      console.log('以下内容在http.js中console')
      console.log(res.data)
      return res.data
    })
    .catch((err) => {
      return err
    })
}
