// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './components/font_size.js'
import './components/util.js'
import './assets/css/common.css'
import "./assets/icon/iconfont.css"

Vue.use(require('vue-wechat-title'))

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { 
		App
	}
})

Vue.prototype.$goRoute = function (index) {
	this.$router.push(index)
}

