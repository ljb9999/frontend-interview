
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  let that = this
  if (to.path == '/login') {
    localStorage.clear(); // 登录页面清楚缓存
  }
  if (to.path == '/' && to.path != '/login') {
    if(localStorage.getItem("token")){
      next()
    }else {
      next({path: 'login'})
    }
  }else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

const innerWidth = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight
const size = innerWidth / 7.50
document.documentElement.style.fontSize = `${size}px`
