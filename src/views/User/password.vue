<template>
	<div id="password">
		<div class="logo">
			<img src="../../assets/img/nav.png"/>
		</div>
		<ul class="item-content">
			<li>
				<p><label><em class="iconfont icon-mima"></em>
				<input :type="pwdhide ? 'password' : 'text'" placeholder="请设置8-16位数字、字母" v-model="pwd" ref='pwd'></label></p>
				<i @click="pwdhide = !pwdhide" :class="pwdhide ? 'iconfont icon-biyan' : 'iconfont icon-yanjing'"></i>
			</li> 
		</ul>
		<button v-if="pwd!=''" class="blue-btn" @click="setPassword()">确定</button>
		<button v-else class="blue-btn" style="background:#cacdd6;">确定</button>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data () {
			return {
				http:localStorage.http,
				pwdhide: true,
				pwd: ''
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
		methods: {
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
				let url = this.http+'/wechat.php/user/register'
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
						localStorage.setItem('accessToken' ,'1')
						window.location.href='http://test.anmeicare.com/wechat.php/user/getopenid'
//						 this.$router.push({path:'/profile'})
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
		color: #999;
	}
	#password li i {
		font-size: .38rem;
		color: #999999;
	}
</style>