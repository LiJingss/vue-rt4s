<template>
	<div id="profile" class="profile-box">
		
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
			<li><p><span>出生年月</span><input type="text" placeholder="请选择" id="demo1" readonly name="" value="" ref="birthday"  data-lcalendar="1979-01-1,2019-12-31" /></p></li>
			<li><p><span>所在地区</span><input type="text" placeholder="请选择"  readonly="" id="city-picker" data-codes=""  ref="dataNum" /></p></li>
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
			selected: '' ,
			sex:'',
			realname:''

		
		}
	},
	mounted() { //页面加载就执行函数
    	// this.profile()
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
		// 提交表单
        profile() {
		   	let realname=this.$refs.realname;
		   	let sex=this.$refs.sex;
		   	let birthday=this.$refs.birthday;
		   	let addressCodes =this.$refs.dataNum.dataset.codes;
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
			let url = this.http+'/weichat.php/user/profile'
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
		         	town:addressArray[2]
		         })

	        }).then((response)=>{
				console.log(response.data)
				if (response.data.status == 0) {
	        		return this.showDialog(response.data.msg);
	        	}
		        if (response.data.status == 1) {	 	
		            // this.showDialog(response.data.msg);
		            this.$router.replace({ path: '/healthperson'})
		        }
		       

			}).catch((err)=>{
				return this.showDialog('请求服务器错误')
			})        
      }
  }
}
</script>

