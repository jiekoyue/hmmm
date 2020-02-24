import Vue from 'vue';
import vueRouter from 'vue-router';
import login from '../views/login/index.vue';
import index from '../views/index/index.vue';
import subject from '../views/index/components/subjectList.vue';

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
			component: index,
			children: [
				{
					path: 'subject',
					component: subject
				}
			]
		}
	]
});
export default router;