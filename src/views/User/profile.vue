<template>
	<div id="profile" class="profile-box">
		<v-logo></v-logo>
		<ul class="item-content">
			<li><p><span>姓名</span><input type="text" placeholder="请输入姓名"  ref="realname" /></p></li>
			<li>
				<p><span>性别</span>
					<select class="sex-select" ref="sex" v-model="selected" name="fruit">
					<option value="" selected="selected">请选择</option>
					<option value="1">男</option>
					<option value="0">女</option>						
				</select>
				</p>
			</li>
			<li><p><span>出生年月</span><input type="text" placeholder="请选择" id="demo1" readonly unselectable="on" onfocus="this.blur()" name="" value="" ref="birthday"  data-lcalendar="" /></p></li>
			<li><p><span>所在地区</span><input type="text" placeholder="请选择"  readonly unselectable="on" onfocus="this.blur()" id="city-picker" data-codes=""  ref="dataNum" /></p></li>
			<li><p><span>商户编码</span><input type="text" placeholder="若无商户编码，请留空" ref="agentcode" /></p></li>
		</ul>
			<!--  <router-link to="/shipaddressXq"><button type="button" class="blue-btn" @click="postData">确定</button></router-link> -->
			<button type="button" class="blue-btn" @click='profile()'>确定</button></router-link>
			
	</div>

</template>

<script>
// import "./assets/city/address.json"
// import s from './assets/city/address.json';
export default {
	name: 'profile',
	data () {
		return {
			http:localStorage.http,
			selected: '' ,
			sex:'',
			realname:''
		}
	},
	mounted() { //页面加载就执行函数
		var today = this.getdate()
		this.$refs.birthday.setAttribute('data-lcalendar','1900-01-1,'+today)
		//调日期控件
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
		})
	},
	methods: {			
		// 提交表单
		profile() {
		   	let realname=this.$refs.realname;
		   	let sex=this.$refs.sex;
		   	let birthday=this.$refs.birthday;
		   	let addressCodes =this.$refs.dataNum.dataset.codes;
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
			// 请求接口		
			let url = this.http+'/wechat.php/user/profile'
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
					agentcode:agentcode
				})

			}).then((response)=>{
				if (response.data.status == 3) {
					this.showDialog(response.data.msg)
				}else if (response.data.status == 1) {	 	
					this.$router.replace({ path: '/healthindex'})
				}else if (response.data.status == 2) {
					this.showDialog(response.data.msg)
					let timer = setTimeout(() => {
						this.$router.replace({ path: '/'})
					}, 2000);
				}
			}).catch((err)=>{
//				return this.showDialog('请求服务器错误')
			})		
		},
		getdate(date) {
			var date = new Date()
			var Y = date.getFullYear();
			var M = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
			var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
			return Y+'-'+M+'-'+D;
		}
	}
}
</script>

