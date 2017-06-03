<template>
  <div class="contain-with-aside">
    <nav-aside></nav-aside>
    <section class="draft-list-col">
      <post-list></post-list>
    </section>
    <div class="draft-edit">
        <article-editor v-if="currentId"></article-editor>
    </div>

    
  </div>
</template>

<script>
import NavAside from './common/NavAside'
import ArticleEditor from './common/ArticleEditor'
import PostList from './common/PostList'

import{
  mapGetters,
  mapActions
}from 'vuex'




export default {
  components:{
    NavAside,
    PostList,
    ArticleEditor
  },
  computed:{...mapGetters(['currentId'])
  },
  methods:{...mapActions(['getAllDrafts'])
},
  watch:{
    '$router':'getAllDrafts'
  },
  mounted(){
    this.getAllDrafts()
  }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus'>
  .container-with-aside{
    // margin-left: 70px;
    height: 100%;
  }
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

</style>