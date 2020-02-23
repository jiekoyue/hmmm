import axios from 'axios';

export function sendsms(data) {
	return axios({
		url: process.env.VUE_APP_URL + '/sendsms',
		method: 'post',
		data,
		withCredentials: true
	});
}