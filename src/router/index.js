import Vue from 'vue'
import Router from 'vue-router'
import PostList from './../components/PostList'
import UserInfo from './../components/UserInfo'
import Article from './../components/Article'
import SideBar from './../components/SideBar'

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
      path:'/user/:name',
      name:'user_info',
      components:{
        main:UserInfo
      }
    },
    {
      path:'/topic/:id&author=:name',
      name:'post_content',
      components:{
        main:Article,
        sidebar:SideBar

      }
    }

  ]
})
