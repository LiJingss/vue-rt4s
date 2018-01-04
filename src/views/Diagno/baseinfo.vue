<template>
	<div id="baseinfo">
		<v-logo></v-logo>
		<ul class="item-content" v-show="isshow">
			<li><p><span><b>*</b>姓名</span><input type="text" placeholder="请输入姓名" ref="realname" class="realname"/></p></li>
			<li>
				<p><span><b>*</b>性别</span>
					<select class="sex-select" ref="sex" name="selected">
						<option value="" selected="selected">请选择</option>
						<option value="1">男</option>
						<option value="0">女</option>						
					</select>
				</p>
			</li>
			<li><p><span><b>*</b>出生日期</span><input type="text" placeholder="请选择" id="demo2" readonly unselectable="on" onfocus="this.blur()"  value="" ref="birthday" data-lcalendar="" /></p></li>
			<li><p><span><b>*</b>身高</span><input type="number" placeholder="必填" ref="height" />cm</p></li>
			<li><p><span><b>*</b>体重</span><input type="number" placeholder="必填" ref="weight" />kg</p></li>
			<li><p><span>&nbsp;血压</span><input type="number" placeholder="高压" ref="pressure_h" />mmHg&nbsp;&nbsp;&nbsp;<input type="number" placeholder="低压" ref="pressure_l" />mmHg</p></li>
			<li><p><span>&nbsp;血糖</span><input type="number" placeholder="可选填" ref="sugar"/>mmol/L</p></li>
		</ul>
		<button type="button" class="blue-btn" @click="isshow=!isshow" v-show="isshow">下一步</button>
		<ul class="item-content" v-show="!isshow">
			<li><p><span>腰围</span><input type="number" placeholder="可选填" ref="waist" />cm</p></li>
			<li><p><span>臀围</span><input type="number" placeholder="可选填" ref="hip" />cm</p></li>
			<li><p><span>胸围</span><input type="number" placeholder="可选填" ref="bust" />cm</p></li>
			<li><p><span>上臂围</span><input type="number" placeholder="可选填" ref="highhip" />cm</p></li>
			<li><p><span>大腿围</span><input type="number" placeholder="可选填" ref="thigh"/>cm</p></li>
			<li><p><span>小腿围</span><input type="number" placeholder="可选填" ref="calf"/>cm</p></li>
		</ul>
		<button type="button" class="blue-btn" @click="putbaseinfo()" v-show="!isshow">完成</button>
		<div v-if="showPopup" class="bg"></div>
		<div v-if="showPopup" class="Popupbox">
			<img src="../../assets/img/finishhand.png" alt="">
			<h2>已成功提交健康资料</h2>
			<p><span @click="showPopup=!showPopup">暂不</span><router-link to="/healthindex">去首页</router-link></p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'graphs',
	data () {
		return {
			http:localStorage.http,
			health_id: this.$route.query.health_id,
			selected:'',
			isshow: true,
			baseinfo:null,
			showPopup: false
		}
	},	
	mounted() { //页面加载就执行函数
		let d = new Date();
		let str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		$('#demo2').attr('data-lcalendar','1918-01-1,'+str)
		//调日期控件
		var calendar = new lCalendar();
		calendar.init({
			'trigger': '#demo2',
			'type': 'date'
		});

		let url = this.http+'/wechat.php/Health/basicdataone'
		this.$http({
			method: 'post',
			url: url,   
			data: this.qs.stringify({
				token:'06cd3b2382f7a92d76f62c21946aaf3c',
				health_id:this.health_id
			})
		}).then((res)=>{
			if (res.data.status == 1) {
				this.$refs.realname.value = res.data.msg.realname;
				this.$refs.sex.value = res.data.msg.sex;
				this.$refs.birthday.value = res.data.msg.birthday;
				let arr = res.data.msg.pressure.split("/")
				arr[0] == "" ? this.$refs.pressure_h.value = '':this.$refs.pressure_h.value = arr[0];
				arr[1] == "" ? this.$refs.pressure_l.value = '':this.$refs.pressure_l.value = arr[1];
				this.$refs.height.value = res.data.msg.height;
				this.$refs.weight.value = res.data.msg.weight;
				res.data.msg.sugar==0?this.$refs.sugar.value='':this.$refs.sugar.value=res.data.msg.sugar;
				res.data.msg.waist==0?this.$refs.waist.value='':this.$refs.waist.value = res.data.msg.waist;
				res.data.msg.hip==0?this.$refs.hip.value='':this.$refs.hip.value = res.data.msg.hip;
				res.data.msg.bust==0?this.$refs.bust.value='':this.$refs.bust.value = res.data.msg.bust;
				res.data.msg.highhip==0?this.$refs.highhip.value='':this.$refs.highhip.value = res.data.msg.highhip;
				res.data.msg.thigh==0?this.$refs.thigh.value='':this.$refs.thigh.value = res.data.msg.thigh;
				res.data.msg.calf==0?this.$refs.calf.value='':this.$refs.calf.value = res.data.msg.calf;
				
			}else if(res.data.status == 2) {
				this.showDialog('您还没有登录')
				this.$router.replace({ path: '/'})
			}
		}).catch((err)=>{
//			return this.showDialog('请求服务器错误')
		})
	},
	methods: {
		putbaseinfo(){
			if (this.$refs.realname.value == '') {
				this.isshow = !this.isshow
				this.$refs.realname.focus();
				return this.showDialog('请输入姓名');
			}else if(this.checkChineseLen(this.$refs.realname) == false){
				this.isshow = !this.isshow
				this.$refs.realname.focus();
				return ;
			}		
			if (this.$refs.sex.value == '') {
				this.isshow = !this.isshow
				this.$refs.sex.focus();
				return this.showDialog('请选择性别');
			}; 	
			if (this.$refs.birthday.value == '') {
				this.isshow = !this.isshow
				this.$refs.birthday.focus();
				return this.showDialog('请选择出生年月');
			};
			if (this.$refs.height.value == '') {
				this.isshow = !this.isshow
				this.$refs.height.focus();
				return this.showDialog('请填写身高');
			};
			if (this.$refs.weight.value == '') {
				this.isshow = !this.isshow
				this.$refs.weight.focus();
				return this.showDialog('请填写体重');
			};
			let url = this.http+'/wechat.php/health/baseinfo'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',
					status: 1,
					health_id: this.health_id,
					realname:this.$refs.realname.value,
					sex:this.$refs.sex.value,
					birthday:this.$refs.birthday.value,
					height:this.$refs.height.value,
					weight:this.$refs.weight.value,
					pressure:this.$refs.pressure_h.value+'/'+this.$refs.pressure_l.value,
					sugar:this.$refs.sugar.value,
					waist:this.$refs.waist.value,
					hip:this.$refs.hip.value,
					bust:this.$refs.bust.value,
					highhip:this.$refs.highhip.value,
					thigh:this.$refs.thigh.value,
					calf:this.$refs.calf.value
				})
			}).then((res)=>{
				if (res.data.status == 1) {	 	
					if(res.data.msg == 0){
						this.$router.push({ path: '/healthinfo',query:{health_id:this.health_id}})
						this.showDialog('提交成功')
					}else if(res.data.msg == 1){
						this.showPopup=true
					}
				}else if(res.data.status == 2) {
					this.showDialog(res.data.msg)
					this.$router.replace({ path: '/'})
				}else if(res.data.status == 3){
					if(res.data.msg == 0){
						this.showDialog('修改成功')
						this.$router.push({ path: '/healthinfo',query:{health_id:this.health_id}})
					}else if(res.data.msg == 1){
						this.showPopup=true
					}
				}
			}).catch((err)=>{
				return this.showDialog('请求服务器错误')
			})
		}
	}
}
</script>

<style scoped>
	#baseinfo .item-content input.realname,#baseinfo .item-content input#demo2{
		width: 75%;
	}
	#baseinfo .item-content input{
		width: 14%;
	}
	#baseinfo ul li p span b {
		color: #ff706b; 
		font-weight: bold;
	}
</style>