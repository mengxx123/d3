<template>
    <my-page title="类图">
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
                    classes: [
                        {
                            name: 'User',
                            attributes: [
                                '# getName()',
                                '+ getAddress()',
                                '+ setName()',
                                '- String password',
                            ]
                        },
                        {
                            name: 'Class',
                            attributes: [
                                '- name',
                                '# getName()',
                                '+ setName(name)',
                            ]
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
            convert() {
//                this.data = {
//                    actors: [],
//                    useCases: [],
//                    links: []
//                }
//                this.content = this.editor.getValue()
//                let arr = this.content.split('\n')
//                arr = arr.filter(value => {
//                    return value.length
//                })
//                console.log(arr)
////                console.log(this.data)
//                for (let item of arr) {
////                    console.log(item)
//                    let m = item.match(/([\w\W]+?)\s*(\-+?)\s*\(([\w\W]+?)\)/)
//                    if (m) {
//                        console.log('匹配')
//                        console.log(m)
//                        let actorName = m[1]
//                        let line = m[2]
//                        let useCaseName = m[3]
//                        let actor = this.getActorByName(actorName)
//                        if (!actor) {
//                            actor = {
//                                id: this.getId(),
//                                name: actorName
//                            }
//                            this.data.actors.push(actor)
//                        }
//                        let useCase = this.getUseCaseByName(useCaseName)
//                        if (!useCase) {
//                            useCase = {
//                                id: this.getId(),
//                                name: useCaseName
//                            }
//                            this.data.useCases.push(useCase)
//                        }
//                        this.data.links.push({
//                            type: '',
//                            from: actor.id,
//                            to: useCase.id
//                        })
//                    }
//                }
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
                this.convert()
                this.calculate()
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
                editor.setValue(this.content)
                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true
                })

                editor.getSession().setUseSoftTabs(true)
            },
            calculate() {
                let HEADER_HEIGHT = 40
                let ATTRIBUTE_HEIGHT = 24
                for (let i = 0; i < this.data.classes.length; i++) {
                    let cls = this.data.classes[i]
                    cls.attributes = cls.attributes.sort((a, b) => {
                        return 0
                    })
                    cls._width = 160
                    cls._height = HEADER_HEIGHT + cls.attributes.length * ATTRIBUTE_HEIGHT
                    cls._x = 16
                    cls._y = 16 + i * 200
                }
            },
            draw(svg, node) {
                for (let i = 0; i < this.data.classes.length; i++) {
                    let cls = this.data.classes[i]
                    this.drawClass(svg, cls)
                }
            },
            drawClass(svg, cls) {
//                let actor = this.getNode(link.from)
//                let useCase = this.getNode(link.to)
                let FILL = '#FEFECE'
                let LINE = '#A80036'
                let HEADER_HEIGHT = 40
                let ATTRIBUTE_HEIGHT = 24
                // outline rect
                svg.append('rect')
                    .attr('x', cls._x)
                    .attr('y', cls._y)
                    .attr('width', cls._width)
                    .attr('height', cls._height)
                    .attr('stroke', LINE)
                    .attr('stroke-width', 1)
                    .attr('fill', FILL)
                // class name
                svg.append('text')
                    .attr('x', cls._x + cls._width / 2)
                    .attr("y", cls._y + HEADER_HEIGHT / 2)
                    .attr("text-anchor", 'middle')
                    .attr('dominant-baseline', 'middle')
                    .text(cls.name)
                svg.append('line')
                    .attr('x1', cls._x)
                    .attr("y1", cls._y + HEADER_HEIGHT)
                    .attr("x2", cls._x + cls._width)
                    .attr('y2', cls._y + HEADER_HEIGHT)
                    .attr('stroke', LINE)
                    .attr('stroke-width', 1)
                // attributes
                for (let i = 0; i < cls.attributes.length; i++) {
                    let attr =  cls.attributes[i]
                    svg.append('text')
                        .attr('x', cls._x + 16)
                        .attr("y", cls._y + HEADER_HEIGHT + (i + 0.5) * ATTRIBUTE_HEIGHT)
//                        .attr("text-anchor", 'middle')
                        .attr('dominant-baseline', 'middle')
                        .text(attr)
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

