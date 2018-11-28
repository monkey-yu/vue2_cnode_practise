<template>
  <div class="ArticleSection">
    <div class="loading" v-if="loading">
      loading ...
    </div>
    <div class="article" v-else>
      <h1> {{articleInfo.title}}</h1>
      <ul>
        <li>• 分类: {{postTab}}</li>
        <li>• {{ articleInfo.visit_count }}次访问</li>
        <li>• 发布于:{{ articleInfo.create_at | formatDate }}</li>
        <li>
          • 作者:
          <router-link :to="{ name:'user_info',params:{name:articleInfo.author.loginname }}">{{ articleInfo.author.loginname }}</router-link>
        </li>
      </ul>
      <div id="content" v-html="articleInfo.content"></div>
    </div>
    <div class="reply">
      <div class="replySec" v-for="(reply,index) in articleInfo.replies">
        <div class="replyUp">
          <router-link :to="{name:'user_info',params:{name:reply.author.loginname}}"><img :src="reply.author.avatar_url" alt=""></router-link>
          <router-link :to="{name:'user_info',params:{name:reply.author.loginname}}">{{reply.author.loginname}}</router-link>
          <span>
            {{index +1}} 楼
          </span>
        </div>
        <section v-if='reply.ups.length > 0' class='thumbsClass'>
          <span>❤ </span>{{reply.ups.length}}
        </section>
        <p v-html="reply.content"></p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'Article',
    data(){
      return{
        loading:false,
        articleInfo:{}
      }
    },
    computed:{
      postTab(){
        var type =this.articleInfo.tab.toString();
        if( type = 'ask'){
          return '问答'
        }else if(type = 'share'){
          return '分享'
        }else if(type = 'job'){
          return '招聘'
        }else if(type = 'good'){
          return '精华'
        }else{
          return ''
        }
      }
    },
    methods:{
      getData:function () {
        this.$http({
          url:`https://cnodejs.org/api/v1/topic/${this.$route.params.id}?mdrender=true`,
          method:'get'
        })
          .then((res)=>{
            this.articleInfo = res.data.data;
            this.loading =false
          })
          .catch(err => console.log(err))
      }
    },
    beforeMount(){
      this.loading = true;
      this.getData();
    },
    watch:{
      $route(){
        this.getData();
      }
    }
  }
</script>
<style>
  /*scoped属性导致css仅对当前组件生效，而html绑定渲染出的内容可以理解为是子组件的内容，子组件不会被加上对应的属性，所以不会应用css.
  解决的话把scoped属性去掉就行了*/
  @import url("../assets/markdown-github.css");
  .ArticleSection {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    width: 70%;
    border: 1px solid #ddd;
    padding: 0.8rem 0.4rem;
    margin-left: 3%;
  }
  .ArticleSection #content {
    padding: 2rem 1rem 2rem 1rem;
    line-height: 1.6;
    padding-bottom: 1rem;
  }
  .ArticleSection > h1 {
    font-size: 0.1rem;
  }
  .article {
    background: white;
    margin-bottom: 10px;
    padding-left: 20px;
    padding-top: 10px;

  }
  .article h1 {
    font-size:1.2rem;
    font-weight: 600;
  }
  .article >ul li {
    display: inline-block;
    font-size:0.8rem ;
    color:#a8a3a3 ;
    padding-left: 5px;
  }
  .article li a {
    color: inherit;
    text-decoration: none;
  }
  .replySec {
    box-sizing: border-box;
    border-bottom: 1px solid #C0CCDA;
    width: 100%;
    padding: 1rem;
    background: white;
  }
  #reply {
    display: flex;
    flex-direction: column;
  }
  .replyUp {
    display: inline-block;
  }
  .replyUp span {
    display: inline-block;
    vertical-align: top;
    margin-top: 7px;
    margin-left: 6px;
    font-size: 14px;
    color: #806767;
  }
  .thumbsClass {
    float: right;
  }
  .replyUp > a{
    color: black;
    text-decoration: none;
    font-weight: 600;
  }
  .replyUp a:nth-of-type(2) {
    margin-left: -14px;
    vertical-align: super;
  }
  .thumbsClass  {
    color: red;
  }
  .replySec > p {
    padding-left: 50px;
    clear: both;
  }
  .replySec img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
  }
  .replySec p img {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
