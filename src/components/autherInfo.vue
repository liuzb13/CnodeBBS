<template>
  <div id="auther-info">
    <div class="auther-info-continer">
      <div class="auther-maininfo">
        <div class="maininfo1">
          <img :src="img" />
          <span>{{autherInfo.loginname}}</span>
        </div>
        <div>{{autherInfo.score}}积分</div>
        <div>注册时间：{{autherInfo.create_at|fomat1}}年前</div>
      </div>
      <div class="auther-reply">
        <div class="auther-reply-title">回复的主题</div>
        <ul class="auther-reply-list">
          <li v-for="item in autherInfo.recent_replies" :key="item.id">
            <router-link
              :to="{name:'artical-content',params:{id:item.id,name:item.author.loginname}}"
            >{{item.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="creat-top">
        <div class="creat-top-title">创建的主题</div>
        <ul class="creat-top-content">
          <li v-for="item in autherInfo.recent_topics" :key="item.id">
            <router-link :to="{name:'artical-content',params:{id:item.id,name:item.author.loginname}}">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      img:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg",
      autherInfo: "",
      _isMobile:true
    };
  },
  methods: {
    getAutherInfo() {
      axios
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.autherInfo = res.data.data;
          console.log(this.autherInfo);
        });
    }
  },
  created() {
    this.getAutherInfo();
  },
  computed:{
  },
  filters: {
    fomat1(val) {
      let startTime = new Date(val);
      let nowTime = new Date();
      let time = nowTime.getTime() - startTime.getTime();
      let year = time / 31104000000;
      year = Math.floor(year);
      return year;
    }
  }
};
</script>

<style scoped>
#auther-info {
  width: 100%;
  background: rgb(221, 221, 221);
}
.auther-info-continer {
  width: 75%;
  margin: 10px auto;
}
.auther-maininfo {
  background: white;
  padding: 10px;
}
.auther-maininfo img {
  height: 50px;
  object-fit: contain;
  margin-right: 10px;
}
.auther-reply {
  background: white;
}
.auther-reply-title {
  background: rgb(248, 247, 247);
  padding: 8px;
  font-size: 13px;
}
/* .auther-reply-list{
	overflow: hidden;
} */
.auther-reply-list li {
  list-style-type: none;
  padding: 8px;
  font-size: 12px;
  color: blueviolet;
  margin: 8px 0;
}
.creat-top {
  background: white;
}
.creat-top-title {
  background: rgb(248, 247, 247);
  padding: 8px;
  font-size: 13px;
}
.creat-top-content li {
  list-style-type: none;
  padding: 8px;
  font-size: 12px;
  color: blueviolet;
  margin: 8px 0;
}
</style>