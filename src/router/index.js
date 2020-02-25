import Vue from 'vue';
import vueRouter from 'vue-router';
import login from '../views/login/index.vue';
import index from '../views/index/index.vue';
import subject from '../views/index/components/subjectList.vue';
import business from '../views/index/components/business.vue';
import chart from '../views/index/components/chart.vue';
import question from '../views/index/components/question.vue';
import user from '../views/index/components/user.vue';

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
				},
				{
					path: 'business',
					component: business
				},
				{
					path: 'chart',
					component: chart
				},
				{
					path: 'question',
					component: question
				},
				{
					path: 'user',
					component: user
				},

			]
		}
	]
});
export default router;