<template>
	<div id="healthinfo">
		<v-logo></v-logo>
		<div class="flexbox">
			<p>
				<router-link :to="{path:'/baseinfo',query:{health_id:health_id}}">基础资料<i class="iconfont icon-wancheng" v-if="healthbaseinfo == 1"></i></router-link>
				<router-link :to="{path:'/caseinfo',query:{health_id:health_id}}">症状资料<i class="iconfont icon-wancheng" v-if="healthcaseinfo == 1"></i></router-link>
				<router-link :to="{path:'/historyinfo',query:{health_id:health_id}}">病史资料<i class="iconfont icon-wancheng" v-if="healthhistoryinfo == 1"></i></router-link>
			</p>
		</div>
	</div>
</template>
<script>
	export default {
	name: 'healthinfo',
	data () {
		return {
			http:localStorage.http,
			health_id:this.$route.query.health_id,
			healthbaseinfo:'',
			healthcaseinfo:'',
			healthhistoryinfo:'',
			showPopup: false
		}
	},
  	created(){
  		let health_id=this.health_id
		let url = this.http+'/wechat.php/health/healthinfo'
		this.$http({
			method: 'post',
			url: url,   
			data: this.qs.stringify({
				token:'06cd3b2382f7a92d76f62c21946aaf3c',
				health_id:health_id
			})
		}).then((res)=>{
			if(res.data.status == 1){
				let Data=res.data.data
				this.healthbaseinfo=Data.healthbaseinfo
				this.healthcaseinfo=Data.healthcaseinfo
				this.healthhistoryinfo=Data.healthhistoryinfo
			}
			if (res.data.status == 2) {
				this.$parent.showDialog(response.data.msg)
				this.$router.replace({ path: '/'});
			}
		}).catch((err)=>{

		})
	},
	mounted() {
		
	}
}
</script>
<style type="text/css" scoped>
	#healthinfo {
		background:#fff;
		min-height: 100vh;
	}
	#healthinfo .flexbox {
		height: calc(100vh - 1.08rem);
		min-height: 6rem;
		display: flex;
		align-items: center;
	}
	#healthinfo p {
		margin: 0 auto;
	}
	#healthinfo p a {
		width: 5.08rem;
		height: 1.1rem;
		font-size: .32rem;
		color: #fff;
		display: block;
		line-height: 1rem;
		position: relative;
		margin: 0 auto;
		margin-bottom: 1.12rem;
	}
	#healthinfo p a:last-child {
		margin-bottom: 0;
	}
	#healthinfo p a i {
		position: absolute;
		left: 66%;
		font-size: .36rem;
	}
	#healthinfo p a:nth-child(1) {
		background: url('../../assets/img/health01.png') no-repeat;
		background-size: contain;
	}
	#healthinfo p a:nth-child(2) {
		background: url('../../assets/img/health02.png') no-repeat;
		background-size: contain;
	}
	#healthinfo p a:nth-child(3) {
		background: url('../../assets/img/health03.png') no-repeat;
		background-size: contain;
	}
</style>