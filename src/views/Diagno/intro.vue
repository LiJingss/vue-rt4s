<template>
	<div>
		<v-logo></v-logo>
		<div id="intro">
			<h2>{{title}}</h2>
			<div v-html="editlist" style="padding: .3rem;"></div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				http:localStorage.http,
				editlist:'',
				title:''
			}
		},
		created(){
			this.article()
		},
		methods: {
			// 获取档案列表
			article(){		
				let url = this.http+'/wechat.php/user/agreement'
				this.$http({
					method: 'post',
					url: url,   
					data: this.qs.stringify({
					 	token:'06cd3b2382f7a92d76f62c21946aaf3c',
					 	agreement_id:1
					})
				}).then((res)=>{
					if (res.data.status == 2) {
						this.$router.replace({ path: '/'});
						return this.$parent.showDialog(res.data.msg)
					}
					let Data=res.data.data
					this.editlist=Data.content
					this.title=Data.title
					
				}).catch((err)=>{
				})
			}
		}
	}
</script>
<style type="text/css">
	#intro{
		text-align: left;
		background: #fff;
	}
	#intro h2 {
		font-size: .34rem;
		padding: 0 .3rem;
		font-weight: normal;
		color: #333;
		padding-top: .1rem;
	}
	#intro span {
		font-size: .3rem !important;
		color: #b2b2b2;
		line-height: .5rem !important;
	}
</style>