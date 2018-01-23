<template>
	<div id="healthpayment" >
		<v-logo></v-logo>
		<div class="health-pay-item">
			<h2>方案选择</h2>
			<ul class="health-pay-main">
				<li v-for="(item,index) in items"  :class="item.care==care_num?'on':''" >  <!--@click="toogle(index)"-->
					<i class="icon iconfont icon-jiankangguanli"></i>
					<span v-text="item.name"></span>
					<em class="choose-icon"></em>
					<i class="icon iconfont icon-duihao1" ></i>
				</li>
			</ul>
		</div>
		<router-link v-if="address == null" :to="{path:'/shippingaddress',query:{noaddress:0,health_id:health_id,cycle_id:cycle_id,order_id:order_id}}" class="add_addressicon"><i class="iconfont icon-jiahao"></i>新增收货地址</router-link>
		<ul class="shipadd-box-item" v-if="address!=null">
			<li>
				<router-link :to="{path:'/selectaddress',query:{health_id:health_id,cycle_id:cycle_id,order_id:order_id}}">
					<div>
						<p><i class="icon iconfont icon-ditu"></i><span ref="realname" v-text="address.username"></span><input type="text"  disabled="disabled" ref="linktel" :value="address.linktel"/></p>
				 		<p class="ship-address" :data-codes='address.id' ref='address_id'>{{address.provincename}}{{address.cityname}}{{address.townname}}{{address.address}}</p>
					</div>
				 	<em class="icon iconfont icon-enter"></em>
			 	</router-link>
			</li>
		</ul>
		<div class="health-pay-money"><span><i class="icon iconfont icon-zhifu"></i>支付金额</span><i v-if="care_num == 36" >￥<em ref='moneyNum'>198000</em></i><i v-else-if="care_num == 30">￥<em  ref='moneyNum'>4980</em></i><i v-else><em ref='moneyNum'>&nbsp;</em></i></div>
		<button class="blue-btn" @click="posteworderupdae($event)">提交订单</button>
		<input type="hidden" name="" id="" :value="order_id"  id="order_id"/>
	</div>
