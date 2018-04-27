<template>
    <ui-page :title="title || page.title" :page="page" :backable="backable" ref="page">
        <div slot="drawer">
            <ui-appbar title=""></ui-appbar>
            <ui-list @itemClick="toggle()">
                <ui-list-item title="功能结构图" to="/">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="用例图" to="/useCase">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="类图" to="/class">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="PlantUML 客户端" to="/plantUml">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="E-R 图" to="/er">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="画图" to="/draw">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="查看" to="/view">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="ProcessOn" to="/processOn">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="关于" to="/about">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
            </ui-list>
        </div>
        <slot></slot>
    </ui-page>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'default'
            },
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggle() {
                console.log(this.$refs.page)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-page {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .page-body {
        min-height: 500px;
    }
    .container-main {
        padding-top: 16px;
    }
    .page-content {
        position: absolute;
        top: 0;
        left: 256px;
        right: 0;
        bottom: 0;
    }
    .page-container {
        padding: 16px;
    }
    .admin-container {
        padding: 16px;
    }
</style>
