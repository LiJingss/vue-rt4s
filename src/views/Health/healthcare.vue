<template>
	<div id="healthcare">
		<v-logo></v-logo>
		<div :style="status == 4?{opacity:'1'}:{opacity:'0'}" >
			<ul class="item-content continue Zindex" >
				<li v-if="is_confirm == 1">
					<router-link :to="{path:'/healthpayment',query: {health_id:health_id,cycle_id:newcycle_id,order_id:order_id}}" ><p><i class="icon iconfont icon-jiankangguanli"></i>新的周期方案</p><i class="iconfont icon-gengduo"></i></router-link>
				</li>
			</ul>
			<div class="no-cycle" >
				<img src="../../assets/img/no-zhouqi.png" alt="" />
				<p>暂无周期</p>
			</div>
		</div>
		<div :style="status != 4 && status_h==1?{opacity: '1'}:{opacity:'0'}" class="have_cyc">
			<nav>
				<div>
					<select name="" v-on:change="getmanresult($event)" class="healthcare_select">
						<template v-for="(item,index) in items" >
							<option :value="item.id" v-if="item.id == data.id" selected="selected">{{item.title}}</option>
							<option :value="item.id" v-else>{{item.title}}</option>
						</template>
					</select>
					<i class="iconfont icon-xia"></i>
				</div>
			</nav>
			<ul class="item-content continue">
				<li  v-if="is_confirm == 1">
					<router-link :to="{path:'/healthpayment',query: {health_id:health_id,cycle_id:newcycle_id}}" ><p><i class="icon iconfont icon-jiankangguanli"></i>新的周期方案</p><i class="iconfont icon-gengduo"></i></router-link>
				</li>
				<li   v-else-if="msg.order_id !=0 || msg.pay_status ==1">
					<router-link :to="{path:'/healthpayment',query: {health_id:health_id,cycle_id:newcycle_id,order_id:order_id}}" ><p><i class="icon iconfont icon-zhifu"></i>去支付</p><i class="iconfont icon-gengduo"></i></router-link>
				</li>
			</ul>
			<div class="cycleStatus" >
				<div class="cycleS_l circle" ref="cycleS_l">
					<p><span :days="data.daysremaining" :care_num="data.care_num">{{data.daysremaining}}/{{data.care_num}}</span><br>天<br>周期天数</p>
				</div>
				<div class="cycleS_r">
					<p>周期名称：<span v-if="data.care_num == 30">巩固期</span><span v-else>调理期</span></p>
					<p>周期状态：<span v-if="data.status==0">未开始</span><span v-else-if="data.status==1">进行中</span><span v-else-if="data.status==2">已完成</span></p>
					<p>开始时间：<span v-if="data.start_time==0">未开始</span><span v-else>{{getdate(data.start_time)}}</span></p>
					<p>结束时间：<span v-if="data.start_time==0">未开始</span><span  v-else>{{getdate(data.end_time)}}</span></p>
				</div>
			</div>
			<ul class="cycleList item-content">
				<router-link to="" tag="li">
					<p>
						<em :class="data.is_tomorrow == 1?'iconfont icon-kaishishijian on':'iconfont icon-kaishishijian'"></em>明日开始
					</p>
					<i :class="data.is_tomorrow == 1?'iconfont icon-xia':'iconfont icon-gengduo'"></i>
					<div v-if="data.is_tomorrow == 1">
						<span><b class="iconfont icon-zhuyi"></b>是否确认明日开始？</br>请您严格遵守餐单饮食，听从健康教练指导。</span>
						<button class="blue-btn" @click="istomorrow()">确认调理</button>
					</div>
				</router-link>
				<router-link :to="data.is_show == 1?{path:'/checkups',query:{health_id:health_id,cycle_id:cycle_id}}:''" tag="li"><p><em :class="data.is_show == 1?'iconfont icon-jiancha on':'iconfont icon-jiancha'"></em>周期体检</p><i class="iconfont icon-gengduo"></i></router-link>
				<router-link :to="data.start_time != 0?{path:'/recipeNav/recipe',query:{health_id:health_id,cycle_id:cycle_id}}:''" tag="li"><p><em :class="data.start_time != 0?'iconfont icon-candan on':'iconfont icon-candan'" ></em>健康餐单</p><i class="iconfont icon-gengduo"></i></router-link>
				<router-link :to="data.start_time != 0 && data.firstrow != ''?{path:'/journal',query:{health_id:health_id,cycle_id:cycle_id}}:''" tag="li"><p><em :class="data.start_time != 0 && data.firstrow !=''?'iconfont icon-ribao on':'iconfont icon-ribao'"></em>健康日报</p><i class="iconfont icon-gengduo"></i></router-link>
			</ul>
		</div>	
	</div>
