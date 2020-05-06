<template>
  <div class="side-bar">
    <div class="auther-info">
      <div class="auther-info-1">作者</div>
      <div class="auther-info-2">
        <router-link :to="{name:'userInfo',params:{name:autherData.loginname}}">
          <span>
            <img :src="img" :style="{'width':'50px','height':'50px'}" />
          </span>
          <span>{{autherData.loginname}}</span>
        </router-link>
      </div>
      <div class="auther-info-3">积分：{{autherData.score}}</div>
    </div>
    <div class="lasted-content">
      <div class="lasted-content-title">作者最近主题</div>
      <ul class="lasted-content-main">
        <li v-for="item in lastedTopic" :key="item.id">
          <router-link :to="{name:'artical-content',params:{id:item.id,name:item.author.loginname}}">{{item.title}}</router-link>
          </li>
      </ul>
    </div>
    <div class="auter-reply">
      <div class="auther-reply-title">作者最近回复</div>
      <ul class="auther-reply-content">
        <li v-for="item in lastedReply" :key="item.id">
          <router-link :to="{name:'artical-content',params:{id:item.id,name:item.author.loginname}}" >{{item.title}}</router-link>
         </li>
      </ul>
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
      articalData: "i5ting",
      articalAuthor: "",
      autherData: "",
      lastedTopic: "",
      lastedReply: ""
    };
  },
  methods: {
    getDate() {
      axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`).then(res => {
        this.autherData = res.data.data;
        this.getTopic();
        this.getReplay();
        // console.log(this.autherData);
        // console.log(this.autherData.recent_topics.length);
      });
    },
    getTopic() {
      this.lastedReply = this.autherData.recent_replies.slice(0, 5);
    },
    getReplay() {
      this.lastedTopic = this.autherData.recent_topics.slice(0, 5);
    }
  },
  mounted() {
    this.getDate();
  }
};
</script>

<style scoped>
.side-bar {
  float: right;
  width: calc(30% - 25px);
  margin-right: 25px;
  margin-top: 15px;
}
.auther-info {
  margin: 10px 0;
  margin-top: 0;
  background: white;
}
.auther-info-1 {
  height: 40px;
  background: rgb(248, 247, 247);
  line-height: 40px;
  padding-left: 10px;
  font-size: 12px;
}
.auther-info-2 {
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 10px;
}
.auther-info-2 span {
  margin-right: 10px;
}
.auther-info-2 :last-child {
  color: rgba(112, 108, 108, 0.664);
  font-size: 20px;
}
.auther-info-3 {
  width: 100%;
  height: 30px;
  padding-left: 10px;
  font-size: 12px;
}
.lasted-content {
  margin: 10px 0;
  background: white;
  overflow: visible;
  min-height: 20px;
}
.auter-reply {
  background: white;
}
.lasted-content-title {
  height: 40px;
  background: rgb(248, 247, 247);
  line-height: 40px;
  padding-left: 10px;
  font-size: 12px;
}
.lasted-content-main {
  /* background: yellow; */
  overflow: hidden;
  padding: 1px 0;
}
.lasted-content-main li {
  /* background: blue; */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  list-style-type: none;
  color: rgba(112, 108, 108, 0.664);
  font-size: 12px;
  margin: 10px 10px;
}
.auther-reply-title {
  height: 40px;
  background: rgb(248, 247, 247);
  line-height: 40px;
  padding-left: 10px;
  font-size: 12px;
}
.auther-reply-content {
  /* background: yellow; */
  overflow: hidden;
  padding: 1px 0;
  min-height: 20px;
}
.auther-reply-content li {
  /* background: blue; */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  list-style-type: none;
  color: rgba(112, 108, 108, 0.664);
  font-size: 12px;
  margin: 10px 10px;
}
</style>