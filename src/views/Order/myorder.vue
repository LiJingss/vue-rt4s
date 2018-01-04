<template>
	<div id="myorder" v-if="refundbox">
		<v-logo></v-logo>
		<nav>
			<button v-for="(value,index) in links" @click="goRoute(index,{path :value.router,query:{a:value.argument}})" :class="{'on':bg==index}">{{ value.name }}</button>
		</nav>
		<scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller" style="padding-top: 1.1rem;">
			<div v-for="(item, index) in listdata" class="orderlist" id="orderlist" ref="orderlist">
				<p><b>{{item.charge}}</b>
					<em v-if="item.pay_status == 0">未支付</em>
					<em v-else-if="item.pay_status == 1">已支付</em>
					<em v-else-if="item.pay_status == 2">已退款</em>
					<em v-else="item.pay_status == 3">已失效</em>
				</p>
				<p><span>方案：{{item.care_num==36 ? '调理' : '巩固'}}</span><span>产品：细胞特膳营养素</span></p>
				<p><span>订单编号：{{item.order_sn}}</span><span>订单时间：{{getdate(item.add_time)}}</span></p>
				<p>
					<i class="icon iconfont icon-ditu"></i><b>{{item.realname}}&nbsp;&nbsp;{{item.linktel}}</b>
					<span style="line-height:.4rem;margin-left:.4rem;">{{item.address}}</span></p>
				<p><em>￥{{item.pay_money}}</em><b style="float:right">实付款：</b></p>
				<button @click='orderpay(item.id)' v-if="item.pay_status == 0" :order_id='item.id'>支付</button>
				<button v-if="item.pay_status == 1 && item.shipping_status == 0" class="tk_pay"><span v-if="item.refund_request ==0" @click="refundbtn"  :data-id="item.id">退款</span><span v-else-if="item.refund_request ==1">退款中</span><span v-else>退款未通过</span></button>
			</div>
		</scroller>
	</div>
	<div v-else="refundbox" id="refundbox">
		<textarea placeholder="请填写退款原因" ref="refundtext"></textarea>
		<button class="blue-btn" @click="putrefund">提交</button>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				http:localStorage.http,
				refundbox : true,
				order_id : '',
				'bg': 0,
				links: [
					{
						name: '全部',
						router: '/myorder',
						argument :null
					},
					{
						name:'未支付',
						router: '/myorder',
						argument :0
					},
					{
						name:'已支付',
						router: '/myorder',
						argument :1
					}
				],
				counter: 0, //当前页
				listdata: [], // 下拉更新数据存放数组
				noData: ''
			}
		},
		mounted: function() {
			if(this.$route.query.a == 0){
				this.bg = 1;
			}else if(this.$route.query.a == 1){
				this.bg = 2;
			}else {
				this.bg = 0;
			}
		},
		methods: {
			refundbtn(e){
				let el = e.target;
				this.order_id = $(el).attr('data-id')
				this.refundbox=!this.refundbox;				
			},
			goRoute(index,path){
				this.$router.push(path);
				/*this.bg = index;
				this.counter = 0;
				this.scrollData.noFlag = false;
				$('.orderlist').remove();
				this.infinite();*/
				window.location.reload()
			},
			getdate(date) {
				var date = new Date(date*1000)
				var Y = date.getFullYear();
				var M = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
				var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
				var H = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
				var N = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
				var S = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
				return Y+'-'+M+'-'+D+' '+H+':'+N+':'+S;
			},
			refresh(done) {
				this.$refs.myscroller.resize();
			},
			infinite(done) {
				if(this.noData) {
					setTimeout(()=>{
						this.$refs.myscroller.finishInfinite(2);
					})
					return;
				}
				setTimeout(() => {
					let url = this.http+'/wechat.php/order/myorder';
					this.$http.post(url,this.qs.stringify({
						'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
						'tab' : this.$route.query.a,
						'pageNum' : this.counter
					})).then((res) => {
						if(res.data.status == 1){
							res.data.data.forEach((value) => {
								this.listdata.push(value);
							})
						}else if(res.data.status == 2){
							this.$router.replace({ path: '/'})
							this.showDialog(res.data.msg)
						}else {
							this.noData = "没有更多数据";
						}
					}, (response) => {
						console.log('error');
					});
					this.$refs.myscroller.resize();
					setTimeout(()=>{
						done()
					},1000)
					this.counter++;
				}, 100)
			},
			putrefund() {
				if(this.$refs.refundtext.value == ''){
					this.showDialog('请填写退款原因');
					return;
				}
				let url = this.http+'/wechat.php/Order/refund';
				this.$http.post(url,this.qs.stringify({
					'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
					order_id : this.order_id,
					refund_content : this.$refs.refundtext.value
				})).then((res) => {
					if(res.data.status == 1){
						this.showDialog(res.data.msg);
						this.refundbox=!this.refundbox;
						window.location.reload();
					}else if(res.data.status == 2){
						this.showDialog(res.data.msg)
						let timer = setTimeout(() => {
							this.$router.replace({ path: '/'})
						}, 2000);
					}else if(res.data.status == 3){
						this.showDialog(res.data.msg)
					}
				}, (response) => {
					console.log('error');
				});
			},
			orderpay(id){
				let order_id=id
				window.location.href='http://test.anmeicare.com/wechat.php/order/getopenid/order_id/'+order_id+'/tab/1';
			}
		}
	}
</script>

<style>
	
	#myorder {
		min-height: 100vh;
	}
	#myorder .logo{
		position: fixed;
		z-index: 999;
	}
	#myorder nav{
		background: #fff;
		height: .89rem;
		border-bottom: .01rem solid #e5e5e5;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		width: 100%;
		position: fixed;
		z-index: 999;
		top: 1rem;
	}
	#myorder .pull-to-refresh-layer{
		margin-top: -10px;
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
	#myorder .yo-scroll {
		top:.89rem;
	}
	#orderlist {
		background: #fff;
		border-top:.01rem solid #e5e5e5;
		margin: 0 0 .2rem;
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

	#refundbox textarea {
		width: 100%;
		height: 4rem;
		resize: none;
		padding: .26rem .3rem;
		background: #fff;
		margin: .2rem 0;
	}
	#orderlist button.tk_pay{
		padding: 0;
	}
	#orderlist button.tk_pay span{
		display: block;
		padding: .15rem .4rem;
	}
	#orderlist i.icon-ditu{
		font-size: .3rem;
    	line-height: .4rem;
		display: inline-block;
		color: #c7c7cc;
		margin-right: .1rem;
   
	}
	#orderlist p:last-child{
		border-bottom: none;
	}
</style>