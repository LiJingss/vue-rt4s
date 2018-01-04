<template>
	<div id="trainer" class="trainer-box" v-if="istraine">
		<div class=" appraise">
			<scroller  :on-infinite="infinite" ref="myscroller" >
			<v-logo></v-logo>
			<dl class="trainer-box-item">
				<dt><img :src="this.http+trainerinfo.headthumb" alt=""></dt>
				<dd>
					<span>{{trainerinfo.realname}}</span>
					<a class="iconfont icon-dianhua" :href="'tel://'+trainerinfo.linktel"></a>
				</dd>
			</dl>
			<div class="introduce">
				<h2 class="tainter_title">自我介绍</h2>
				<p>{{trainerinfo.intro}}</p>
			</div> 
			<div class="introduce introduce_pj">
				<h2 class="tainter_title tainter_pj">TA的评价
					<router-link :to="{path:'/trainerAppraise',query:{trainer_id:trainerinfo.id,cycle_id:cycle_id}}"><span class="fr" v-if="isshow">去评价</span></router-link>
				</h2>
			</div>
			<dl v-for="(item,index) in listdata" class="list-pj">
				<dt v-if="item.headpic!=null"><img :src="item.headpic" alt=""></dt>
				<dt v-else><img src="../../assets/img/default_pic.jpg"></dt>
				
				<dd>
					<span>{{item.username}}</span> 
					<div>
						<em v-for="item in parseInt(item.score)" class="iconfont icon-wujiaoxing"></em>
					</div>
					<p>{{item.content}}</p>
				</dd>
			</dl>
			</scroller>
		</div>
		
	</div>
	<div id="noresule-item" v-else="istraine">
		<v-logo></v-logo>
		<img src="../../assets/img/no-trainer.jpg" alt="">
		<span>还未分配健康教练</span>
	</div>
</template>
<script>
	export default {
		name: 'trainer',
		data () {
			return {
				http:localStorage.http,
				istraine: true,
				isshow: false,
				cycle_id : '',
				trainerinfo: null,
				counter: 0, //当前页
				listdata: [], // 下拉更新数据存放数组
				noData: ''
			}
		},
		created: function() {
			let url = this.http+'/wechat.php/health/advisor';
			this.$http.post(url,this.qs.stringify({
				'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
				'pagenum' : this.counter
			})).then((res) => {
				if(res.data.status == 1){
					this.trainerinfo = res.data.data.trainer_info;
					if(res.data.data.comment_list.length > 0){
						res.data.data.comment_list.forEach((value) => {
							this.listdata.push(value);
						})
					}else {
						this.noData = "没有更多数据";
					}
					if(res.data.data.new_cycle != null){
						res.data.data.new_cycle.is_show == 1 ? this.isshow = true : this.isshow = false;
						this.cycle_id = res.data.data.new_cycle.id;
					}
				}else if(res.data.status == 2){
					this.$router.replace({ path: '/'})
					this.showDialog(res.data.msg)
				}else if(res.data.status == 3){
					this.istraine = false;
				}
			}, (response) => {
				console.log('error');
			});
		},
		methods: {
			refresh(done) {
				this.$refs.myscroller.resize();
			},
			infinite(done) {
				if(this.noData) {
					setTimeout(()=>{
						this.$refs.myscroller.finishInfinite(2);
					})
					return;
				}
				setTimeout(() => {
					this.counter++;
					let url = this.http+'/wechat.php/health/advisor';
					this.$http.post(url,this.qs.stringify({
						'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
						'pagenum' : this.counter
					})).then((res) => {
						if(res.data.status == 1){
							this.trainerinfo = res.data.data.trainer_info;
							if(res.data.data.comment_list.length > 0){
								res.data.data.comment_list.forEach((value) => {
									this.listdata.push(value);
								})
							}else {
								this.noData = "没有更多数据";
							}
						}else if(res.data.status == 2){
							this.showDialog(res.data.msg)
							this.$router.replace({ path: '/'})
						}else if(res.data.status == 3){
							this.istraine = false;
						}
					}, (response) => {
						console.log('error');
					});
					this.$refs.myscroller.resize();
					setTimeout(()=>{
						done()
					},1000)
				}, 100)
			}
		}
	}
