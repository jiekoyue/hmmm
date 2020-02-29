import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		userName: '',
		userUrl: '',
		jurisdiction: '',
	},
	mutations: {
		stname(state, name) {
			state.userName = name;
		},
		sturl(state, url) {
			state.userUrl = url;
			state.userUrl = process.env.VUE_APP_URL + '/' + url;
		},
		setrole(state, url) {
			state.jurisdiction = url;
		}
	}
});

export default store;