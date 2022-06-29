import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import News from '@/views/News'
import Sports from '@/views/Sports'
import SportsHome from '@/views/SportsHome'
import SportsIn from '@/views/SportsIn'
import SportsOut from '@/views/SportsOut'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: "/news",
        component: News
    },
    {
        path: "/sports",
        component: Sports,
        children: [
            {
                path: "home",
                component: SportsHome
            },
            {
                path: "in",
                component: SportsIn
            },
            {
                path: "out",
                component: SportsOut
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router