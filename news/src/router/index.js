import VueRouter from 'vue-router'
import Member from '../components/tabaar/Member.vue'
import Home from '../components/tabaar/Home.vue'
import Shopcar from '../components/tabaar/Shopcar.vue'
import Search from '../components/tabaar/Search.vue'
var router = new VueRouter({
    routes:[
      {path:'/',redirect:'/Home'},
      {path:'/home',component:Home},
      {path:'/member',component:Member},
      {path:'/shopcar',component:Shopcar},
      {path:'/search',component:Search}
    ],
    mode:'history',
})
export default router


