import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		example: null
	},
	mutations: {
		storeExampleData: (state, val) => {
			state.example = val
		},
	},
	actions: {
		getData: context => {
			// a-sinc functions
		}
	},
	getters: {
	}

})