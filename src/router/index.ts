
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import articalList from '../components/ArticalList.vue'
import artical from '../components/Artical.vue'
import autherInfo from '../components/autherInfo.vue'
import sideinfo from '../components/sideInfo.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'root',
    components: {
      main: articalList,
      // side:sideinfo
    }
  },
  {
    path: '/topic/:id&auther=:name',
    name: 'artical-content',
    components: {
      main: artical,
      side: sideinfo
    }
  },
  {
    path: '/user/:name',
    name: 'userInfo',
    components: {
      main: autherInfo
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
