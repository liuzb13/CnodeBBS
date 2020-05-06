<template>
  <div :id="_isMobile?'artical-continer':'artical-continer-m'">
    <div class="artical-title">
      <div class="artical-title-content">{{artical.title}}</div>
      <div class="artical-title-foot">
        <ul>
          <li>• 分类:{{articalTag}}</li>
          <li>• {{artical.visit_count}}次访问</li>
          <li>• 发布于{{artical.create_at|fomat1}}</li>
          <li>• 作者:{{artical.author.loginname}}</li>
        </ul>
      </div>
    </div>
    <div id="content" v-html="articalContent"></div>
    <div class="fill1"></div>
    <div class="reply" v-if="artical.replies.length">
      <ul>
        <li v-for="(item,index) in artical.replies" :key="item.id">
          <div class="reply-title">
            <img :src="img" />
            <span>{{item.author.loginname}}</span>
            <span>{{index +1}}楼</span>
            <span v-if="item.ups.length">❤ {{item.ups.length}}</span>
          </div>
          <div class="reply-content" v-html="item.content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
require("../assets/markdown-github.css");

export default {
  name: "artical",
  data() {
    return {
      img:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg",
      articalId: "https://cnodejs.org/api/v1/topic/5e16978581adfe260207a8c1",
      autherId: "i5ting",
      articalContent: "",
      artical: {
        author: {
          loginname: "temp"
        },
        replies: []
      }
    };
  },
  computed:{
    articalTag() {
      let str = this.artical.tab;
      switch (str) {
        case "ask":
          return "问答";
          break;
        case "share":
          return "分享";
          break;
        case "job":
          return "招聘";
          break;
        case "good":
          return "精华";
          break;
      }
    },
   _isMobile: {
     get(){
       let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return !flag;
     },
      set(){}
    }
  },
  watch: {
    $params() {
      this.getArtical();
    }
  },
  methods: {
    getArtical() {
      Axios.get(
        `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
      ).then(res => {
        this.articalContent = res.data.data.content;
        this.artical = res.data.data;
        // console.log(this.artical);
      });
    }
  },
  created(){
    this.getArtical();
    this._isMobile = !navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
  },
  filters: {
    fomat1(val) {
      let now = new Date();
      let lasted = new Date(val);
      let time = now.getTime() - lasted.getTime();
      time = (time / 1000).toFixed(0);
      // console.log(time);
      if (time < 60) return time + "秒前";
      else if (time < 3600) {
        return Math.floor(time / 60) + "分钟前";
      } else if (time < 86400) {
        return Math.floor(time / 3600) + "小时前";
      } else if (time < 2592000) {
        return Math.floor(time / 86400) + "天前";
      } else {
        return Math.floor(time / 2592000) + "月前";
      }
    }
  },
  watch: {
    $route() {
      this.getArtical();
    }
  }
};
</script>

<style>
@import "../assets/markdown-github.css";

.artical-title-content {
  font-size: 19px;
  font-weight: bold;
  margin: 12px 0;
}
#artical-continer {
  margin: 15px 10px 15px 25px;
  padding: 20px;
  padding-bottom: 0;
  box-sizing: border-box;
  overflow: hidden;
  width: calc(70% - 35px);
  float: left;
  background: white;
}
.artical-title-foot li {
  display: inline-block;
  font-size: 0.8rem;
  color: #a8a3a3;
  padding-left: 8px;
  list-style-type: disc;
}
.reply {
  margin: 10px 0;
  background: white;
}
.reply li {
  border-bottom: 1px solid rgb(221, 221, 221);
  /* background: rgb(146, 146, 155); */
  overflow: hidden;
}
.reply li:last-of-type {
  border: 0;
}
.reply-title {
  margin: 20px 10px 20px 10px;
}
.reply-title img {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}
.reply-title span:first-of-type {
  margin-right: 10px;
}
.reply-title span:nth-of-type(2) {
  margin-right: 10px;
}
.reply-title span:nth-of-type(3) {
  float: right;
  margin-right: 10px;
  color: red;
}
.reply-content {
  margin: 20px 50px;
}
.reply-content img {
  width: 100%;
}
.fill1 {
  height: 10px;
  width: 120%;
  transform: translateX(-10%);
  background: rgb(221, 221, 221);
}
#artical-continer-m{
  box-sizing: border-box;
  padding: 0 2vw;
  background: white;
  width: 61vw;
  margin-left: 3vw;
  margin-top: 2vh;
  float: left;
}
</style>