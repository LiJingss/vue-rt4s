<template>
	<div id="healthorderpay" v-if="shanxian==1">
		<v-logo></v-logo>
		<div class="health-pay-item">
			<h2 v-if="items.care_num == 36">方案：调理方案</h2>
			<h2 v-else-if="items.care_num == 30">方案：巩固方案</h2>
			<ul class="shipadd-box-item">
			<li>
				<div>
					<p><i class="icon iconfont icon-ditu"></i><span ref="realname" >{{items.realname}}</span><input type="text"  disabled="disabled" ref="linktel" :value="items.linktel"/></p>
			 		<p class="ship-address" ref='address_id'>{{items.address}}</p>
				</div>
			</li>
		</ul>
		</div>
		<div class="health-pay-money"><span>支付金额</span><i>￥<em ref='moneyNum'>{{items.pay_money}}</em></i></div>
		<button class="blue-btn" @click="healthorderpay()">确认支付</button>
	</div>
</template>
<script>
	export default {
		name: 'healthorderpay',
		data () {
		return {
			http:localStorage.http,
			order_id:window.location.href.split('=')[1],
			items:[],
			jsApiParameters:[],
			shanxian:'',
			out_trade_no:''
		}
	},	
	
	created(){
//		window.location.reload()
	},
	mounted() {
//			window.location.reload()
//			this.healthorderpay()
			this.getordermsg()
//			alert(window.location.href.split('=')[1])
//			alert(this.order_id)
	},
	methods: {
			getordermsg(){
				this.$http({
					method: 'post',
					url:'http://test.anmeicare.com/wechat.php/order/healthorderpay',   
					data: this.qs.stringify({
//					 	token:'06cd3b2382f7a92d76f62c21946aaf3c',
					 	order_id:this.order_id
					})
				}).then((res)=>{
					if (res.data.status == 2) {
						this.$router.replace({ path: '/'});
					}else if(res.data.status == 1){
						this.items=res.data.data.order_info
						this.shanxian=1
					}
				}).catch((err)=>{
					return this.showDialog('请求服务器错误')
				})
			},
			healthorderpay(){
//				window.location.reload()
				//获取微信配置信息
				this.$http({
					method: 'post',
					url:'http://test.anmeicare.com/wechat.php/order/healthorderpay',   
					data: this.qs.stringify({
//					 	token:'06cd3b2382f7a92d76f62c21946aaf3c',
					 	order_id:this.order_id
					})
				}).then((res)=>{
					if (res.data.status == 2) {
						this.$router.replace({ path: '/'});
					}else if(res.data.status == 1){
						this.jsApiParameters=JSON.parse(res.data.data.jsApiParameters)
							var out_trade_no=res.data.data.order_info.order_sn
							WeixinJSBridge.invoke(
						       'getBrandWCPayRequest', {
						           "appId":this.jsApiParameters.appId,     //公众号名称，由商户传入     
						           "timeStamp":this.jsApiParameters.timeStamp,         //时间戳，自1970年以来的秒数     
						           "nonceStr":this.jsApiParameters.nonceStr, //随机串     
						           "package":this.jsApiParameters.package,     
						           "signType":this.jsApiParameters.signType,         //微信签名方式：     
						           "paySign":this.jsApiParameters.paySign,//微信签名 
						           'jsApiList':['checkJsApi','chooseWXPay']
						       },
						       function(res){// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。     
						           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
						           		$.ajax({
						           			url:'http://test.anmeicare.com/wechat.php/order/orderquery',
											type:'post',
											dataType:'json',
											data:{
												out_trade_no:out_trade_no
											},
											success:function(res){
												if(res.status == 1){
													window.location.href='http://test.anmeicare.com/dist/#/myorder'
												}else{
													return this.showDialog('支付失败')
													window.location.href='http://test.anmeicare.com/dist/#/myorder'
												}
												
											},
											error:function(res){
												alert('error')
											}
						           	})
										
						           }     
						       }
						   ); 
					}else if(res.data.status == 0){
						this.showDialog('支付失败')
						window.location.href='http://test.anmeicare.com/dist/#/myorder'
					}
				}).catch((err)=>{
					return this.showDialog('请求服务器错误')
				})
			}
		}
	}
</script>
<style scoped>
	#healthorderpay{
		text-align: left;
		/*margin-top:.2rem;*/
	}
	#healthorderpay .health-pay-item{
		background: #FFFFFF;
		margin-top: .2rem
	}
	#healthorderpay .health-pay-item h2{
		height: .88rem;
		line-height: .88rem;
		margin-left: .3rem;
		border-bottom: 1px solid #e5e5e5;
		font-weight: normal;
	}
	#healthorderpay .shipadd-box-item{
		/*margin-top: .2rem;*/
		border-top: none;
		padding: .3rem 0rem .2rem .3rem;
	}
	#healthorderpay .health-pay-money{
		padding: 0 .3rem;
		background: #FFFFFF;
		height: .9rem;
		line-height: .9rem;
		
	}
	#healthorderpay .health-pay-money i{
		display: block;
		float: right;
		color: #47cce2;
		margin-bottom: 1rem;
		min-width: 1rem;
	}
	#healthorderpay .add_addressicon{
		display: block;
		margin-top: .2rem;
		height: .9rem;
		line-height: .9rem;
		background: #FFFFFF;
		color: #333;
		padding: 0 .3rem;
		margin-bottom: .2rem;
	}
	#healthorderpay .add_addressicon i.icon-jiahao{
		color: #ff706b;
	    font-size: .56rem;
	    margin-top: .154rem;
	    display: block;
	    float: left;
	    margin-right: .16rem;
	}
	#healthorderpay .shipadd-box-item li:nth-child(1) p{
		border-bottom: none;
	}
	#healthorderpay .shipadd-box-item li{
		clear: both;
		overflow: hidden;
		position: relative;
	}
	
	#healthorderpay .shipadd-box-item li  span{
		display: inline-block;
		color: #333;
		width: auto;
		margin-right: .3rem;
	}
	#healthorderpay .shipadd-box-item li >div{
		float: left;
		width: 98%;
		padding-left: .4rem;
		position: relative;
	}
	#healthorderpay .shipadd-box-item li >em{
		position: absolute;
		top: 50%;
		float: right;
		font-size: .5rem;
		color: #c7c7cc;
		margin-top: -.38rem;
	}
	#healthorderpay i.icon-ditu{
		position: absolute;
		float: left;
		color: #c7c7cc;
		top: .03rem;
   		left: 0;
	}
</style>