<template>
    <my-page title="功能结构图" :page="page">
        <div class="code-box">
            <ace-editor v-model="content" />
        </div>
        <div class="preview-box">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>
        </div>
        <textarea class="editor" v-model="content"></textarea>
        <canvas id="canvas" style="display: none;position: absolute;top: 0;left: 0;z-index: 10000000;width: 100px;height: 100px;background-color: #09c;"></canvas>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import funtionDiagram from '../util/svg/function'
    import {draw, download} from '../util/svg'

    export default {
        data () {
            return {
                asd: '',
                content: `* 根节点
        * 第一
        * 商品信息管理模块
            第1
            第2
        + 第三
        - 第四`,
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
                            href: 'https://project.yunser.com/products/7f21a690276611e9b95d1b467f10f6be',
                            target: '_blank',
                            title: '帮助'
                        },
                        {
                            type: 'icon',
                            icon: 'remove_red_eye',
                            click: this.view,
                            title: '查看'
                        },
                        // {
                        //     type: 'icon',
                        //     icon: 'build',
                        //     click: this.comic,
                        //     title: '漫画化'
                        // },
                        {
                            type: 'icon',
                            icon: 'file_download',
                            click: this.dowload,
                            title: '下载'
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
                this.preview()
            },
            preview() {
                let svg = d3.select('svg')
                this.svg = svg
                svg.selectAll('*').remove()
                this.json = funtionDiagram.getJson(this.content)
                console.log(this.json)
                if (this.json) {
                    draw(svg, this.json)
                }
                // set svg size
                this.docWidth = (funtionDiagram.maxColumn + 1) * (140 + 32) + 16 * 2
                this.docHeight = funtionDiagram.maxRow * (40 + 16) + 16 * 2
                svg.attr('width', this.docWidth)
                    .attr('height', this.docHeight)
            },
            view() {
                let data = JSON.stringify(this.json, null, 4)

                let intent = new Intent({
                    action: 'http://webintent.yunser.com/view',
                    type: 'application/json',
                    data: data
                })
                navigator.startActivity(intent, () => {
                    console.log('成功了')
                }, data => {
                    console.log('失败')
                })
            },
            dowload() {
                let html = document.getElementsByTagName('svg')[0].outerHTML
                download(html, this.docWidth, this.docHeight, this.data.value)
            },
            comic() {
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

