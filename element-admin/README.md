## 一个后台添加文章的简单demo
### 所使用的技术包括以下
1. vue
2. vue-router
3. axios
4. express
5. mongodb数据库
6. mongoose中间件
7. element-ui
## 具体流程
1. 先用脚手架新建一个vue项目（选择自定义安装，需要babel、vue-router、eslint）
2. 安装完成的时候，cd到项目目录下，然后安装element-ui组件库（vue add element-ui即可） 
3. 删除不必要的组件，留有App根组件，main.js入口文件
4. 在views文件夹下新建三个组件，用于后台页面的显示（这里demo不大，所以直接新建文件，不考虑用文件夹方式再建文件）
5. CreateArticle组件
```vue
<template>
    <div class="createlist">
    <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
<el-form-item label="文章标题">
    <el-input v-model="article.title"></el-input>
</el-form-item>
<el-form-item label="文章内容">
    <el-input type="textarea" v-model="article.body" placeholder="请输入文章内容（最多500字）"></el-input>
</el-form-item>
<el-form-item>
    <el-button type="primary" native-type="submit">立即创建</el-button>
    <el-button @click="goback">取消</el-button>
</el-form-item>
</el-form>
    </div>
</template>
<script>
export default {
name:'createlist',
    data() {
    return {
        //定义一个article对象，用于用户输入的文章内容和标题保存到此对象中
        article: {
          
        }
    }
    },
    methods: {
        //保存文档方法
    saveArticle() {
        // 后台写的保存文章的api，通过post方法传给后台，在保存到服务器中
        this.$http.post('/articles',this.article).then(res => {
            this.$message({
                message: '添加文章成功！',
                type: 'success'
            });
            // 保存成功后，返回到文章列表首页，显示出数据库中的所有文章
            this.$router.push('/articles/index')
        })
    },
    goback(){
        //取消按钮的返回方法，同样返回到文章列表首页
        this.$router.push('/articles/index')
    }
    }
}
</script>

<style>

</style>
```



1. ListArticle组件

    ```vue
     <template>
                <div class="articlelist">
                <el-table :data="articles">
                    <el-table-column prop="title" label="标题" width="140">
                    </el-table-column>
                    <el-table-column prop="body" label="内容" width="220">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
                        <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                </div>
            </template>
    
            <script>
            export default {
            name:'articlelist',
                data() {
                return {
                    //定义一个article数组，用于存储从数据库中获得数据
                    articles:[]
                }
                },
                created(){
                    // 页面挂挂载之前调用fetch方法获取数据
                this.fetch()
                },
                methods:{
                fetch(){
                    this.$http.get('articles').then(res =>{
                    this.articles = res.data
                })
                },
                //根据所传文章的id值对文章进行编辑，跳转到编辑页面（id）
                edit(id){
                    this.$router.push(`/articles/${id}/edit`)
                },
                //根据所传id值，删除文章
                remove(id){
                    this.$http.delete(`articles/${id}`).then( res => {
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                        // 删除成功后调用这个方法重新获得数据，动态渲染页面
                        this.fetch()
                    });
                }
                }
            }
            </script>
    
            <style>
    
            </style>
    ```

 2. EditArticle组件


     ```vue
     <template>
                 <div class="articlelist">
                 <el-table :data="articles">
                     <el-table-column prop="title" label="标题" width="140">
                     </el-table-column>
                     <el-table-column prop="body" label="内容" width="220">
                     </el-table-column>
                     <el-table-column
                     fixed="right"
                     label="操作"
                     width="100">
                     <template slot-scope="scope">
                         <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
                         <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
                     </template>
                     </el-table-column>
                 </el-table>
                 </div>
             </template>
     
             <script>
             export default {
             name:'articlelist',
                 data() {
                 return {
                     //定义一个article数组，用于存储从数据库中获得数据
                     articles:[]
                 }
                 },
                 created(){
                     // 页面挂挂载之前调用fetch方法获取数据
                 this.fetch()
                 },
                 methods:{
                 fetch(){
                     this.$http.get('articles').then(res =>{
                     this.articles = res.data
                 })
                 },
                 //根据所传文章的id值对文章进行编辑，跳转到编辑页面（id）
                 edit(id){
                     this.$router.push(`/articles/${id}/edit`)
                 },
                 //根据所传id值，删除文章
                 remove(id){
                     this.$http.delete(`articles/${id}`).then( res => {
                         this.$message({
                             message: '删除成功！',
                             type: 'success'
                         });
                         // 删除成功后调用这个方法重新获得数据，动态渲染页面
                         this.fetch()
                     });
                 }
                 }
             }
             </script>
     
             <style>
     
             </style
     ```

