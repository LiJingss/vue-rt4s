<template>
	<div id="changepwd">
		<ul class="item-content">
			<li>
				<p><label><span>新密码</span>
				<input type="password" placeholder="请设置8-16位数字、字母" v-if="pwdhide" ng-model="pwd" ref='pwd'>
				<input type="text" placeholder="请设置8-16位数字、字母" v-if="!pwdhide" ng-model="pwd" ref='pwd'></label></p>
				<i v-if="pwdhide" v-on:click="changepwd()" class="iconfont icon-biyan"></i>
				<i v-if="!pwdhide" v-on:click="changepwd()" class="iconfont icon-yanjing"></i>
			</li> 
			<li><p><label><span>验证码</span><input type="number" placeholder="请输入验证码" max="6" ref="noteCode"></label><button :disabled="disabled" @click="getCode($event)">获取验证码</button></p></li>
		</ul>
		<button class="blue-btn" @click="">确定</button>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				pwdhide: true,
				pwd: '',
				disabled: false
			}
		},
		methods: {
			changepwd() {
				this.pwdhide = !this.pwdhide
			},
			getCode(e) {
				let el = e.currentTarget;
				let logintel = this.$refs.logintel;
				if(logintel.value != ''){
					if(this.checkPhone(logintel.value) == false){
						this.showDialog('请输入正确手机号码')
						logintel.focus();
						return;
					}
				}else {
					logintel.focus();
					return;
				}
				this.$http({
					method: 'post',
					url: 'http://www.anmei.com/weichat.php/user/sendcode',
					data: this.qs.stringify({
						'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
						'phone' : logintel.value
					}),
					headers: {
					    'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then( (res) => {
					console.log(res)
					alert(res.data.status)
					if(res.data.status == 1){
						this.getnoteCode(60,el,this.disabled)
					}else {
						this.showDialog(res.data.msg)
					}
				})
				.catch( (err) => {
					console.log(err);
				})
			}
		}
	}
</script>

<style>
	#changepwd li i {
		font-size: .38rem;
		color: #333;
	}
</style>