<template>
  <div class="artical-background">
    <div class="articalList-pc" v-if="_isMobile">
      <ul class="artical-continer">
        <li v-for="item in articalList" :key="item.id">
          <router-link :to="{name:'userInfo',params:{name:item.author.loginname}}">
            <img :src="img" />
          </router-link>
          <span class="read-data">{{item.reply_count +'::'+ item.visit_count | fomate1}}</span>
          <span class="content">
            <router-link
              :to="{name:'artical-content',params:{id:item.id,name:item.author.loginname}}"
            >{{item.title}}</router-link>
          </span>
          <span class="date">{{item.last_reply_at|fomate2}}</span>
        </li>
      </ul>
    </div>

    <div class="artical-m" v-else>
      <ul class="artical-continer-m">
        <li v-for="item  in articalList" :key="item.id">
          <router-link :to="{name:'userInfo',params:{name:item.author.loginname}}">
            <img :src="img" />
          </router-link>
          <span class="read-data-m">{{item.reply_count +'::'+ item.visit_count | fomate1}}</span>
          <span class="content-m">
            <router-link
              :to="{name:'artical-content',params:{id:item.id,name:item.author.loginname}}"
            >{{item.title}}</router-link>
          </span>
          <span class="date-m">{{item.last_reply_at|fomate2}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "articalList",
  data() {
    return {
      img:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg",
      readNum: "",
      title: "",
      uploadTime: "",
      articalList: []
    };
  },
  methods: {
    getData() {
      axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: { page: 1, limit: 20 }
        })
        .then(res => {
          this.articalList = res.data.data;
          // console.log(this.articalList);
        });
    }
  },
  mounted() {
    this.getData();
    function judegeBrowser() {
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
  },
  filters: {
    fomate1(val) {
      let num = val.split("::");
      let replay_count = num[0];
      let replay_time = num[1];
      return replay_count + "/" + replay_time;
    },
    fomate2(val) {
      let now = new Date();
      let lasted = new Date(val);
      let time = now.getTime() - lasted.getTime();
      time = (time / 1000).toFixed(0);
      if (time < 60) return time + "秒前";
      else if (time < 3600) {
        return (time / 60).toFixed(0) + "分钟前";
      } else if (time < 216000) {
        return (time / 3600).toFixed(0) + "小时前";
      } else {
        return (time / 216000).toFixed(0) + "天前";
      }
    }
  }
};
</script>


<style>
/* .artical-background {
  margin: 10px 50px;
  padding-top: 10px;
} */
.artical-continer {
  margin: 10px 50px;
  padding-top: 10px;
  background: white;
  min-width: 900px;
}
.artical-continer li {
  white-space: nowrap;
  overflow: hidden;
  list-style-type: none;
  padding-bottom: 5px;
  border-bottom: 0.5px rgb(221, 221, 221) solid;
  margin: 0 10px 10px 10px;
  /* background: yellow; */
}
.artical-continer img {
  width: 24px;
  /* width: 10px; */
  margin: 0 10px;
  /* background: blanchedalmond; */
}
.content {
  margin: 6px 10px;
  white-space: nowrap;
  max-width: 600px;
  /* background: blanchedalmond; */
}
.read-data {
  margin: 0 10px;
  font-size: 12px;
  display: inline-block;
  text-align: center;
  width: 80px;
  /* background: chocolate; */
}
.date {
  /* background: darkcyan; */
  float: right;
  margin: 3px 10px;
  font-size: 12px;
}
a {
  text-decoration: none;
}

/* 手机样式 */
/* p:nth-of-type(2) */
.artical-m {
  background: white;
  margin: 2vh 4vw;
}
.artical-continer-m li {
  list-style-type: none;
  border-bottom: 0.5px rgb(221, 221, 221) solid;
  line-height: 2em;
  padding: 1vh 2vw;
  overflow: hidden;
}
.artical-continer-m img {
  height: 5vh;
  object-fit: contain;
  margin: 0 2vw;
}
.read-data-m {
  margin: 0 2vw;
}
.content-m {
  margin: 0 2vw;
  word-wrap: wrap break-word;
}
.date-m {
  float: right;
}
</style>