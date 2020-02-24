import axios from 'axios';
import {gettoken, re} from '@/utilis/token.js';

const ax = axios.create({
	//基地址
	baseURL: process.env.VUE_APP_URL,
	//请求头
	headers: {
		token: gettoken()
	},
	withCredentials: true
});

//获取管理员信息
export function info() {
	return ax({
		url: 'info',
		headers: {
			token: gettoken()
		},
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