</script>
<style>
	#trainer .trainer-box-item{
		background: #fff;
		border-top: .01rem solid #e5e5e5;
		border-bottom: .01rem solid #e5e5e5;
		clear: both;
		overflow: hidden;
		padding: .2rem .3rem;
	}
	#trainer .trainer-box-item dt,#trainer .trainer-box-item dt img{
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		float: left;
	}
	#trainer .trainer-box-item dd{
		height: .6rem;
		line-height: .6rem;
		float: left;
		margin-top: .42rem;
		width: 70%;
	}
	#trainer .trainer-box-item dd span{
		font-size: .38rem;
		float: left;
		margin-top: .04rem;
		margin-left: .2rem;
	}
	#trainer .trainer-box-item dd a{
		float: right;
		font-size: .7rem;
		color: #47cce2;
		font-weight: bold;
	}
	#trainer .tainter_title{
		background: #FFFFFF;
		font-size: .32rem;
		border-bottom: .01rem solid #e5e5e5;
		padding: .3rem 0;
		padding-right: .3rem;
	}	
	#trainer .introduce{
		margin-top: .2rem;
		border-top: .01rem solid #e5e5e5;
		border-bottom: .01rem solid #e5e5e5;
		background: #fff;
		text-align: left;
		padding: 0 .3rem ;
	}
	#trainer .introduce_pj{
		border-bottom:none;
	}
	#trainer .appraise{
		margin-top: .2rem;
		border-top: .01rem solid #e5e5e5;
		border-bottom: .01rem solid #e5e5e5;
		background: #fff;
		text-align: left;
		padding: 0 0 0 .3rem ;
	}
	#trainer .introduce>p{
		/* text-indent: 2em; */
		font-size: .28rem;
		line-height: .46rem;
		color: #b2b2b2;
		padding:.2rem 0;
	}
	#trainer .tainter_title span{
		color: #47cce2;
	}
	
	#trainer .appraise dl.list-pj{
		clear: both;
		overflow: hidden;
		padding-top: .2rem;
		padding-left: .3rem;
		background: #FFFFFF;
		
	}
	#trainer .appraise dl.list-pj>dt,#trainer .appraise dl.list-pj>dt>img{
		width: .8rem;
		height: .8rem;
		float: left;
		border-radius: 50%;
	}
	#trainer .appraise dl.list-pj>dd{
		width: 86%;
		float: left;
		margin-left: .2rem;
		font-size: .26rem;
		border-bottom: .01rem solid #e5e5e5;
	}
	#trainer .appraise dl.list-pj:last-child>dd{
		border-bottom:none;
	}
	#trainer .appraise dl.list-pj:last-child>dd{
		border-bottom: none;
	}
	#trainer .appraise dl.list-pj>dd>div{
		 margin-top: .1rem;
	}
	#trainer .appraise dl.list-pj>dd>p{
		font-size: .26rem;
		margin-bottom: .3rem;
		margin-top: .1rem;
		padding-right: .3rem;
	}
	#trainer .appraise dl.list-pj>dd em{
		color: #f9952e;
	}
	#noresule-item{
		width: 100vw;
		height: 100vh;
		background: #fff;
		
	}
	#noresule-item>img{
		margin: 1.75rem 0 0 0;
		width: 3.01rem;
	}
	#trainer .yo-scroll {
		position: relative;
	}
	#trainer .yo-scroll .inner {
		position: initial;
	}
	#noresule-item span{
		display: block;
		color: #B2B2B2;
		font-size: .34rem;
		margin-top: .2rem;
	}
	#trainer ._v-container{
		/*padding-left: .3rem;*/
		/*background: #FFFFFF;*/
	}
</style>
