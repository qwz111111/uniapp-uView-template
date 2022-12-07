import { request } from '@/utils/request'

export default {
  demoApi(data) {
    return request('/demo/api', data)
  }
}
