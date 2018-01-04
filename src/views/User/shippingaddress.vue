<template>
	<div id="shipadd" class="shipadd-box">
		<v-logo></v-logo>
		<ul class="item-content">
			<li><p><span>姓名</span><input type="text" placeholder="请输入姓名" ref="realname"/></p></li>
			<li><p><span>联系电话</span><input type="text" placeholder="请输入联系电话" name="phoneNum" ref="linkphone" maxLength="11" /></p></li>
			<li><p><span>所在地区</span><input type="text" placeholder="请选择" readonly unselectable="on"  @click="focusfn($event)" id="city-picker" data-codes=""  ref="dataNum" /></p></li>
			<li><p><span>详细地址</span><input type="text" placeholder="请填写详细地址" id="address" ref='address'/></p></li>
		</ul>
		<!-- <ul class="item-content" style="margin-top:.1rem;">
			<li>
				<p><span>设为默认地址</span></p>
				<i :class="isdefault==0 ? 'iconfont icon-fangxingweixuanzhong' : 'iconfont icon-fangxingxuanzhong'" @click="isDefault" id="isdefault"></i>
			</li>
		</ul> -->
		<button type="button" class="blue-btn add" @click="addAddress($event)" v-if="btnshow">保存</button>
		<button type="button" class="blue-btn" @click="editAddress($event)" v-else="btnshow">保存</button>
	</div>

</template>

