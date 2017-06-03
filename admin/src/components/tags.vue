<template>
  <div class="container-with-aside" >
    <nav-aside></nav-aside>
    <section class="draft-list-col">
      <h3 class="page-title" style="margin:10px 20px 0 " v-if="null===tagActive" >
        <i class="fa fa-tag icon-font" aria-hidden="true" >
        </i>搜索标签
      </h3>
      <ul class="clearfix reset-list tag-list" v-if="null!==tagActive" >
        <li class="tag active">
          <span v-show="!tagActive['editing']"  >{{tagActive['name']}}</span>
          <i class="fa fa-times icon-font" aria-hidden="true" v-show="!tagActive['editing']" @click="blurTag()"></i>          
          <i class="fa fa-pencil icon-font" aria-hidden="true" v-show="!tagActive['editing']" @click="modifyTag(tagActive)"></i>
          <i class="fa fa-trash icon-font" aria-hidden="true" v-show="!tagActive['editing']" @click="deleteTag(tagActive)" style="vertical-align:1px;" ></i>
          <input type="text" class="tag-input" v-if="tagActive['editing']" v-model="tagActive['newName']" placeholder="按确认键提交" @keyup.13="saveTag(tagActive)" style="border:1px solid black" >
        </li>
      </ul>
      <ul class="clearfix reset-list tag-list" v-show="(tags.length !== 1 || tagActive == null)"  >
        <li class="tag" v-for="tag in tags" v-show="tag !== tagActive">
          <span @click="searchTag(tag)" style="cursor:pointer" v-show="!tag['editing']">{{tag['name']}}</span>
        </li>  
      </ul>
      <post-list></post-list>
    </section>
    <div class="draft-edit">
      <article-editor v-if="currentId"></article-editor>
    </div>


  
  </div>
</template>

<script>
import ArticleEditor from './common/ArticleEditor'
import NavAside from './common/NavAside'
import PostList from './common/PostList'

import {
  mapGetters,
  mapActions
} from 'vuex'

import api from '../api'


export default {
  
  data () {
    return {
      tagActive:null,
      tags:[]
    }
  },
  components:{
    PostList,
    ArticleEditor,
    NavAside
  },
  computed:{
    ...mapGetters(['currentId'])
  },
  methods:{
    ...mapActions(['getAllDrafts']),
    searchTag(tag){
      this.tagActive=tag
      this.getAllDrafts({
        tags:tag.id
      })
    },
    modifyTag(tag){
      tag.newName=tag.name
      tag.editing=true

    },
    async saveTag(tag){
      if(tag.name === tag.newName || !tag.newName){
        tag.editing=false
        return
      }
      try {
        const res=await api.modifyTag(tag.name,tag.newName)
        if(res.success){
          tag.name=tag.newName
          tag.editing=false
        }else window.alert('Tag duplicated')

      } catch (e) {
        window.alert(e)
      }

    },
    async deleteTag(tag){
      const res=await api.deleteTag(tag.name)
      if(res.success){
        if(this.tagActive === tag){
          this.getAllDrafts()
          this.tagActive=null
        }
        this.tags.splice(this.tags.indexOf(tag),1)
      }
    },
    blurTag(){
      this.tagActive=null
      this.getAllDrafts()
    },
    async fetchAllTags(){
      try {
        const res=await api.getAllTags()
        if(res.success){
          res.data.forEach(i =>{
            i.newName=''
            i.editing=false
          })
          this.tags=res.data
          this.getAllDrafts()

        }
      } catch (e) {
        window.alert(e)
      }
    }



  },
  watch:{
    '$route':'fetchAllTags'
  },
  mounted(){
    this.fetchAllTags()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.draft-list-col{
    margin-left: 72px;
    float: left;
    border-right: 1px solid #ECECEC;
    height: 100%;
    // width:30%;
    max-width: 320px;
    overflow-y: auto;
  }
 
  .draft-edit{
    overflow: auto;
    height: 100%;
  }
  .tag-list {
    padding: 8px 20px;
    margin: 0;
    list-style: none;
    border-bottom: 1px solid #d1dbe5; 
  }
  li.tag{
    // font-size: 18px;
    // line-height: 18px;
    margin: 8px 0px;
  }
  .fa{
    cursor: pointer;
    }
</style>