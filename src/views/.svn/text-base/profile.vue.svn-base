<template>
	<div id="profile" class="profile-box">
		<!-- <h2> {{msg}} </h2> -->
			<ul class="profile-box-item">
				<li><span>{{username}}</span><input type="text"  placeholder="请输入姓名"/></li>
				<!-- <li><span>{{usersex}}</span><input type="text" placeholder="请选择"/></li> -->
				<li>
					<span>{{usersex}}</span>
					<select class="sex-select">
						<option value="">请选择</option>
						<option value="">男</option>
						<option value="">女</option>
					</select>
				</li>
				<li><span>{{yeardate}}</span><input type="text" placeholder="请选择"  id="selDate"/></li>
				<li><span>{{address}}</span><input type="text" placeholder="请选择"  /></li><!-- @click="selCity" -->
			</ul>
			<!--  <router-link to="/shipaddressXq"><button type="button" class="blue-btn" @click="postData">确定</button></router-link> -->
		<button type="button" class="blue-btn">确定</button></router-link>
		 
	</div>

</template>

<script>
/*import '../components/picker.min.js'
import '../components/DateSelector.js'
import '../components/userInfo.js'*/
export default {
	name: 'profile',
	data () {
		return {
			username:'姓名',
			usersex:'性别',
			yeardate:'出生年月',
			address:'出生地区'
		}
	},
	methods: {
		/*postData () {
			this.$http({
				method: 'post',
				url: 'http://www.anmei.com/weichat.php/index/getprovince',
				data: {
					name: 'xiaoming',
					info: '12'
				}
			})
		}*/
	}
}
</script>

<style scoped>
.profile-box{
	text-align: left;
}
.profile-box-item{
	border-top:.02rem solid #e5e5e5;
	border-bottom:.02rem solid #e5e5e5;
	background: #fff;
	margin-bottom: .2rem;
}
.profile-box-item li{
	margin-left: .3rem; 
	clear: both;
	overflow: hidden;
	color: #333;
	border-bottom:.02rem solid #e5e5e5;
	font-size: .34rem;
	height: .88rem;
	line-height: .88rem;
	padding-right: .3rem;
}
.profile-box-item li:last-child{
	border-bottom: none;

}
.profile-box-item li span{
	display: inline-block;
	font-size: .3rem;
	width: 1.8rem;
	float: left;
}
.profile-box-item li input{
	font-size: .3rem;
	height: .88rem;
	line-height: .88rem;
	width: 70%;
	float: left;
}
.sex-select{
	font-size: .34rem;
	color: #a9a9a9;
	height: .88rem;
	line-height: .88rem;
	float: left;
}
.sex-select option{
	color: #a9a9a9;
	font-size: .34rem;
}

</style>
