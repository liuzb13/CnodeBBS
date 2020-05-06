<template>
  <div id="Header">
    <router-link :to="{name:'root'}">
      <img src="../assets/cnodejs_light.svg" />
    </router-link>

    <span>关于</span>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
#Header {
  height: 50px;
  background: rgb(90, 85, 85);
}
img {
  max-width: 120px;
  margin-left: 50px;
  margin-top: 10px;
}
span {
  font-size: 20px;
  float: right;
  margin-right: 50px;
  margin-top: 10px;
  color: white;
}
</style>