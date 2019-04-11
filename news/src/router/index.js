import VueRouter from 'vue-router'
import Member from '../components/tabaar/Member.vue'
import Home from '../components/tabaar/Home.vue'
import Shopcar from '../components/tabaar/Shopcar.vue'
import Search from '../components/tabaar/Search.vue'
import NewList from '../components/news/NewList.vue'
import NewsInfo from '../components/news/NewsInfo.vue'  
var router = new VueRouter({
    routes:[
      {path:'/',redirect:'/home'},
      {path:'/home',component:Home},
      {path:'/member',component:Member},
      {path:'/shopcar',component:Shopcar},
      {path:'/search',component:Search},
      {path:'/home/newslist',component:NewList},
      {path:'/home/newsinfo/:id',component:NewsInfo}
    ],
    mode:'history',
    linkActiveClass:'mui-active'
})
export default router


