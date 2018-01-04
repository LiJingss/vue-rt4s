<template>  
	<div id="information">
		<v-logo></v-logo>
		<ul class="item-content profile-box-item">
			<li>
				<p>
					<span>头像</span>
					<label>
						<span :style="headpic != ''?{background:'url('+ headpic +')'}:''" class="bgsize"></span>
						<input type="button" id="imgTest" @click="isshow=!isshow">
					</label>
				</p>
			</li>
			<li><p><span>姓名</span><input type="text" placeholder="请输入姓名"  ref="realname" v-model="realname" name="realname"/></p></li>
			<li>
				<p><span>性别</span>
					<select class="sex-select" ref="sex" v-model="selected" name="selected">
					<option value="" selected="selected">请选择</option>
					<option value="1">男</option>
					<option value="0">女</option>						
				</select>
				</p>
			</li>
			<li><p><span>出生日期</span><input type="text" placeholder="请选择" id="demo1" readonly unselectable="on" onfocus="this.blur()"  value="" ref="birthday" data-lcalendar="" v-model="birthday" name="birthday" /></p></li>
			<li><p><span>所在地区</span><input type="text" placeholder="请选择"  readonly unselectable="on"  id="city-picker" :data-codes="addressCodes" :data-code="province" ref="dataNum"  @click="focusfn($event)"/></p></li>
			
			<li><p><span>详细地址</span><input type="text" placeholder="可选填" ref="address" v-model="address" name="address" /></p></li>
			<li><p><span>联系电话</span><input type="text" placeholder="可选填" ref="linkphone" v-model="linkphone" name="linkphone"/></p></li>
			<li><p><span>邮箱</span><input type="text" placeholder="可选填" ref="email" v-model="email" name="email"/></p></li>
			<li><p><span>商户编码</span><input type="text" v-if="agentcode !=''" readonly unselectable="on" disabled="disabled" placeholder="若无商户编码，请留空" ref="agentcode" :value="agentcode"/><input type="text" v-else placeholder="如无商户编码，请留空" ref="agentcode" /></p></li>
		</ul>
		<ul class="item-content">
			<li><router-link to="/shipaddressXq"><p>收货地址</p><i class="iconfont icon-gengduo"></i></router-link></li>
		</ul>
		<button type="button" class="blue-btn" @click='putinformation()'>保存</button></router-link>

		<div class="headshot" v-if="isshow" @click.self="isshow=!isshow">
			<div class="moveTop">
				<button @click="usewx">使用微信头像</button>
				<button @click="usedefault">使用默认头像</button>
				<button @click="isshow=!isshow">取消</button>
			</div>
		</div>
	</div>  
</template>  
	
