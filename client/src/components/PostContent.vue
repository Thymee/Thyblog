<template>
<div class="post-content">
    <div class="post-meta">
        <time class="last-update">{{time}}</time>
        <h2  class="post-title">
            <router-link :to="'/posts/'+title">{{title}}</router-link>
        </h2 >

    </div>
</div>
</template>

<script>
import markdownDirective from '../directives/markdown'
export default {
  props: {
    
    
    title: {
      type: String,
      required: true
    },
    
    time: {
      type: String,
      required: true
    },
   
   
    
    detailmode: {
      type: String,
      default: 'false'
    }
  },
  directives: {
    md: markdownDirective
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/style.styl'

.post-meta
    // display:flex
    // justify-content:flex-start
    // flex-wrap:wrap
    position:relative
    padding: 30px 0 30px;
    border-bottom: 1px solid #e6e6e6
    time,h2
        // margin:10px 20px 
        // color:#999

 .last-update
    font:14px fontawesome
    color:#999
    display:inline-block
    position:absolute
    left:0
    top:33px

.last-update::before
    content:'\f017'
    font:14px fontawesome
    line-height:22px
    margin:0 5px 0 0

  

.post-title
    margin-left:180px
    color:#444
    // width:100%
    font:22px Verdana
    line-height:22px
    letter-spacing:1px
    font-weight:600
    a:hover
        color:#e95095
   
    

.post-content
    
    // list-style-type: none;
    // padding: 0;
    // padding-top: 4px;
</style>
