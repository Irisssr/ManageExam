<template>
    <div>
        <div ref="editor" class="editor"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
      name: 'editor',
      props:{
          editorContent:{
              type:String,
              default:''
          }
      },
      computed:{
        editorContent_:{
            get(){
              console.log(this.editorContent)
                return this.editorContent;
            },
            set(val){
                this.$emit('setEditor',val);
            }
        }
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent_ = html
        }
        editor.create()
      }
    }
</script>

<style scoped>

</style>
