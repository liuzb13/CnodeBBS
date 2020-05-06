<template>
  <div :id="_isMobile?'Header':'Header-m'">
    <router-link :to="{name:'root'}">
      <img src="../assets/cnodejs_light.svg">
    </router-link>

    <span>关于</span>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return {

    }
  },
  created(){
     function judegeBrowser(){
      _isMobile = !navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
    }
  },
   computed: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return !flag;
    }
  }
};
</script>

<style scoped>
#Header{
  height: 50px;
  background: rgb(90, 85, 85);
}
#Header img {
  max-width: 120px;
  margin-left: 50px;
  margin-top: 10px;
}
#Header span {
  font-size: 20px;
  float: right;
  margin-right: 50px;
  margin-top: 10px;
  color: white;
}


#Header-m{
  height: 8vh;
  background: rgb(90, 85, 85);
  overflow: hidden;
}
#Header-m img{
  height:4vh;
  object-fit: contain;
  margin-left: 5vw;
  margin-top: 1.5vh;
}
#Header-m span{
  float: right;
  margin-right: 5vw;
  font-size: 3vh;
  color: white;
  margin-top: 2.5vh;
}
</style>