import Vue from 'vue';
import vueRouter from 'vue-router';
import login from '../views/login/index.vue';
import index from '../views/index/index.vue';
import children from './childrens.js';
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
			meta: {title: '首页', roles: ['超级管理员', '管理员', '老师', '学生']},
			children,
		},
		{
			path: '',
			redirect: '/index'
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
			window.console.log(msg);
			if (msg.data.code == 200) {
				if (msg.data.data.status) {
					store.commit('stname', msg.data.data.username);
					store.commit('sturl', msg.data.data.avatar);
					store.commit('setrole', msg.data.data.role);
					if (from.path == '/login') {
						Message.success('登录成功');
					}
					if (to.meta.roles.includes(msg.data.data.role)) {
						next();
					} else {
						Message.warning('该账号暂没有权限访问该网站');
						NProgress.done();
						next(from.path)
					}
				} else {
					re();
					Message.warning('账号被禁用，请联系管理员');
					NProgress.done();
					next('login');
				}
			} else {
				re();
				Message.error('登录异常，请重新登录');
				NProgress.done();
				next('login');
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