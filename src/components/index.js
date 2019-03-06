import page from './page'
import ace from './ace.vue'
import appList from './app-list'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('ace-editor', ace)
        Vue.component('app-list', appList)
    }
}
