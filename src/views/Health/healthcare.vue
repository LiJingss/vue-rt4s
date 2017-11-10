<template>
	<div id="healthcare">
		<nav>
			<span>第一周期</span><i class="iconfont icon-xia"></i>
			<ul>
				<li>第一周期</li>
				<li>第二周期</li>
				<li>第三周期</li>
			</ul>
		</nav>
		<ul class="item-content continue">
			<li><p>新的周期方案</p><i class="iconfont icon-gengduo"></i></li>
		</ul>
		<div class="cycleStatus">
			<div class="cycleS_l" ref="cycleS_l">
				<input class="knob" data-angleOffset=-125 data-angleArc=250 data-fgColor="#66EE66" data-rotation="anticlockwise" value="35">
				<!-- <div class="progressbox progressbox_l">
					<div class="progress left"></div>
				</div>
				<div class="progressbox progressbox_r">
					<div class="progress right"></div>
				</div> -->
				<p><span>30/36</span><br>天<br>周期天数</p>
			</div>
			<div class="cycleS_r">
				<p>周期名称：<span>调理期</span></p>
				<p>周期状态：<span>进行中</span></p>
				<p>开始时间：<span>2017.10.11</span></p>
				<p>结束时间：<span>2018.12.02</span></p>
			</div>
		</div>
		<ul class="cycleList item-content">
			<li>
				<p @click="Start($event)"><em class="iconfont icon-kaishishijian"></em>明日开始</p><i :class="{ 'iconfont icon-xia':start,'iconfont icon-gengduo':!start  }"></i>
				<div v-if="start">
					<span><i class="iconfont icon-zhuyi"></i>是否明日开始调理，确认后请严格按照餐单执行，并积极配合健康教练完成健康日报！</span>
					<button class="blue-btn">确认调理</button>
				</div>
			</li>
			<li><p><em class="iconfont icon-jiancha"></em>周期体检</p><i class="iconfont icon-gengduo"></i></li>
			<li><p><em class="iconfont icon-candan" ></em>健康餐单</p><i class="iconfont icon-gengduo"></i></li>
			<li><p><em class="iconfont icon-ribao"></em>健康日报</p><i class="iconfont icon-gengduo"></i></li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				start: false
			}
		},
		mounted(){
			/*$(".knob").knob({
				width:110,//宽度
				thickness:0.2,//厚度按百分几计算
				fgColor:'#f90',//前景色
				displayInput:false,//不显示input
				bgColor:'#e8ecef',//背景色
				readOnly:false,//只读
				linecap:'round',
				inputColor:'#f60', //数字的颜色
			});*/
			/*let height = this.$refs.cycleS_l.getBoundingClientRect().height;
			/*$(".knob").knob({
				width:height,//宽度
				// height:height*2.5,
				thickness:0.2,//厚度按百分几计算
				fgColor:'#f90',//前景色
				displayInput:false,//不显示input
				bgColor:'#e8ecef',//背景色
				readOnly:false,//只读
				linecap:'round',
				inputColor:'#f60', //数字的颜色
                change : function (value) {
                    //console.log("change : " + value);
                },
                release : function (value) {
                    //console.log(this.$.attr('value'));
                    console.log("release : " + value);
                },
                cancel : function () {
                    console.log("cancel : ", this);
                }
            });*/
		},
		methods: {
			Start(e){
				let el = e.target;
				this.start = !this.start;
				this.start ? el.style.borderBottom='0' :el.style.borderBottom='.01rem solid #e5e5e5';
			}
		}
	}
</script>

