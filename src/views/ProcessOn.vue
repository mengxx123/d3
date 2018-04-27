<template>
    <my-page title="查看">
        <div class="code-box">
            <ace-editor v-model="content" />
        </div>
        <div class="preview-box">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import {draw} from '../util/svg'

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
                this.$http.get('http://localhost:8082/static/er.pos').then(
                    response => {
                        let data = response.data
                        this.data = data
                        console.log(data)
                        // data:image/jpeg;base64,iVBORw0
                    },
                    response => {
                        console.log(response)
                    })
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
                svg.selectAll('*').remove()
                this._yIndex = 0

                let content = this.editor.getValue()
                if (content) {
                    try {
                        this.data = JSON.parse(content)
                        this.draw(svg, this.data)
                    } catch (e) {
                    }
                }
            },
            draw(svg, data) {
                draw(svg, data)
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

