 <template>
     <div class="home">
         <div class="container">
             <h1 class="title">在线管理</h1>
             <p class="lead">专注于线上的教育，用心做课程，用心做服务！</p>
         </div>
     </div>
 </template>
 
 <script>
 export default {
    name:'home'
 }
 </script>
 
 <style scoped>
 .home{
     width: 100%;
     height: 1080px;
     background: url(../assets/content.jpg) no-repeat;
     background-size:100% 100%;
 }
 .container{
     width: 100%;
     height: 100%;
     box-sizing: border-box;
     padding-top: 100px;
     background-color: rgba(0, 0, 0, 0.7);
     text-align: center;
     color: #fff;
 }
  .lead{
      margin-top: 50px;
      margin-left: -60px;
      font-size: 22px;
  }
  .title{
      font-size: 30px;
      margin-left: -60px;
  }

 </style>
 