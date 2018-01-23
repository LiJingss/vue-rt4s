<template>
	<div id="changepwd">
		<v-logo></v-logo>
		<ul class="item-content">
			<li>
				<p><label><span>新密码</span>
				<input :type="pwdhide ? 'password' : 'text'" placeholder="请设置8-16位数字、字母" ng-model="pwd" ref='pwd'></label></p>
				<i @click="pwdhide = !pwdhide" :class="pwdhide ? 'iconfont icon-biyan' : 'iconfont icon-yanjing'"></i>
			</li> 
			<li><p><label><span>验证码</span><input type="number" placeholder="请输入验证码" max="6" ref="noteCode"></label><button :disabled="disabled" @click="getCode($event)">获取验证码</button></p></li>
		</ul>
		<button class="blue-btn" @click="confirmPwd">确定</button>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				http:localStorage.http,
				pwdhide: true,
				pwd: '',
				disabled: false,
				phone:this.$route.query.tel
			}
		},
		mounted() {	 
			if(this.$route.query.tel == undefined || this.$route.query.tel == ''){
    			this.$router.replace({ path: '/'})
    		}
		},
		methods: {
			getCode(e) {
				let el = e.currentTarget;
				let logintel = this.phone;
				this.$http({
					method: 'post',
					url: this.http+'/wechat.php/user/sendcode',
					data: this.qs.stringify({
						'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
						'phone' : logintel,
						'templateid' : 204110
					}),
					headers: {
					    'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then( (res) => {
					if(res.data.status == 1){
						this.getnoteCode(60,el,this.disabled)
						this.disabled = true;
						var timer = setTimeout(() =>{
							this.disabled = false;
						},60000)
					}else {
						this.$parent.showDialog(res.data.msg)
					}
				})
				.catch( (err) => {
					console.log(err);
				})
			},
			confirmPwd(){
				let pwd = this.$refs.pwd;
				let noteCode = this.$refs.noteCode;
				if(pwd.value != ''){
					if(this.checkPassword(pwd.value) == false){
						if(pwd.value.length < 8 || pwd.value.lenght >16){
							this.$parent.showDialog('密码为8至16位字符');
							pwd.focus();
							return;
						}else {
							this.$parent.showDialog('密码至少由2种字符组成');
							pwd.focus();
							return;
						}
					}
				}else {
					pwd.focus();
					return;
				}
				let url = this.http+'/wechat.php/user/changepwd'
				this.$http({
					method: 'post',
					url: url,
					data: this.qs.stringify({
						'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
						'code' : noteCode.value,
						'newpassword' : pwd.value
					})
				}).then( (res) => {
					if(res.data.status == 1){
						this.$router.push({path:'/'})
					}else if(res.data.status == 2){
						this.$parent.showDialog(res.data.msg)
						this.$router.replace({ path: '/'})
					}else {
						this.$parent.showDialog(res.data.msg)
					}
				}).catch( (err) => {
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