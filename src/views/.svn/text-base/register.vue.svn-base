<template>
	<div id="register">
		<ul>
			<li><label><i class="iconfont icon-zhanghu"></i><input type="tel" placeholder="请输入手机号码"></label></li>
			<li><label><i class="iconfont icon-yanzhengma"></i><input type="number" placeholder="请输入验证码"></label><span>获取验证码</span></li>
			<li><label><i class="iconfont icon-mima"></i>
				<input type="password" placeholder="请设置8-16位数字、字母" v-if="pwdhide" ng-model="pwd">
				<input type="text" placeholder="请设置8-16位数字、字母" v-if="!pwdhide" ng-model="pwd"></label>
				<em v-if="pwdhide" v-on:click="changepwd()" class="iconfont icon-biyan"></em>
				<em v-if="!pwdhide" v-on:click="changepwd()" class="iconfont icon-yanjing"></em>
			</li> 
		</ul>
		<button class="blue-btn" @click="showDialog()">绑定</button>
		<p>点击[绑定]按钮，即代表您已阅读并同意<router-link to="/profile">《用户协议》</router-link></p>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data () {
			return {
				pwdhide: true,
				pwd: '123'
			}
		},
		methods: {
			changepwd() {
				this.pwdhide = !this.pwdhide
			},
			showDialog() {
				this.$kiko_message({
			      message: '请输入正常手机号码号码',
			      time: 3000
			    })
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
	#register li>em {
		margin-left: 1.35rem;
		font-size: .38rem;
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