import { baseURL } from './config'

/* 错误提示 */
const errToast = (isLoad, err) => {
  isLoad && uni.hideLoading()
  uni.showToast({ icon: 'none', title: err, duration: 2000 })
}

/* 获取id */
const getId = () => {
  let m = ''
  try {
    const value = uni.getStorageSync('m')
    value ? (m = value) : (m = '')
  } catch (e) {
    m = ''
  }
  return m
}

/* 拼接参数 */
const params = data => {
  if (getId()) {
    return {
      m: getId(),
      ...data
    }
  }
  return data
}

/**
 * 封装接口
 * @param {String} url
 * @param {Object} data 参数
 * @param {Boolean} isLoad 是否显示加载提示框
 * @param {String} method 请求方式
 * @return {Promise}
 */
export const request = (url, data, isLoad = true, method = 'GET') => {
  return new Promise((resolve, reject) => {
    isLoad && uni.showLoading({ title: '加载中……', mask: true })

    uni.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      url: `${baseURL}${url}`,
      method: method,
      data: params(data),
      success(res) {
        if (typeof res.data !== 'object') {
          errToast(isLoad, '服务端异常！')
          reject(res)
        } else if (res.statusCode !== 200) {
          errToast(isLoad, res.errMsg)
          reject(res)
        }
        if (!res.data.success) {
          errToast(isLoad, res.data.message || '服务端未知错误')
          reject(res.data)
        }
        resolve(res.data)
      },
      fail(err) {
        if (err.errMsg.includes('timeout')) {
          errToast(isLoad, '请求超时!')
        } else {
          errToast(isLoad, '网络开了小差!')
        }
        reject(err)
      },
      complete() {
        isLoad && uni.hideLoading()
      }
    })
  })
}

/**
 * 封装接口
 * @param {String} url
 * @param {String} filePath 文件路径
 * @param {Object} data 参数
 * @param {Boolean} isLoad 是否显示加载提示框
 * @param {String} name 文件key名字
 * @return {Promise}
 */
export const uploadFile = (
  url,
  filePath,
  data,
  isLoad = true,
  name = 'file'
) => {
  return new Promise((resolve, reject) => {
    isLoad && uni.showLoading({ title: '文件上传中……', mask: true })

    uni.uploadFile({
      url: `${baseURL}${url}`,
      filePath: filePath,
      name: name,
      formData: params(data),
      success(res) {
        if (res.statusCode !== 200) {
          errToast(isLoad, res.errMsg)
          reject(res)
        }
        resolve(JSON.parse(res.data))
      },
      fail(err) {
        if (err.errMsg.includes('timeout')) {
          errToast(isLoad, '请求超时!')
        } else {
          errToast(isLoad, '网络开了小差!')
        }
        reject(err)
      },
      complete() {
        isLoad && uni.hideLoading()
      }
    })
  })
}
