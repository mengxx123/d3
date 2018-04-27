<template>
    <my-page title="类图">
        <div class="code-box">
            <ace-editor v-model="content" />
        </div>
        <div class="preview-box">
            <svg></svg>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
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
            },
            init() {
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
                       .attr("text-anchor", 'middle')
                        .attr('dominant-baseline', 'middle')
                        .text(attr)
                }
            }
        },
        watch: {
            content() {
                this.preview()
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
