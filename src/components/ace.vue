<template>
    <pre id="code" class="ace_editor" style="height100%; min-height:500px"><textarea class="ace_text-input">
    ## 二级标题
    > 引用

    这是内容
    ### 三级标题
    **加粗**文字
            </textarea></pre>
</template>

<script>
    const ace = window.ace

    export default {
        data() {
            return {
                editorContent: ''
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        mounted() {
            this.editorContent = this.value

            let editor = ace.edit('code')
            this.editor = editor
            let theme = 'clouds'
            let language = 'markdown'
            editor.setTheme('ace/theme/' + theme)
            editor.session.setMode('ace/mode/' + language)
            editor.setFontSize(18)
            editor.setReadOnly(false)
            editor.getSession().on('change', () => {
                this.$emit('input', editor.getValue())
                // this.preview()
            })
            editor.setOption('wrap', 'free')
            this.content = JSON.stringify(this.data, null, 4)
            editor.setValue(this.editorContent)
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true
            })

            editor.getSession().setUseSoftTabs(true)
            // this.editor = new E('#editorElem')
            // this.editor.customConfig.onchange = html => {
            //     this.editorContent = html
            //     this.$emit('input', this.editorContent)
            // }
            // this.editor.create()
            // this.editor.txt.html(this.editorContent)
        },
        destroyed() {
//            this.editor.destroy()
        },
        watch: {
            editorContent() {
                // this.$emit('input', this.editorContent)
            }
        }
    }
</script>

<style>
    .ace_editor {
        height: 100%;
    }
    .ace_content {
        height: 100%;
    }
</style>