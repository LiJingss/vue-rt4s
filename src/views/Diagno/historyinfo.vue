<template>
	<div id="historyinfo" >
		<v-logo></v-logo>
		<ul class="item-content historyinfo-item-content">
			<li>
				<p><span>本人病史</span></p>
				<textarea placeholder="如无病史请填无" ref="mimeHistory" >{{oneself}}</textarea>
			</li>
			<li>
				<p><span>本人服药情况</span></p>
				<textarea placeholder="如无服药情况请填无" ref="selfMedication">{{medicine}}</textarea>
			</li>
			<li>
				<p><span>家族病史</span></p>
				<textarea placeholder="如无病史请填无" ref="familyHistory">{{family}}</textarea>
			</li>
		</ul>
		<button type="button" class="blue-btn" @click='historyinsert()'>确定</button></router-link>
		<div v-if="showPopup" class="bg"></div>
		<div v-if="showPopup" class="Popupbox">
			<img src="../../assets/img/finishhand.png" alt="">
			<h2>已成功提交健康资料</h2>
			<p><span @click="showPopup=!showPopup">暂不</span><router-link to="/healthindex">去首页</router-link></p>
		</div>
	</div>
</template>
<script>
export default {
	name: 'historyinfo',
	data () {
		return {
			http:localStorage.http,
			health_id:this.$route.query.health_id,
			oneself:'',
			family:'',
			medicine:'',
			showPopup: false
		}
	},
	mounted(){
		this.gethistorydata()
	},
	methods: {
		gethistorydata(){//获取病史资料查询
			let health_id=this.health_id;
			let url = this.http+'/wechat.php/health/historydata'
			this.$http({
				method: 'post',
				url:url,   
				data: this.qs.stringify({
				 	token:'06cd3b2382f7a92d76f62c21946aaf3c',
				 	health_id:health_id
				})
			}).then((response)=>{
				if(response.data.status==1){
					let Data=response.data.data
					this.oneself=Data.oneself;
					this.family=Data.family;
					this.medicine=Data.medicine;
				}else if(response.data.status==2){
					return this.$parent.showDialog(response.data.msg)
				}
				
			})
			.catch((err)=>{
				return this.$parent.showDialog('请求服务器错误')
			})
		},
		historyinsert(){ //提交病史资料
			let health_id=this.health_id
			let mimeHistory=this.$refs.mimeHistory.value;
			let selfMedication=this.$refs.selfMedication.value;
			let familyHistory=this.$refs.familyHistory.value;
			let url = this.http+'/wechat.php/Health/baseinfo'
			if(mimeHistory==''){
				return this.$parent.showDialog('请填写本人病史')
			}
			if(selfMedication==''){
				return this.$parent.showDialog('请填写本人服药情况')
			}
			if(familyHistory==''){
				return this.$parent.showDialog('请填写家族病史')
			}
			this.$http({
				method: 'post',
				url:url,   
				data: this.qs.stringify({
				 	token:'06cd3b2382f7a92d76f62c21946aaf3c',
				 	status:3,
				 	health_id:health_id,
				 	oneself:mimeHistory,
				 	medicine:selfMedication,
				 	family:familyHistory
				})
			})
			.then((res)=>{
				if (res.data.status == 1) {
					if(res.data.msg == 0){
						this.$router.push({ path: '/healthinfo',query:{health_id:this.health_id}})
						this.$parent.showDialog('提交成功')
					}else if(res.data.msg == 1){
						this.showPopup=true
					}
				}else if(res.data.status == 2) {
					this.$parent.showDialog('您还没有登录')
					this.$router.replace({ path: '/'})
				}else if(res.data.status == 3){
					if(res.data.msg == 0){
						this.$parent.showDialog('修改成功')
						this.$router.push({ path: '/healthinfo',query:{health_id:this.health_id}})
					}else if(res.data.msg == 1){
						this.showPopup=true
					}
				}
			})
			.catch((err)=>{
				return this.$parent.showDialog('请求服务器错误')
			})
		}
	}
}
</script>
<style scoped>
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
#historyinfo .historyinfo-item-content p span{
	width: auto;
}
</style>