<template>

<el-card class="box-card" >
  <div slot="header" class="clearfix page-title">
    <span style="line-height: 36px;"><i class="fa fa-file-text icon-font " aria-hidden="true"></i>文章列表</span>
    <i class="fa fa-plus  draft-add"  aria-hidden="true" @click="newDraft"></i>
  </div>
  <div v-for="(draft,index) in all"  @click="focus(index)" class="text item">
   <article class="draft-thumb" :class="[draft['draftPublished'] ? published : draft['post'] ? 'updated' : '',{'active':draft['id'] === currentId}]" >
        <h3 class="draft-title">{{draft['title']}}</h3>
        <h6 class="draft-time" >{{draft['lastEditTime']}}</h6>
        <p class="draft-content" v-md="draft['excerpt']"></p>
    </article>
  </div>
</el-card>







</template>

<script>
import {
    mapGetters,
    mapActions
  } from 'vuex'

import markdownDirective from '../../directives/markdown'
export default {
  computed:{...mapGetters(['currentId','currentIndex','saved','all','titleSaved'])},
  methods:{
    ...mapActions(['focusOnDraft','createDraft']),
    focus(index){
      if(this.saved&&this.titleSaved){
        index!== this.currentIndex && this.focusOnDraft(index)
      }else{
        window.alert('Current draft is saving ,please try again')
        return
      }
    },
    newDraft(){
      if (this.saved && this.titleSaved) this.createDraft()
      else window.alert('Current draft is saving, please try again')
    }
    
  },
  directives:{
    md:markdownDirective
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" >
  
  

  .box-card {
    float: left;
    width: 300px;
    height: 100%;
    min-height: 635px;
    overflow-y: auto;
    
  }
  .el-card{
    border: none;    
    border-bottom: none;
    border-top:none;
    border-left:none;  
    border-radius: 0;
    box-shadow: none;
  }
  
  .el-card__header{
    padding: 11px 20px;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  
  .page-title{
    font-size: 18px;
    color: #7f8c8d;
    font-weight: 400;
  }

  .icon-font{
    // font-size: 16px;
    margin-right: 8px;

  }

  .draft-add{
    cursor: pointer;
    float: right;
    // font-size: 16px;
    margin-right:10px; 
    line-height: 36px;
  }






   .text {
    font-size: 14px;
    cursor: pointer;
  }

  .item {
    padding: 10px 0;
    // margin: 0 25px;
    border-bottom: 1px solid #ececec;
  }
  .draft-thumb{
    padding-left: 5px;
    /*.published{
      border-left: 2px solid #42B983;
    }
    .updated{
      border-left:2px solid yellow;
    }*/
    .draft-title{
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;
      font-size:16px;
      line-height:1.3;
      font-weight:400;
      margin:0 4px;
      padding-bottom:0;
    }
    .active{
      .draft-title{
        color: #42b983;
      }
    }
    .hover{
      .draft-title{
        color:#42b983;
      }
    }
    .draft-content{
      color:#7f8c8d;
      font-size: 12px;
      font-weight: 400;
      line-height:17px;
      margin: 0;
      padding:0;
      max-height: 51px;
      overflow: hidden;
      word-wrap: break-word;


    }
    .draft-time{
      color: #7f8c8d;
      margin: 0 0 6px;
    }






  }




</style>
