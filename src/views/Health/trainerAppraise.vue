<template>
	<div id="trainerAppraise" class="trainerAppraise-box">
		<v-logo></v-logo>
		<div class="trainerAppraise-item">
			<div class="tainter_title">
			<h2 class="fl">服务态度</h2> 
			<div class="fl star">
				<em class="iconfont icon-wujiaoxing"></em>
				<em class="iconfont icon-wujiaoxing"></em>
				<em class="iconfont icon-wujiaoxing"></em>
				<em class="iconfont icon-wujiaoxing"></em>
				<em class="iconfont icon-wujiaoxing"></em>
			</div>
		</div>
		<textarea placeholder="请对健康教练进行评价" v-model="appraiseCon"></textarea>
		</div>
		<button type="button" class="blue-btn" @click="appraise">提交</button>
	</div>
</template>
<script>
export default {
	name: 'trainer',
	data () {
		return {
			http:localStorage.http,
			starnum:'',
			appraiseCon:''
		}
	},
	mounted() {
		let _this = this;
		$('.star em').click(function() {
			$('.star em').css('color','#b2b2b2')
			for(let i=0;i<=$(this).index();i++){
				$('.star em').eq(i).css('color','#ff9900')
			}
			_this.starnum = $(this).index()+1;
		})
	},
	methods: {
		appraise() {
			if(this.starnum == ''){
				this.showDialog('请为健康教练进行打分');
				return;
			}else if(this.appraiseCon == '') {
				this.showDialog('请填写评价内容');
				return;
			}
			let url = this.http+'/wechat.php/Health/trainerAppraise';
			this.$http.post(url,this.qs.stringify({
				'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
				trainer_id: this.$route.query.trainer_id,
				cycle_id : this.$route.query.cycle_id,
				content : this.appraiseCon,
				score: this.starnum
			})).then((res) => {
				if(res.data.status == 1){
					this.showDialog(res.data.msg)
					this.$router.replace({ path: '/trainer'})
				}else if(res.data.status == 2){
					this.showDialog(res.data.msg)
					this.$router.replace({ path: '/'})
				}else if(res.data.status == 3){
					this.showDialog(res.data.msg)
					this.$router.replace({ path: '/trainer'})
				}
			}, (response) => {
				console.log('error');
			});
		}
	}
}
</script>
<style>
#trainerAppraise .trainerAppraise-item{
	margin-top: .2rem;
	text-align: left;
	background: #fff;
	padding: 0 0 0 .3rem;
	border-bottom: .01rem solid #e5e5e5;
	border-top: .01rem solid #e5e5e5;
	font-size: .32rem;
}
#trainerAppraise .tainter_title{
	font-size: .32rem;
	border-bottom: .01rem solid #e5e5e5;
	padding: .3rem 0;
	padding-right: .3rem;
	clear: both;
	overflow: hidden;
}
#trainerAppraise .tainter_title>div{
	margin-left: .2rem;
}
#trainerAppraise .tainter_title>div>em{
	display: inline-block;
	margin-left: .34rem;
	color: #b2b2b2;
}
#trainerAppraise textarea{
	width: 100%;
	height: 3rem;
	resize: none;
	padding: .24rem 0rem;
}
#trainerAppraise .blue-btn{
	margin-top: .2rem;
}
</style>
