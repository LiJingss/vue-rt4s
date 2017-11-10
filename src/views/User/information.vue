<template>
	<div id="information" class="information-box">
		<ul class="item-content profile-box-item">
			<li><p><span>头像</span><label><input type="file" ><img src="../../assets/img/default_pic.jpg" alt=""></label></p></li>
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
			<li><p><span>出生年月</span><input type="text" placeholder="请选择" id="demo1" readonly name="" value="" ref="birthday"  data-lcalendar="1979-01-1,2019-12-31" /></p></li>
			<li><p><span>所在地区</span><input type="text" placeholder="请选择"  readonly="" id="city-picker" data-codes=""  ref="dataNum" /></p></li>
			<li><p><span>详细地址</span><input type="text" placeholder="可选填" ref="address"/></p></li>
			<li><p><span>联系电话</span><input type="text" placeholder="可选填" ref="linkphone"/></p></li>
			<li><p><span>邮箱</span><input type="text" placeholder="可选填" ref="email"/></p></li>
		</ul>
		<ul class="item-content">
			<li><p>收货管理</p><i class="iconfont icon-gengduo"></i></li>
		</ul>
		<button type="button" class="blue-btn" @click='information()'>保存</button></router-link>
	</div>

</template>

<script>
export default {
	name: 'information',
	data () {
		return {
			selected: '' 
			
		}
	},
	mounted() {		 
    	//this.information()//页面加载就执行函数
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
   		});   		 
  	},
	methods: {
		information() {
			let realname=this.$refs.realname;
		   	let sex=this.$refs.sex;
		   	let birthday=this.$refs.birthday;
		   	let addressCodes =this.$refs.dataNum.dataset.codes;
		   	let address=this.$refs.address;
		   	let linkphone=this.$refs.linkphone
		   	let email=this.$refs.email
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
			let url = this.http+'/weichat.php/user/information'
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
		         	email:email.value
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
		}
	}
}
</script>

<style scoped>
.profile-box-item li:first-child p{
	height: 1.5rem;
	line-height: 1.5rem; 
}
.profile-box-item li:nth-child(1) img{
	border: .01rem solid #ccc;
	width: 1.2rem;
	height: 1.2rem;
	border-radius: .05rem;
}
.profile-box-item li:first-child input{
	opacity: 0;
}
</style>
