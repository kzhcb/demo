 <template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">在线信息管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="60px"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>
              还没有账号？现在
              <router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>
 
 <script>
 import jwt_decode from 'jwt-decode'
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "邮箱格式错误!",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空!", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "密码长度在2到20个字符之间!",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
           this.$axios.post('/api/users/login',this.loginUser)
                      .then(res =>{
                     //token存储到localstorage
                      const { token } = res.data;
                      localStorage.setItem('eleToken',token);
                      //解析token
                      const decoded = jwt_decode(token);
                      // console.log(decode)
                      //token存储到vuex中
                      this.$store.dispatch('setAuthenticated',!this.isEmpty(decoded));
                      this.$store.dispatch('setUser',decoded);
                      this.$router.push('/index')
                      })
                      
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value){
      return (
        value===undefined ||
        value===null ||
        (typeof value === "object"&&Object.keys(value).length===0)||
         (typeof value === "string"&&value.trim().length===0)
      );
    }
  }
};
</script>
 
 <style scoped>
.login {
  position: relative;
  width: 100%;
  height: 1080px;
  background: url("../assets/index.jpg") no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 16%;
  left: 39%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  text-decoration: none;
  color: skyblue;
}
</style>
 