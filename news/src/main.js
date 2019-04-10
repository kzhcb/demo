import Vue from 'vue'
import App from './App.vue'
//导入路由
import VueRouter from 'vue-router'
import './libs/mui/css/mui.min.css'
import './libs/mui/css/icons-extra.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Header ,Swipe, SwipeItem } from 'mint-ui'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(MintUI)
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//导入自己的路由模块
import router from './router/index.js'
//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