<script>  
export default {
	data () {  
		return {  
			http:localStorage.http,
			selected:'',
			realname:'',
			birthday:'',
			address:'',
			linkphone:'',
			email:'',
			addressCodes:'',
			headpic:null,
			provincename:'',
			cityname:'',
			townname:'',
			addresstext:'',
			province:'', 	
			agentcode:'',
			isshow: false
		}  
	},  
	mounted () {
		this.getInformation()
		this.wechatConfig()
		//调日期控件
		var today = this.getdate()
		this.$refs.birthday.setAttribute('data-lcalendar','1900-01-1,'+today)
		var calendar = new lCalendar();
			calendar.init({
				'trigger': '#demo1',
				'type': 'date'
			});

		 // 调取地区
		$("#city-picker").cityPicker({
			title: "选择省市区/县",
			onChange: function (picker, values, displayValues) {
				// console.log(values, displayValues);
			}
		});
	},
	methods: {  
		getInformation(){
			let url = this.http+'/wechat.php/user/information'
			this.$http({
				method: 'post',
				url: url,
				data: this.qs.stringify({
				 	token:'06cd3b2382f7a92d76f62c21946aaf3c'
				})		       
			})		
			.then((response)=>{
				if (response.data.status == 0) {
					return this.showDialog(response.data.msg);
				}else if (response.data.status == 2) {
					this.showDialog(response.data.msg);
					this.$router.replace({ path: '/'})
				}else if (response.data.status == 1) {
					// 判断完善资料
					if(response.data.data.url_status == 1){
						this.$router.replace({ path: '/profile'})
					}
					// 赋值
					let Data=response.data.data
					this.realname=Data.realname;
					this.selected=Data.sex;
					this.birthday=Data.birthday;
					this.address=Data.address;
					this.linkphone=Data.linkphone;
					this.email=Data.email;
					this.province=Data.province
					this.addressCodes= Data.province + ',' +Data.city+ ',' +Data.town
					this.headpic=Data.headpic;
					/*this.addresstext= Data.provincename + ' ' + Data.cityname + ' ' + Data.townname*/
					this.$refs.dataNum.value=Data.provincename + ' ' + Data.cityname + ' ' + Data.townname
					this.agentcode=Data.agentcode
				}
			})
			.catch((err)=>{
				return this.showDialog('请求服务器错误')
			}) 
		},
		putinformation() {
			let realname=this.$refs.realname;
			let sex=this.$refs.sex;
			let birthday=this.$refs.birthday;
			let addressCodes =this.$refs.dataNum.dataset.codes;
			let address=this.$refs.address;
			let linkphone=this.$refs.linkphone
			let email=this.$refs.email
			let agentcode=this.$refs.agentcode.value
			// 姓名中英文验证			
			if (realname.value == '') {
				realname.focus();
				return this.showDialog('请输入姓名');
			}else if(this.checkChineseLen(realname) == false){
				realname.focus();
				return;
			}	
			// 性别不能为空		
			if (sex.value == '') {
				sex.focus();
				return this.showDialog('请选择性别');
			}; 
			// 出生年月不能为空		
			if (birthday.value == '') {
				birthday.focus();
				return this.showDialog('请选择出生年月');
			}; 
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
			};
			//验证电话
			if (linkphone.value !='') {
				if (this.checkLinkphone(linkphone.value)== false) {
					return this.showDialog('请输入正确格式的电话');
				};
			};
			//验证邮箱
			if (email.value !='') {
				if (this.checkEmail(email.value) == false) {
					return this.showDialog('请输入正确的电子邮箱地址');
				};
			};
			let url = this.http+'/wechat.php/user/saveinformation'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',
					realname:realname.value,
					sex:sex.value,
					birthday:birthday.value,
					province:addressArray[0],
					city:addressArray[1],
					town:addressArray[2],
					address:address.value,
					linkphone:linkphone.value,
					email:email.value,
					agentcode:agentcode
				})
			})		
			.then((response)=>{
				console.log(response.data)
				if (response.data.status == 2) {
					this.$router.replace({ path: '/'})
					this.showDialog(response.data.msg);
				}else if (response.data.status == 1) {	 	
				   this.showDialog('保存成功');				
					// this.$router.replace({ path: '/health/healthfiles'})
				}else if(response.data.status == 4){
					 this.showDialog(response.data.msg);
				}
			})
			.catch((err)=>{
				return this.showDialog('请求服务器错误')
			}) 
		},
		usewx() {
			let url = this.http+'/wechat.php/user/wechatheadpic'
			this.$http({
				method:'post',
				url:url,
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c'
				})
			})
			.then((res)=>{
				if(res.data.status == 1){
					this.isshow = !this.isshow;
					this.headpic = res.data.data;
				}
			})
		},
		usedefault() {
			let url = this.http+'/wechat.php/user/defaultheadpic'
			this.$http({
				method:'post',
				url:url,
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c'
				})
			})
			.then((res)=>{
				if(res.data.status == 1){
					this.isshow = !this.isshow;
					this.headpic = '';
				}
			})
		},
		wechatConfig() {
			let url1 = window.location.href.split("#")[0]
			let url = this.http+'/wechat.php/wechat/signpackage'
			this.$http({
				method:'post',
				url:url,
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',
					url: url1
				})
			})
			.then((res)=>{
				if(res.data.status == 1){
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: res.data.data.signPackage.appId, // 必填，公众号的唯一标识
						timestamp: res.data.data.signPackage.timestamp, // 必填，生成签名的时间戳
						nonceStr: res.data.data.signPackage.nonceStr, // 必填，生成签名的随机串
						signature: res.data.data.signPackage.signature.toLowerCase(),// 必填，签名，见附录1
						jsApiList: [
							'checkJsApi',
							'chooseImage',
							'uploadImage'
						] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2

					});
				}	
			})
			.catch((err)=>{
				return this.showDialog(err)
			})
			wx.ready(function(res){
				console.log("wx.config>>>>>success"+JSON.stringify(res));
				wx.checkJsApi({
					jsApiList: [
						'checkJsApi',
						'chooseImage',
						'uploadImage'
					],
					success: function(res) {
						console.log("wx.checkJsApi>>>success"+JSON.stringify(res));
					}
				});
			});
			wx.error(function(res){
				console.log("wx.config>>>>>error"+JSON.stringify(res));
			});
		},
		getdate(date) {
			var date = new Date()
			var Y = date.getFullYear();
			var M = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
			var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
			return Y+'-'+M+'-'+D;
		},
		focusfn(e) {
			let el = e.target
			$('input').not(el).blur()
			$('select').blur()
		}
	}
}
</script>  
	
<style>  
	#information .headshot {
		position: fixed;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,.5);
	}
	#information .headshot div {
		
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	#information .headshot button {
		box-sizing: border-box;
		display: block;
		width: 100%;
		height: 1rem;
		background: #fff;
		opacity: .9;
		font-size: .3rem;
		border-bottom: 1px solid #666;
	}
	#information .headshot button:last-child {
		border-top: .09rem solid #999;
		border-bottom: 0;
	}
	#information .profile-box-item li:first-child p{
		height: 1.5rem;
		line-height: 1.5rem; 
	}
	#information .profile-box-item li:nth-child(1) img{
		width: 1.2rem;
		height: 1.2rem;
		border-radius: .05rem;
	}
	#information .profile-box-item li:nth-child(1) label span{
		display: block;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: .05rem;
		background-size: cover;
	}
	#information .bgsize {
		background: url(../../assets/img/default_pic.jpg);
		background-size: cover !important;
		background-position: center !important;
	}
	#information .profile-box-item li:first-child input{
		opacity: 0;
	}
	#information{
		margin-bottom: .2rem;
	}
	#information .item-content a{
		color: #333;
	}
	#information .container {  
		z-index: 99;  
		position: fixed;
		left: 0;  
		top: 0;  
		right: 0;  
		bottom: 0;  
		background:rgba(0,0,0,1);  
	}  
	#information .container>div { 
		position: fixed;  
		left: 0;  
		top: 0;  
		right: 0;  
		bottom: 60px;
		display: flex;
		align-items: center;
	}
	#information .container p {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #0D0D0D;
		color: #FFFFFF;
		display: flex;
		height: 60px;
		justify-content: space-between;
		padding: 0 .3rem;
	}
	#information .container p button {  
		color: #fff;
		padding: 0 .3rem;
		font-size: .3rem;
	}
	#information #image {  
		max-width: 100%;  
	}  
	#information .item-content p select {
		height: .4rem;
		line-height: .4rem;
		width: 74%;
	}
</style>