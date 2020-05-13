import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/global.css';
import EvaIcons from 'vue-eva-icons';
import router from './router/router';

Vue.use(ElementUI);
Vue.use(EvaIcons);


// import './error/error';
import App from './App';
// import router from './router/router'

let app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
console.log(app)