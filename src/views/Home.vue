<template>
    <my-page title="首页">
        <pre>{{ content }}</pre>
        <svg></svg>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                content: `* 根目录
        * 第一
        * 商品信息管理模块
            * 第1
            * 第2
        * 第三
            * 第3
        * 第四`,
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
            init() {
                let svg = d3.select('svg')
                    .attr('width', 800)
                    .attr('height', 500)
                // d3.select("body").selectAll("p").text("www.ourd3js.com")
                this._yIndex = 0
                this.calculate(this.data, 0)
                this.draw(svg, this.data)
            },
            calculate(node, x) {
                let width = 140
                let height = 48
                node._width = width
                node._height = height
                let y = 0
                if (node.children && node.children.length) {
                    for (let i = 0; i < node.children.length; i++) {
                        this.calculate(node.children[i], x + 1)
                    }
                    node._y = (node.children[0]._y + node.children[node.children.length - 1]._y) / 2
                } else {
                    node._y = this._yIndex * (height + 8) + 16
                    this._yIndex++
                }
                node._x = x * (width + 20) + 16
            },
            draw(svg, node) {
                svg.append('rect')
                    .attr('x', node._x)
                    .attr('y', node._y)
                    .attr("width", node._width)
                    .attr('height', node._height)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                    .attr('fill', 'none')
                svg.append("text")
                    // .attr("class","MyText")
                    // .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                    .attr('x', node._x + node._width / 2)
                    .attr("y", node._y + node._height / 2)
                    // .attr("dx", 100)
                    // .attr("dy", 100)
                    .text(node.value)
                if (node.children) {
                    for (let i = 0; i < node.children.length; i++) {
                        this.draw(svg, node.children[i])
                        // line
                        svg.append('line')
                            // .attr("class","MyText")
                            // .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                            .attr('x1', node._x + node._width)
                            .attr('y1', node._y + node._height / 2)
                            .attr('x2', node.children[i]._x)
                            .attr('y2', node.children[i]._y + node._height / 2)
                            .attr('stroke', '#000')
                            .attr('stroke-width', 1)
                    }
                }
                // for (let i = 0; i < note.length; i++) {
                //     svg.append('rect')
                //         .attr('x', 16)
                //         .attr('y', i * 50 + 16)
                //         .attr("width", 20)
                //         .attr('height', 20)
                //         .attr('stroke', '#000')
                //         .attr('stroke-width', 1)
                //         .attr('fill', 'none')

                //     svg.append("text")
                //         // .attr("class","MyText")
                //         // .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                //         .attr("x", 100)
                //         .attr("y", 100)
                //         .attr("dx", 100)
                //         .attr("dy", 100)
                //         .text(this.data[i].value)
                // }
            }
        }
    }
</script>

<style scoped>
svg {
    border: 1px solid #999;
}
</style>

<style>
text {
        /* stroke: #000; */
        /* stroke-width: 1; */
        /* font-size: 20px; */
        text-anchor: middle;
        dominant-baseline: middle;
}
</style>

