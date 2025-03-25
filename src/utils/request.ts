import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service = axios.create({
})

// request 拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
)

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data

    // 不是 200，则判断为错误
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    }
    // 200: 正常
    else {
      return response
    }
  },
  (error) => {
    if (error.message.includes('timeout')) ElMessage.error('网络超时！')
    else if (error.message.includes('Network Error')) ElMessage.error('网络连接错误！')
    else ElMessage.error(error.message)
    return Promise.reject(error)
  },
)

export default service
