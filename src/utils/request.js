export const real = false //是否为线上环境

// 测试地址
const testUrl = 'http://192.168.1.106:3333'

// 线上地址
let realUrl = ''
// #ifdef H5
realUrl = '/api/jnfw'
// #endif
// #ifndef H5
realUrl = 'https://szxc.0571ps.com/jnfw'
// #endif

export const baseURL = real ? realUrl : testUrl

/**
 * 封装接口
 * @param {String} url
 * @param {Object} data 参数
 * @param {Boolean} isLoad 是否显示加载提示框
 * @param {String} method 请求方式
 * @return {Promise}
 */
export const request = (url, data, isLoad = true, method = 'POST') => {
  // 错误提示
  const errToast = err => {
    isLoad && uni.hideLoading()
    uni.showModal({
      title: '温馨提示',
      content: err
    })
  }
  // 获取id
  const getId = () => {
    if (uni.getStorageSync('userInfo')) {
      return JSON.parse(uni.getStorageSync('userInfo')).m
    }
    return ''
  }
  // 拼接参数
  const params = () => {
    if (getId()) {
      return {
        m: getId(),
        ...data
      }
    }
    return data
  }

  return new Promise((resolve, reject) => {
    isLoad && uni.showLoading({ title: '加载中……', mask: true })

    uni.request({
      header: { 'content-type': 'application/json' },
      url: `${baseURL}${url}`,
      method: method,
      data: params(),
      success(res) {
        if (typeof res.data !== 'object') {
          errToast('服务端异常！')
          reject(res)
        } else if (res.statusCode !== 200) {
          errToast(res.errMsg)
          reject(res)
        }
        resolve(res.data)
      },
      fail(err) {
        if (err.errMsg.includes('timeout')) {
          errToast('请求超时!')
        } else {
          errToast('网络开了小差!')
        }
        reject(err)
      },
      complete() {
        isLoad && uni.hideLoading()
      }
    })
  })
}
