<template>
	<div id="changephone">
		<section class="changeone" v-if="changephone">
			<img src="../../assets/img/changephone.png" alt="">
			<p>你的手机号：{{telphone}}</p>
			<p>手机号码用于登录人体4S店等信息。更换手机号后下次登录可以使用新手机号登录。</p>
			<button class="blue-btn" @click="changephone = !changephone">更换手机号码</button>
		</section>

		<section v-else="changephone">
			<v-logo></v-logo>
			<ul class="item-content">
				<li><p><span>新手机号</span><input type="number" placeholder="请输入手机号码" max="11" ref="newtel"></p></li>
				<li><p><span>验证码</span><input type="number" placeholder="请输入验证码" max="6" ref="noteCode" class="noteCode"><button :disabled="disabled" @click="getCode($event)">获取验证码</button></p></li>
			</ul>
			<button class="blue-btn" @click="changeBtn()">更换</button>
		</section>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				http:localStorage.http,
				changephone : true,
				disabled: false,
				telphone:this.$route.query.tel
			}
		},
		mounted() {		 
    		if(this.$route.query.tel == undefined|| this.$route.query.tel == ''){
    			this.$router.replace({ path: '/'})
    		}
  		},
		methods: {
			changeBtn() {
				let newtel = this.$refs.newtel;
				if(newtel.value != ''){
					if(this.checkPhone(newtel.value) == false){
						this.showDialog('请输入正确手机号码')
						newtel.focus();
						return;
					}
				}else {
					newtel.focus();
					return;
				}
				let noteCode = this.$refs.noteCode;
				if(noteCode.value == ''){
					noteCode.focus();
					return;
				}
				this.$http({
					method: 'post',
					url: this.http+'/wechat.php/user/updatenewsphone',
					data: this.qs.stringify({
						'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
						'newphone' : newtel.value,
						'code' : noteCode.value
					}),
					headers: {
					    'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then( (res) => {
					// 参数错误
					if (res.data.status == 0) {
						this.showDialog(res.data.msg);
					}
					//未登录
					if (res.data.status == 2) {
						this.showDialog(res.data.msg);
						this.$router.replace({ path: '/'})
					}
					//成功
					if (res.data.status == 1) {
						// this.telphone=response.data.data
						this.showDialog('手机号更换成功')
						this.$router.replace({ path: '/'})
					}
				}).catch( (err) => {
					this.showDialog(err.data.msg);
				});
			},
			getCode(e) {
				let el = e.currentTarget;
				let newtel = this.$refs.newtel;

				if(newtel.value != ''){
					if(this.checkPhone(newtel.value) == false){
						this.showDialog('请输入正确手机号码')
						newtel.focus();
						return;
					}
				}else {
					newtel.focus();
					return;
				}
				this.$http({
					method: 'post',
					url: this.http+'/wechat.php/user/updatephone',
					data: this.qs.stringify({
						'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
						'newhonetel' : newtel.value
					}),
					headers: {
					    'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then( (res) => {
					if(res.data.status == 1){
						this.$http({
							method: 'post',
							url: this.http+'/wechat.php/user/sendcode',
							data: this.qs.stringify({
								'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
								'phone' : newtel.value,
								'templateid' : 218901
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
								this.showDialog(res.data.msg)
							}
						})
						.catch( (err) => {
							console.log(err);
						})
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
	#changephone .changeone img {
		width: 1.17rem;
		margin: .89rem auto .4rem;
	}
	#changephone .changeone p:nth-child(2) {
		font-size: .34rem;
		color: #424242;
	}
	#changephone .changeone p:nth-child(3) {
		font-size: .26rem;
		color: #b2b2b2;
		width: 90%;
		text-align: left;
		margin: .35rem auto .45rem;
	}
	#changephone ul li p input {
		width: 3.8rem;
	}
	#changephone ul li p input.noteCode{
		width: 3.3rem;
	}
</style>