</template>
<script>
export default {
	name: 'healthpayment',
	data () {
		return {
			http:localStorage.http,
			activeIndex:-1,
			items:[
				{
					name:'调理方案',
					care:'36'
				},
				{
					name:'巩固方案',
					care:'30'
				}
			],
			list:[],
			health_id:this.$route.query.health_id,
			cycle_id:'',
			order_id:'',
			addressID:this.$route.query.address_id,
			address:[],
			care_num:'',
			uaction:''
			
		}
	},	
	mounted() { //页面加载就执行函数
		if(this.$route.query.cycle_id != ''|| this.$route.query.cycle_id != 0){
			this.cycle_id=this.$route.query.cycle_id
		}
		if(this.$route.query.order_id!=''){
			this.order_id=this.$route.query.order_id
		}
		this.getcycleorder()
		$(".health-pay-main li").each(function(){
			$(this).click(function(){
				$(this).addClass("on").siblings("li").removeClass('on')
				if($(this).index() == 0){
			    	$('.health-pay-money i em').html('19800')
			    	this.uaction='调理方案'
			    }else {
					$('.health-pay-money i em').html('4980')
					this.uaction='巩固方案'
			    }
			})
		});
		
		
	},
	create(){
// 		this.createhealth()
	},
	methods: {
		// 获取
		getcycleorder(){
			let url = this.http+'/wechat.php/order/cycleorder'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
				 	token:'06cd3b2382f7a92d76f62c21946aaf3c',
				 	health_id:this.health_id,
				 	cycle_id:this.cycle_id,
				 	order_id:this.order_id,
				 	address_id:this.addressID
				})
			}).then((res)=>{
				if (res.data.status == 2) {
					this.$router.replace({ path: '/'});
					return this.$parent.showDialog(res.data.msg)
				}else if(res.data.status == 1){
					this.list=res.data.data.cycle
					this.address=res.data.data.address
					this.care_num=res.data.data.cycle.care_num
					if(this.$route.query.cycle_id == '' || this.$route.query.cycle_id == 0){
						this.cycle_id=res.data.data.cycle.id
					}
					if(this.$route.query.order_id==''||this.$route.query.order_id==null ){
						this.order_id=res.data.data.order.id
					}
				}
			}).catch((err)=>{
//				return this.$parent.showDialog('请求服务器错误')
			})
		},
		posteworderupdae(e){
			var event = e.target;
			var datapayment='';
			var care_num='';
			if($('.health-pay-main .on').index() == 0){
		        var care_num = 36;
		    }else if($('.health-pay-main .on').index() == 1) {
		        var care_num = 30;
		    }
			let realname=this.$refs.realname.innerText;
			let linktel=this.$refs.linktel.value;
			let address_id=this.$refs.address_id.dataset.codes;
			let paymoney=this.$refs.moneyNum.innerText;
			let address=this.$refs.address_id.innerText;
			let url = this.http+'/wechat.php/order/neworderupdae'
			if($('.health-pay-main li.on').length==0){
				this.$parent.showDialog('请选择周期方案')
				return
			}else if (this.address== null) {
				this.$parent.showDialog('请添加选择收货地址')
				return
			}
			$(event).css('display','none')
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
				 	token:'06cd3b2382f7a92d76f62c21946aaf3c',
				 	health_id:this.health_id,
				 	cycle_id:this.cycle_id,
				 	paymoney:paymoney,
				 	care_num:care_num,
				 	realname:realname,
				 	linktel:linktel,
				 	address_id:address_id,
				 	address:address,
				 	order_id:this.order_id,
				 	payment:1
				})
			}).then((res)=>{
				if (res.data.status == 2) {
					this.$router.replace({ path: '/'});
					return this.$parent.showDialog(res.data.msg)
				}else if(res.data.status == 1){
					let order_id=res.data.data
//					alert(order_id)
//					this.$router.replace({path:'order/healthorderpay', query: {order_id:order_id}});
//					window.location.href='http://www.rt4st.org/dist/#/order/healthorderpay?order_id='+order_id
					window.location.href='http://www.rt4st.org/wechat.php/order/getopenid/order_id/'+order_id
				}
			}).catch((err)=>{
				return this.$parent.showDialog('请求服务器错误')
			})
		}

	}
}
</script>
<style scoped>
	#healthpayment{
		text-align: left;
	}
	#healthpayment .health-pay-item{
		/*margin-top: .2rem;*/
	}
	#healthpayment .health-pay-item{
		background: #FFFFFF;
	}
	#healthpayment .health-pay-item h2{
		height: .88rem;
		line-height: .88rem;
		margin-left: .3rem;
		border-bottom: 1px solid #e5e5e5;
	}
	#healthpayment .health-pay-item ul.health-pay-main{
		clear: both;
		overflow: hidden;
		padding: .26rem .3rem .3rem .3rem;
	}
	#healthpayment .health-pay-item .health-pay-main li{
		position: relative;
		float: left;
		width: 2.2rem;
		height: 2rem;
		border: .026rem solid #b2b2b2;
		border-radius: .08rem;
		text-align: center;
		padding-top: .34rem;
		margin-right: .2rem;
		color: #b2b2b2;
	}
	#healthpayment .health-pay-item .health-pay-main li i{
		display: block;
		font-size: .7rem;
		margin-bottom: .1rem;
	}
	#healthpayment .health-pay-item .health-pay-main li.on{
		color: #47cce2;
		border: .026rem solid #47cce2;
	}
	#healthpayment .health-pay-item .health-pay-main li.on .choose-icon{
		position: absolute;
		display: block;
		width: 0rem;
		height: 0;
	    border-bottom: .44rem solid #47cce2;
	    border-left: .44rem solid transparent;
	    right: 0;
	    bottom: 0;
	}
	#healthpayment .health-pay-main li i.icon-duihao1{
		color: #FFFFFF;
		font-size: .26rem;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 2;
		text-align: right;
		margin: 0;
	}
	
	#healthpayment .shipadd-box-item{
		margin-top: .2rem;
	}
	#healthpayment .health-pay-money{
		padding: 0 .3rem;
		background: #FFFFFF;
		height: .9rem;
		line-height: .9rem;
		
	}
	#healthpayment .health-pay-money i{
		display: block;
		float: right;
		color: #47cce2;
		margin-bottom: 1rem;
		min-width: 1rem;
	}
	#healthpayment .add_addressicon{
		display: block;
		margin-top: .2rem;
		height: .9rem;
		line-height: .9rem;
		background: #FFFFFF;
		color: #333;
		padding: 0 .3rem;
		margin-bottom: .2rem;
	}
	#healthpayment .add_addressicon i.icon-jiahao{
		color: #ff706b;
	    font-size: .56rem;
	    margin-top: .154rem;
	    display: block;
	    float: left;
	    margin-right: .16rem;
	}
	#healthpayment .shipadd-box-item li:nth-child(1) p{
		border-bottom: none;
	}
	#healthpayment .shipadd-box-item li{
		clear: both;
		overflow: hidden;
		position: relative;
	}
	#healthpayment .shipadd-box-item li a{
		display: block;
	}
	#healthpayment .shipadd-box-item li a span{
		display: inline-block;
		color: #333;
		width: auto;
		margin-right: .3rem;
	}
	#healthpayment .shipadd-box-item li a>div{
		float: left;
		width: 92%;
		padding-left: .4rem;
		position: relative;
	}
	#healthpayment .shipadd-box-item li a>em{
		position: absolute;
		top: 50%;
		float: right;
		font-size: .5rem;
		color: #c7c7cc;
		margin-top: -.38rem;
	}
	#healthpayment i.icon-ditu{
		position: absolute;
		float: left;
		color: #c7c7cc;
		top: .03rem;
   		left: 0;
   		font-size: .32rem;
	}
	#healthpayment .health-pay-money i.icon-zhifu{
		font-size: .36rem;
		float: left;
	    color: #FA88A0;
		margin: .25rem .16rem 0 .1rem;
	    min-width: .24rem;
	    display: inline-block;
	}
	
</style>