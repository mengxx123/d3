<template>
    <my-page title="PlantUml 第三方客户端" :page="page">
        <div class="code-box">
            <ace-editor v-model="content" />
        </div>
        <div class="preview-box">
            <img :src="resultSrc" v-if="resultSrc">
        </div>
    </my-page>
</template>

<script>
    const plantumlEncoder = require('plantuml-encoder')

    export default {
        data () {
            return {
                content: `A -> C: Hello`,
                resultSrc: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/plantuml/help',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.render()
        },
        methods: {
            render() {
                var encoded = plantumlEncoder.encode(this.content)
                console.log(encoded) // SrJGjLDmibBmICt9oGS0

                var url = 'https://www.plantuml.com/plantuml/svg/' + encoded
                this.resultSrc = url
            }
        },
        watch: {
            content() {
                this.render()
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
