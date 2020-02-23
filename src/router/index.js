import Vue from 'vue';
import vueRouter from 'vue-router';
import login from '../views/login/index.vue';
import index from '../views/admin/index.vue';

const routerPush = vueRouter.prototype.push;
vueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
};
Vue.use(vueRouter);
const router = new vueRouter({
	routes: [
		{
			path: '/login',
			component: login
		},
		{
			path: '/index',
			component: index
		}
	]
});
export default router;