</template>

<script>
	export default {
		data(){
			return {
				http:localStorage.http,
				start: false,
				items:[],
				data:[],
				msg:[],
				cycle_id:'',
				height:'',
				health_id:'',
				order_id:'',
				is_confirm:'',
				newcycle_id:'',
				status:'',
				status_h:''
			}
		},
		created() {
			if(this.$route.query.health_id != undefined){
				this.health_id = this.$route.query.health_id
			}
			this.myclcye();
		},
		beforeDestroy(){
//			this.myclcye();
		},
		mounted(){
			var h = $('#app').css('font-size');
			if(sessionStorage.height != undefined && sessionStorage.height != 'undefined'){
				this.height = sessionStorage.height;
			}else {
				sessionStorage.height = parseInt(h.substr(0,h.length - 2))
				this.height = sessionStorage.height
			}
			let height = this.height;
			$('.cycleS_l.circle').circleProgress({
				size: height,
				value: .74,
				startAngle: -Math.PI*1.24,
				// lineCap: 'round',
				fill: { gradient: ["#5fcdea", "#afa8f5"] },
				emptyFill: "rgba(0, 0, 0, 0)",
				thickness: height/33.5
			})
		},
		methods: {
			Start(e){
				let el = e.target;
				this.start = !this.start;
				this.start ? el.style.borderBottom='0' :el.style.borderBottom='.01rem solid #e5e5e5';
			},
			getdate(date) {
				var date = new Date(date*1000)
				var Y = date.getFullYear();
				var M = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
				var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
				var H = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
				var N = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
				var S = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
				return Y+'-'+M+'-'+D;
			},
			myclcye(){
				let url = this.http+'/wechat.php/health/myclcye'
				this.$http({
			        method: 'post',
			        url: url,   
			        data: this.qs.stringify({
			         	token:'06cd3b2382f7a92d76f62c21946aaf3c',
			         	health_id:this.health_id
			        })
		        })
		        .then((res)=>{
		        	if (res.data.status == 2) {
		        		this.$parent.showDialog(res.data.msg)
						let timer = setTimeout(() => {
							this.$router.replace({ path: '/'})
						}, 2000);
		        	}else if (res.data.status == 1) {
		        		this.items=res.data.jumpUrl
		        		this.data=res.data.data
		        		this.msg=res.data.msg
		        		let cyvalue= (res.data.data.daysremaining*74/res.data.data.care_num)/100
						let height = this.height;
						this.order_id=res.data.msg.order_id
						this.cycle_id=res.data.data.id
						this.newcycle_id=res.data.msg.id
						this.is_confirm=res.data.msg.is_confirm
						this.pay_status=res.data.msg.pay_status
						if(this.$route.query.health_id == undefined || this.$route.query.health_id == '' || this.$route.query.health_id == 'undefined') {
							this.health_id=res.data.data.health_id
						}
//						this.health_id=res.data.data.health_id
						$('.cycleS_l.circle').circleProgress({
							size: height,
							value: cyvalue,
							startAngle: -Math.PI*1.24,
							// lineCap: 'round',
							fill: { gradient: ["#5fcdea", "#afa8f5"] },
							emptyFill: "rgba(0, 0, 0, 0)",
							thickness: height/33.5
						})
						this.status_h=1
		        	}else if (res.data.status == 4) { /*请求成功未选择健康方案*/
		        		this.status = res.data.status
//		        		this.$parent.showDialog('您还没有周期')
		        		this.is_confirm=res.data.data.is_confirm
		        	}else if (res.data.status == 3) { /*请求成功未创建档案*/
		        		this.$parent.showDialog('请先建立档案')
		        		this.$router.replace({path:'/healthindex'})
		        	}else if (res.data.status == 5) { /*未完善资料*/
		        		this.$parent.showDialog(res.data.msg)
		        		this.$router.replace({path:'/profile'})
		        	};
		        })
			},
			getmanresult(event){
//				let health_id=this.$route.query.health_id
				let url = this.http+'/wechat.php/health/myclcye'
				this.$http({
			        method: 'post',
			        url: url,   
			        data: this.qs.stringify({
			         	token:'06cd3b2382f7a92d76f62c21946aaf3c',
			         	cycle_id:event.target.value,
			         	health_id:this.health_id
			        })
		        })
		        .then((res)=>{
		        	if (res.data.status == 2) {
		        		this.$router.replace({ path: '/'})
		        		this.$parent.showDialog(res.data.msg)
		        	}else if (res.data.status == 1) {
		        		this.items=res.data.jumpUrl
		        		this.data=res.data.data
		        		this.cycle_id=res.data.data.id
//		        		this.health_id=res.data.data.health_id
		        		let cyvalue= (res.data.data.daysremaining*74/res.data.data.care_num)/100
						let height = this.height;
						$('.cycleS_l.circle').circleProgress({
							size: height,
							value: cyvalue,
							startAngle: -Math.PI*1.24,
							// lineCap: 'round',
							fill: { gradient: ["#5fcdea", "#afa8f5"] },
							emptyFill: "rgba(0, 0, 0, 0)",
							thickness: height/33.5
						})
		        		
		        	}else if (res.data.status == 4) {
		        		this.$parent.showDialog(res.data.msg)
		        	}else if (res.data.status == 3) {
		        		this.$parent.showDialog(res.data.msg)
		        	};
		        })
			},
			istomorrow(){
				let cycle_id=$(".healthcare_select").find("option:selected").val()
				let url = this.http+'/wechat.php/health/istomorrow'
				this.$http({
			        method: 'post',
			        url: url,   
			        data: this.qs.stringify({
			         	token:'06cd3b2382f7a92d76f62c21946aaf3c',
			         	cycle_id:cycle_id,
			         	health_id:this.health_id
			        })
		        })
				.then((res)=>{
					if(res.data.status == 0){
						this.$parent.showDialog(res.data.msg)
						return
					}else if (res.data.status == 1) {
		        		window.location.reload();
		        }else if (res.data.status == 2) {
		        		this.$router.replace({ path: '/'});
		        		this.$parent.showDialog(res.data.msg)
		        	}else if (res.data.status == 3) {
		        		this.$parent.showDialog(res.data.msg)
		        	};
		        })
			}
		}
	}
