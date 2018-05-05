<template>
    <my-page title="用例图">
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
销售员 -- (买单)
消费者 -- (买单)
销售员 -- (查询)
销售员 -- (哈哈)
actor 消费者
actor 销售员
(买单2)
(买单) ..> (hehe)
(买单) ..> (hehe2)
`,
                idIndex: 0,
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
            getId() {
                return this.idIndex++
            },
            convert() {
                this.data = {
                    actors: [],
                    useCases: [],
                    links: []
                }
                let arr = this.content.split('\n')
                arr = arr.filter(value => {
                    return value.length
                })
                console.log(arr)
//                console.log(this.data)
                for (let item of arr) {
//                    console.log(item)
                    let m = item.match(/([\w\W]+?)\s*(\-+?)\s*\(([\w\W]+?)\)/)
                    if (m) {
                        console.log('匹配')
                        console.log(m)
                        let actorName = m[1]
                        let line = m[2]
                        let useCaseName = m[3]
                        let actor = this.getActorByName(actorName)
                        if (!actor) {
                            actor = {
                                id: this.getId(),
                                name: actorName
                            }
                            this.data.actors.push(actor)
                        }
                        let useCase = this.getUseCaseByName(useCaseName)
                        if (!useCase) {
                            useCase = {
                                id: this.getId(),
                                name: useCaseName
                            }
                            this.data.useCases.push(useCase)
                        }
                        this.data.links.push({
                            type: '',
                            from: actor.id,
                            to: useCase.id
                        })
                    }
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
                this.convert()
                this.calculate()
                this.draw(svg, this.data)
            },
            calculate() {
                let max = Math.max(this.data.actors.length, this.data.useCases.length)
                let height = max * 200
                length = this.data.actors.length
                for (let i = 0; i < this.data.actors.length; i++) {
                    let actor = this.data.actors[i]
                    actor._x = 50
                    actor._y = height / (length + 1) * (i + 1)
                }
                length = this.data.useCases.length
                for (let i = 0; i < this.data.useCases.length; i++) {
                    let useCase = this.data.useCases[i]
                    useCase._x = 350
                    useCase._y = height / (length + 1) * (i + 1)
                }
            },
            calculate2() {
                let max = Math.max(this.data.actors.length, this.data.useCases.length)
                let width = max * 150
                let length
                length = this.data.actors.length
                for (let i = 0; i < this.data.actors.length; i++) {
                    let actor = this.data.actors[i]
                    actor._x = width / (length + 1) * (i + 1)
                    actor._y = 100
                }
                length = this.data.useCases.length
                for (let i = 0; i < this.data.useCases.length; i++) {
                    let useCase = this.data.useCases[i]
                    useCase._x = width / (length + 1) * (i + 1)
                    useCase._y = 300
                }
            },
            draw(svg, node) {
                for (let i = 0; i < this.data.actors.length; i++) {
                    let actor = this.data.actors[i]
                    this.drawActor(svg, actor.name, actor._x, actor._y)
                }
                for (let i = 0; i < this.data.useCases.length; i++) {
                    let useCase = this.data.useCases[i]
                    this.drawUseCase(svg, useCase.name, useCase._x, useCase._y)
                }
                for (let i = 0; i < this.data.links.length; i++) {
                    let link = this.data.links[i]
                    this.drawLink(svg, link)
                }
            },
            drawLink(svg, link) {
                let actor = this.getNode(link.from)
                let useCase = this.getNode(link.to)
                svg.append('line')
                    .attr('x1', actor._x + 30)
                    .attr('y1', actor._y)
                    .attr('x2', useCase._x - 60)
                    .attr('y2', useCase._y)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
            },
            drawLink2(svg, link) {
                let actor = this.getNode(link.from)
                let useCase = this.getNode(link.to)
                svg.append('line')
                    .attr('x1', actor._x)
                    .attr('y1', actor._y + 80)
                    .attr('x2', useCase._x)
                    .attr('y2', useCase._y - 20)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
            },
            getNode(id) {
                for (let actor of this.data.actors) {
                    if (actor.id === id) {
                        return actor
                    }
                }
                for (let useCase of this.data.useCases) {
                    if (useCase.id === id) {
                        return useCase
                    }
                }
                return null
            },
            getActorByName(name) {
                for (let actor of this.data.actors) {
                    if (actor.name === name) {
                        return actor
                    }
                }
                return null
            },
            getUseCaseByName(name) {
                for (let useCase of this.data.useCases) {
                    if (useCase.name === name) {
                        return useCase
                    }
                }
                return null
            },
            drawUseCase(svg, name, x, y) {
                svg.append('ellipse')
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('rx', 50)
                    .attr('ry', 20)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                    .attr('fill', 'none')
                svg.append('text')
                    .attr('x', x)
                    .attr("y", y)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                    .attr("y", y)
                    .text(name)
            },
            drawActor(svg, name, x, y) {
                svg.append('circle')
                    .attr('cx', x)
                    .attr('cy', y - 32)
                    .attr('r', 16)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                    .attr('fill', 'none')
                svg.append('line')
                    .attr('x1', x - 16)
                    .attr('y1', y)
                    .attr('x2', x + 16)
                    .attr('y2', y)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                svg.append('line')
                    .attr('x1', x)
                    .attr('y1', y + 16)
                    .attr('x2', x  -16)
                    .attr('y2', y + 32)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                svg.append('line')
                    .attr('x1', x)
                    .attr('y1', y - 16)
                    .attr('x2', x)
                    .attr('y2', y + 16)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                svg.append('line')
                    .attr('x1', x)
                    .attr('y1', y + 16)
                    .attr('x2', x + 16)
                    .attr('y2', y + 32)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                svg.append('text')
                    .attr('x', x)
                    .attr("y", y + 64)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                    .text(name)
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
</style>
