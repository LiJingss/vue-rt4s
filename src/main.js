// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import babelCore from 'babel-core'
import './components/font_size.js'
import './components/util.js'
import './assets/css/common.css'
//echart图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
// 字体图标
import "./assets/icon/iconfont.css"

// import Zepto from './assets/js/zepto'
import './assets/js/zepto.mdater.css'
import './assets/js/zepto.mdater.js'
// 时间控件
import $ from 'jquery'
import './assets/date/icalendar.css'
import './assets/date/icalendar.js'
import './assets/city/jquery-weui.min.css'
// import './assets/city/city.css'
import './assets/city/jquery-weui.min.js'
import './assets/city/city-picker.min.js'

import './assets/js/circle-progress.js'



import qs from 'qs'
Vue.prototype.qs = qs
/*import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
Vue.use(Mint);*/
Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false

/*vue-scroller*/
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
// Vue.prototype.http = 'http://www.anmei.com'
var http = 'http://www.anmei.com'
// var http = 'http://192.168.8.106'
// var http = 'http://test.anmeicare.com'
localStorage.setItem('http', http)

import Logo from './components/logo'
Vue.component('v-logo',Logo)