</script>

<style>
	[v-cloak]{
		display: none !important;
	}
	#healthcare .logo {
		margin: 0;
		background: none;
		position: inherit;
		margin-bottom: .2rem;
	}
	#app{
		font-size: 3.35rem;
	}
	#healthcare>div {
		position: absolute;
		width: 100%;
		top: .88rem;
	}
	#healthcare>div.have_cyc{
		top: 1.1rem;
	}
	#healthcare nav{
		background: #FFFFFF;
		height: .88rem;
		color: #fff;
		position: relative;
		box-shadow: 0 0 4px #e4e1e1;
	}
	#healthcare nav>div{
		clear: both;
		overflow: hidden;
		text-align: center;
		height: 100%;
	}
	#healthcare nav select{
		color: #999999;
		font-size: .32rem;
		margin-top: -.15rem;
		width: 1.3rem;
		height: .5rem;
		/*float: left;*/
	}
	#healthcare nav span {
		display: inline-block;
		line-height: .88rem;
		font-size: .34rem;
	}
	#healthcare nav i {
		color: #999999;
		/*float: left;*/
		display: inline-block;
		/*transform:rotate(10deg);*/
		font-size: .34rem;
		margin-left: .2rem;
		margin-top: .3rem;
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
		/*background: #fff;*/
		border-top:.01rem solid #e5e5e5;
		/*border-bottom:.01rem solid #e5e5e5;*/
		/*margin: .2rem 0;*/
		border: none;
	}

	#healthcare .cycleStatus {
		height: 4.02rem;
		background: #fff;
		margin-top: .2rem;
	}
	#healthcare .cycleStatus .cycleS_l {
		float: left;
		width: 3.35rem;
		margin: .6rem .26rem 0;
		height: 3.35rem;
		background: url(../../assets/img/progress.png) no-repeat;
		background-size: contain;
		position: relative;
	}
	#healthcare .cycleStatus .cycleS_l p {
		position: absolute;
		top: 36%;
		left: 23%;
		line-height: 0.5rem;
	}
	#healthcare .cycleStatus .cycleS_l p span {
		display: block;
		width: 90px;
	    text-align: center;
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
		font-size: 3.35rem;
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
	#healthcare .cycleList li:nth-child(1) p em.on {
		color: #fa88a0;
		font-size: .4rem;
	}
	#healthcare .cycleList li:nth-child(2) p em.on {
		color: #77ecd7;
		font-size: .4rem;
	}
	#healthcare .cycleList li:nth-child(3) p em.on {
		color: #ef9043;
		font-size: .44rem;
		margin-right: .16rem;
	}
	#healthcare .cycleList li:nth-child(4) p em.on {
		color: #8dd6f5;
		font-size: .39rem;
	}
	#healthcare .cycleList li div {
		clear: both;
		/*height: 2.4rem;*/
		background: #efeff4;
		width: 100%;
		font-size: .26rem;
		border-bottom: .01rem solid #e5e5e5;
		padding: .2rem 0;
	}
	#healthcare .cycleList li div span {
		display: block;
		padding: .25rem 0 .25rem .6rem;
		font-size: .26rem;
		color: #f8726d;
		width: 88%;
		line-height: .4rem;
		margin: 0 auto;
		text-align: left;
	}
	#healthcare .cycleList li div span b {
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
	.item-content a p{
		color: #333;
	}
	#healthcare .item-content{
		margin-top: .2rem;
		border: none;
		box-shadow: 0 0 4px #e4e1e1;
	}
	#healthcare .item-content li{
		margin: 0 .2rem;
	}
	#healthcare .no-cycle{
		background: #FFFFFF;
		width: 100%;
		position: absolute;
		height:  13rem;
		margin: 0 auto;
		padding: 2.3rem 0 1rem 0;
	}
	#healthcare .no-cycle img{
		width:3.13rem;
		height: 2.04rem;
		
	}
	#healthcare .no-cycle p{
		color: #B2B2B2;
		margin-top: .2rem;
		font-size: .34rem;
	}
	#healthcare .continue p .icon-jiankangguanli{
		font-size: .46rem;
		margin: 0;
		color: #47cce2;
		margin: .02rem .2rem 0 .1rem;
	}
	#healthcare .continue p {
		margin-left: 0;
	}
	#healthcare .continue{
		background: #FBFBFB;
		position:relative;
		animation:myfirst 5s;
		-webkit-animation:myfirst 5s; 
	}
	@keyframes myfirst{
		0%   {background:#FFFFFF;left:0px; top:-70px;}
		25%  {background:#FBFBFB;left:0px; top:0px;}
	}
	@-webkit-keyframes myfirst{
		0%   {background:#FFFFFF;left:0px; top:0px;}
		25%  {background:#FBFBFB;left:0px; top:0px;}
	}
	#healthcare .continue p .icon-zhifu{
		font-size: .42rem;
		margin: 0;
		color: #FA88A0;
		margin: .02rem .2rem 0 .1rem;
	}
	.Zindex{
		z-index: 999;
	}
	
</style>