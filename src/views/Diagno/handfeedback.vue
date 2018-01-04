<template>
	<div id="handfeedback">
		<!--没有上传手诊图片-->
		<p class='no-result' v-if='is_finish==0'><img src="../../assets/img/nohandimg.png"/><span>请先提交初诊手诊</span></p>
		<!--没有反馈-->
		<p class='no-result' v-else-if="states==0"><img src="../../assets/img/nofeedback.png" alt=""><span>请耐心等待</br>我们将尽快为您反馈</span></p>
		<!--反馈内容-->
		<div v-else class="handfeedback-box">
			<div class="title">通过初诊手诊权威分析，您的身体呈现以下症状：</div>
			<ul class="symptom-text" v-for="sym in syms">
				<li>{{sym.feedbackoption_name}}：<span class="hint-text">{{sym.option}}</span></li>
			</ul>
			<div class="edit-text">
				备注：{{symptomBack}}
			</div>
			<div id="" class="line"></div>
			<div class="title">根据您的手诊结论，请您提供如下体检项目报告单：</div>
			<ul class="exreport-text">
				<li v-for="(list,index) in checkitems"  @click="toogle(list)">
					<p><span>{{list.inspectcat_id.inspectcat_name}}</span>
						<i  :class="{'iconfont icon-xia':!list.show,'iconfont icon-gengduo':list.show }"></i>
					</p>
					<div  class="exreport-content" v-show="!list.show"> 	<!--v-if="activeIndex == index"-->
						<i v-for="sublist in list.inspectitem_id">{{sublist.inspectitem_name}}、</i>
					</div>
				</li>
			</ul>
			<div class="edit-text">
				备注：{{exreportBack}}
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return {
				http:localStorage.http,
				start: false,
				states :'',
				syms:[],
				is_pay:'',
				checkitems:[],
				symptomBack:'',
				exreportBack:'',
				activeIndex:-1,
				show:false,
				is_finish:''
			}
		},
		mounted() { //页面加载就执行函数
			this.health_id=this.$route.query.health_id
			this.handfeedback()
			
		},
		methods: {
			toogle(list){
//				this.activeIndex = index;
//				this.$set(list, 'show', this.show = !this.show);
				list.show = !list.show
			},  
			Start(e){
				let el = e.target;
				this.start = !this.start;
			},
			handfeedback(){//判断是否完成上传手诊
				let url = this.http+'/wechat.php/diagno/feedback'
				let health_id=this.$route.query.health_id
				this.$http({
					method:'post',
					url:url,
					data: this.qs.stringify({
		         		token:'06cd3b2382f7a92d76f62c21946aaf3c',
		         		health_id:health_id
		        	})
				})
				.then((res)=>{
					if(res.data.status == 1){
						let Data=res.data.data
						this.is_pay=Data.is_pay
						this.syms=Data.feedback_info.feedcontent
						this.checkitems=Data.feedback_info.checkitem
						this.symptomBack=Data.feedback_info.feedback
						this.exreportBack=Data.feedback_info.checkcontent
						this.states=Data.feedback_info.states
						this.is_finish=Data.feedback_info.is_finish
					}
					if(res.data.status == 2){
						this.showDialog(res.data.msg)
						this.$router.replace({ path: '/'})
					}
					
				})
				.catch((err)=>{
//	        		return this.showDialog('请求服务器错误')
	        	})
			}
		}
	}
</script>

<style scoped>
	#handfeedback{
		text-align: left;
	}
	#handfeedback .no-result{
		text-align: center;
		color: #C1D3D6;
		font-size: .34rem;
		margin-top: 2rem;
	}
	#handfeedback .no-result span{
		display: block;
		margin-top: .3rem;
	}
	#handfeedback p{
		width: 4rem;
		margin: 0 auto;
	}
	#handfeedback p img {
		width: 100%;
	}
	#handfeedback .handfeedback-box .title{
		background: #fbfbfb;
		color: #47cce2;
		height: .7rem;
		line-height: .7rem;
		padding: 0 .3rem;
		border-bottom: 1px solid #e5e5e5;
	}
	#handfeedback .handfeedback-box .hint-text{
		color: #ff736e;
	}
	#handfeedback .symptom-text{
		border-bottom:0.01rem solid #e5e5e5;
		padding:.2rem .9rem;
	}
	#handfeedback .edit-text{
		padding: 0 .3rem;
		border-bottom: 1px solid #e5e5e5;
		min-height: .88rem;
		line-height: .88rem;
	}
	#handfeedback .exreport-text li{
		font-size: .3rem;
		border-bottom: 0.01rem solid #e5e5e5;
		
	}
	#handfeedback .exreport-text li span{
		padding: 0 .3rem;
	}
	#handfeedback .exreport-text li p{
		position: relative;
		display: flex;
	    align-items: center;
	    width: 100%;
	    height: .88rem;
	    box-sizing: content-box;
	    font-size: .3rem;
	    /*border-bottom: 0.01rem solid #e5e5e5;*/
	}
	#handfeedback .exreport-text li p i{
		position: absolute;
	    top: 0;
	    right: 0;
	    font-size: .34rem;
	    margin-right: .3rem;
	    float: right;
	    margin-top: .25rem;
	    color: #c7c7cc;
	    margin-right: .3rem;
	}
	#handfeedback .exreport-content{
		background: #fbfbfb;
		padding: .2rem .3rem;
		/*border-top: 0.01rem solid #e5e5e5;*/
		border-bottom: 0.01rem solid #e5e5e5;
	}
	#handfeedback .line{
		height: .2rem;
		background: #efeff4;
		border-bottom: 0.01rem solid #e5e5e5;
	}
</style>