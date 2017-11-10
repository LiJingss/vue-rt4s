<template>
	<div id="app">
		<router-view v-wechat-title="$route.meta.title"></router-view>
	</div>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
import Dialog from './components/dialog'

Dialog.installMessage = function(options) {
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
}

export default Dialog

</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
