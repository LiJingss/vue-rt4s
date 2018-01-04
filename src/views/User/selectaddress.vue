<template>
	<div id="selectaddress" class="shipadd-box">  
		<v-logo></v-logo>
		<ul class="shipadd-box-item " >
			<li  v-for="(item,index) in addresslist"  :address_id='item.id'>
				<div>
					<p><span ref='username'>{{item.username}}</span><input type="text" :value="item.linktel" disabled="disabled" ref='linktel'/></p>
					<p class="ship-address" ref='ship-address'>{{item.area}}{{item.address}}</p>
				</div>
				<em class='icon iconfont icon-duihao2'></em> 
			</li>
		</ul>
		<router-link :to="{path:'/shippingaddress',query:{selectadd:0,order_id:order_id,health_id:health_id,cycle_id:cycle_id}}" ><button type="button" class="blue-btn" >新增收货地址</button></router-link>
	</div>

</template>

<script>
export default {
	name: 'selectaddress',
	data () {
		return {
			http:localStorage.http,
			addresslist:[],
			health_id:this.$route.query.health_id,
			cycle_id:this.$route.query.cycle_id,
			order_id:this.$route.query.order_id
		}
	},
	mounted() { //页面加载就执行函数
    	this.selectaddress();
//  	选中地址
		let _this=this;
		$("#selectaddress .shipadd-box-item").on("click"," li",function(){
			let val_this=$(this)
	　　　    val_this.addClass("on").siblings("li").removeClass('on')
			_this.$router.replace({path:'/healthpayment', query: {
				/*username:val_this.find('p').children('span').html(),
				linktel:val_this.find('p').children('input').val(),
				address:val_this.find('p.ship-address').html(),*/
				address_id:val_this.attr('address_id'),
				health_id:_this.health_id,
				cycle_id:_this.cycle_id,
				order_id:_this.order_id
			}});
	　　});
  	},
	created() {
		
	},
	methods: {
		toogle(index){
//			this.activeIndex = index;
		},
		selectaddress(){
			let url = this.http+'/wechat.php/Address/shippingAddress'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c'
				})
			}).then((res)=>{
				if (res.data.status == 1) {	 	
					if(res.data.data != null){
						res.data.data.forEach((value) => {
							this.addresslist.push(value);
						})
					}
				}else if(res.data.status == 2) {
					this.showDialog(res.data.msg)
					this.$router.replace({ path: '/'})
				}else {
					
				}
			}).catch((err)=>{
				this.showDialog(err.data.msg)
			}) 
		}
	}
}
</script>

<style scoped>
	#selectaddress .shipadd-box-item{
		border-bottom: none;
		padding: 0;
		background: none;
	}
	#selectaddress .shipadd-box-item>li{
		background:#FFFFFF;
		padding: .3rem;
		clear: both;
		overflow: hidden;
		margin-bottom: .2rem;
		margin-right: 0;
		min-height: .85rem;
		border-bottom: .01rem solid #e5e5e5;
		border-top: .01rem solid #e5e5e5;
	}
	#selectaddress .ship-address{
		border-top:none;
		border-bottom: none;
	}
	#selectaddress .shipadd-box-item>li:nth-child(1) p{
		border-bottom: none;
	}
	#selectaddress .shipadd-box-item>li>div{
		float: left;
		width: 80%;
	}
	#selectaddress .shipadd-box-item>li>em{
		float: right;
		font-size: .46rem;
		margin-top: .34rem;
	}
	#selectaddress .shipadd-box-item>li>em.icon-duihao2{
		color:#e6e5e5;
		font-size: .38rem;
		margin-top: .42rem;
		margin-right: .05rem;
	}
	#selectaddress .shipadd-box-item>li.on em.icon-duihao2{
		color: #47cce2;
	}
</style>
