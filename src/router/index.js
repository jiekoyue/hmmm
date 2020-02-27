import Vue from 'vue';
import vueRouter from 'vue-router';
import login from '../views/login/index.vue';
import index from '../views/index/index.vue';
import subject from '../views/index/components/subjectList.vue';
import business from '../views/index/components/business.vue';
import chart from '../views/index/components/chart.vue';
import question from '../views/index/components/question.vue';
import user from '../views/index/components/user.vue';
//导入进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
//token
import {gettoken, re} from '@/utilis/token.js';
import {info} from '@/api/index.js';
import {Message} from 'element-ui';
//导入vuex
import store from '@/store/index.js';

const routerPush = vueRouter.prototype.push;
vueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
};
Vue.use(vueRouter);
const router = new vueRouter({
	routes: [
		{
			path: '/login',
			component: login,
			meta: {title: '登录'}
		},
		{
			path: '/index',
			component: index,
			meta: {title: '首页'},
			children: [
				{
					path: 'subject',
					component: subject,
					meta: {title: '学科列表'}
				},
				{
					path: 'business',
					component: business,
					meta: {title: '企业列表'}
				},
				{
					path: 'chart',
					component: chart,
					meta: {title: '数据概览'}
				},
				{
					path: 'question',
					component: question,
					meta: {title: '题库列表'}
				},
				{
					path: 'user',
					component: user,
					meta: {title: '用户列表'}
				},

			]
		},
		{
			path: '',
			redirect: '/login'
		}
	]
});
let whirt = ['/login'];
router.beforeEach((to, from, next) => {
	// ...
	NProgress.start();
	if (whirt.includes(to.path)) {
		next();
	} else if (!gettoken()) {
		Message.error('请先登录');
		NProgress.done();
		next('login');
	} else {
		info().then(msg => {
			if (msg.data.code == 206) {
				re();
				Message.error('登录异常，请重新登录');
				NProgress.done();
				next('login');
			} else {
				store.commit('stname', msg.data.data.username);
				store.commit('sturl', msg.data.data.avatar);
				next();
			}
		});
	}
});
router.afterEach((to) => {
	// ...
	NProgress.done();
	document.title = to.meta.title;
});
export default router;