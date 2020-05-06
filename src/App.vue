<template>
  <div id="app">
    <Header></Header>
    <router-view name='main'></router-view>
    <router-view name='side'></router-view>
  </div>
</template>





<script lang="ts">
import Header from './components/Header.vue'
export default {
  name:'app',
  components:{
    Header,
  }
}
</script>




<style>
@import "./assets/markdown-github.css";
*{
  margin: 0;
  padding: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
#app{
  background: rgb(221, 221, 221);
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: hidden;
}
</style>
