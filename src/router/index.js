import Vue from 'vue';
import vueRouter from 'vue-router';
import login from '../views/login/index.vue';

Vue.use(vueRouter);
const router = new vueRouter({
	routes: [
		{
			path: '/login',
			component: login
		}
	]
});
export default router;