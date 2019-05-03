<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
  name: "app",

  created() {
    var deviceheight = window.screen.height;
    var devicewidth = window.screen.width;
    this.height = deviceheight;
    this.width = devicewidth;
    if (localStorage.eleToken) {
      const decoded = jwt_decode(localStorage.eleToken);
      //token存储到vuex中
      this.$store.dispatch("isAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
 
<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
