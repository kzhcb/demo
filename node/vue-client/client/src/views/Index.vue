<template>
  <div class="index" :style="{height: height + 'px'}">
    <HeaNav/>
    <Left/>
    <div class="rightContainer">
      <router-view/>
    </div>   
  </div>
</template>
<script>
import HeaNav from "../components/HeadNav.vue";
import Left from "../components/Left.vue";
export default {
  name: "index",
  components: {
    HeaNav,
    Left
  },
    data() {
      return {
          height:0,
      }
  },
  created() {
      const deviceheight=window.screen.height
      this.height=deviceheight
  },

};
</script>
<style scoped>
.index{
    width: 100%;
    overflow: hidden;
}
.rightContainer{
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100%-180px);
  height: calc(100% -71px);
  overflow: hidden;
}
</style>
