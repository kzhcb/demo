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
        article: {
            
        }
      }
    },
      methods: {
      saveArticle() {
        this.$http.post('/articles',this.article).then(res => {
             this.$message({
                message: '添加文章成功！',
                type: 'success'
              });
              this.$router.push('/articles/index')
        })
      },
      goback(){
        this.$router.push('/articles/index')
      }
    }
}
</script>

<style>

</style>
