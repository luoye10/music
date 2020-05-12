import Vue from 'vue';
import VueRouter from 'vue-router';

// 动态引入的模块能动态加载，分文件打包
// 注释里的模块名则是打包时生成的代码块的名字
const Index = () => import(/* webpackChunkName: "Index" */ '@/components/Index');
const A = () => import(/* webpackChunkName: "A"*/ '@/components/A');
const B = () => import(/* webpackChunkName: "B"*/ '@/components/B');
const HomePage = () => import('@/components/HomePage');
const LoginBox = () => import('@/components/LoginBox');

const routes = [
    {
        path: '/',
        redirect: '/LoginBox'
    },
    {
        path: '/HomePage',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/LoginBox',
        name: 'LoginBox',
        component: LoginBox
    },
]
Vue.use(VueRouter);

export default new VueRouter({
    routes    
})