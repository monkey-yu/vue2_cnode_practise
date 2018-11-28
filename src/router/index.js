import Vue from 'vue'
import Router from 'vue-router'
import PostList from './../components/PostList'
import UserInfo from './../components/UserInfo'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes:[
    {
      path:'/',
      name:'root',
      components:{
        main:PostList
      }
    },
    {
      path:'user/:name',
      name:'user_info',
      components:{
        main:UserInfo
      }
    },

  ]
})
