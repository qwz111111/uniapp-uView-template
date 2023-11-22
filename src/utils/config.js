let realUrl = ''
// #ifdef H5
realUrl = '/api'
// #endif

// #ifndef H5
// 小店经济
realUrl = process.env.VUE_APP_API_URL
// #endif

export const baseURL = realUrl
