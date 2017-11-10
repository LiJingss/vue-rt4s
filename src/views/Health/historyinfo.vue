<template>
	<div id="historyinfo" >
		<ul class="item-content historyinfo-item-content">
			<li>
				<p><span>本人病史</span></p>
				<textarea placeholder="如无病史请填无" ref="mimeHistory"></textarea>
			</li>
			<li>
				<p><span>本人服药情况</span></p>
				<textarea placeholder="如无服药情况请填无" ref="selfMedication"></textarea>
			</li>
			<li>
				<p><span>家族病史</span></p>
				<textarea placeholder="如无病史请填无" ref="familyHistory"></textarea>
			</li>
		</ul>
		<button type="button" class="blue-btn" @click='historyinfo()'>确定</button></router-link>
	</div>
</template>
<script>
export default {
	name: 'historyinfo',
	data () {
		return {
			
		}
	},
	methods: {
		historyinfo(){
			let mimeHistory=this.$refs.mimeHistory.value;
			let selfMedication=this.$refs.selfMedication.value;
			let familyHistory=this.$refs.familyHistory.value;
			let url = this.http+'/weichat.php/user/historyinfo'
			this.$http({
		        method: 'post',
		        url:url,   
		        data: this.qs.stringify({
		         	token:'06cd3b2382f7a92d76f62c21946aaf3c',
		         	mimeHistory:mimeHistory,
		         	selfMedication:selfMedication,
		         	familyHistory:familyHistory
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
#historyinfo{
	margin-top:.2rem;
}
#historyinfo .historyinfo-item-content{
	background: none;
	border-bottom: none;
}
#historyinfo .historyinfo-item-content li{
	background: #fff;
	margin-bottom: .2rem;
	border-bottom: none;
}
#historyinfo .historyinfo-item-content li p{
	border-bottom: .01rem solid #e5e5e5;
}
#historyinfo .historyinfo-item-content li textarea{
	display: block;
	width: 100%;
	resize: none;
	padding: .24rem .3rem;
	height: 1.46rem;
	border-bottom: .01rem solid #e5e5e5;
}
</style>