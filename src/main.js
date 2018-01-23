import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// import babelCore from 'babel-core'
import Promise from 'es6-promise';
Promise.polyfill();
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

import qs from 'qs'
Vue.prototype.qs = qs

Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false

import VueScroller from 'vue-scroller';
Vue.use(VueScroller);

import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.withCredentials=true

router.beforeEach((to,from,next)=>{
	if(to.path==='/'){
		next()
	}else{
		if(to.meta.requiresAuth && !localStorage.getItem('accessToken')){
			next({path:'/'})
		}else{
			next()
		}
	}
})

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { 
		App
	}
})
// 全局路由跳转
Vue.prototype.$goRoute = function (index) {
	this.$router.push(index)
}
//请求接口全局域名
//var http = 'http://www.anmei.com'
//var http = 'http://test.anmeicare.com'
// var http = 'http://192.168.8.106'
var http = 'http://www.rt4st.org'
localStorage.setItem('http', http)

import Logo from './components/logo'
Vue.component('v-logo',Logo)