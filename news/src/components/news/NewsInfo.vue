<template>
    <div class="newsinfo">
        <h1>这是第{{id}}条新闻</h1>
    </div>
</template>
<script>
export default {
    name:'newsinfo',
    data(){
        return{
            id: this.$route.params.id
        }
    }
}
</script>
<style scoped>

</style>
