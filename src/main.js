import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/base.css';
import axios from 'axios';
import store from '@/store/index.js';
import '@/fliters/fliters.js'
import sbjinput from '@/components/sbjinput.vue';

Vue.component('sbjinput', sbjinput);
axios.defaults.baseURL = process.env.VUE_APP_URL;
//配置全局请求头
axios.defaults.headers.common['token'] = localStorage.getItem('token');
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app');
