import Vue from 'vue'
import router from './router'
import { store } from './store/store'
import Axios from 'axios'
import App from './App.vue'


Vue.config.productionTip = false

Vue.prototype.axios = Axios

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
