<template>
    <div class="home">
      <!-- 轮播图 -->
      <div class="lunbotu">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="item in lunbotulist" :key="item.url"><img :src="item.url" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <h1>home</h1>
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
    methods: {
      getlunbotu(){
        this.$http.get('http://www.cqkzms.top/aa.php').then(result => {
          if(result.body.state===0){
            this.lunbotulist=result.body.message
          }else{
            Toast ('获取图片失败！')
          }
        } )
      }
    },
    created() {
      this.getlunbotu()
    },
}
</script>
<style scoped>
.lunbotu{
  height: 200px;
 
}
.mint-swipe{
  background-color:pink;
}
</style>
