import Vue from 'vue'
import router from './router'
import { store } from './store/store'

// import Axios from 'axios'
// Vue.prototype.axios = Axios

// import * as firebase from './firebase/init'
// Vue.prototype.fb = firebase

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')