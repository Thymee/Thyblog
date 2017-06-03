<template>
    <div>
      <textarea id="editor" style="opacity: 1"></textarea>
    </div>
</template>
<script>
  import SimpleMde from 'simplemde'
  import 'simplemde/dist/simplemde.min.css'
  import md2html from '../../markdown'
  
  let smde;
  export default{
    data(){
      return{
        change:true,
        content: 'hello!'
      }
    },
    mounted() {
    smde= new SimpleMde({
      autofocus:true,
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
     
     console.log(smde.value())
    })

    // this.change=true
    // this.currentId && this.fetchDraft(this.currentId)

   },
    // beforeDestroy(){
    //   smde.toTextArea();
    //   let editor = document.getElementById('editor');
    //   editor.outerHTML = editor.outerHTML;
    // },
    watch:{
      content(val){
        if('' !== val){
          this.$nextTick(()=>{
            if(smde){
              if(val !== smde.value()){
                smde.value(val);
              }
            }
          })
        }
      }
    },
  }
</script>