<template>
    <div class="home">
      <!-- 轮播图 -->
      <div class="lunbotu">
        <mt-swipe :auto="1500">
          <mt-swipe-item v-for="item in lunbotulist" :key="item.id">
            <img :src="item.url">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 九宫格到六宫格 -->
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <router-link to="/home/newslist">
		                    <img src="../../static/news.jpg" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <a href="#">
		                    <img src="../../static/share.jpg" alt="">
		                    <div class="mui-media-body">图片分享</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <a href="#">
		                    <img src="../../static/shop.jpg" alt="">
		                    <div class="mui-media-body">商品购买</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <a href="#">
		                     <img src="../../static/comment.jpg" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <a href="#">
		                   <img src="../../static/video.jpg" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <a href="#">
		                   <img src="../../static/contact.jpg" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    name:'home',
    data(){
      return{
         lunbotulist:[]
      }
    },
      created() {
      this.getlunbotu()
    },
    methods: {
      getlunbotu(){
        this.$http.get('http://47.100.38.224/api/api2.php').then(result => {
          console.log(result.body)
          if(result.body!==''){
            this.lunbotulist=result.body
          }else{
            Toast ('获取图片失败！')
          }
        } )
      }
    },
  
}
</script>
<style scoped>
.lunbotu{
  height: 200px;
}
.mui-grid-9{
  background-color: #fff;
  border: none;
}
  .mui-bar-tab{
    border-top:1px  solid #c1c9d1;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    margin: 0;
    padding: 11px 15px;
    vertical-align: top;
   border: none;
   font-size: 15px;
   font-family: Arial, Helvetica, sans-serif;
}
.lunbotu img{
  width: 100%;
  height: 200px;
}
.mui-col-sm-3 img{
  width: 60px;
  height:60px;
  border-radius: 50%;
}
</style>
