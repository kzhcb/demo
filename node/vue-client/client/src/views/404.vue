<template>
    <div class="notfound">
        <img src="../assets/404.gif" alt="">
        <div class="button-back">
            <router-link to="/index"><el-button type="info">返回首页</el-button></router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:'notfound'
}
</script>
<style scoped>
.notfound{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.notfound img{
    width: 100%;
    height: 100%;
}
.button-back {
    position: absolute;
    top: 75%;
    left: 43%;
}
.button-back .el-button{
    width: 200px;
    background-color: skyblue;
    border: none;
}
</style>
