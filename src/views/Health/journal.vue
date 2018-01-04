<template>
	<div id="journal">
		<v-logo></v-logo>
		<template v-if="status == 4 && show==1 || status == 5">
			<div class="no-cycle" >
				<img src="../../assets/img/no-zhouqi.png" alt="" />
				<p>暂无日报</p>
			</div>
		</template>
		<template v-else>
			<ul class="item-content">
				<li><p><span>日期</span><input type="text" id="jdata" :value="getdate(items.add_time)" readonly unselectable="on" @click="focusfn($event)" ></p><i class="iconfont icon-gengduo"></i></li>
			</ul>
			<section class="details" >
				<div id="healthscore"><p><span v-if="no_shuju!=3">{{items.health_score}}</span><span v-else>0</span>健康得分</p></div>
				<div id="cooperatescore"><p><span v-if="no_shuju!=3">{{items.coordination_score}}</span><span v-else>0</span>配合得分</p></div>
				<ul class="detailMain">
					<li><h5>试纸指标</h5><p v-if="no_shuju!=3">{{items.testpaper}}+</p><p v-else> +</p></li>
					<li><h5>服用餐包</h5><p v-if="no_shuju!=3">{{items.packing_num}}包</p><p v-else>包</p></li>
					<li><h5>运动情况</h5><p v-if="no_shuju==3"></p><p v-else-if="items.movement == 0">未达标</p><p v-else>达标</p></li>
					<li><h5>体重</h5><p v-if="no_shuju!=3">{{items.weight}}kg</p><p v-else>kg</p></li>
					<li><h5>血糖 (餐前)</h5><p v-if="no_shuju!=3">{{items.fasting}}mmol/L</p><p v-else>mmol/L</p></li>
					<li><h5>血糖 (餐后)</h5><p v-if="no_shuju!=3">{{items.bellyful}}mmol/L</p><p v-else>mmol/L</p></li>
					<li><h5>血压</h5><p v-if="no_shuju!=3">{{items.low}}-{{items.high}}mmHg</p><p v-else>mmHg</p></li>
					<li><h5>文字记录</h5><p v-if="no_shuju!=3">{{items.remark}}</p><p v-else></p></li>
				</ul>
			</section>
		</template>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				http:localStorage.http,
				start: false,
				date:'',
				items:[],
				status:'',
				show:'',
				jheight:'',
				firstrow_ymd:'',
				lastrow_ymd:'',
				no_shuju:''
			}
		},
		mounted(){
			this.getjournal();
			/*let timer = setTimeout(() => {
				
			}, 3000);*/
			var h = $('#app').css('font-size');
			if(sessionStorage.jheight != undefined && sessionStorage.jheight != 'undefined'){
				this.jheight = sessionStorage.jheight;
			}else {
				sessionStorage.jheight = parseInt(h.substr(0,h.length - 2))
				this.jheight = sessionStorage.jheight
			}
			let jheight = this.jheight;
			$('#healthscore').circleProgress({
				size: jheight,
				value: '',
				startAngle: -Math.PI*1.24,
				// lineCap: 'round',
				fill: { gradient: ["#60CDEA", "#AFA8F4"] },
				emptyFill: "rgba(0, 0, 0, 0)",
				thickness: jheight/8.1
			})
			$('#cooperatescore').circleProgress({
				size: jheight,
				value: '',
				startAngle: -Math.PI*1.24,
				// lineCap: 'round',
				fill: { gradient: ["#FFD378", "#FEAC82"] },
				emptyFill: "rgba(0, 0, 0, 0)",
				thickness: jheight/8.1
			})
		},
		methods: {
			Start(e){
				let el = e.target;
				this.start = !this.start;
				this.start ? el.style.borderBottom='0' :el.style.borderBottom='.01rem solid #e5e5e5';
			},
			getdate(date) {
				var data = parseInt(date)
				var date = new Date(data*1000)
				var Y = date.getFullYear();
				var M = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
				var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
				/*var H = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
				var N = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
				var S = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();*/
				return Y+'-'+M+'-'+D;
			},
			focusfn(e) {
				let el = e.target
//				$('input').not(el).blur()
//				$('select').blur()
				$("#jdata").blur()
			},
			getjournal(){
				let health_id=this.$route.query.health_id
				let cycle_id=this.$route.query.cycle_id
				let url = this.http+'/wechat.php/everyday/journal'
				this.$http({
			        method: 'post',
			        url: url,   
			        data: this.qs.stringify({
			         	token:'06cd3b2382f7a92d76f62c21946aaf3c',
			         	health_id:health_id,
			         	cycle_id:cycle_id
			        })
		        })
		        .then((res)=>{
		        	this.status=res.data.status
		        	if (res.data.status == 3) { /*无档案*/
		        		this.showDialog('请先建立档案')
						this.$router.replace({ path: '/healthindex'})
		        	}else if (res.data.status == 4) {  /*无周期*/
//		        		this.showDialog(res.data.msg)
		        	}else if (res.data.status == 6) {  /*无完善资料*/
		        		this.showDialog(res.data.msg);
						this.$router.replace({ path: '/profile'})
						return
		        	}else if(res.data.status == 2) {
						this.$router.replace({ path: '/'})
						this.showDialog(res.data.msg)
		        	}else if (res.data.status == 1) {
		        		this.items=res.data.msg
		        		let jheight = this.jheight;
		        		let healthScore= (res.data.msg.health_score*7.4)/100
		        		let cooperateScore= (res.data.msg.coordination_score*7.4)/100
		        		this.firstrow_ymd=this.getdate(res.data.data.add_time)
		        		this.lastrow_ymd=this.getdate(res.data.msg.add_time)
		        		$('#healthscore').circleProgress({
							size: jheight,
							value: healthScore,
							startAngle: -Math.PI*1.24,
							// lineCap: 'round',
							fill: { gradient: ["#60CDEA", "#AFA8F4"] },
							emptyFill: "rgba(0, 0, 0, 0)",
							thickness: jheight/8.1
						})
						$('#cooperatescore').circleProgress({
							size: jheight,
							value: cooperateScore,
							startAngle: -Math.PI*1.24,
							// lineCap: 'round',
							fill: { gradient: ["#FFD378", "#FEAC82"] },
							emptyFill: "rgba(0, 0, 0, 0)",
							thickness: jheight/8.1
						})
						let that = this
						$('#jdata').mdater({
							minDate : new Date(this.firstrow_ymd),
							maxDate : new Date(this.lastrow_ymd),
							onOk:function(data){
								var time = $('#jdata').val()
								that.date = time
								that.changedaliy()
							}
						});
		        	};
		        	this.show=1
		        })
		        .catch((err)=>{
//		        	return this.showDialog('请求服务器错误')
		        })
			},
			changedaliy(){
				let health_id=this.$route.query.health_id
				let cycle_id=this.$route.query.cycle_id
				let url = this.http+'/wechat.php/everyday/changedaliy'
				this.$http({
			        method: 'post',
			        url: url,   
			        data: this.qs.stringify({
			         	token:'06cd3b2382f7a92d76f62c21946aaf3c',
			         	health_id:health_id,
			         	cycle_id:cycle_id,
			         	date:this.date
			        })
		        })
		        .then((res)=>{
		        	if (res.data.status == 0) {
		        		return this.showDialog('请求参数错误')
		        	}else if (res.data.status == 1) {
		        		this.items=res.data.data
		        		let jheight = this.jheight;
		        		let healthScore= (res.data.data.health_score*7.4)/100
		        		let cooperateScore= (res.data.data.coordination_score*7.4)/100
		        		$('#healthscore').circleProgress({
							size: jheight,
							value: healthScore,
							startAngle: -Math.PI*1.24,
							// lineCap: 'round',
							fill: { gradient: ["#60CDEA", "#AFA8F4"] },
							emptyFill: "rgba(0, 0, 0, 0)",
							thickness: jheight/8.1
						})
						$('#cooperatescore').circleProgress({
							size: jheight,
							value: cooperateScore,
							startAngle: -Math.PI*1.24,
							// lineCap: 'round',
							fill: { gradient: ["#FFD378", "#FEAC82"] },
							emptyFill: "rgba(0, 0, 0, 0)",
							thickness: jheight/8.1
						})
		        	}else if (res.data.status == 3) {
		        		this.no_shuju=res.data.status
		        		return this.showDialog('无数据')
		        	}
		        	this.show=1
		        })
		        .catch((err)=>{
		        	return this.showDialog('请求服务器错误')
		        })
			}
		}
	}
