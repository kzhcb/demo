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