3. App根组件（主要是页面，不多说）

    ```vue
     <template>
            <div id="app">
                <el-container style="height: 100vh; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu router :default-openeds="['1']">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-tickets"></i>内容管理
                    </template>
                    <el-menu-item index="/articles/index">文章列表</el-menu-item>
                    <el-menu-item index="/articles/create">文章管理</el-menu-item>
                </el-submenu>
                </el-menu>
            </el-aside>
            
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span></span>
                </el-header>
                
                <el-main>
                <router-view></router-view>
                </el-main>
            </el-container>
            </el-container>
    
            </div>
            </template>
    
            <script>
            export default {
            
            };
            </script>
    
            <style>
            .el-header {
                background-color: #B3C0D1;
                color: #333;
                line-height: 60px;
            }
            
            .el-aside {
                color: #333;
            }
            html,body{
                margin:0 ;
                padding: 0;
            }
            </style>
    ```

    

4. main.js入口文件(这里引入了一些第三方插件，而且对axios进行处理，后面组件获取数据或者post数据不用写大长串的地址 )

   ```vue
   import Vue from 'vue'
           import App from './App.vue'
           import router from './router'
           import './plugins/element.js'
           Vue.config.productionTip = false
           import axios from 'axios'
           Vue.prototype.$http = axios.create({
           baseURL:'http://localhost:3001/api'
   
           })
           new Vue({
           router,
           render: h => h(App)
           }).$mount('#app')
           ` 
           10. router.js
           ` import Vue from 'vue'
           import Router from 'vue-router'
           import ListArticle from './views/ListArticle.vue'
           import CreateArticle from './views/CreateArticle.vue'
           import EditArticle from './views/EditArticle.vue'
           Vue.use(Router)
   
           export default new Router({
           routes: [
               {
               path: '/',
               name: 'home',
               redirect:'/articles/index'
               },
               {
               path: '/articles/index',
               name: 'list-article',
               component:ListArticle
               },
               {
               path: '/articles/create',
               name: 'create-article',
               component:CreateArticle
               },
               {
               path: '/articles/:id/edit',
               name: 'edit-article',
               component:EditArticle
               }
           ]
           })
   ```

   


### 后台编写（为了方便，而且demo不复杂，就在该项目目录下创建一个server文件夹，在server里面新建一个index.js文件

1. 安装express、mongoose（操作mongodb的中间件）cors（允许跨域）

  ```node
  npm i express@next mongoose cors
  ```

2. 编写index.js文件

    ```vue
     const express = require('express') // 引入express
        const app =express() //定义一个express实例app 
        app.use(require('cors')())//允许跨域
        app.use(express.json())//能够解析json数据格式
        const mongoose = require('mongoose')//引入mongoose
        //通过mongoose中间件链接数据库
        mongoose.connect('mongodb://localhost:27017/element-admin',{
            useFindAndModify:true,
            useNewUrlParser:true, 
            useCreateIndex:true,
        })
        //定义文章的模型
        const Article = mongoose.model('Article',new mongoose.Schema({
            title:{ type : String},
            body:{ type : String},
        }))
        //新增文章接口
        app.post('/api/articles',async(req,res) => {
        const article = await Article.create(req.body)
        res.send(article)
        })
        //显示文章列表的接口
        app.get('/api/articles',async(req,res) => {
            const articles = await Article.find()
            res.send(articles)
        })
        //删除文章接口
        app.delete('/api/articles/:id',async(req,res) => {
        await Article.findByIdAndDelete(req.params.id)
            res.send({status:true})
        })
        //文章详情接口
        app.get('/api/articles/:id',async(req,res) => {
            const article = await Article.findById(req.params.id)
            res.send(article)
        })
        //修改文章接口
        app.put('/api/articles/:id',async(req,res) => {
            const article = await Article.findByIdAndUpdate(req.params.id,req.body)
            res.send(article)
        })
        // 定义默认访问
        app.get('/',async(req,res) => {
            res.send('index')
        })
        //监听3001端口
        app.listen(3001,() => {
        console.log('http://localhost:3001/')
        }) `
    ```

    

## 运行效果图

![](.\show.png)