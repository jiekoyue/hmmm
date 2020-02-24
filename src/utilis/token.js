//定义一个token固定变量
const TOKEN = 'token';

//设置token
export function settoken(val) {
	window.localStorage.setItem(TOKEN, val);
}

//获取token
export function gettoken() {
	return window.localStorage.getItem(TOKEN);
}

//删除token
export function re() {
	window.localStorage.removeItem(TOKEN);
}