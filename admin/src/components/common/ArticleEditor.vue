<template>
  <section :class="{'editor-active':!saved}">
    <div :class="{'title-active':!titleSaved}">
     <input type="text" class="form-control " :value="title" @input="updateTitle" >
    </div>
    <div class="clearfix">
      <div class="half-container">
        <i class="fa fa-tags" style="margin-right:15px;color:#7f8c8d"></i>
        <el-tag :key="tag" v-for="tag in tags" type="gray" :closable="true" :close-transition="true" @close="deleteTag(tag.id)">
          {{tag.name}}
        </el-tag>
        <el-input class="input-new-tag" v-if="tagInput" v-model="tagNew" ref="saveTagInput" size="small" placeholder="使用回车键提交" @keyup.enter.native="submitTag" @blur="submitTag" @keyup.27="tagInput=flase">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="addTag">New Tag</el-button>
      </div>
        
    </div>
    <textarea id="editor" style="opacity:0"></textarea>
    <div class="bottom-container ">
      <el-button  icon="delete" v-show="!postId"@click="deleteDraft" >删除</el-button>
      <el-button :plain="true" type="success" @click="publishDraft" >发布<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
    
  </section>
</template>

<script>
import api from '../../api'
import SimpleMde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import md2html from '../../markdown'

import {
  mapGetters,
  mapActions
} from 'vuex'

import utils from '../../utils'

const updateTitleWithDebounce=utils._debounce(
  async function (title) {
    try{
      await this.submitTitle(title)
      this.saveTitle()
    }catch (e) {
      window.alert(e)
    }
  },500)

  let smde 

  


 export default {
    data() {
      return {
        change:true,
        published:'',
        tags: [],
        tagsToAdd:[],
        tagInput: false,
        tagNew: ''
      };
    },
    mounted() {
    smde= new SimpleMde({
      initialValue: this.content,
      autoDownloadFontAwesome: false,
      element: document.getElementById('editor'),
      previewRender: str => md2html(str),
      spellChecker: false,
      toolbar: ['bold', 'italic', 'strikethrough', 'heading-1', 'heading-2', 'heading-3', 'clean-block', '|', 'code', 'quote', 'unordered-list', 'ordered-list', 'table', '|', 'link', 'image', 'horizontal-rule', {
        name: 'more',
        action: function customFunction (editor) {
          //  fix me
        },
        className: 'fa fa-chevron-circle-down',
        title: 'More'
      }, '|', 'preview', 'side-by-side', 'fullscreen', '|', 'guide']

    })

    smde.codemirror.on('change',() =>{
      if(this.change){
        this.change=false
        return
      }
      this.saved && this.editDraft()
      this.postDraft()
    })

    this.change=true
    this.currentId && this.fetchDraft(this.currentId)

   },
   computed:{...mapGetters(['currentId','saved','titleSaved','title','postId'])},



    methods: {...mapActions(['editDraft','saveDraft','editTitle','saveTitle','deleteDraft','publish','submitTitle','submitExcerpt','modifyTags']),
      async deleteTag(id) {
        let newTagsArr=[]
        this.tags.forEach(i =>{
          i.id!==id && newTagsArr.push(i.id) 
        })
        try{
          const res=await api.modifyDraftTags( this.currentId,newTagsArr)
          if(res.success){
            this.tags=res.data.tags
            this.modifyTags(res.data.lastEditTime)
          }
        }catch(e){
          window.alert(e)
        }

        // this.tags.splice(this.tags.indexOf(tag), 1);
      },

      

      async submitTag(val) {
        this.tagInput=false
        const tag=typeof val === 'string'?val:utils.trim(this.tagNew)
        this.tagNew=''
        if(!tag) return

        try{
          const res1=await api.createTag(tag)
          if(res1.success){
            // return if the tag duplicated
            if(this.tags.some(item =>item.id === res1.data.id )) return

            let newTagsArr =this.tags.map(item =>{return item.id})
            newTagsArr.push(res1.data.id)
            const res2=await api.modifyDraftTags(this.currentId,newTagsArr)
            if(res2.success){
              this.tags=res2.data.tags
              this.modifyTags(res2.data.lastEditTime)
            }
          }
        }catch(e){
          window.alert(e)
        }



        // let tagNew = this.tagNew;
        // if (tagNew) {
        //   this.tags.push(tagNew);
        // }
        // this.tagInput = false;
        // this.tagNew = '';
      },
      async publishDraft(){
        if(!this.saved || !this.titleSaved){
          window.alert('Draft is  saving,please try again!')
          return
        }
        const res= await this.publish()
        window.alert(res.success?'Success!' : 'Failed')
      },
      updateTitle(e){
        this.editTitle
        updateTitleWithDebounce.call(this,e.target.value)
      },
      addTag() {
        this.tagInput = true;
        this.tagNew='';
        this.searchTags('');
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      searchTags:utils._debounce(async function(val){
        const res=await api.searchTagWithWord(val)
        if(res.success) this.tagsToAdd=res.data
      },500),
      async fetchDraft(id){
        try{
          const res= await api.getDraft(id)
          if(res.success){
            this.tagNew=''
            this.tagInput=false
            this.tags=res.data.tags
            this.$nextTick(()=>{
              smde.value(res.data.content)
            })

          }
        }catch(e){
          window.alert(e)
        }
      },

      /**
       * auto submit the draft when editing
       * so wrapped by debounce
      */

      postDraft:utils._debounce(async function(){
        try {
          const res=await api.modifyDraftContent(this.currentId,smde.value())
          if(res.success){
            await this.submitExcerpt({
              excerpt:res.data.excerpt,
              time:res.data.lastEditTime
            })
            this.saveDraft()
          }
        } catch (e) {
          window.alert(e)
        }
      },1000)

    },
    watch:{
      currentId(val){
        this.change=true
        val && this.fetchDraft(val)
      },
      tagNew(val){
        this.searchTags(val)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

  .form-control{
    color: #4a4a4a;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    box-shadow: none;
    border: 1px solid transparent;
    border-bottom: 1px solid #ececec;
    background-color: #fff;
    outline: 0;
    transition: border 0.5s;
    padding: 13px 20px 13px 30px;
    font-size: 26px; 
  }
  .half-container{
    box-sizing:border-box;
    width:100%;
    padding: 15px 5px 0px 15px;
    margin-bottom: 10px;
    .el-tag{
      background-color: #e4e8f1;
      padding: 7px 9px;
      margin-right: 10px;
      margin-bottom: 10px;
      height: 28px;
      line-height: 12px;
      font-size: 12px;
      color: #48576a;;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid #e4e8f1;
      white-space: nowrap;
      vertical-align: top;
    }
  }
  .bottom-container{
      text-align: right;
      box-sizing:border-box;
      width:100%;
      padding: 15px;
      margin-bottom: 10px;
  }
  section{
    height: 100%;
  }
  section .editor-toolbar {
    border-left: none; 
     border-right:none; 
     border-top-left-radius: 0px; 
    border-top-right-radius: 0px; 
  }
  section .CodeMirror{
    border:none;
    border-top: 1px solid #ddd;
    border-bottom:1px solid #ddd;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  
 
  
 
</style>