<script>
export default {
	name: 'shippingaddress',
	data () {
		return {
			http:localStorage.http,
			isdefault : 1,
			btnshow: true,
			health_id:this.$route.query.health_id,
			cycle_id:this.$route.query.cycle_id,
			order_id:this.$route.query.order_id
		}
	},
	mounted() {
		 // 调取地区
		$("#city-picker").cityPicker({
			title: "选择省市区/县",
			onChange: function (picker, values, displayValues) {
			    // console.log(values, displayValues);
			}
		});
		/*if(this.$route.query.list == 0 || this.$route.query.noaddress == 0){
			this.isdefault = 1;
		} */
		if(this.$route.query.id != undefined){
			this.btnshow = false;
			this.$refs.realname.value = this.$route.query.username;
			this.$refs.linkphone.value = this.$route.query.linktel;
			$('#city-picker').attr('data-codes',this.$route.query.province+','+this.$route.query.city+','+this.$route.query.town)
			$('#city-picker').val(this.$route.query.provinceName+' '+this.$route.query.cityName+' '+this.$route.query.townName)
			$('#city-picker').attr('data-code',this.$route.query.town)
			$('#address').val(this.$route.query.address);
			this.isdefault = this.$route.query.isdefault;
		}	 
  	},
	methods: {
		/*isDefault() {
			if(this.$route.query.list != 0){
				this.isdefault == 1 ? this.isdefault = 0 : this.isdefault = 1;
			}
		},*/
		focusfn(e) {
			let el = e.target
			$('input').not(el).blur()
			$('select').blur()
		},
		addAddress(e) {
			var event = e.target;
			let realname=this.$refs.realname;
			let addressCodes =this.$refs.dataNum.dataset.codes;
			let address=this.$refs.address;
			let linkphone=this.$refs.linkphone;
			// 姓名中英文验证			
			if (realname.value == '') {
				realname.focus();
				return this.showDialog('请输入姓名');
			}else if(this.checkChineseLen(realname) == false){
				realname.focus();
				return;
			}	
			//验证电话
			if (linkphone.value !='') {
				if (this.checkLinkphone(linkphone.value)== false) {
					return this.showDialog('请输入正确格式的电话');
				};
			}else{
				linkphone.focus();
				return this.showDialog('请输入联系电话');
			}
			// 出生地区不能为空		
			if(addressCodes == ''){
				return this.showDialog("请选择出生地区");
			}
			let addressArray = addressCodes.split(",");  
			// 验证详细地址首字不能为非中文
			if (address.value !='') {
				let address_a=address.value.substr(0,2);
				if (this.checkChineseOnly(address_a) == false) {
					return this.showDialog('请输入正确的详细地址');
				};
			}else{
				address.focus();
				return this.showDialog('请输入详细地址');
			}
			$(event).attr('disabled','disabled')
			// 请求数据
			let url = this.http+'/wechat.php/Address/addAddress'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',	
				 	username:realname.value,
				 	linktel:linkphone.value,
				 	province:addressArray[0],
				 	city:addressArray[1],
				 	town:addressArray[2],
				 	address:address.value,
				 	is_default:this.isdefault
				})
			})		
			.then((res)=>{
				if (res.data.status == 1) {
					$('.add').css('display','none')
					$(event).removeAttr('disabled')
					this.showDialog('新增收货地址成功')
					if(this.$route.query.noaddress == 0 || this.$route.query.selectadd == 0){
						this.$router.replace({ path: '/selectaddress',query:{order_id:this.order_id,cycle_id:this.cycle_id,health_id:this.health_id}})
					}else{
						this.$router.replace({ path: '/shipaddressXq'})
					}
				}else if(res.data.status == 2) {
					this.showDialog(res.data.msg)
					this.$router.replace({ path: '/'})
				}else if(res.data.status == 3){
					$(event).removeAttr('disabled')
					this.showDialog(res.data.msg)
					if(this.$route.query.noaddress == 0 || this.$route.query.selectadd == 0){
						this.$router.replace({ path: '/selectaddress',query:{order_id:this.order_id,cycle_id:this.cycle_id,health_id:this.health_id}})
					}else{
						$(event).removeAttr('disabled')
						this.showDialog(res.data.msg)
						let timer = setTimeout(() => {
							this.$router.replace({ path: '/shipaddressXq'})
						}, 2000);
					}
				}else {
					this.showDialog(res.data.msg)
				}
			})
			.catch((err)=>{
				return this.showDialog('请求服务器错误')
			}) 
		},
		editAddress(e) {
			var event = e.target;
			let realname=this.$refs.realname;
			let addressCodes =this.$refs.dataNum.dataset.codes;
			let address=document.getElementById('address');
			let linkphone=this.$refs.linkphone;
			// 姓名中英文验证			
			if (realname.value == '') {
				realname.focus();
				return this.showDialog('请输入姓名');
			}else if(this.checkChineseLen(realname) == false){
				realname.focus();
				return;
			}	
			//验证电话
			if (linkphone.value !='') {
				if (this.checkLinkphone(linkphone.value)== false) {
					return this.showDialog('请输入正确格式的电话');
				};
			}else{
				linkphone.focus();
				return this.showDialog('请输入联系电话');
			}
			// 出生地区不能为空		
			if(addressCodes == ''){
				return this.showDialog("请选择出生地区");
			}
			let addressArray = addressCodes.split(",");  
			// 验证详细地址首字不能为非中文
			if (address.value !='') {
				let address_a=address.value.substr(0,2);
				if (this.checkChineseOnly(address_a) == false) {
					return this.showDialog('请输入正确的详细地址');
				};
			}else{
				address.focus();
				return this.showDialog('请输入详细地址');
			}
			$(event).attr('disabled','disabled')
			// 请求数据
			let url = this.http+'/wechat.php/Address/edit'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',
					id:	this.$route.query.id,
				 	username:realname.value,
				 	linktel:linkphone.value,
				 	province:addressArray[0],
				 	city:addressArray[1],
				 	town:addressArray[2],
				 	address:address.value,
				 	is_default:this.isdefault
				})
			})		
			.then((res)=>{
				if (res.data.status == 1) {	 
					$(event).removeAttr('disabled')
					this.showDialog(res.data.msg)
					this.$router.replace({ path: '/shipaddressXq'})
				}else if(res.data.status == 2) {
					this.showDialog(res.data.msg)
					this.$router.replace({ path: '/'})
				}else if(res.data.status == 3){
					$(event).removeAttr('disabled')
					this.showDialog(res.data.msg)
						this.showDialog(res.data.msg)
						let timer = setTimeout(() => {
							this.$router.replace({ path: '/shipaddressXq'})
						}, 2000);
				}else {
					this.showDialog(res.data.msg)
				}
			})
			.catch((err)=>{
				return this.showDialog('请求服务器错误')
			})
		}
	}
}
</script>
<style  scoped>
	#shipadd{
		margin-top: 0;
	}
</style>