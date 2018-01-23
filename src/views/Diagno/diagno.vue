<template>
	<div id="diagno">
		<v-logo></v-logo>
		<p v-bind:id="health_id">
			<router-link to="/intro"><i class="iconfont icon-jianjie"></i>初诊简介</router-link>
			<a @click="diagno()"><i class="iconfont icon-hand"></i>初诊手诊</a>
			<a @click="finishhand"><i class="iconfont icon-tijianxuzhi"></i>初诊体检</a>
			<router-link :to="{path:'/healthinfo',query: {health_id:health_id}}"><i class="iconfont icon-wenjuan"></i>健康资料</router-link>
		</p>
	</div>
</template>
<script>
	export default {
		name: 'diagno',
		data () {
			return {
				http:localStorage.http,
				health_id:'',
				is_pay:null,
				is_finish: null,
				status:''
			}
		},
		created() {
			if(this.$route.query.health_id == undefined){
				let url = this.http+'/wechat.php/Health/userhealthId'
				this.$http({
					method:'post',
					url:url,
					data: this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c'
					})
				})
				.then((res)=>{
					if(res.data.status == 3) {
						this.$parent.showDialog(res.data.msg);
						this.$router.replace({ path: '/profile'})
						return
					}else if(res.data.status == 0){
						this.$parent.showDialog("请先建立档案")
						this.$router.replace({ path: '/healthindex'})
						return
					}else if(res.data.status == 1){
						this.health_id=res.data.data;
						this.gethand()
					}else if(res.data.status == 2) {
						this.$parent.showDialog(res.data.msg);
						this.$router.replace({ path: '/'})
					}
				})
			}else {
				this.health_id=this.$route.query.health_id;
				this.gethand()
			}
		},
		methods: {
			diagno(){//判断是否支付
				if(this.status == 3){
					this.$parent.showDialog("请先建立档案")
					this.$router.push({ path: '/healthindex'})
				}else if(this.is_pay == 0){
					// window.location.href='http://www.rt4st.org/dist/#/order/payment?health_id'+health_id
					// this.$router.replace({path:'order/payment',query: {health_id:health_id}});
					window.location.href='http://www.rt4st.org/wechat.php/pay/getopenid'
				}else if(this.is_pay ==1){
					this.$router.push({path:'/hand',query: {health_id:this.health_id}});
				}
			},
			finishhand() {
				if(this.is_finish == 0){
					return this.$parent.showDialog('请先完成初诊手诊')
				}else {
					this.$router.push({path:'/checkup',query: {health_id:this.health_id}});
				}
			},
			gethand() {
				let url = this.http+'/wechat.php/diagno/diagnoindex'
				this.$http({
					method:'post',
					url:url,
					data: this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						health_id:this.health_id
					})
				})
				.then((res)=>{
					if(res.data.status == 1){
						this.is_pay=res.data.data.is_pay;
						this.is_finish=res.data.data.is_finish;
					}else if(res.data.status == 2) {
						this.$router.replace({ path: '/'})
						this.$parent.showDialog(res.data.msg);
					}else if(res.data.status==3){
						this.status=res.data.status
					}
				})
			}
		}
	}
</script>
<style>
	#diagno {
		background: #fff;
		min-height: 100vh;
		display: block;
	}
	#diagno p {
		width: 100%;
		margin-top: .2rem;
		min-height: 9.6rem;
	}
	#diagno p a {
		font-size: .38rem;
		width: 92%;
		height: 2.1rem;
		line-height: 2rem;
		margin: .4rem auto 0;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content:center;
	}
	#diagno p a i {
		font-size: .6rem;
		margin-right: .15rem;
	}
	#diagno p a:first-child {
		background: url('../../assets/img/diagno_1.png') no-repeat;
		background-size: contain;
	}
	#diagno p a:nth-child(2){
		background: url('../../assets/img/diagno_2.png') no-repeat;
		background-size: contain;
	}
	#diagno p a:nth-child(3){
		background: url('../../assets/img/diagno_3.png') no-repeat;
		background-size: contain;
	}
	#diagno p a:nth-child(4){
		background: url('../../assets/img/diagno_4.png') no-repeat;
		background-size: contain;
	}
</style>