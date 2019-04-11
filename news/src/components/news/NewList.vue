<template>
    <div class="news">
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo' + item.id">	<img class="mui-media-object mui-pull-left" :src="item.bgurl">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                 <span>发表时间：{{item.datas}}</span>
                   <span>点击:{{item.times}}次</span>                                 
             </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    name :'news',
    data(){
        return{
            newslist:[]
        }
    },
     created() {
        this.getnewslist()
    },
    methods:{
       getnewslist(){
            this.$http.get('http://47.100.38.224/api/api1.php').then(result=>{
              console.log(result)
          if(result.status===200){
            this.newslist=result.body
          }else{
            Toast ('获取图片失败！')
          }
        } )
       }
    },
   
}
</script>
<style scoped>
.mui-table-view li h1{
   font-size: 14px;
}
.mui-ellipsis{
    font-size: 12px;
    color: #226af2;
    display: flex;
    justify-content: space-between;
}
img{
  border-radius: 3px;
}
</style>
