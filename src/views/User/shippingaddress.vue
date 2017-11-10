<template>
	<div id="shipadd" class="shipadd-box">
		<ul class="item-content">
			<li><p><span>{{username}}</span><input type="text" placeholder="请输入姓名" ref="realname"/></p></li>
			<li><p><span>{{telphone}}</span><input type="text" placeholder="请输入联系电话" name="phoneNum" ref="linkphone" maxLength="11" /></p></li>
			<li><p><span>{{address}}</span><input type="text" placeholder="请选择"  id="city-picker" data-codes=""  ref="dataNum"/></p></li>
			<li><p><span>{{detaddress}}</span><input type="text" placeholder="请填写详细地址"  ref="address"/></p></li>
		</ul>
		<!-- <router-link to="/shipaddressXq"><button type="button" class="blue-btn">保存</button></router-link> -->
		<button type="button" class="blue-btn" @click="PhoneNumLen">保存</button>
	</div>

</template>

<script>
export default {
	name: 'shippingaddress',
	data () {
		return {
			username:'姓名',
			telphone:'联系电话',
			address:'所在地区',
			detaddress:'详细地址'
			
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
  	},
	methods: {
		PhoneNumLen() {
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
			// 请求数据
			let url = this.http+'/weichat.php/user/shippingaddress'
			this.$http({
		        method: 'post',
		        url: url,   
		        data: this.qs.stringify({
		        	token:'06cd3b2382f7a92d76f62c21946aaf3c',	
		         	realname:realname.value,
		         	linkphone:linkphone.value,
		         	province:addressArray[0],
		         	city:addressArray[1],
		         	town:addressArray[2],
		         	address:address.value
		         	
		         })
	        })        
			.then((response)=>{
				console.log(response.data)
				if (response.data.status == 0) {
	        		return this.showDialog(response.data.msg);
	        		this.$router.replace({ path: '/'})
	        	}
	        	
		        if (response.data.status == 1) {	 	
		            return this.showDialog(response.data.msg);	            
		            // this.$router.replace({ path: '/health/healthfiles'})
		        }
		       

			})
			.catch((err)=>{
				return this.showDialog('请求服务器错误')
			}) 
		},
	}
}
</script>
