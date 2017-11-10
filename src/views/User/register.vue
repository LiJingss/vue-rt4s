<template>
	<div id="register">
		<ul class="item-content">
			<li><p><label><em class="iconfont icon-zhanghu"></em><input type="number" placeholder="请输入手机号码" max="11" ref="logintel"></label></p></li>
			<li><p><label><em class="iconfont icon-yanzhengma"></em><input type="number" placeholder="请输入验证码" max="6" ref="noteCode"></label><button :disabled="disabled" @click="getCode($event)">获取验证码</button></p></li>
		</ul>
		<button class="blue-btn" @click="signIn()">登录</button>
		<p>点击[登录]按钮，即代表您已阅读并同意<router-link to="/password">《用户协议》</router-link></p>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data () {
			return {
				disabled: false
			}
		},
		mounted() {
			
		},
		methods: {
			signIn() {
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
				let noteCode = this.$refs.noteCode;
				if(noteCode.value == ''){
					noteCode.focus();
					return;
				}
				let url = this.http+'/weichat.php/user/login'
				this.$http({
					method: 'post',
					url: url,
					data: this.qs.stringify({
						'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
						'phone' : logintel.value,
						'code' : noteCode.value
					}),
					headers: {
					    'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then( (res) => {
					console.log(res)
					if(res.data.status == 1){
						this.$router.push({path:'/healthperson'})
					}else if(res.data.status == 2){
						this.$router.push({path:'/password',query:{phone:logintel.value}})
					}else {
						this.showDialog(res.data.msg)
					}
				}).catch( (err) => {
					console.log(err);
				});
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
				let url = this.http+'/weichat.php/user/sendcode'
				this.$http.post(url,this.qs.stringify({
					'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
					'phone' : logintel.value
				}))
				.then( (res) => {
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
	#register li .icon-zhanghu {
		font-size: .41rem;
	}
	#register li .icon-yanzhengma {
		font-size: .34rem;
	}
	#register>p {
		font-size: .26rem;
		color: #bbbbbc;
		margin: .35rem 0;
	}
	#register>p a {
		font-size: .26rem;
		color: #47cce2;
	}
</style>