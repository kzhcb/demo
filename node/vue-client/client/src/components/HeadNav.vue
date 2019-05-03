 <template>
  <header class="headnav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.jpg" class="logo">
        <span class="title">在 线 后 台 管 理 系 统</span>
       </el-col>
     <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
              <el-dropdown trigger="click" @command="setDialogInfo">
                <span class="el-dropdown-link">
                   <i class="el-icon-caret-bottom  el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
 
 <script>
export default {
  name: "headnav",
  computed: {
      user(){
          return this.$store.getters.user;
      }
  },
  methods: {
      setDialogInfo(cmdItem){
        //  console.log(cmdItem)
        switch(cmdItem){
            case  'info':
            this.showInfoList();
            break;
            case  'logout':
            this.logout();
            break;
        }
      },
      showInfoList(){
         this.$router.push('/infoshow')
      },
      logout(){
        //   console.log('退出')
        //清除token
        localStorage.removeItem('eleToken')
        //设置vuex store
        this.$store.dispatch("clearCurrentState")
        //跳转
        this.$router.push('/login')
      }
  },
};
</script>
 
 <style scoped>
.headnav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container{
    min-width: 400px;
    line-height: 60px;
}
.logo{
    width: 40px;
    height: 40px;
    margin-right: 5px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
}
.title{
    vertical-align: middle;
    text-align: center;
    font-size: 18px;
    font-family: 'Microsoft YaHei';
    font-weight: 600
}
.user{
    float: right;
    display: inline-block;
}
.userinfo{
    display: flex;
    margin-top: 10px;
    margin-left: 60%;
}
.welcome{
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding:  0 5px;
}
.avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
}
.name{
    line-height: 20px;
    text-align: center;
    font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username{
    cursor: pointer;
    margin-right: 5px;
}
.el-dropdown{
    color: #fff;
    line-height: 40px;
}

</style>
 