</script>

<style>
	#app{
		font-size:3rem;
	}
	#journal .details {
		height: 5rem;
		background: #fff;
		position: relative;
		padding: .55rem;
		display: flex;
		justify-content: space-between;
	}
	#journal .details div {
		width: 3.05rem;
		height: 3.05rem;
		position: relative;
		background: url(../../assets/img/score1.png) no-repeat;
		background-size: contain;
	}
	#journal .details div p {
		position: absolute;
		left: 25%;
		top: 25%;
		font-size: .34rem;
		color: #333;
	}
	#journal .details div p span {
		display: block;
		width: 1.5rem;
		height: 1.5rem;
		text-align: center;
		line-height: 1.5rem;
		font-size: .72rem;
		border-radius: 50%;
		color: #fff;
	}
	#journal .details #healthscore p span {
		background: linear-gradient(45deg, #60CDEA , #AFA8F4);
	}
	#journal .details #cooperatescore p span {
		background: linear-gradient(45deg, #FFD378, #FEAC82);
	}
	#journal .details .detailMain {
		position: absolute;
		top: 75%;
		width: 92%;
		left: 4%;
		background: #fff;
		border-radius: .2rem;
		box-shadow: 0 0 10px 0 #b2b2b2;
		display: flex;
		flex-wrap: wrap;
		padding: .3rem;
		margin-bottom: .2rem;
	}
	#journal .details .detailMain li {
		width: 50%;
		border-bottom: .01rem solid #e5e5e5;
		border-right: .02rem solid #f3f3f3;
		padding: .2rem;
	}
	#journal .details .detailMain li:nth-child(2n) {
		border-right: 0;
	}
	#journal .details .detailMain li:nth-last-child(2){
		border-bottom: 0;
	}
	#journal .details .detailMain li:last-child{
		border-bottom: 0;
	}
	#journal .details .detailMain li h5 {
		color: #47cce2;
		font-size: .3rem;
		font-weight: normal;
	}
	#journal .details .detailMain li p {
		color: #b2b2b2;
		font-size: .34rem;
		margin-top: .2rem;
	}
	#journal .details .detailMain li:last-child p {
		font-size: .26rem;
	}
	#journal .no-cycle{
		background: #fff;
		width: 100%;
		position: absolute;
		height: 100%;
		margin: 0 auto;
		padding: 2.3rem 0 1rem 0;
	}
	#journal .no-cycle img{
		width:3.13rem;
		height: 2.04rem;
		
	}
	#journal .no-cycle p{
		color: #B2B2B2;
		margin-top: .2rem;
		font-size: .34rem;
	}
	#journal .item-content input{
		width: 75%;
	    font-size: .3rem;
	    height: 100%;
	}
</style>