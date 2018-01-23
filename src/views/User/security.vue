<template>
	<div id="security">
		<v-logo></v-logo>
		<ul class="item-content">
			<router-link :to="{path:'/changephone',query: {tel: this.telphone}}" tag="li"><p><span>手机号</span><b>{{telphone}}</b></p><i class="iconfont icon-gengduo"></i></router-link>
			<router-link :to="{path:'/changepwd',query: {tel: this.telphone}}" tag="li"><p><span>修改密码</span></p><i class="iconfont icon-gengduo"></i></router-link>
		</ul>
	</div>
</template>
<script>
	export default {
	name: 'information',
	data () {
		return {
			http:localStorage.http,
			telphone:''
			
		}
	},
	mounted() {		 
		this.userphone()//页面加载就执行函数  	
	},
	/*beforeRouteEnter (to, from, next) {
		 document.title = to.meta.title;
	},*/
	methods: {
		// 获取数据
		userphone(){
			let url = this.http+'/wechat.php/user/userphone'
			this.$http({
				method: 'post',
				url: url,
				data: this.qs.stringify({
				 	token:'06cd3b2382f7a92d76f62c21946aaf3c'
				})		       
			})		
			.then((response)=>{
				// 参数错误
				if (response.data.status == 0) {
					this.$parent.showDialog(response.data.msg);
				}
				//未登录
				if (response.data.status == 2) {
					this.$parent.showDialog(response.data.msg);
					this.$router.replace({ path: '/'})
				}
				//成功
				if (response.data.status == 1) {
					this.telphone=response.data.data
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
	a {
		color: #000;
	}
	a p {
		justify-content: space-between;
	}
	a p b{
		margin-right: 1rem;
	}
</style>