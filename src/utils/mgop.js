import { mgop } from '@aligov/jssdk-mgop'

/* 错误提示 */
const errToast = (isLoad, err) => {
  isLoad && uni.hideLoading()
  uni.showModal({
    title: '温馨提示',
    content: err
  })
}

/* 获取id */
const getId = () => {
  if (uni.getStorageSync('userInfo')) {
    return JSON.parse(uni.getStorageSync('userInfo')).m
  }
  return ''
}

/**
 * 封装接口
 * @param {String} url
 * @param {Object} data 参数
 * @param {Boolean} isLoad 是否显示加载提示框
 * @param {String} method 请求方式
 * @return {Promise}
 */
export const zlbmgop = (url, data, isLoad = true, method = 'GET') => {
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
    mgop({
      api: url, // 必须
      host: 'https://mapi.zjzwfw.gov.cn/',
      dataType: 'JSON',
      type: method,
      appKey: '6xxfslcv+200600801+tlkciqg', // 必须
      data: params(),
      timeout: 5000,
      onSuccess: res => {
        isLoad && uni.hideLoading()
        if (res.code != 1000) {
          errToast(isLoad, res.message)
          reject(res)
        }
        resolve(res.data)
      },
      onFail: err => {
        isLoad && uni.hideLoading()
        errToast(isLoad, '网络开了小差!')
        erject(err)
      }
    })
  })
}
