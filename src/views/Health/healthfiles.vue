<template>
	<div id="healthfiles" >
		<v-logo></v-logo>
		<div class="healthfiles-list" v-for="item in items">
			<router-link  :to="{path:'/healthindex',query: {health_id:item.id}}" >
			<span class="fl">{{item.title}}</span>
			<em class="fr" v-if="item.is_invalid == 1">(已归档)</em>
			<em class="fr" v-else="item.is_invalid == 0">(进行中)</em>
			</router-link>	
		</div>
		<button type="button" class="blue-btn" @click='createhealth()' v-if="status ==3 || is_invalid==1" ref="newfile">建立新的档案</button>
	</div>
</template>
<script>
export default {
	name: 'healthfiles',
	data () {
		return {
			http:localStorage.http,
			willShow:false,
			items:[],
			listHealth:{},
			status:'',
			is_invalid:''
		}
	},
	created(){
		this.gethealth()
	},
	methods: {
		// 获取档案列表
		gethealth(){		
			let url = this.http+'/wechat.php/health/gethealth'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
				 	token:'06cd3b2382f7a92d76f62c21946aaf3c'
				})
			})
			.then((res)=>{
				if (res.data.status == 2) {
					this.$parent.showDialog(res.data.msg)
					this.$router.replace({ path: '/'})
				}
				if (res.data.status == 1) {
					let Data=res.data.data
					this.items =Data.healthlist
					this.listHealth=res.data.status
					this.is_invalid=Data.is_invalid
				}
				if (res.data.status == 3) {
					this.status=res.data.status
				}
			})
			.catch((err)=>{
				return this.$parent.showDialog('请求服务器错误')
			})
		},
		// 创建档案
		createhealth(){	
			this.$refs.newfile.style.display = 'none';		
			let url = this.http+'/wechat.php/health/createhealth'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
				 	token:'06cd3b2382f7a92d76f62c21946aaf3c'
				})
			})
			.then((response)=>{
				if (response.data.status == 1) {
					this.$parent.showDialog(response.data.msg)
					window.location.reload()			
				}else {
					this.$parent.showDialog(response.data.msg)
					window.location.reload()
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
#healthfiles{
	background: #fff;
	min-height: 100vh;
	overflow: hidden;
}
#healthfiles .healthfiles-list{
	width: 90%;
	background: url('../../assets/img/dfile.png') no-repeat;
	background-size: 100% 100%;
	height: 1.66rem;
	margin: .225rem auto;
	clear: both;
	overflow: hidden;
	padding: 0 .3rem;
	line-height: 1.60rem;
}
#healthfiles .healthfiles-list a{
	display: block;
	width: 100%;
	height: 100%;
}
.healthfiles-list span,.healthfiles-list em{
	font-size: .3rem;
	color: #fff;
}
#healthfiles .blue-btn{
	margin-top: .2rem;
}
</style>