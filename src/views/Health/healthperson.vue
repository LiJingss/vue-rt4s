<template>
	<div id="healthperson" >
		<div class="healthperson-box">
			<dl>
				<dt><img src="../../assets/img/default_pic.jpg" alt=""></dt>
				<dd>
					<p>
						<span>叶子子</span>
						<span>账号：13718517583</span>
					</p>
					<em>修改资料<i class="iconfont icon-enter"></i></em>
				</dd>
			</dl>
		</div>
		<div class="health-file-text">
			健康管理档案一（正在进行）
		</div>
		<ul class="health-main-list">
			<li>
				<i class="icon iconfont icon-zhouqi"></i>
				<span>我的周期</span>
			</li>
			<li>
				<i class="icon iconfont icon-zhenduan"></i>
				<span>初诊</span>
			</li>
			<li>
				<i class="icon iconfont icon-qushi"></i>
				<span>得分趋势</span>
			</li>
			<li>
				<i class="icon iconfont icon-dangan"></i>
				<span>我的档案</span>
			</li>
			<li>
				<i class="icon iconfont icon-jiaolian"></i>
				<span>我的教练</span>
			</li>
			<li>
				<i class="icon iconfont icon-dingdan-copy"></i>
				<span>我的订单</span>
			</li>
			<li>
				<i class="icon iconfont icon-ziliao"></i>
				<span>我的资料</span>
			</li>
			<li>
				<i class="icon iconfont icon-anquanshezhi"></i>
				<span>安全设置</span>
			</li>
			<li></li>
		</ul>
		<button class="white-btn">退出登录</button>
		<div class="black-bg" v-if="seen"><!-- 背景遮罩 --></div>
		<div class="health-hint" v-if="seen">
			<router-link to="/healthfiles"><img src="../../assets/img/health-hint.png" alt=""></router-link>
		</div>
	</div>
</template>
<script>
export default {
	name: 'profile',
	data () {
		return {
			selected: '',
			seen:true
		}
	},
	methods: {

	}
}
</script>
<style scoped>
.black-bg{
	position: fixed;
	background: #333;
	opacity: 0.6;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
}
.health-hint{
	position: absolute;
	z-index: 2;
	top:26%;
	left: .2rem;
}
.health-hint img {
	width: 6.68rem;
	height: 3.34rem;
}
#healthperson{
	text-align: left;
}
#healthperson .healthperson-box{
	background: url('../../assets/img/healthperbg.png') no-repeat;
	width: 100%;
	background-size: 100%;
	height: 2.5rem;
	padding: .5rem .3rem;
}
#healthperson>div>dl{
	clear: both;
	overflow: hidden;
}
#healthperson>div>dl>dt{
	float: left;
}
#healthperson>div>dl>dt>img{
	width: 1.53rem;
	height: 1.53rem;
}
#healthperson>div>dl>dd>p>span{
	display: block;
	font-size: .28rem;
	
}
#healthperson>div>dl>dd>p>span:nth-child(1){
	font-weight: bold;
}
#healthperson>div>dl>dd p{
	float: left;
	color: #fff;
	line-height: .65rem;
	margin-top: .15rem;
	margin-left: .3rem;
}
#healthperson>div>dl>dd em{
	float: right;
	font-size: .28rem;
	color: #fff;
	margin-top: .5rem;
}
#healthperson>div>dl>dd em i{
	font-size: .3rem;
}
#healthperson .health-file-text{
	background: #efeff4;
	color: #b9b9b9;
	font-size: .28rem;
	border-bottom: .01rem solid #e5e5e5;
	height: .6rem;
	line-height: .6rem;
	padding: 0 .3rem;
}
#healthperson .health-main-list{
	clear: both;
	overflow: hidden;
	background: #fff;
}
#healthperson .health-main-list li{
	width:33.3%;
	float: left;
	text-align: center;
	height: 1.97rem;
	border-bottom: .03rem solid #efeff4;
	border-right: .03rem solid #efeff4;
	padding-top: .46rem;
}
#healthperson .health-main-list li:nth-child(3n+3){
	border-right: none;
}
#healthperson .health-main-list li i{
	display: block;
	font-size: .54rem;
}
.health-main-list li i.icon-zhouqi{
	color: #f8839a;
}
.health-main-list li i.icon-zhenduan{
	color: #75ecd8;
}
.health-main-list li i.icon-qushi{
	color: #71c4f0;
}
.health-main-list li i.icon-dangan{
	color: #f7826f;
}
.health-main-list li i.icon-jiaolian{
	color: #83cff2;
}
.health-main-list li i.icon-dingdan-copy{
	color: #f88096;
}
.health-main-list li i.icon-ziliao{
	color: #f3a152;
}
.health-main-list li i.icon-anquanshezhi{
	color: #70e6d0;
}
#healthperson .health-main-list li span{
	font-size: .28rem;
}
.white-btn{
	display: block;
	background: #fff;
	text-align: center;
	border-top: .01rem solid #e5e5e5;
	border-bottom: .01rem solid #e5e5e5;
	width: 100%;
	height: .88rem;
	line-height: .88rem;
	margin-top: .2rem;
}
</style>