<template>
<div id="index">
	<div class="head-banner">
		<a href="#"><img src="../../assets/img/index-logo.png" alt=""></a>
		<div class="head-text-box">
			<p>健康，让生活更有价值</p>
			<span>现在就为自己制定一个健康管理计划！</span>
			<router-link v-if="islogin==1" to="/" class="use-btn">立即使用</router-link>
			<router-link v-if="islogin==2" to="/profile" class="use-btn">立即使用</router-link>
			<router-link v-if="islogin==3" to="/healthindex" class="use-btn">立即使用</router-link>
		</div>
	</div>
	<div class="symptom-box">
		<h2 class="title">针对八大代谢类症侯</h2>
		<div class="symptom_con">
			<span class="illness-line"></span>
			<i style="bottom:22px;left:150px;border-color: #9397fc;height: 0;"></i>
			<i style="top:22px;left:279px;border-color: #e66d79;height: 0;"></i>
			<i style="bottom:22px;left:407px;border-color: #60d3e6;height: 0;"></i>
			<i style="top:22px;left:535px;border-color: #00c099;height: 0;"></i>
			<i style="bottom:22px;left:664px;border-color: #e66d79;height: 0;"></i>
			<i style="top:22px;left:793px;border-color: #9397fc;height: 0;"></i>
			<i style="bottom:22px;left:920px;border-color: #00c099;height: 0;"></i>
			<i style="top:22px;left:1049px;border-color: #60d3e6;height: 0;"></i>
			<em style="bottom: 90px;left: 112px;background-position: 0 0;"></em>
			<em style="top: 135px;left: 239px;background-position: 0 -125px;"></em>
			<em style="bottom: 119px;left: 370px;background-position: -96px 0;"></em>
			<em style="top: 93px;left: 495px;background-position: -96px -125px;"></em>
			<em style="bottom: 119px;left: 625px;background-position: -194px 0;"></em>
			<em style="top: 135px;left: 752px;background-position: -194px -125px;"></em>
			<em style="bottom: 90px;left: 881px;background-position: -294px 0;"></em>
			<em style="top: 93px;left: 1009px;background-position: -294px -125px;"></em>
		</div>
	</div>
	<div class="step-box">
		<div class="step-box-item clearfix">
		<h2 class="title">健康管理计划四环节</h2>
			<dl>
				<dd>
					<span>1.个性化健康方案</span>
					<p>为您量身定制餐单，鱼肉豆蛋、蔬菜水果等各种食物。修复受损细胞，改变代谢轨道，启动脂肪燃烧，重启人体自愈力。</p>
				</dd>
			</dl>
			<dl>
				<dd>
					<span>2.细胞特膳营养素</span>
					<p>蛋白质、脂肪、矿物质、碳水化合物、维生素、膳食纤维、水等七大营养素。保证营养全面充足的摄取，帮助全身细胞在充足营养的前提下获得强大的免疫力。</p>
				</dd>
			</dl>
			<dl>
				<dd>
					<span>3.温和的有氧运动</span>
					<p>运动以身体微微出汗为宜。激活细胞膜上的受应点，减少阻力，保障血糖通畅进入细胞。促进线粒体生长，增加能量燃烧场所，加速燃烧脂肪。</p>
				</dd>
			</dl>
			<dl>
				<dd>
					<span>4.专业的教练服务</span>
					<p>24小时远程跟踪。健康、心理、情致等方面指导、解答和解决问题，提供高效、及时的一对一服务。</p>
				</dd>
			</dl>
		</div>
	</div>
	<div class="life-box">
		<h2 class="title">建立正确的生活方式</h2>
		<img src="../../assets/img/life-styleh5.png" alt="">
		<p>最终达到人体酸碱平衡之目的。<br>健康人血浆PH值7.35-7.45，呈偏碱性。</p>
	</div>
	<div class="nurse-box">
		<h2 class="title">健康管理计划调理效果</h2>
		<div class="nurse-box-item">
			<dl>
				<dt class="result-icon01"></dt>
				<dd>简单方便</dd>
			</dl>
			<dl>
				<dt class="result-icon02"></dt>
				<dd>塑形明显</dd>
			</dl>
			<dl>
				<dt class="result-icon03"></dt>
				<dd>不吃药</dd>
			</dl>
			<dl>
				<dt class="result-icon04"></dt>
				<dd>不反弹</dd>
			</dl>
			<dl class="on">
				<p>身体全面康复</p>
				<router-link v-if="islogin" to="/healthindex" class="use-btn">立即体验</router-link>
				<router-link v-else to="/" class="use-btn">立即体验</router-link>
			</dl>
			<dl>
				<dt class="result-icon06"></dt>
				<dd>不饥饿</dd>
			</dl>
			<dl>
				<dt class="result-icon07"></dt>
				<dd>不乏力</dd>
			</dl>
			<dl>
				<dt class="result-icon08"></dt>
				<dd>持续减重</dd>
			</dl>
			<dl style="margin-bottom: .6rem;">
				<dt class="result-icon09"></dt>
				<dd>见效特快</dd>
			</dl>
		</div>
		<div class="kefu-icon-h5"></div>
		<div class="footer-h5">驾驭时光健康科技（北京）有限公司		京ICP备16034362号</div>
	</div>
