import Vue from 'vue'
import Router from 'vue-router'

const Function = resolve => require(['@/views/Function'], resolve)
const UseCase = resolve => require(['@/views/UseCase'], resolve)
const PlantUml = resolve => require(['@/views/PlantUml'], resolve)
const PlantUmlHelp = resolve => require(['@/views/PlantUmlHelp'], resolve)
const ER = resolve => require(['@/views/ER'], resolve)
const Draw = resolve => require(['@/views/Draw'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Function
    },
    {
        path: '/useCase',
        component: UseCase
    },
    {
        path: '/plantUml',
        component: PlantUml
    },
    {
        path: '/plantUml',
        component: PlantUmlHelp
    },
    {
        path: '/er',
        component: ER
    },
    {
        path: '/draw',
        component: Draw
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
