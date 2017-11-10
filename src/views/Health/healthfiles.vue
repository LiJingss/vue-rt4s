<template>
	<div id="healthfiles" >
		<div class="healthfiles-list" >
			<span class="fl">健康管理档案一</span>
			<em class="fr">(已失效)</em>
		</div>
		<button type="button" class="blue-btn" @click='healthfiles()'>建立新的档案</button></router-link>
	</div>
</template>
<script>
export default {
	name: 'healthfiles',
	data () {
		return {
			seen:true
		}
	},
	methods: {
		// 创建档案
		healthfiles(){			
			let url = this.http+'/weichat.php/user/healthfiles'
			this.$http({
		        method: 'post',
		        url: url,   
		        data: this.qs.stringify({
		         	token:'06cd3b2382f7a92d76f62c21946aaf3c'
		         	
		        })
	        })
	        .then((response)=>{
	        	console.log(response.data)
	        })
	        .catch((err)=>{
	        	return this.showDialog('请求服务器错误')
	        })
		}
	}
}
</script>
<style scoped>
#healthfiles{
	margin-top:.2rem;
}
#healthfiles .healthfiles-list{
	width: 90%;
	background: url('../../assets/img/dfile.png') no-repeat;
	background-size: contain;
	height: 1.66rem;
	margin: 0 auto;
	clear: both;
	overflow: hidden;
	padding: 0 .3rem;
	line-height: 1.60rem;
	margin-bottom: .45rem;
}
.healthfiles-list span,.healthfiles-list em{
	font-size: .3rem;
	color: #fff;
}
</style>