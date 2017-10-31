<template>
	<div id="password">
		<ul>
			<li><label><i class="iconfont icon-mima"></i>
				<input type="password" placeholder="请设置8-16位数字、字母" v-if="pwdhide" ng-model="pwd" ref='pwd'>
				<input type="text" placeholder="请设置8-16位数字、字母" v-if="!pwdhide" ng-model="pwd" ref='pwd'></label>
				<em v-if="pwdhide" v-on:click="changepwd()" class="iconfont icon-biyan"></em>
				<em v-if="!pwdhide" v-on:click="changepwd()" class="iconfont icon-yanjing"></em>
			</li> 
		</ul>
		<button class="blue-btn" @click="setPassword()">确定</button>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data () {
			return {
				pwdhide: true,
				pwd: ''
			}
		},
		methods: {
			changepwd() {
				this.pwdhide = !this.pwdhide
			},
			setPassword() {
				let pwd = this.$refs.pwd;
				if(pwd.value != ''){
					if(this.checkPassword(pwd.value) == false){
						if(pwd.value.length < 8 || pwd.value.lenght >16){
							this.showDialog('密码为8至16位字符');
							pwd.focus();
							return;
						}else {
							this.showDialog('密码至少由2种字符组成');
							pwd.focus();
							return;
						}
					}
				}else {
					pwd.focus();
					return;
				}
			}
		}
	}
</script>
<style>
	#password ul {
		border-top: .01rem solid #e5e5e5;
		border-bottom: .01rem solid #e5e5e5;
		background: #fff;
		margin: .2rem 0;
	}
	#password li {
		display: flex;
		align-items: center;
		height: .89rem;
		margin-left: .3rem;
	}
	#password li label {
		display: flex;
	}
	#password li i {
		font-size: .38rem;
		width: .36rem;
		margin-right: .28rem;
	}
	#password li input {
		font-size: .3rem;
		display: block;
		width: 4.45rem;
		height: 100%;
	}
	#password li>em {
		margin-left: 1.35rem;
		font-size: .38rem;
	}
</style>