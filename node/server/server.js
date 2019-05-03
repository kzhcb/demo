const express = require("express"); //引入express
const app = express(); // 创建app实例
app.use(require('cors')())
app.use(express.json());
const mongoose = require("mongoose");
const passport = require("passport");
//引入body-parser
const bodyParser = require("body-parser");
//引入users.js
const users = require("./routes/api/users");
//引入profile.js
const profiles = require("./routes/api/profiles");

//使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//连接数据库
const db = require("./config/keys").mongoURL;
mongoose
  .connect(db)
  .then(() => {
    console.log("mongdb connected");
  })
  .catch(err => console.log(err));

//初始化passport
app.use(passport.initialize());
require('./config/passport')(passport);
const port = process.env.PORT || 5000; // 定义端口号
//使用routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.listen(port, () => {
  console.log(`server running on port:${port} `);
}); //监听端口
