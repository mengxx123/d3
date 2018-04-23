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
            <svg></svg>
        </div>
        <textarea class="editor" v-model="content"></textarea>
    </my-page>
</template>

<script>
    /* eslint-disable */
    const ace = window.ace

    export default {
        data () {
            return {
                content: `
class User {
  # getName()
  + getAddress()
  + setName()
  - int age
  - String password
}
`,
                idIndex: 0,
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
                                fillColor: '#f00'
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
                        }
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
            getId() {
                return this.idIndex++
            },
            init() {
                this.initEditor()
                this.preview()
            },
            preview() {
                let svg = d3.select('svg')
                    .attr('width', 800)
                    .attr('height', 800)
                console.log('删除所有')
                svg.selectAll('*').remove()
                this._yIndex = 0
                this.draw(svg, this.data)
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
                for (let shape of data.shapes) {
                    if (shape.type === 'rect') {
                        svg.append('rect')
                            .attr('x', shape.x)
                            .attr('y', shape.y)
                            .attr('width', shape.width)
                            .attr('height', shape.height)
                    } else if (shape.type === 'line') {
                        svg.append('line')
                            .attr('x1', shape.x1)
                            .attr('y1', shape.y1)
                            .attr('x2', shape.x2)
                            .attr('y2', shape.y2)
                            .attr('stroke', '#000')
                            .attr('stroke-width', 1)
                    }
                }
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
    .editor {
        width: 300px;
        height: 300px;
    }
    text {
            /* stroke: #000; */
            /* stroke-width: 1; */
            /* font-size: 20px; */
            /*text-anchor: middle;*/
            /*dominant-baseline: middle;*/
    }
</style>

