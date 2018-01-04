<template>
	<div id="payment">
		<h5>手诊费</h5>
		<h1>￥{{handPay}}</h1>
		<ul class="item-content">
			<li><p><span>收款方</span></p><i>人体4S店</i></li>
		</ul>
		<button class="blue-btn" @click="jsApiCall()">立即支付</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				http:localStorage.http,
				handPay:'50.00',
				hbID : 'wx13a25ecb4e00821c',
				timestamp : '',
				nonceStr : '',
				signature : ''
			}
		},
		created() {
			// this.Payment()
		},
		mounted() {
//			this.jsApiCall()
		},
		methods: {
			jsApiCall(){
//				获取微信配置信息
				$.ajax({
					contentType:'application/vnd.google-earth.kml+xml; charset=utf-8', 
					url:'http://test.anmeicare.com/wechat.php/pay/handpay',
					type:'post',
					dataType:'json',
					success:function(res){
						if (res.status == 1) {
							var jsApiParameters=JSON.parse(res.data.jsApiParameters)
							var out_trade_no=res.data.order_sn
							WeixinJSBridge.invoke(
						       'getBrandWCPayRequest', {
						           "appId":jsApiParameters.appId,     //公众号名称，由商户传入     
						           "timeStamp":jsApiParameters.timeStamp,         //时间戳，自1970年以来的秒数     
						           "nonceStr":jsApiParameters.nonceStr, //随机串     
						           "package":jsApiParameters.package,     
						           "signType":jsApiParameters.signType,         //微信签名方式：     
						           "paySign":jsApiParameters.paySign,//微信签名 
						           'jsApiList':['checkJsApi','chooseWXPay']
						       },
						       function(res){// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。     
						           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
						           		$.ajax({
						           			url:'http://test.anmeicare.com/wechat.php/pay/orderquery',
											type:'post',
											dataType:'json',
											data:{
												out_trade_no:out_trade_no
											},
											success:function(res){
												if(res.status == 1){
													window.location.href='http://test.anmeicare.com/dist/#/hand/handdiagnosis'
												}else{
													return this.showDialog('支付失败')
												}
												
											}
						           		})
						           }     
						       }
						   ); 
						
						}else if(res.status == 0){
							alert('支付失败')
							window.location.href='http://test.anmeicare.com/dist/#/diagno'
						}else if(res.status == 2){
							alert('您还没有未登录')
							window.location.href='http://test.anmeicare.com/dist/#/'
						}
					},
					error:function(){
						alert('请求服务器错误')
					}
				})
			}
		}
	}
</script>

<style>
	#payment h5{
		font-size: .3rem;
		margin: .3rem 0 .2rem;
	}
	#payment h1{
		font-size: .6rem;
	}
	#payment button{
		margin-top: .6rem;
	}
	#payment .item-content li p span {
		font-size: .3rem;
		color: #b6b6b6;
	}
	#payment .item-content li i {
		font-size: .3rem;
		color: #000;
	}
</style>
