<template>
    <my-page title="查看">
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
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>
        </div>
        <textarea class="editor2" v-model="content"></textarea>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import draw from '../util/svg'
    const ace = window.ace

    export default {
        data () {
            return {
                content: '',
                data: {
                    version: '1.0.0',
                    shapes: [
                        {
                            type: 'rect',
                            x: 100,
                            y: 100,
                            width: 200,
                            height: 50,
                            style: {
                                fillColor: '#f00',
                                strokeColor: '#09c',
                                strokeWidth: 3
                            }
                        },
                        {
                            type: 'line',
                            x1: 0,
                            y1: 0,
                            x2: 100,
                            y2: 100,
                            style: {
                            }
                        },
                        {
                            "type": "text",
                            "text": "第2",
                            "x": 430,
                            "y": 148,
                            "width": 140,
                            "height": 40,
                            "style": {
                                "strokeColor": "#000",
                                "strokeWidth": 1,
                                "fillColor": "none",
                                "title": "第2",
                                "textAnchor": "middle",
                                "dominantBaseline": "middle"
                            }
                        },
                    ],
                },
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.initEditor()
                this.initWebIntent()
                this.preview()
            },
            initWebIntent() {
                if (!window.intent) {
                    return
                }
                this.editor.setValue(window.intent.data)
            },
            preview() {
                let svg = d3.select('svg')
                    .attr('width', 800)
                    .attr('height', 800)
                console.log('删除所有')
                svg.selectAll('*').remove()
                this._yIndex = 0

                let content = this.editor.getValue()
                console.log(content)
                if (content) {
                    try {
                        this.data = JSON.parse(content)
                        this.draw(svg, this.data)
                    } catch (e) {
                    }
                }
            },
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
                    this.preview()
                })
                editor.setOption('wrap', 'free')
                this.content = JSON.stringify(this.data, null, 4)
                editor.setValue(this.content)
                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true
                })

                editor.getSession().setUseSoftTabs(true)
            },
            draw(svg, data) {
                draw(svg, data)
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

<style>
    /* .editor2 {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 100000;
        width: 300px;
        height: 300px;
    } */
    text {
            /* stroke: #000; */
            /* stroke-width: 1; */
            /* font-size: 20px; */
            /*text-anchor: middle;*/
            /*dominant-baseline: middle;*/
    }
</style>

