import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
// ios联系触摸放大问题
// #ifdef H5
import './utils/ios.js'
// #endif
Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(uView)

const app = new Vue({
  ...App
})
app.$mount()
