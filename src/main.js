import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/base.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1/heimamm/public';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
