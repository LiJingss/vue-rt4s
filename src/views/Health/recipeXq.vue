<template>
	<div id="recipeXq">
		<v-logo></v-logo>
		<p class='title'>{{name}}</p>
		<ul>
			<li>
				<h4>早餐</h4>
				<p>正餐：07:00-08:00</p>
				<div>
					<span v-for="(item,index) in breakfast">{{item.classify_id.foodcat_name}} {{item.classify_num}}{{item.classify_unit}}
					（<span v-for="(i,num) in item.classify_sub">{{i.food_name}}{{num == item.classify_sub.length-1?'':','}}</span>）{{index == lunch.length-1?'':','}}
					</span>
				</div>
				<p>加餐：09:30-10:30</p>
				<div>
					<span v-for="(item,index) in breakfastextra">{{item.classify_id.foodcat_name}} {{item.classify_num}}{{item.classify_unit}}
					（<span v-for="(i,num) in item.classify_sub">{{i.food_name}}{{num == item.classify_sub.length-1?'':','}}</span>）{{index == lunch.length-1?'':','}}
					</span>
				</div>
			</li>
			<li>
				<h4>午餐</h4>
				<p>正餐：11:30-12:30</p>
				<div>
					<span v-for="(item,index) in lunch">{{item.classify_id.foodcat_name}} {{item.classify_num}}{{item.classify_unit}}
					（<span v-for="(i,num) in item.classify_sub">{{i.food_name}}{{num == item.classify_sub.length-1?'':','}}</span>）{{index == lunch.length-1?'':','}}
					</span>
				</div>
				<p>加餐：14:30-16:00</p>
				<div>
					<span v-for="(item,index) in lunchextra">{{item.classify_id.foodcat_name}} {{item.classify_num}}{{item.classify_unit}}
					（<span v-for="(i,num) in item.classify_sub">{{i.food_name}}{{num == item.classify_sub.length-1?'':','}}</span>）{{index == lunch.length-1?'':','}}
					</span>
				</div>
			</li>
			<li>
				<h4>晚餐</h4>
				<p>正餐：17:00-18:00</p>
				<div>
					<span v-for="(item,index) in dinner">{{item.classify_id.foodcat_name}} {{item.classify_num}}{{item.classify_unit}}
					（<span v-for="(i,num) in item.classify_sub">{{i.food_name}}{{num == item.classify_sub.length-1?'':','}}</span>）{{index == lunch.length-1?'':','}}
					</span>
				</div>
				<p>加餐：19:00-20:00</p>
				<div>
					<span v-for="(item,index) in dinnerextra">{{item.classify_id.foodcat_name}} {{item.classify_num}}{{item.classify_unit}}
					（<span v-for="(i,num) in item.classify_sub">{{i.food_name}}{{num == item.classify_sub.length-1?'':','}}</span>）{{index == lunch.length-1?'':','}}
					</span>
				</div>
			</li>
		</ul>
		<div class="remark">
			<span>备注</span>
			<p>{{remarks}}</p>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'recipeXq',
		data () {
			return {
				http:localStorage.http,
				name:'',
				breakfast:[],
				breakfastextra:[],
				dinner:[],
				dinnerextra:[],
				lunch:[],
				lunchextra:[],
				remarks:''
			}
		},
		created() {
			var url=this.http+"/wechat.php/health/menudetail";
			this.$http({
				method:'post',
				url:url,
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',
					menu_id :this.$route.query.menu_id
				})
			})
			.then((res)=>{
				if(res.data.status ==1){
					if(res.data.data.menudetail.states_int == 0){
						this.name = '排毒日'
					}else if(res.data.data.menudetail.states_int == 1) {
						this.name = '蛋白日'
					}else if(res.data.data.menudetail.states_int == 2) {
						this.name = '常规日'
					}
					this.breakfast = res.data.data.menudetail.breakfast;
					this.breakfastextra = res.data.data.menudetail.breakfastextra
					this.dinner = res.data.data.menudetail.dinner
					this.dinnerextra = res.data.data.menudetail.dinnerextra
					this.lunch = res.data.data.menudetail.lunch
					this.lunchextra = res.data.data.menudetail.lunchextra
					this.remarks = res.data.data.menudetail.remarks
				}else if(res.data.status == 2){
					this.showDialog(res.data.msg);
					this.$router.replace({ path: '/'})
				}
			})
			.catch((err)=>{
				// return this.showDialog('请求服务器错误')
			})
		},
		methods: {
			getdate(date) {
				var date = new Date(date)
				var Y = date.getFullYear();
				var M = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
				var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
				return Y+'-'+M+'-'+D;
			}
		}
	}
</script>
<style>
	#recipeXq .title {
		height: .89rem;
		background: #fff;
		font-size: .34rem;
		color: #000;
		line-height: .89rem;
	}
	#recipeXq>ul li {
		margin: .2rem 0;
		background: #fff;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
		padding: .1rem .3rem .2rem;
	}
	#recipeXq>ul li h4{
		font-size: .34rem;
		color: #000;
		text-align: left;
		font-weight: normal;
		line-height: .6rem;
	}
	#recipeXq>ul li p{
		font-size: .28rem;
		color: #47CCE2;
		text-align: left;
		line-height: .5rem;
	}
	#recipeXq>ul li div{
		font-size: .26rem;
		color: #000;
		text-align: left;
		margin-left: .8rem;
		line-height: .4rem
	}
	#recipeXq .remark {
		margin: .2rem 0 0;
		background: #fff;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
		padding: 0 .3rem;
		min-height: .89rem;
	}
	#recipeXq .remark span {
		float: left;
		height: .89rem;
		line-height: .89rem;
		font-size: .3rem;
		color: #000;
	}
	#recipeXq .remark p {
		/* height: .89rem; */
		font-size: .3rem;
		line-height: .89rem;
		text-align: left;
		margin-left: .8rem
	}
</style>
