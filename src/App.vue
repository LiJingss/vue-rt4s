<template>
	<div id="app">
		<router-view v-wechat-title="$route.meta.title"></router-view>
	</div>
</template>

<script>
import Dialog from './components/dialog'

/*class AppComponent extends component {
	mounted() {
				this.login()
	},
	methods: {
		login() {
			this.$http.post('http://www.anmei.com/weichat.php/index/information')
				.then(function (response) {
					if (response.data.status == 1) {
						this.$router.push('/')
					}
				}) 
				.catch(function(err){
					console.log(err)
					alert(2)
				})
		}
	}
}*/
export default {
	data(){
		return{
			a:123
		}
	},
	mounted() {
		this.login()
	},
	methods: {
		installMessage(options) {
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
		},
		login() {
			/*if(this.a == 1){
				this.$router.push('/')
			}*/
			this.$http.post('http://www.anmei.com/weichat.php/index/information')
				.then(function (response) {
					if (response.data.status == 1) {
						alert(1)
						this.$router.replace({ path: '/PageB'})

					}
				})
		}
	}
}

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
