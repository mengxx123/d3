<template>
    <my-page title="画图">
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
    import {draw} from '../util/svg'
    const ace = window.ace

    export default {
        data () {
            return {
                content: `
point 200,200
line 5 10 100 100
rect 0 0 100 100
circle 100 100 10
ellipse 300 300 80 20
text 哈哈哈 200 100
for num from 1 to 8
    circle 100 100 num
`,
                data: {
                    actors: [
                        {
                            id: '1',
                            name: '销售员 '
                        },
                        {
                            id: '2',
                            name: '消费者'
                        }
                    ],
                    useCases: [
                        {
                            id: '3',
                            name: '买单 '
                        },
                        {
                            id: '4',
                            name: '查询'
                        },
                        {
                            id: '5',
                            name: '哈哈'
                        }
                    ],
                    links: [
                        {
                            type: '',
                            from: '1',
                            to: '3'
                        },
                        {
                            type: '',
                            from: '1',
                            to: '4'
                        },
                        {
                            type: '',
                            from: '1',
                            to: '5'
                        },
                        {
                            type: '',
                            from: '2',
                            to: '3'
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
            convert(content) {
                let arr = content.split('\n')
                arr = arr.filter(value => {
                    return value.length
                })
                let shapes = []
                for (let item of arr) {
                    if (item.includes('rect')) {
                        let arr = item.replace('rect', '').split(/\s+/)
                        arr = arr.filter(value => value.length)
                        console.log(arr)
                        let x = arr[0]
                        let y = arr[1]
                        let width = 100
                        let height = 100
                        shapes.push({
                            type: 'rect',
                            x: arr[0],
                            y: arr[1],
                            width: arr[2],
                            height: arr[3],
                            style: {
                                fillColor: 'none',
                                strokeColor: '#000',
                                strokeWidth: 1
                            }
                        })
                    }

                    let match
                    if (match = item.match(/point\s+(\d+)\,\s*(\d+)/)) {
                        shapes.push({
                            type: 'circle',
                            cx: match[1],
                            cy: match[2],
                            r: 2,
                            style: {
                                fillColor: '#000',
                                strokeColor: '#000',
                                strokeWidth: 1
                            }
                        })
                    }
                    if (match = item.match(/line\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/)) {
                        shapes.push({
                            type: 'line',
                            x1: match[1],
                            y1: match[2],
                            x2: match[3],
                            y2: match[4],
                            style: {
                                fillColor: '#000',
                                strokeColor: '#000',
                                strokeWidth: 1
                            }
                        })
                    }
                    if (match = item.match(/circle\s+(\d+)\s+(\d+)\s+(\d+)/)) {
                        shapes.push({
                            type: 'circle',
                            cx: match[1],
                            cy: match[2],
                            r: match[3],
                            style: {
                                fillColor: 'none',
                                strokeColor: '#000',
                                strokeWidth: 1
                            }
                        })
                    }
                    if (match = item.match(/ellipse\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/)) {
                        shapes.push({
                            type: 'ellipse',
                            cx: match[1],
                            cy: match[2],
                            rx: match[3],
                            ry: match[4],
                            style: {
                                fillColor: 'none',
                                strokeColor: '#000',
                                strokeWidth: 1
                            }
                        })
                    }
                    if (match = item.match(/text\s+([\w\W]+)\s+(\d+)\s+(\d+)/)) {
                        console.log('添加文章')
                        shapes.push({
                            type: 'text',
                            text: match[1],
                            x: match[2],
                            y: match[3],
                            style: {
                                textAnchor: 'middle',
                                dominantBaseline: 'middle'
                            }
                        })
                    }
                }
                return {
                    version: '1.0.0',
                    shapes: shapes
                }
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
                try {
                    let json = this.convert(this.content)
                    draw(svg, json)
                } catch (e) {
                    console.error(e)
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
            border: 1px solid #999;
        }
    }
</style>
