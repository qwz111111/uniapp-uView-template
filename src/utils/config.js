export const real = true

let realUrl = ''
// #ifdef H5
realUrl = '/api/jnfw'
// #endif
// #ifndef H5
realUrl = 'https://szxc.0571ps.com/jnfw'
// #endif
const testUrl = 'http://192.168.1.106:3333'

export const baseURL = real ? realUrl : testUrl
