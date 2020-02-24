import axios from 'axios';

let url = process.env.VUE_APP_URL;

//获取手机验证码
export function sendsms(data) {
	return axios({
		url: url + '/sendsms',
		method: 'post',
		data,
		withCredentials: true
	});
}