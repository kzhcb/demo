import VueRouter from 'vue-router'
import Home from '../components/pages/Home.vue'
import Member from '../components/pages/Member.vue'
import Shopcar from '../components/pages/Shopcar.vue'
import Search from '../components/pages/Search.vue'
var router = new VueRouter({
    routes:[
      {path:'/',redirect:'/Home'},
      {path:'/home',component:Home},
      {path:'/member',component:Member},
      {path:'/shopcar',component:Shopcar},
      {path:'/search',component:Search}
    ],
    linkActiveClass:'mui-active'//覆盖路由高亮的类，默认的类叫做router-link-active
})
export default router