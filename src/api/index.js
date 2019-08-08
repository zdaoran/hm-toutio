import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [
  (data) => {
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
  }
]

axios.interceptors.request.use(config => {
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => {
  return res
}, (err) => {
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
