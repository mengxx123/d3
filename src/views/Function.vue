<template>
    <my-page title="功能结构图">
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
                content: `* 根目录
    * 第一
    * 商品信息管理模块
        * 第1
        * 第2
            * 2.1
            * 2.2
    * 第三
        * 第3
    * 第四`,
                idIndex: 0,
                data: {
                    value: '根目录',
                    children: [
                        {
                            value: '第一'
                        },
                        {
                            value: '商品信息管理模块',
                            children: [
                                {
                                    value: '第1'
                                },
                                {
                                    value: '第2'
                                }
                            ]
                        },
                        {
                            value: '第三',
                            children: [
                                {
                                    value: '第3'
                                }
                            ]
                        },
                        {
                            value: '第四',
                        }
                    ]
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
            convert() {
                this.content = this.editor.getValue()
                let arr = this.content.split('\n')
                let arr2 = []
                for (let item of arr) {
                    arr2.push({
                        id: this.getId(),
                        level: item.match(/^\s*/)[0].length / 4,
                        content: item.replace(/^\s*\*\s*/, '')
                    })
                }
                let root = null
                let lastLevel = 0
                let stack = []
                for (let i = 0; i < arr2.length; i++) {
                    let item = arr2[i]
                    if (item.level === 0) {
                        root = {
                            id: item.id,
                            value: item.content,
                            children: []
                        }
                    } else {
                        let lastItem = arr2[i - 1]
                        if (item.level > lastItem.level) {
                            stack.push(lastItem)
                            let top = stack[stack.length - 1]
                            item.parent = top.id
                        } else if (item.level === lastItem.level) {
                            let top = stack[stack.length - 1]
                            item.parent = top.id
                        } else {
                            while (stack.length > item.level) {
                                stack.pop()
                            }
                            let top = stack[stack.length - 1]
                            item.parent = top.id
                        }
                    }
                }

                for (let i = 0; i < arr2.length; i++) {
                    let item = arr2[i]
                    if (i > 0) {
                        let node = this.getNode(root, item.parent)
                        if (node) {
                            node.children.push({
                                id: item.id,
                                value: item.content,
                                children: []
                            })
                        }
                    }
                }
                this.data = root
                console.log(this.data)
            },
            getNode(node, id) {
                if (node.id === id) {
                    return node
                }
                if (node.children && node.children.length) {
                    for (let i = 0; i < node.children.length; i++) {
                        let n = this.getNode(node.children[i], id)
                        if (n) {
                            return n
                        }
                    }
                }
                return null
            },
            getId() {
                return '' + this.idIndex++
            },
            init() {
                this.initEditor()
                this.preview()
            },
            preview() {
//                d3.select('body').select('*').remove()
                let svg = d3.select('svg')
                    .attr('width', 800)
                    .attr('height', 500)
                console.log('删除所有')
                svg.selectAll('*').remove()
//                svg.selectAll().remove()
                this._yIndex = 0
                this.convert()
                this.calculate(this.data, 0)
                this.draw(svg, this.data)
            },
            initEditor() {
                let editor = ace.edit('code')
                this.editor = editor
                // 设置风格和语言（更多风格和语言，请到github上相应目录查看）
                let theme = 'clouds'
                let language = 'markdown'
                editor.setTheme('ace/theme/' + theme)
                editor.session.setMode('ace/mode/' + language)

                // 字体大小
                editor.setFontSize(18)

                // 设置只读（true时只读，用于展示代码）
                editor.setReadOnly(false)
                editor.getSession().on('change', () => {
                    this.preview()
                })
                // 自动换行,设置为off关闭
                editor.setOption('wrap', 'free')
                editor.setValue(this.content)
                // 启用提示菜单
                ace.require('ace/ext/language_tools')
                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true
                })

                editor.getSession().setUseSoftTabs(true)
            },
            calculate(node, x) {
                let padding = 16
                let width = 140
                let height = 40
                let offsetX = 32
                let offsetY = 16

                node._width = width
                node._height = height
                let y = 0
                if (node.children && node.children.length) {
                    for (let i = 0; i < node.children.length; i++) {
                        this.calculate(node.children[i], x + 1)
                    }
                    node._y = (node.children[0]._y + node.children[node.children.length - 1]._y) / 2
                } else {
                    node._y = this._yIndex * (height + offsetY) + padding
                    this._yIndex++
                }
                node._x = x * (width + offsetX) + padding
            },
            draw(svg, node) {
                if (node.value) { // hack
                    svg.append('rect')
                        .attr('x', node._x)
                        .attr('y', node._y)
                        .attr("width", node._width)
                        .attr('height', node._height)
                        .attr('stroke', '#000')
                        .attr('stroke-width', 1)
                        .attr('fill', 'none')
                        .attr('title', node.value)
                }
                svg.append("text")
                    .attr('x', node._x + node._width / 2)
                    .attr("y", node._y + node._height / 2)
                    .text(node.value)
                if (node.children) {
                    for (let i = 0; i < node.children.length; i++) {
                        this.draw(svg, node.children[i])
                        // line
                        let pt0 = {
                            x: node._x + node._width,
                            y: node._y + node._height / 2
                        }
                        let pt3 = {
                            x: node.children[i]._x,
                            y: node.children[i]._y + node._height / 2
                        }
                        let pt1 = {
                            x: (pt0.x + pt3.x) / 2,
                            y: pt0.y
                        }
                        let pt2 = {
                            x: (pt0.x + pt3.x) / 2,
                            y: pt3.y
                        }
                        svg.append('line')
                            .attr('x1', pt0.x)
                            .attr('y1', pt0.y)
                            .attr('x2', pt1.x)
                            .attr('y2', pt1.y)
                            .attr('stroke', '#000')
                            .attr('stroke-width', 1)
                        svg.append('line')
                            .attr('x1', pt1.x)
                            .attr('y1', pt1.y)
                            .attr('x2', pt2.x)
                            .attr('y2', pt2.y)
                            .attr('stroke', '#000')
                            .attr('stroke-width', 1)
                        svg.append('line')
                            .attr('x1', pt2.x)
                            .attr('y1', pt2.y)
                            .attr('x2', pt3.x)
                            .attr('y2', pt3.y)
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
            text-anchor: middle;
            dominant-baseline: middle;
    }
</style>

