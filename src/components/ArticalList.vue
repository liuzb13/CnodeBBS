<template>
  <div class="artical-background">
    <ul class="artical-continer">
      <li v-for="item in articalList" :key="item.id">
        <router-link :to="{name:'userInfo',params:{name:item.author.loginname}}"><img :src="img" /></router-link> 
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
.artical-background {
  background: white;
  margin: 10px 50px;
  padding-top: 10px;
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
</style>