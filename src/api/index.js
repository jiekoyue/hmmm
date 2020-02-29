import axios from 'axios';
import {gettoken, re} from '@/utilis/token.js';

const ax = axios.create({
	//基地址
	baseURL: process.env.VUE_APP_URL,
	//请求头
	// headers: {
	// 	token: gettoken()
	// },
	withCredentials: true
});

// 添加请求拦截器
ax.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	config.headers.token = gettoken();
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

//获取管理员信息
export function info() {
	return ax({
		url: 'info',
		// headers: {
		// 	token: gettoken()
		// },
	});
}

//退出
export function logout() {
	re();
	return ax({
		url: 'logout'
	});
}

//获取学科列表
export function infolist(params) {
	return ax({
		url: '/subject/list',
		params,
	});
}

//添加学科
export function addsubject(data) {
	return ax({
		url: '/subject/add',
		method: 'post',
		data,
	});
}

//修改学科状态
export function amend(id) {
	return ax({
		url: '/subject/status',
		method: 'post',
		data: {
			id,
		}
	});
}

//学科删除接口
export function delsub(id) {
	return ax({
		url: '/subject/remove',
		method: 'post',
		data: {
			id,
		}
	});
}

//学科编辑接口 /subject/edit
export function editsub(data) {
	return ax({
		url: '/subject/edit',
		method: 'post',
		data,
	});
}

//获取企业列表
export function priselist(params) {
	return ax({
		url: '/enterprise/list',
		params,
	});
}

//修改企业状态 /enterprise/status
export function prisestatus(id) {
	return ax({
		url: '/enterprise/status',
		method: 'post',
		data: {
			id,
		}
	});
}

//添加企业
export function addprise(data) {
	return ax({
		url: '/enterprise/add',
		method: 'post',
		data,
	});
}

//企业删除接口
export function delpri(id) {
	return ax({
		url: '/enterprise/remove',
		method: 'post',
		data: {
			id,
		}
	});
}

//企业编辑接口
export function editpri(data) {
	return ax({
		url: '/enterprise/edit',
		method: 'post',
		data,
	});
}

//获取用户列表
export function userinfo(params) {
	return ax({
		url: '/user/list',
		params,
	});
}

//创建用户
export function adduser(data) {
	return ax({
		url: '/user/add',
		method: 'post',
		data,
	});
}

//修改用户状态 /enterprise/status
export function userstatus(id) {
	return ax({
		url: '/user/status',
		method: 'post',
		data: {
			id,
		}
	});
}

//用户删除接口
export function deluser(id) {
	return ax({
		url: '/user/remove',
		method: 'post',
		data: {
			id,
		}
	});
}

//用户编辑接口
export function edituser(data) {
	return ax({
		url: '/user/edit',
		method: 'post',
		data,
	});
}

//获取题目列表
export function questioninfo(params) {
	return ax({
		url: '/question/list',
		params
	});
}

//题目删除接口
export function delques(id) {
	return ax({
		url: '/question/remove',
		method: 'post',
		data: {
			id,
		}
	});
}

//题目编辑接口
export function editques(data) {
	return ax({
		url: '/question/edit',
		method: 'post',
		data,
	});
}

//题目用户状态 /enterprise/status
export function quesstatus(id) {
	return ax({
		url: '/question/status',
		method: 'post',
		data: {
			id,
		}
	});
}

//发布题目
export function addques(data) {
	return ax({
		url: '/question/add',
		method: 'post',
		data,
	});
}

//头部数据
export function dataTitle() {
	return ax({
		url: '/data/title',
		method: 'post'
	})
}

//企业题目数据统计数据
export function dataSta() {
	return ax({
		url: '/data/statistics',
		method: 'post'
	})
}

//热门城市题目统计数据
export function hotCities() {
	return ax({
		url: '/data/hot_cities',
		method: 'post'
	})
}