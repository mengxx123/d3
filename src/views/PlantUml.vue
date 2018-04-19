<template>
    <my-page title="PlantUml 第三方客户端" :page="page">
        <div class="code-box">
            <pre id="code" class="ace_editor" style="height100%; min-height:500px"><textarea class="ace_text-input">
    ## 二级标题
    > 引用

    这是内容
    ### 三级标题
    **加粗**文字
            </textarea></pre>
        </div>
        <div class="preview-box">
            <img :src="resultSrc" v-if="resultSrc">
        </div>
    </my-page>
</template>

<script>
    const ace = window.ace
    const plantumlEncoder = require('plantuml-encoder')

    export default {
        data () {
            return {
                content: `A -> C: Hello`,
                resultSrc: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/plantuml/help',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.initEditor()
            this.convert()
//            this.$http.get('/version').then(
//                response => {
//                    let data = response.data
//                    if (data.code === 200) {
//                        console.log(data)
//                        this.version = data.data
//                    }
//                },
//                response => {
//                    console.log(response)
//                })
        },
        methods: {
            initEditor() {
                let editor = ace.edit('code')
                this.editor = editor
                let theme = 'clouds'
                let language = 'markdown'
                editor.setTheme('ace/theme/' + theme)
                editor.session.setMode('ace/mode/' + language)
                editor.setFontSize(18)
                editor.setReadOnly(false)
                editor.getSession().on('change', () => {
                    this.convert()
                })
                editor.setOption('wrap', 'free')
                editor.setValue(this.content)
                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true
                })

                editor.getSession().setUseSoftTabs(true)
            },
            convert() {
                var encoded = plantumlEncoder.encode(this.editor.getValue())
                console.log(encoded) // SrJGjLDmibBmICt9oGS0

                var url = 'https://www.plantuml.com/plantuml/svg/' + encoded
                this.resultSrc = url
            }
        }
    }
</script>

<style lang="scss" scoped>
    .code-box {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 50%;
        background-color: #fff;
        border-right: 1px solid #999;
    }
    .preview-box {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 50%;
        padding: 16px;
        background-color: #fff;
        overflow: auto;
        svg {
            /*border: 1px solid #999;*/
        }
    }
</style>
