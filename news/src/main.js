import Vue from 'vue'
import App from './App.vue'
//导入路由
import VueRouter from 'vue-router'
import './libs/mui/css/mui.min.css'
import './libs/mui/css/icons-extra.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Header } from 'mint-ui'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(MintUI)
Vue.component(Header.name, Header);
//导入自己的路由模块
import router from './router/index.js'
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
