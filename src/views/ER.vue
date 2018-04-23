<template>
    <my-page title="E-R 图">
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
工厂-聘用-工人1:n
`,
                idIndex: 0,
                data: {
                    entities: [
                        {
                            id: '1',
                            name: '员工 ',
                            _x: 100,
                            _y: 100,
                            attributes: [
                                // '工号',
                                // '姓名',
                                // '年龄',
                                // '职称',
                                '性别',
                                '电话'
                            ]
                        },
                        {
                            id: '2',
                            name: '部门',
                            _x: 400,
                            _y: 100,
                            attributes: [
                                '编号',
                                '名称'
                            ]
                        },
                        {
                            id: '3',
                            name: '公司',
                            _x: 300,
                            _y: 300,
                            attributes: [
                                '编号',
                                '名称',
                                '地址'
                            ]
                        }
                    ],
                    relationships: [
                        {
                            entity1: '1',
                            entity2: '2',
                            name: '属于',
                            text1: '1',
                            text2: 'n'
                        }
                    ],
                    links: [
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
            getId() {
                return this.idIndex++
            },
            convert() {
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
                for (let i = 0; i < this.data.entities.length; i++) {
                    let entity = this.data.entities[i]
                    entity._width = 80
                    entity._height = 40
                }
            },
            draw(svg, node) {
                for (let i = 0; i < this.data.entities.length; i++) {
                    let entity = this.data.entities[i]
                    this.drawEntity(svg, entity)
                }
                for (let i = 0; i < this.data.relationships.length; i++) {
                    let relationship = this.data.relationships[i]
                    this.drawRelationship(svg, relationship)
                }
            },
            drawRelationship(svg, relationship) {
                let entity1 = this.getNode(relationship.entity1)
                let entity2 = this.getNode(relationship.entity2)
                console.log('hah', entity1, entity2)
                let center = {
                    x: ((entity1._x + entity1._width / 2) + (entity2._x + entity2._width / 2)) / 2,
                    y: ((entity1._y + entity1._height / 2) + (entity2._y + entity2._height / 2)) / 2,
                }
                svg.append('text')
                    .attr('x', center.x)
                    .attr("y", center.y)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                    .text(relationship.name)
                svg.append('line')
                    .attr('x1', center.x - 40)
                    .attr("y1", center.y)
                    .attr('x2', center.x)
                    .attr('y2', center.y - 20)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                svg.append('line')
                    .attr('x1', center.x + 40)
                    .attr("y1", center.y)
                    .attr('x2', center.x)
                    .attr('y2', center.y - 20)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                svg.append('line')
                    .attr('x1', center.x - 40)
                    .attr("y1", center.y)
                    .attr('x2', center.x)
                    .attr('y2', center.y + 20)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                svg.append('line')
                    .attr('x1', center.x + 40)
                    .attr("y1", center.y)
                    .attr('x2', center.x)
                    .attr('y2', center.y + 20)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                //
                svg.append('line')
                    .attr('x1', entity1._x)
                    .attr("y1", entity1._y)
                    .attr('x2', center.x)
                    .attr('y2', center.y)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
            },
            drawEntity(svg, entity) {
                console.log('画')
                svg.append('rect')
                    .attr('x', entity._x)
                    .attr('y', entity._y)
                    .attr('width', entity._width)
                    .attr('height', entity._height)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                    .attr('fill', 'none')
                svg.append('text')
                    .attr('x', entity._x + entity._width / 2)
                    .attr("y", entity._y + entity._height / 2)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                    .text(entity.name)
                // attribute
                if (entity.attributes && entity.attributes.length) {
                    for (let i = 0; i < entity.attributes.length; i++) {
                        let attribute = entity.attributes[i]
                        // up
                        let width = 50 * entity.attributes.length * 2
                        let center = {
                            x: entity._x - width / 2 + (i +1) * 100,
                            y: entity._y - 24
                        }
                        svg.append('line')
                            .attr('x1', center.x)
                            .attr("y1", center.y)
                            .attr('x2', entity._x + entity._width / 2)
                            .attr('y2', entity._y)
                            .attr('stroke', '#000')
                            .attr('stroke-width', 1)
                        svg.append('ellipse')
                            .attr('cx', center.x)
                            .attr('cy', center.y)
                            .attr('rx', 48)
                            .attr('ry', 16)
                            .attr('stroke', '#000')
                            .attr('stroke-width', 1)
                            .attr('fill', '#fff')
                        svg.append('text')
                            .attr('x', center.x)
                            .attr("y", center.y)
                            .attr('text-anchor', 'middle')
                            .attr('dominant-baseline', 'middle')
                            .text(attribute)
                    }
                    
                }
            },
            getNode(id) {
                for (let entity of this.data.entities) {
                    if (entity.id === id) {
                        return entity
                    }
                }
                return null
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
    }
</style>

