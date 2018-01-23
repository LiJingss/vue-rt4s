<template>
	<div id="handdiagnosis">
		<p>
			<router-link :to="{path:'/upload',query:{page:'hand',health_id:health_id}}">手部<i class="iconfont icon-wancheng" v-if="hand_status==1"></i></router-link>
			<router-link :to="{path:'/upload',query:{page:'face',health_id:health_id}}">面部<i class="iconfont icon-wancheng" v-if="face_status==1"></i></router-link>
			<router-link :to="{path:'/upload',query:{page:'tougue',health_id:health_id}}">舌部<i class="iconfont icon-wancheng" v-if="tongue_status==1"></i></router-link>
			<router-link :to="{path:'/upload',query:{page:'ear',health_id:health_id}}">耳部<i class="iconfont icon-wancheng" v-if="ear_status==1"></i></router-link>
			<router-link :to="{path:'/upload',query:{page:'shape',health_id:health_id}}">体型<i class="iconfont icon-wancheng" v-if="shape_status==1"></i></router-link>
		</p>
	</div>
</template>
<script>
	export default {
		name: 'handdiagnosis',
		data () {
			return {
				http:localStorage.http,
				health_id:this.$route.query.health_id,
				seen:true,
				hand_status:'',
				face_status:'',
				tongue_status:'',
				ear_status:'',
				shape_status:''
			}
		},
		created() {
			this.handUpload()
		},
		methods: {
			handUpload(){//判断是否完成上传手诊
				let url = this.http+'/wechat.php/diagno/hand'
				let health_id=this.$route.query.health_id
				this.$http({
					method:'post',
					url:url,
					data: this.qs.stringify({
		         		token:'06cd3b2382f7a92d76f62c21946aaf3c',
		         		health_id:health_id
		        	})
				})
				.then((res)=>{
					if(res.data.status == 1){
						let Data=res.data.data.handstatus
						this.hand_status=Data.hand_status
						this.face_status=Data.face_status
						this.tongue_status=Data.tongue_status
						this.ear_status=Data.ear_status
						this.shape_status=Data.shape_status
						this.health_id=Data.health_id
					}
				})
				.catch((err)=>{
	        		return this.$parent.showDialog('请求服务器错误')
	        	})
			}
			}
	}
</script>
<style>
	#handdiagnosis>p {
		clear: both;
		overflow: hidden;
		/*display: flex;*/
		padding: 0 .55rem;
		/*justify-content: space-between;*/
		/*flex-wrap:wrap;*/
		margin-top: .2rem;
		text-align: center;
	}
	#handdiagnosis>p a {
		float: left;
		width: 46.3%;
		height: 1.1rem;
		font-size: .32rem;
		color: #fff;
		display: block;
		line-height: 1rem;
		position: relative;
		margin:.9rem 1.4% 0 1.4%;
	}
	#handdiagnosis p a i {
		position: absolute;
		left: 70%;
		/*top: 28%;*/
		font-size: .36rem;
	}
	#handdiagnosis p a:nth-child(1) {
		background: url('../../assets/img/hand_1.png') no-repeat;
		background-size: 100% 100%;
	}
	#handdiagnosis>p a:nth-child(2) {
		background: url('../../assets/img/hand_2.png') no-repeat;
		background-size: 100% 100%;
	}
	#handdiagnosis p a:nth-child(3) {
		background: url('../../assets/img/hand_3.png') no-repeat;
		background-size: 100% 100%;
	}
	#handdiagnosis p a:nth-child(4) {
		background: url('../../assets/img/hand_4.png') no-repeat;
		background-size: 100% 100%;
	}
	#handdiagnosis p a:nth-child(5) {
		background: url('../../assets/img/hand_5.png') no-repeat;
		background-size: 100% 100%;
	}
</style>