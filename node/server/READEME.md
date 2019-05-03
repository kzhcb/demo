## node express 搭建本地服务器

1. 下载 express 和安装 node
   `npm install express`
2. 在根目录创建一个 server.js 文件
3. 在 server.js 里面写入口文件配置
   ` const express = require("express"); //引入express
     const app = express(); // 创建app实例

     app.get("/", (req, res) => {
     res.send("hello world");
     });
     const port = process.env.PORT || 5000; // 定义端口号

     app.listen(port, () => {
     console.log(`server running on port:${port} `);
     }); //监听端口
        `
