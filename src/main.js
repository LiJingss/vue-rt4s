// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './components/font_size.js'
import './components/util.js'
import './assets/css/common.css'
// import 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
// 字体图标
import "./assets/icon/iconfont.css"
// 时间控件
import $ from 'jquery'
import './assets/date/icalendar.css'
import './assets/date/icalendar.js'
import './assets/city/jquery-weui.min.css'
// import './assets/city/city.css'
import './assets/city/jquery-weui.min.js'
import './assets/city/city-picker.min.js'

import './assets/js/jquery.knob.js'
import qs from 'qs'
Vue.prototype.qs = qs
/*import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
Vue.use(Mint);*/
Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.withCredentials=true

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
Vue.prototype.http = 'http://www.anmei.com'
