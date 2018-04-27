import page from './page'
import ace from './ace.vue'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('ace-editor', ace)
    }
}
