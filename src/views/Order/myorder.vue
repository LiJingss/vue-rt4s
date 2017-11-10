<template>
	<div id="myorder">
		<nav>
			<!-- <router-link v-for="(value,index) in links" :to="{path :value.router,query:{a:value.argument}}" :class="{'on':bg==index}" @click="goRoute(index)">{{ value.name }}</router-link> -->
			<button v-for="(value,index) in links" @click="goRoute(index,{path :value.router,query:{a:value.argument}})" :class="{'on':bg==index}">{{ value.name }}</button>
		</nav>
		<div id="orderlist">
			<p><b>健康管理档案1 第三周期</b><em>等待支付</em></p>
			<p><span>方案：调理</span><span>产品：细胞特膳营养素</span></p>
			<p><span>订单编号：22222222</span><span>订单时间：2014-10-05 23:12</span></p>
			<p>
				<i class="iconfont"></i><b>张三 136****2222</b>
				<span style="line-height:.4rem;margin-left:.4rem;">于谦犀利北京代价奥德金是浪费大家可否阿卡的回复发的第卅巨款拉了就大概</span></p>
			<p><em>￥19800</em><b style="float:right">实付款：</b></p>
			<button>支付</button>
		</div>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				'bg': 0,
				links: [
					{
						name: '全部',
						router: '/myorder'
					},
					{
						name:'未支付',
						router: '/myorder',
						argument :1
					},
					{
						name:'已支付',
						router: '/myorder',
						argument :23
					}
				]
			}
		},
		mounted() {
			if(this.$route.query.a == 1){
				this.bg = 1;
			}else if(this.$route.query.a == 23){
				this.bg = 2;
			}
		},
		methods: {
			goRoute(index,path){
				this.$router.push(path)
				this.bg = index
			}
		}
	}
</script>

<style>
	#myorder {
		min-height: 100vh;
	}
	#myorder nav{
		background: #fff;
		height: .89rem;
		border-bottom: .01rem solid #e5e5e5;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	#myorder nav button {
		height: .87rem;
		line-height: .83rem;
		font-size: .3rem;
		padding: 0 .1rem;
		color: #999;
		border-bottom: .04rem solid #fff;
		margin-left: .5rem;
	}
	#myorder nav button.on {
		color: #47cce2;
		border-bottom: .04rem solid #47cce2;
	}
	#myorder nav button:first-child {
		margin-left: 0rem;
	}
	#orderlist {
		background: #fff;
		border-top:.01rem solid #e5e5e5;
		margin: .2rem 0;
		text-align: right;
	}
	#orderlist p {
		overflow: hidden;
		text-align: left;
		margin-left: .3rem;
		border-bottom: .01rem solid #e5e5e5;
		padding: .15rem .3rem .15rem 0;
		line-height: .4rem;
	}
	#orderlist p span {
		line-height: .5rem;
		display: block;
		color: #b2b2b2;
		font-size: .26rem;
	}
	#orderlist p em,#orderlist p b {
		font-size: .3rem;
		line-height: .55rem;
	}
	#orderlist p em {
		color: #47cce2;
		float: right;
	} 
	#orderlist p b {
		color: #000;
	}
	#orderlist button {
		padding: .15rem .4rem;
		color: #47cce2;
		font-size: .3rem;
		border: .015rem solid #47cce2;
		border-radius: .1rem;
		margin: .12rem .3rem;
	}
</style>