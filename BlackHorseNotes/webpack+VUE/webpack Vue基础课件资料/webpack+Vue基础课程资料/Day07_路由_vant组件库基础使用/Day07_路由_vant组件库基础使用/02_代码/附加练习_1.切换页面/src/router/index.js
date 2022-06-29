import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Cate from '@/views/Cate'
import Order from '@/views/Order'
import My from '@/views/My'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/cate",
        component: Cate
    },
    {
        path: "/order",
        component: Order
    },
    {
        path: "/my",
        component: My
    }
]

const router = new VueRouter({
    routes
})

export default router