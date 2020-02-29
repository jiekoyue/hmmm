import subject from '../views/index/components/subjectList.vue';
import business from '../views/index/components/business.vue';
import chart from '../views/index/components/chart.vue';
import question from '../views/index/components/question.vue';
import user from '../views/index/components/user.vue';

export default [
	{
		path: 'subject',
		component: subject,
		meta: {
			title: '学科列表',
			roles: ['超级管理员', '管理员', '老师', '学生'],
			icon: 'el-icon-notebook-2',
		}
	},
	{
		path: 'business',
		component: business,
		meta: {
			title: '企业列表', roles: ['超级管理员', '管理员', '老师'],
			icon: 'el-icon-office-building',
		}
	},
	{
		path: 'chart',
		component: chart,
		meta: {
			title: '数据概览', roles: ['超级管理员', '管理员'],
			icon: 'el-icon-pie-chart',
		}
	},
	{
		path: 'question',
		component: question,
		meta: {
			title: '题库列表', roles: ['超级管理员', '管理员', '老师', '学生'],
			icon: 'el-icon-edit-outline',
		}
	},
	{
		path: 'user',
		component: user,
		meta: {
			title: '用户列表', roles: ['超级管理员', '管理员'],
			icon: 'el-icon-user',
		}
	},

]