<template>
	<div id="app" v-cloak>
		<router-view v-wechat-title="$route.meta.title"></router-view>
		<p class="dialog" v-if="dialogShow">{{message}}</p>
	</div>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
// import Dialog from './components/dialog'
import './components/font_size.js'
import './components/util.js'
import './assets/css/common.css'
// 字体图标
import "./assets/icon/iconfont.css"
//日历插件
import './assets/js/zepto.mdater.css'
import './assets/js/zepto.mdater.js'
// 时间控件
import $ from 'jquery'
import './assets/date/icalendar.css'
import './assets/date/icalendar.js'
import './assets/city/jquery-weui.min.css'
import './assets/city/jquery-weui.min.js'
import './assets/city/city-picker.min.js'

import './assets/js/circle-progress.js'

/*Dialog.installMessage = function(options) {
	if (options === undefined || options === null) {
		options = {
			message: ''
		}
	} else if (typeof options === 'string' || typeof options === 'number') {
		options = {
			message: options
		}
	}
	var message = Vue.extend(Dialog)

	var component = new message({
		data: options
	}).$mount()
	document.querySelector('body').appendChild(component.$el)
}*/

export default {
	data () {
		return {
			message: '',
			dialogShow: false
		}
	},
	mounted () {
		// this.close()
	},
	methods: {
		showDialog (string) {
			var that = this;
			that.dialogShow = true;
			that.message = string;
			clearTimeout(timer);
			var timer = setTimeout(function(){
				that.dialogShow = false
			}, 2000);
		}
	}
}

</script>

<style>
[v-cloak] {
	display: none!important;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.dialog {
	display: inline-block;
	border-radius: 4px;
	font-size: .24rem;
	background: rgba(0,0,0,.5);
	color: #fff;
	padding: 10px 15px;
	letter-spacing: 1px;
	position: fixed;
	top:50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 999999999;
}
</style>
