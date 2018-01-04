<template>
	<div id="register">
		<div class="logo">
			<img src="../../assets/img/nav.png"/>
		</div>
		<ul class="item-content">
			<li><p><em class="iconfont icon-zhanghu"></em><input type="number" placeholder="请输入手机号码" max="11" ref="logintel" v-model="tel"></p></li>
			<li><p><em class="iconfont icon-yanzhengma"></em><input type="number" placeholder="请输入验证码" max="6" ref="noteCode" v-model="code" class="code"><button :disabled="disabled" @click="getCode($event)">获取验证码</button></p></li>
		</ul>
		<button v-if="tel!=''&&code!=''" class="blue-btn" @click="signIn()">登录</button>
		<button v-else class="blue-btn" style="background:#cacdd6;">登录</button>
		<p>点击[登录]按钮，即代表您已阅读并同意<router-link to="/agreement">《用户协议》</router-link></p>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data () {
			return {
				http:localStorage.http,
				disabled: false,
				tel: '',
				code: ''
			}
		},
		created() {
			var url = this.http+'/wechat.php/user/checklogin';
			this.$http.post(url,this.qs.stringify({
				'token' : "06cd3b2382f7a92d76f62c21946aaf3c"
			}))
			.then( (res) => {
				if(res.data.status == 1){
					if(res.data.data == 1){
						this.$router.replace({path:'/profile'})
						return
					}else{
						this.$router.replace({path:'/healthindex'})
					}
				}
			})
			.catch( (err) => {
				console.log(err);
			})
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
				let url = this.http+'/wechat.php/user/login'
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
					if(res.data.status == 1){
						localStorage.setItem('accessToken' ,'1')
						window.location.href='http://test.anmeicare.com/wechat.php/user/getopenid'
//						this.$router.push({path:'/healthindex'})
						/*if(res.data.data==1){
							this.$router.push({path:'/profile'})
						}else if(res.data.data==2){
							this.$router.push({path:'/healthindex'})
						}else if(res.data.data==3){
							this.$router.push({path:'/healthindex'})
						}*/						
					}else if(res.data.status == 2){
						this.$router.replace({path:'/password',query:{phone:logintel.value}})
					}else {
						this.showDialog(res.data.msg)
					}
				}).catch( (err) => {
					console.log(err);
				});
			},
			getCode(e) {
				this.disabled = true;
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
				var url = this.http+'/wechat.php/user/sendcode';
				this.$http.post(url,this.qs.stringify({
					'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
					'phone' : logintel.value,
					'templateid' : 204110
				}))
				.then( (res) => {
					if(res.data.status == 1){
						this.getnoteCode(60,el,this.disabled)
						this.disabled = true;
						var timer = setTimeout(() =>{
							this.disabled = false;
						},60000)
					}else {
						this.disabled = false;
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
	#register .item-content label{
		width: 100%;
		display: block;
		clear: both;
		overflow: hidden;
		zoom: 1;
		padding-top: .24rem;
	}
	#register li .icon-zhanghu {
		font-size: .41rem;
	}
	#register li .icon-yanzhengma {
		font-size: .34rem;
		margin-top: .06rem;
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
	#register .item-content p em{
		color: #999999;
		float: left;
		
	}
	#register .item-content p input{
		float: left;
		margin-left: .2rem;
	}
	#register .item-content p input.code{
		width: 59%;
	}
	#register .item-content li p{
		width: 100%;
		display: block;
		clear: both;
		overflow: hidden;
		zoom: 1;
		padding-top: .22rem;
		box-sizing: border-box;
	}
	#register .item-content button{
		float: left;
	}
</style>