</div>
</template>

<script>
	export default {
		data () {
			return {
				http:localStorage.http,
				islogin: false,
				status:'',
				status_profile:''
			}
		},
		created() {
			var url = this.http+'/wechat.php/user/checklogin';
			this.$http.post(url,this.qs.stringify({
				'token' : "06cd3b2382f7a92d76f62c21946aaf3c"
			}))
			.then( (res) => {
				if(res.data.status == 1){
					if(res.data.data == 1){
						this.islogin = 2
					}else if(res.data.data == 2 || res.data.data == 3){
						this.islogin = 3
					}
				}else {
					this.islogin = 1
				}
			})
			.catch( (err) => {
				console.log(err);
			})
		}
	}
</script>

<style>
	#index .head-banner{
		background: #e7f7f7 url(../../assets/img/index-banner.png) no-repeat top center; 
		height: 4.7rem;
		background-size: 20.5rem;
		background-position: -1.7rem -1.2rem;
		padding: 0 1.1rem;
	}
	#index .head-banner>a {
		display: block;
		width: 2.3rem;
		padding: .35rem 0;
	}
	#index .head-banner a img {
		width: 100%;
		height: auto
	}
	#index .head-banner .head-text-box {
		margin-top: .2rem;
		text-align: center;
		color: #47cce2;
	}
	#index .head-banner .head-text-box p {
		font-size: .52rem;
		display: inline-block;
		width: auto;
		padding: .05rem 0;
		margin-bottom: .1rem;
		border-bottom: .02rem solid #47cce2;
	}
	#index .head-banner .head-text-box span {
		font-size: .31rem;
		margin-top: .1rem;
	}
	#index .head-banner .head-text-box a {
		display: block;
		font-size: .2rem;
		width: 2.4rem;
		height: .65rem;
		line-height: .65rem;
		margin: .55rem auto 0;
		background: url(../../assets/img/index-btn.png);
		background-size: cover;
		color: #fff;
	}
	#index .title{
		text-align: center;
		color: #47cce2;
		font-weight: normal;
		font-size: .4rem;
		padding: .4rem;
	}
	#index .symptom-box {
		height: 6.35rem;
		background: #f6feff;
		text-align: center;
	}
	#index .symptom_con {
		position: relative;
		margin: 2.3rem 0 2.5rem;
		width: 100%;
		height: .17rem;
	}
	#index .symptom_con span{
	    display: block;
		height: 100%;
		width: 0;
		position: absolute;
		background: url(../../assets/img/illness-lineh5.png)no-repeat;
		background-size: 7.5rem;
		-webkit-animation:illnessLine 1s ease-out forwards;
	}
	@-webkit-keyframes illnessLine {
		0%  { width:0px;}
		100%{ width:100%;}	
	}
	#index .symptom_con>i {
		position: absolute;
    	width: 5.5px;
		border-left: 2px dashed #333;
		opacity: 0;
	} 
	#index .symptom_con i:nth-child(2) {
		bottom: .3rem !important;
		left: 1.05rem !important;
		height: 0.55rem !important;
		-webkit-animation: emshow10 .3s .125s ease-out forwards;
	}
	#index .symptom_con i:nth-child(3) {
		top: .3rem !important;
		left: 1.83rem !important;
		height: 1.04rem !important;
		-webkit-animation: emshow11 .3s .25s ease-out forwards;
	}
	#index .symptom_con i:nth-child(4) {
		bottom: .3rem !important;
		left: 2.59rem !important;
		height: 0.84rem !important;
		-webkit-animation: emshow12 .3s .375s ease-out forwards;
	}
	#index .symptom_con i:nth-child(5) {
		top: .3rem !important;
		left: 3.36rem !important;
		height: 0.55rem !important;
		-webkit-animation: emshow13 .3s .5s ease-out forwards;
	}
	#index .symptom_con i:nth-child(6) {
		bottom: .3rem !important;
		left: 4.12rem !important;
		height: 0.84rem !important;
		-webkit-animation: emshow14 .3s .625s ease-out forwards;
	}
	#index .symptom_con i:nth-child(7) {
		top: .3rem !important;
		left: 4.88rem !important;
		height: 1.04rem !important;
		-webkit-animation: emshow15 .3s .75s ease-out forwards;
	}
	#index .symptom_con i:nth-child(8) {
		bottom: .3rem !important;
		left: 5.65rem !important;
		height: 0.55rem !important;
		-webkit-animation: emshow16 .3s .875s ease-out forwards;
	}
	#index .symptom_con i:nth-child(9) {
		top: .3rem !important;
		left: 6.42rem !important;
		height: 0.55rem !important;
		-webkit-animation: emshow17 .3s 1s ease-out forwards;
	}
	#index .symptom_con>em {
		position: absolute;
		display: block;
		opacity: 0;
		width: .8rem;
		height: 1.11rem;
		background: url(../../assets/img/illness-icons.png)no-repeat;
		background-size: 3.2rem;
	}
	#index .symptom_con em:nth-child(10) {
		left:.67rem !important;
		bottom: .98rem !important;
		background-position: .05rem .15rem !important;
		-webkit-animation: emshow10 .3s .425s ease-out forwards;
	}
	#index .symptom_con em:nth-child(11) {
		left: 1.44rem !important;
		top: 1.45rem !important;
		background-position: .05rem -1rem !important;
		-webkit-animation: emshow11 .3s .55s ease-out forwards;
	}
	#index .symptom_con em:nth-child(12) {
		left: 2.22rem !important;
		bottom: 1.3rem !important;
		background-position: -.7625rem .15rem !important;
		-webkit-animation: emshow12 .3s .675s ease-out forwards;
	}
	#index .symptom_con em:nth-child(13) {
		left: 2.97rem !important;
		top: .98rem !important;
		background-position: -.765rem -1rem !important;
		-webkit-animation: emshow13 .3s .8s ease-out forwards;
	}
	#index .symptom_con em:nth-child(14) {
		left: 3.73rem !important;
		bottom: 1.35rem !important;
		background-position: -1.615rem .151rem !important;
		-webkit-animation: emshow14 .3s .925s ease-out forwards;
	}
	#index .symptom_con em:nth-child(15) {
		left: 4.5rem !important;
		top: 1.45rem !important;
		background-position: -1.615rem -1rem !important;
		-webkit-animation: emshow15 .3s 1.05s ease-out forwards;
	}
	#index .symptom_con em:nth-child(16) {
		left:5.26rem !important;
		bottom: .98rem !important;
		background-position: -2.45rem .15rem !important;
		-webkit-animation: emshow16 .3s 1.175s ease-out forwards;
	}
	#index .symptom_con em:nth-child(17) {
		left: 6.02rem !important;
		top: .98rem !important;
		background-position: -2.43rem -1rem !important;
		-webkit-animation: emshow17 .3s 1.3s ease-out forwards;
	}
	@-webkit-keyframes emshow10 {
		0%  { opacity: 0}
		100%{ opacity: 1}	
	}
	@-webkit-keyframes emshow11 {
		0%  { opacity: 0}
		100%{ opacity: 1}	
	}
	@-webkit-keyframes emshow12 {
		0%  { opacity: 0}
		100%{ opacity: 1}	
	}
	@-webkit-keyframes emshow13 {
		0%  { opacity: 0}
		100%{ opacity: 1}	
	}
	@-webkit-keyframes emshow14 {
		0%  { opacity: 0}
		100%{ opacity: 1}	
	}
	@-webkit-keyframes emshow15 {
		0%  { opacity: 0}
		100%{ opacity: 1}	
	}
	@-webkit-keyframes emshow16 {
		0%  { opacity: 0}
		100%{ opacity: 1}	
	}
	@-webkit-keyframes emshow17 {
		0%  { opacity: 0}
		100%{ opacity: 1}	
	}
	#index .step-box{
		background: #76d9ea;
		overflow: hidden;
	}
	#index .step-box-item{
		width: 100%;
	}
	#index .step-box-item dl{
		float: left;
		width: 3rem;
		height: 3.1rem;
		box-sizing: border-box;
		border: .03rem solid #fff;
		margin: 0 0 .49rem .49rem;
	}
	#index .step-box-item dl dd span{
		display: block;
		color: #fff;
		font-size: .3rem;
		text-align: center;
		margin: .15rem 0 .1rem;
	}
	#index .step-box-item dl dd p{
		text-align:justify ;
		color: #fff;
		line-height: .28rem;
		font-size: .26rem;
		padding: 0 .28rem;
	}
	#index .step-box .title {
		color: #fff;
	}
	#index .life-box {
		background: #f6feff;
	}
	#index .life-box img {
		width: 77%;
		margin: 0 auto;
	}
	#index .life-box p {
		width: 77%;
		text-align: left;
		padding: .5rem 0;
		margin: 0 auto;
		font-size: .26rem;
		line-height: 0.4rem;
	}

	#index .nurse-box{
		background: #f4fdfe;
		padding-bottom:12px; 
		overflow: hidden;
	}
	#index .nurse-box-item {
		width: 6.55rem;
		margin: 0 auto;
	}
	#index .nurse-box-item dl{
		height: 1.25rem;
		width: 2rem;
		box-sizing: border-box;
		margin: 0 .26rem .19rem 0;
		border: 1px solid #47cce2;
		float: left;
	}
	#index .nurse-box-item dt{
		width: .58rem;
		height: .58rem;
		margin: .2rem auto 0;
		background:url(../../assets/img/result_icon.png) no-repeat center center;
		background-size: 4.5rem;
	}
	#index .nurse-box-item dd{
		text-align: center;
		font-size: .26rem;
		color: #47cce2;
	}
	#index .nurse-box-item dl:nth-child(3n){
		margin: 0 0 .19rem 0;
	}
	#index .nurse-box-item dt.result-icon01{
		background-position: left top; 
	}
	#index .nurse-box-item dt.result-icon02{
		background-position: -.51rem top; 
	}
	#index .nurse-box-item dt.result-icon03{
		background-position: -1.1rem top; 
	}
	#index .nurse-box-item dt.result-icon04{
		background-position: -1.69rem top; 
	}
	#index .nurse-box-item dt.result-icon06{
		background-position: -2.22rem top; 
	}
	#index .nurse-box-item dt.result-icon07{
		background-position: -2.82rem top; 
	}
	#index .nurse-box-item dt.result-icon08{
		background-position: -3.38rem top; 
	}
	#index .nurse-box-item dt.result-icon09{
		background-position: -3.95rem top;
	}
	#index .nurse-box-item dl.on {
		color: #fff;
		background-color: #47cce2;
	}
	#index .nurse-box-item dl.on p{
		font-size: .24rem;
		height: .6rem;
		line-height: .6rem;
	}
	#index .nurse-box-item dl.on a{
		display: block;
		margin:0 auto;
		border: 1px solid #fff;
		height: .43rem;
		line-height: .35rem;
		font-size: .24rem;
		border-radius: 50px;
		width: 80%;
		color: #fff;
	}
	#index .kefu-icon-h5 {
		clear: both;
		width: 3.38rem;
		height: .8rem;
		background: url(../../assets/img/zailian-iconh5.png) no-repeat;
		background-size: 100%;
		margin: 0 auto .4rem;
	}
	#index .footer-h5 {
		color: #c0c3ce;
		text-align: center;
		font-size: .2rem;
		margin-top: 0.44rem;
	}		
</style>