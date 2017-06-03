<template>
  <aside class="col-sub" v-scroll="scrollcallback" :style="{marginTop:offsetY+'px'}">
    <widget-recentpost ></widget-recentpost>
    <!-- <widget-mostcomment></widget-mostcomment> -->
    <widget-tags></widget-tags>
    <widget-categories></widget-categories>
  </aside>
</template>

<script>
import WidgetRecentpost from './widgets/WidgetRecentPost'
import WidgetMostcomment from './widgets/WidgetMostComment'
import WidgetTags from './widgets/WidgetTags'
import WidgetCategories from './widgets/WidgetCategories'
import eventDirective from '../directives/eventListener'
import utils from '../utils'

export default {
  data () {
    return {
      offsetY: 0,
      blogEle: null,
      widgets: null
    }
  },
  components: {
    WidgetRecentpost,
    WidgetMostcomment,
    WidgetTags,
    WidgetCategories
  },
  methods: {
    scrollcallback: utils._throttle(function() {
      var widget=[]
      for (var k = 0, length = this.widgets.length; k < length; k++) {
         widget[k]=this.widgets[k].offsetHeight;
      }
   
      let limit = this.blogEle.offsetHeight - 174 - widget.reduce((a, b) => {
        return b + a
      }, 0)
      this.offsetY = document.documentElement.clientWidth <= 900 ? 35 : window.scrollY > 60 ? window.scrollY - 120 : 0
      this.offsetY = Math.max(Math.min(this.offsetY, limit), 0)
    }, 50, 500)
  },
  directives: {
    scroll: eventDirective('scroll')
  },
  mounted () {
    this.blogEle = document.querySelector('.blog-page')
    this.widgets = document.querySelectorAll('.widget-container')
  }
}
</script>

<style lang="stylus" scoped>
aside
  transition: margin 1s
</style>
