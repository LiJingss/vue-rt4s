<template>
	<div id="healthindex" >
		<div class="healthindex-box">
			<dl>
				<dt>
					<router-link :to="{path:'/information'}" >
					<span :style="headpic != ''?{background:'url('+ headpic +')'}:''" class="bgsize"></span>					
					</router-link>
				</dt>
				<dd>
					<p>
						<span>{{realname}}</span>
						<span>{{username}}</span>
					</p>
					<em><router-link :to="{path:'/notification',query:{health_id:health_id}}"><i class="iconfont icon-youxiang1"></i><em v-if="count !=0"></em></router-link></em>
				</dd>
			</dl>
		</div>
		<div class="health-file-text">
			{{healthtitle}}<span v-if="is_invalid==0">（进行中）</span><span v-else>（已归档）</span>
		</div>
		<ul class="health-main-list">
			<li>
				<router-link :to="health_id!=''?{path:'/healthcare',query:{health_id:health_id}}:''">
					<i class="icon iconfont icon-zhouqi"></i>
					<span>我的周期</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{path:'/diagno',query:{health_id:health_id}}">
					<i class="icon iconfont icon-zhenduan"></i>
					<span>初诊</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{path:'/graphs',query:{health_id:health_id}}">
					<i class="icon iconfont icon-qushi"></i>
					<span>得分趋势</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{path:'/healthfiles'}">
					<i class="icon iconfont icon-dangan"></i>
					<span>我的档案</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{path:'/trainer'}">
					<i class="icon iconfont icon-jiaolian"></i>
					<span>我的教练</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{path:'/myorder',query:{a:null}}">
					<i class="icon iconfont icon-dingdan-copy"></i>
					<span>我的订单</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{path:'/information'}">
					<i class="icon iconfont icon-ziliao"></i>
					<span>我的资料</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{path:'/security',query:{health_id:health_id}}">
					<i class="icon iconfont icon-anquanshezhi"></i>
					<span>安全设置</span>
				</router-link>
			</li>
			<li></li>
		</ul>
		<button class="white-btn" @click="exit()">退出登录</button>
		<div class="black-bg" v-if="health_id == null"><!-- 背景遮罩 --></div>
		<div class="health-hint" v-if="health_id == null"><!--<img src="../../assets/img/health-hint.png" alt="">-->
			<router-link to="/healthfiles"><i class="danan_icon"></i></router-link>
		</div>
	</div>
