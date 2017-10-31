<template>
	<div id="register">
		<ul>
			<li><label><i class="iconfont icon-zhanghu"></i><input type="tel" placeholder="请输入手机号码" ref="logintel"></label></li>
			<li><label><i class="iconfont icon-yanzhengma"></i><input type="number" placeholder="请输入验证码" ref="noteCode"></label><span @click="getCode()">获取验证码</span></li>
		</ul>
		<button class="blue-btn" @click="login()">登录</button>
		<p>点击[登录]按钮，即代表您已阅读并同意<router-link to="/password">《用户协议》</router-link></p>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data () {
			return {
				
			}
		},
		methods: {
			login() {
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
				this.$router.push('/password')
	    },
			getCode() {
				alert(1)
			}
		}
	}
</script>
<style>
	#register ul {
		border-top: .01rem solid #e5e5e5;
		background: #fff;
		margin: .2rem 0;
	}
	#register li {
		display: flex;
		align-items: center;
		height: .89rem;
		margin-left: .3rem;
	}
	#register li:not(:last-child) {
		border-bottom: .01rem solid #e5e5e5;
	}
	#register li label {
		display: flex;
	}
	#register li i {
		font-size: .38rem;
		width: .36rem;
		margin-right: .28rem;
	}
	#register li input {
		font-size: .3rem;
		display: block;
		width: 4.45rem;
		height: 100%;
	}
	#register li>span {
		font-size: .3rem;
		padding: 0 .3rem;
		color: #47cce2;
		border-left: .01rem solid #e5e5e5;
	}
	#register li .icon-zhanghu {
		font-size: .41rem;
	}
	#register li .icon-yanzhengma {
		font-size: .34rem;
	}
	#register p {
		font-size: .26rem;
		color: #bbbbbc;
		margin: .35rem 0;
	}
	#register p a {
		font-size: .26rem;
		color: #47cce2;
	}
</style>