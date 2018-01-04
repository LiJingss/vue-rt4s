<template>
	<div id="agreement">
		<v-logo></v-logo>
		<h2>{{title}}</h2>
		<div v-html="editlist"></div>
	</div>
</template>
<script>
	export default {
		name: 'agreement',
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
			article(){		
				let url = this.http+'/wechat.php/user/agreement'
				this.$http({
					method: 'post',
					url: url,   
					data: this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						agreement_id : 2
					})
				}).then((res)=>{
					let Data=res.data.data
					this.editlist=Data.content
					this.title=Data.title
				}).catch((err)=>{
//					return this.showDialog('请求服务器错误')
				})
			}
		}
	}
</script>
<style type="text/css">
	#agreement{
		text-align: left;
		background: #fff;
	}
	#agreement h2 {
		font-size: .34rem;
		padding: 0 .3rem;
		font-weight: normal;
		color: #333;
		padding-top: .1rem;
	}
	#agreement p {
		padding: 0 .3rem;
		font-size: .3rem !important;
		color: #b2b2b2;
		line-height: .5rem !important;
	}
</style>