</template>
<script>
export default {
	data () {
		return {
			http:localStorage.http,
			selected: '',
			health_id:'',
			seen:false,
			headpic:null,
			realname:'',
			username:'',
			healthtitle:'',
			is_invalid:'',
			count:''
			// new_health_id:''
		}
	},
	mounted() { //页面加载就执行函数
		if(this.$route.query.health_id != undefined){
			this.health_id = this.$route.query.health_id
		}
		this.healthindex()
	},
	methods: {
		healthindex(){
			let url = this.http+'/wechat.php/health/healthindex'
			this.$http({
				method:'post',
				url:url,
				data: this.qs.stringify({
	         		token:'06cd3b2382f7a92d76f62c21946aaf3c',
	         		health_id:this.health_id
	        	})
			})
			.then((res)=>{
				if(res.data.status ==1){
					let Data=res.data.data
					if(this.$route.query.health_id == undefined) {
						this.health_id=Data.health_id
					}
					if(Data.health_info.is_creat == 1){
						this.showDialog('健康档案已归档，请建立新的健康档案');
					}
					// this.new_health_id=Data.health_id
					this.realname=Data.customer_info.realname
					this.username=Data.customer_info.username
					this.headpic=Data.customer_info.headpic
					this.healthtitle=Data.health_info.title
					this.is_invalid=Data.health_info.is_invalid
					this.count=Data.count
					
				}else if(res.data.status ==2){
					this.$router.replace({ path: '/'})
					this.showDialog(res.data.msg);
				}else if(res.data.status ==3){
					this.showDialog(res.data.msg);
					this.$router.replace({ path: '/profile'})
				}
			})
			.catch((err)=>{
        		// return this.showDialog('')
        	})
		},
		exit(){
			let url = this.http+'/wechat.php/user/safeexit'
			this.$http({
				method:'post',
				url:url,
				data: this.qs.stringify({
	         		token:'06cd3b2382f7a92d76f62c21946aaf3c'
	        	})
			})
			.then((res)=>{
				if(res.data.status ==1){
					localStorage.removeItem('accessToken');
					this.$router.replace({ path: '/'})
				}
			})
			.catch((err)=>{
				return this.showDialog('请求服务器错误')
			})
		}
	}
}
</script>
<style>
	#healthindex .bgsize {
		width: 1.53rem;
		height: 1.53rem;
		display: block;
		background:url(../../assets/img/default_pic.jpg);
		background-size: cover !important;
		background-position: center !important;
	}
	#healthindex{
		position: relative;
	}
	#healthindex .black-bg{
		position: fixed;
		background: #333;
		opacity: 0.6;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		/*display: none;*/
	}
	#healthindex .health-hint{
		position: absolute;
		z-index: 2;
		top:35.6%;
		left: .2rem;
		width: 6.04rem;
		height: 3.18rem;
		background: url(../../assets/img/health-hint.png) no-repeat;
		background-size:100% 100%;
		
	}
	#healthindex .health-hint a {
		display: block;
		width: 2rem;
		height: 1.5rem;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	#healthindex{
		text-align: left;
	}
	#healthindex .healthindex-box{
		background: url('../../assets/img/healthperbg.png') no-repeat;
		width: 100%;
		background-size: 100%;
		height: 2.5rem;
		padding: .5rem .3rem;
	}
	#healthindex>div>dl{
		clear: both;
		overflow: hidden;
	}
	#healthindex>div>dl>dt{
		float: left;
		border-radius: 4px;
		overflow: hidden;
		height: 1.53rem;
	}
	#healthindex>div>dl>dt>a img{
		width: 1.53rem;
		height: 1.53rem;
	}
	#healthindex>div>dl>dd>p>span{
		display: block;
		font-size: .34rem;
	}
	#healthindex>div>dl>dd>p>span:nth-child(2){
		font-size: .3rem;
	}
	#healthindex>div>dl>dd p{
		float: left;
		color: #fff;
		line-height: .65rem;
		margin-top: .15rem;
		margin-left: .3rem;
	}
	#healthindex>div>dl>dd em{
		float: right;
		font-size: .28rem;
		color: #fff;
		margin-top: .5rem;
		position: relative;
	}
	#healthindex>div>dl>dd em a em{
		position: absolute;
	    display: inline-block;
	    width: .2rem;
	    height: .2rem;
	    border-radius: 50%;
	    background: #ff706b;
	    top: -23px;
	    right: 0;
	}
	#healthindex>div>dl>dd em a{
		color: #fff;
	}
	#healthindex>div>dl>dd em i{
		font-size: .3rem;
	}
	#healthindex .health-file-text{
		background: #efeff4;
		color: #b9b9b9;
		font-size: .28rem;
		border-bottom: .01rem solid #e5e5e5;
		height: .6rem;
		line-height: .6rem;
		padding: 0 .3rem;
	}
	#healthindex .health-main-list{
		clear: both;
		overflow: hidden;
		background: #fff;
	}
	#healthindex .health-main-list li{
		width:33.3%;
		float: left;
		text-align: center;
		height: 1.97rem;
		border-bottom: .03rem solid #efeff4;
		border-right: .03rem solid #efeff4;
		/*padding-top: .4rem;*/
	}
	#healthindex .health-main-list li:nth-child(3n+3){
		border-right: none;
	}
	#healthindex .health-main-list li i{
		display: block;
		font-size: .54rem;
		margin-bottom: .08rem;
		padding-top: .4rem;
	}
	#healthindex .health-main-list li a{
		display: block;
		color: #333;
		width: 100%;
		height: 100%;
	}
	#healthindex .health-main-list li i.icon-zhouqi{
		color: #f8839a;
		font-size: .58rem;
	}
	#healthindex .health-main-list li i.icon-zhenduan{
		color: #75ecd8;
		font-size: .59rem;
		padding-top: .35rem;
	}
	#healthindex .health-main-list li i.icon-qushi{
		color: #71c4f0;
		font-size: .56rem;
	}
	#healthindex .health-main-list li i.icon-dangan{
		color: #f7826f;
		font-size: .62rem;
	}
	#healthindex .health-main-list li i.icon-jiaolian{
		color: #83cff2;
		font-size: .7rem;
		padding-top: .3rem;
	}
	#healthindex .health-main-list li i.icon-dingdan-copy{
		color: #f88096;
		font-size: .6rem;
	}
	#healthindex .health-main-list li i.icon-ziliao{
		color: #f3a152;
		font-size: .58rem;
	}
	#healthindex .health-main-list li i.icon-anquanshezhi{
		color: #70e6d0;
		font-size: .58rem;
	}
	#healthindex .health-main-list li span{
		font-size: .28rem;
	}
	#healthindex .white-btn{
		display: block;
		background: #fff;
		text-align: center;
		border-top: .01rem solid #e5e5e5;
		border-bottom: .01rem solid #e5e5e5;
		width: 100%;
		height: .88rem;
		line-height: .88rem;
		margin-top: .2rem;
		font-size: .34rem;
	}
	#healthindex .icon-youxiang1{
		font-size: .52rem;
	}
</style>