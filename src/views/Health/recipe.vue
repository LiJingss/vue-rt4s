<template>
	<div id="recipe" class="recipe-box" v-if="status == 3 || status == 4" >
		<div class="no-cycle">
			<img src="../../assets/img/no-zhouqi.png" alt="" />
			<p>暂无餐单</p>
		</div>
	</div>
	<div id="recipe" class="recipe-box"  v-else>
		<ul class="item-content item_date">
			<li><p><span>餐单日期</span>
				<select name="" id="" @change='changeDate($event)'>
					<template  v-for="(item,index) in stages" >
							<option :value="item.id" v-if="item.id == newstage_cd" selected="selected">{{getdate(item.startime)}}—{{getdate(item.endtime)}}</option>
							<option :value="item.id" v-else>{{getdate(item.startime)}}—{{getdate(item.endtime)}}</option>
					</template>
				</select>
			</p><i class="iconfont icon-gengduo"></i></li>
		</ul>
		<p v-if="nowstage.today != 0">今天是第{{nowstage.today}}天</p>
		<ul class="item-content item2" >
			<li v-for="(item,index) in nowstage"><router-link :to="{path:'/recipeXq',query:{menu_id:item.id}}" ><p  v-if="item.states_int == 1" ><span v-if="item.states_day!=1">蛋白日（第1-{{item.states_day}}天）</span><span v-else>蛋白日（第1天）</span></p><i class="iconfont icon-gengduo"></i></router-link></li>
			<li v-for="(item,index) in nowstage"><router-link :to="{path:'/recipeXq',query:{menu_id:item.id}}"><p v-if="item.states_int == 2"><span v-if="item.states_day==1" >常规日（第6天）</span><span  v-else>常规日（第{{6-item.states_day+1}}-6天）</span></p><i class="iconfont icon-gengduo"></i></router-link></li>
			<li v-for="(item,index) in nowstage"><router-link :to="{path:'/recipeXq',query:{menu_id:item.id}}"><p v-if="item.states_int == 0"><span>排毒日（1-6）</span></p><i class="iconfont icon-gengduo"></i></router-link></li>
		</ul>		
	</div>
	
</template>
<script>
	export default {
		name: 'recipe',
		data () {
			return {
				http:localStorage.http,
				isshow: true,
				date:null,
				nowstage:[],
				stages:[],
				newstage_cd:'',
				status:''
			}
		},
		mounted() {
			var url=this.http+"/wechat.php/health/menu";
			this.$http({
				method:'post',
				url:url,
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',
					health_id :this.$route.query.health_id,
					cycle_id: this.$route.query.cycle_id
				})
			})
			.then((res)=>{
				if(res.data.status ==1){
					this.date = res.data.data.stages
					this.nowstage = res.data.data.nowstage
					this.stages = res.data.data.stages
					this.newstage_cd=this.nowstage[0].id
				}else if(res.data.status == 2){
					this.$parent.showDialog(res.data.msg);
					this.$router.replace({ path: '/'})
				}else if(res.data.status == 3){/*无档案*/
					this.status=res.data.status
					this.$parent.showDialog('请先建立档案');
					this.$router.replace({ path: '/healthindex'})
				}else if(res.data.status == 4){//无周期
					this.status=res.data.status
//					this.$parent.showDialog(res.data.msg);
//					this.$router.replace({ path: '/healthindex'})
					return
				}else if(res.data.status == 5){//无完善资料
					this.status=res.data.status
					this.$router.replace({ path: '/profile'})
				}
			})
			.catch((err)=>{
				// return this.$parent.showDialog('请求服务器错误')
			})
			
		},
		methods: {
			getdate(date) {
				var data = parseInt(date)*1000
				var date = new Date(data)
				var Y = date.getFullYear();
				var M = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
				var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
				return Y+'.'+M+'.'+D;
			},
			changeDate(event) {
				var url=this.http+"/wechat.php/health/menuchange";
				this.$http({
					method:'post',
					url:url,
					data: this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						menu_id: event.target.value
					})
				})
				.then((res)=>{
					if(res.data.status ==1){
						this.nowstage = res.data.data.stage
					}else if(res.data.status == 2){
						this.$parent.showDialog(res.data.msg);
						this.$router.replace({ path: '/'})
					}
				})
				.catch((err)=>{
					// return this.$parent.showDialog('请求服务器错误')
				})
			}
		},
		filters: {
			reverse: function(value){
				return value.reverse()
			}
		}
	}
</script>
<style>
	#recipe {
		height: 90vh;
	}
	#recipe .item-content {
		margin: 0;
	}
	#recipe .item-content a{
		color: #333333;
	}
	#recipe>p {
		height: .5rem;
		line-height: .5rem;
		font-size: .26rem;
		background: #fbfbfb;
		text-align: left;
		color: #47cce2;
		padding-left: .3rem;
	}
	#recipe .item_date {
		border-top: 0;
		color: #000;
	}
	#recipe .item2 span {
		width: 100%;
	}
	.noresule-item{
		background: #fff;
		padding: .6rem 0 0 0;
		margin-top: .3rem;
		height: 100%;
	}
	.noresule-item>img{
		width: 4.99rem;
		height: 2.94rem;
	}
	#recipe .no-cycle{
		background: #FFFFFF;
		width: 100%;
		position: absolute;
		height: 100%;
		margin: 0 auto;
		padding: 2.3rem 0 1rem 0;
	}
	#recipe .no-cycle img{
		width:3.13rem;
		height: 2.04rem;
		
	}
	#recipe .no-cycle p{
		color: #B2B2B2;
		margin-top: .2rem;
		font-size: .34rem;
	}
</style>
