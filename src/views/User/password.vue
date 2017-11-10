<template>
	<div id="password">
		<ul class="item-content">
			<li>
				<p><label><em class="iconfont icon-mima"></em>
				<input type="password" placeholder="请设置8-16位数字、字母" v-if="pwdhide" ng-model="pwd" ref='pwd'>
				<input type="text" placeholder="请设置8-16位数字、字母" v-if="!pwdhide" ng-model="pwd" ref='pwd'></label></p>
				<i v-if="pwdhide" v-on:click="changepwd()" class="iconfont icon-biyan"></i>
				<i v-if="!pwdhide" v-on:click="changepwd()" class="iconfont icon-yanjing"></i>
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
				let phone = this.$route.query.phone;
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
				let url = this.http+'/weichat.php/user/register'
				this.$http({
					method: 'post',
					url: url,
					data: this.qs.stringify({
						'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
						'phone' : phone,
						'password' : pwd.value
					})
				}).then( (res) => {
					if(res.data.status == 1){
						this.$router.push({path:'/profile'})
					}else if(res.data.status == 3){
						this.showDialog(res.data.msg)
					}else {
						this.showDialog(res.data.msg)
					}
				}).catch( (err) => {
					console.log(err);
				})
			}
		}
	}
</script>
<style>
	#password li em {
		font-size: .38rem;
	}
	#password li i {
		font-size: .38rem;
		color: #333;
	}
</style>