<style>
	#healthcare nav{
		background: #47cce2;
		height: .88rem;
		color: #fff;
		position: relative;
	}
	#healthcare nav span {
		display: inline-block;
		line-height: .88rem;
		font-size: .34rem;
	}
	#healthcare nav i {
		transform:rotate(10deg);
		font-size: .34rem;
		margin-left: .2rem;
	}
	#healthcare nav ul {
		height: 0;
		overflow: hidden;
		width: 100%;
		position: absolute;
		background: #fff;
		color: #333;
	}
	#healthcare nav ul li {
		line-height: .88rem;
		font-size: .32rem;
	}
	#healthcare nav ul li:not(:last-child) {
		border-bottom: .01rem dashed #b2b2b2;
	}
	
	#healthcare>div,#healthcare>ul {
		background: #fff;
		border-top:.01rem solid #e5e5e5;
		border-bottom:.01rem solid #e5e5e5;
		margin: .2rem 0;
	}

	#healthcare .cycleStatus {
		height: 4.02rem;
	}
	#healthcare .cycleStatus .cycleS_l {
		float: left;
		width: 3.35rem;
		margin: .6rem .3rem 0;
		height: 3.35rem;
		/*background: url(../../assets/img/progress.png) no-repeat;*/
		background-size: contain;
		position: relative;
	}
	#healthcare .cycleStatus .cycleS_l p {
		position: absolute;
		top: 36%;
		left: 25%;
		line-height: 0.5rem;
	}
	#healthcare .cycleStatus .cycleS_l p span {
		color: #47cce2;
		font-size: .62rem;
	}
	#healthcare .cycleStatus .cycleS_l .progressbox {
		width: 51%;
		height: 102%;
		position: absolute;
		top:-1%;
		overflow: hidden;
	}
	#healthcare .cycleStatus .cycleS_l .progressbox_l {
		left:-1%;
	}
	#healthcare .cycleStatus .cycleS_l .progressbox_r {
		right:-1%;
	}
	#healthcare .cycleStatus .cycleS_l .progressbox .progress {
		width: 200%;
		height: 100%;
		border: .15rem solid transparent;
		border-radius: 50%;
		position: absolute;
		top:0;
	}
	#healthcare .cycleStatus .cycleS_l .progressbox .left {
		border-left-color: white;
		border-bottom-color: white;
		left:0;
		transform: rotate(91deg);
	}
	#healthcare .cycleStatus .cycleS_l .progressbox .right {
		border-top-color: white;
		border-right-color: white;
		right:0;
		transform: rotate(-1deg);
	}
	#healthcare .cycleStatus .cycleS_r {
		float: left;
		margin: .75rem .15rem;
		text-align: left;
	}
	#healthcare .cycleStatus .cycleS_r p {
		font-size: .3rem;
		line-height: .6rem;
		color: #b2b2b2;
	}
	#healthcare .cycleStatus .cycleS_r p span {
		color: #333;
		font-size: .3rem;
	}

	
	#healthcare .cycleList li p em {
		font-size: .4rem;
		margin-right: .2rem;
	}
	#healthcare .cycleList li:nth-child(1) p em {
		color: #fa88a0;
		font-size: .4rem;
	}
	#healthcare .cycleList li:nth-child(2) p em {
		color: #77ecd7;
		font-size: .4rem;
	}
	#healthcare .cycleList li:nth-child(3) p em {
		color: #ef9043;
		font-size: .44rem;
		margin-right: .16rem;
	}
	#healthcare .cycleList li:nth-child(4) p em {
		color: #8dd6f5;
		font-size: .39rem;
	}
	#healthcare .cycleList li div {
		clear: both;
		height: 2.4rem;
		background: #efeff4;
		width: 100%;
		font-size: .26rem;
		border-bottom: .01rem solid #e5e5e5;
	}
	#healthcare .cycleList li div span {
		display: block;
		padding: .25rem 0 .25rem .6rem;
		font-size: .26rem;
		color: #f8726d;
		width: 78%;
		line-height: .4rem;
		margin: 0 auto;
	}
	#healthcare .cycleList li div span i {
		float: left;
		font-size: 1rem;
		margin-left:-.7rem;
		margin-top: -.17rem;
	}
	#healthcare .cycleList li div button {
		width: 3.6rem;
		height: .7rem;
		display: block;
		border-radius: .1rem;
		background: #47cce2;
		line-height: .7rem;
		color: #fff;
		margin: 0 auto;
		font-size: .3rem;
	} 

</style>