<template>
	<div id="upload">
		<span @click="showrule = !showrule">查看照片规则<i class="iconfont icon-rule"></i></span>
		<ul id="handupload" v-if="uploadname == 'hand'">
			<li>
				<input type="submit" @click="chooseImage($event)" :data-img="handlist.handpic1" class="handpic1" data-class="handthumb1">
				<p>左手正面</p>
				<div :style="handlist.handpic1!=undefined&&handlist.handpic1!=''?{zIndex:'0'}:''" class="showImg">
					<img :src="handlist.handpic1" @click="deletes($event)" :id="handlist.id" idt="zz">
				</div>
				<div class="changeImg">
					<img src="../../assets/img/zuoshoubig-z.png" >
					<img src="../../assets/img/addicon.png">
				</div>
			</li>
			<li>
				<input type="submit" @click="chooseImage($event)" :data-img="handlist.handpic2" class="handpic2" data-class="handthumb2">
				<p>左手背面</p>
				<div :style="handlist.handpic2!=undefined&&handlist.handpic2!=''?{zIndex:'0'}:''" class="showImg">
					<img :src="handlist.handpic2" @click="deletes($event)" :id="handlist.id" idt="zf">
				</div>
				<div class="changeImg">
					<img src="../../assets/img/zuoshoubig-f.png" >
					<img src="../../assets/img/addicon.png">
				</div>
			</li>
			<li>
				<input type="submit" @click="chooseImage($event)" :data-img="handlist.handpic3" class="handpic3" data-class="handthumb3">
				<p>右手正面</p>
				<div :style="handlist.handpic3!=undefined&&handlist.handpic3!=''?{zIndex:'0'}:''" class="showImg">
					<img :src="handlist.handpic3" @click="deletes($event)" :id="handlist.id" idt="yz">
				</div>
				<div class="changeImg">
					<img src="../../assets/img/youshoubig-z.png" >
					<img src="../../assets/img/addicon.png">
				</div>
			</li>
			<li>
				<input type="submit" @click="chooseImage($event)" :data-img="handlist.handpic4" class="handpic4" data-class="handthumb4">
				<p>右手背面</p>
				<div :style="handlist.handpic4!=undefined&&handlist.handpic4!=''?{zIndex:'0'}:''" class="showImg">
					<img :src="handlist.handpic4" @click="deletes($event)" :id="handlist.id" idt="yf">
				</div>
				<div class="changeImg">
					<img src="../../assets/img/youshoubig-f.png" >
					<img src="../../assets/img/addicon.png">
				</div>
			</li>
			<button v-if="handlist.states!=1" class="blue-btn" @click="puthandpic(1,$event)">确认上传</button>
		</ul>

		<ul id="faceupload" v-if="uploadname == 'face'">
			<li>
				<input type="submit" @click="chooseImage($event)" :data-img="handlist.facepic" class="facepic" data-class="facepicthumb">
				<p>面部照片</p>
				<div :style="handlist.facepic!=undefined&&handlist.facepic!=''?{zIndex:'0'}:''" class="showImg">
					<img :src="handlist.facepic" @click="deletes($event)" :id="handlist.id" idt="mb">
				</div>
				<div class="changeImg">
					<img src="../../assets/img/mianbubig.png" >
					<img src="../../assets/img/addicon.png">
				</div>
			</li>
			<button v-if="handlist.states!=1" class="blue-btn" @click="puthandpic(2,$event)">确认上传</button>
		</ul>

		<ul id="earsupload" v-if="uploadname == 'ear'">
			<li>
				<input type="submit" @click="chooseImage($event)" :data-img="handlist.earpic1" class="earpic1" data-class="earpicthumb1">
				<p>左耳</p>
				<div :style="handlist.earpic1!=undefined&&handlist.earpic1!=''?{zIndex:'0'}:''" class="showImg">
					<img :src="handlist.earpic1" @click="deletes($event)" :id="handlist.id" idt="ze">
				</div>
				<div class="changeImg">
					<img src="../../assets/img/zuoerbig.png" >
					<img src="../../assets/img/addicon.png">
				</div>
			</li>
			<li>
				<input type="submit" @click="chooseImage($event)" :data-img="handlist.earpic2" class="earpic2" data-class="earpicthumb2">
				<p>右耳</p>
				<div :style="handlist.earpic2!=undefined&&handlist.earpic2!=''?{zIndex:'0'}:''" class="showImg">
					<img :src="handlist.earpic2" @click="deletes($event)" :id="handlist.id" idt="ye">
				</div>
				<div class="changeImg">
					<img src="../../assets/img/youerbig.png" >
					<img src="../../assets/img/addicon.png">
				</div>
			</li>
			<button v-if="handlist.states != 1" class="blue-btn" @click="puthandpic(3,$event)">确认上传</button>
		</ul>

		<ul id="tougueupload" v-if="uploadname == 'tougue'">
			<li>
				<input type="submit" @click="chooseImage($event)" :data-img="handlist.tonguepic" class="tonguepic" data-class="tonguepicthumb">
				<p>舌部照片</p>
				<div :style="handlist.tonguepic!=undefined&&handlist.tonguepic!=''?{zIndex:'0'}:''" class="showImg">
					<img :src="handlist.tonguepic" @click="deletes($event)" :id="handlist.id" idt="st">
				</div>
				<div class="changeImg">
					<img src="../../assets/img/shebubig.png" >
					<img src="../../assets/img/addicon.png">
				</div>
			</li>
			<button v-if="handlist.states != 1" class="blue-btn" @click="puthandpic(4,$event)">确认上传</button>
		</ul>

		<ul id="shapeupload" v-if="uploadname == 'shape'">
			<li>
				<input type="submit" @click="chooseImage($event)" :data-img="handlist.shapepic1" class="shapepic1" data-class="shapepicthumb1">
				<p>正身</p>
				<div :style="handlist.shapepic1!=undefined&&handlist.shapepic1!=''?{zIndex:'0'}:''" class="showImg">
					<img :src="handlist.shapepic1" @click="deletes($event)" :id="handlist.id" idt="zs">
				</div>
				<div class="changeImg">
					<img src="../../assets/img/tx-01big.png" >
					<img src="../../assets/img/addicon.png">
				</div>
			</li>
			<li>
				<input type="submit" @click="chooseImage($event)" :data-img="handlist.shapepic2" class="shapepic2" data-class="shapepicthumb2">
				<p>侧身</p>
				<div :style="handlist.shapepic2!=undefined&&handlist.shapepic2!=''?{zIndex:'0'}:''" class="showImg">
					<img :src="handlist.shapepic2" @click="deletes($event)" :id="handlist.id" idt="cs">
				</div>
				<div class="changeImg">
					<img src="../../assets/img/tx-02big.png" >
					<img src="../../assets/img/addicon.png">
				</div>
			</li>
			<button v-if="handlist.states != 1" class="blue-btn" @click="puthandpic(5,$event)">确认上传</button>
		</ul>

		<div class="maskLayer" v-if="showrule" @click.self="showrule = !showrule">
			<p ref="ruleBox">
				拍照范围：{{ruleLimit}}<br>
				拍照要求：{{ruleClaim}}<br>
				所上传照片大小不超过5M，支持JPG、BMP、PNG等常见图片格式。
			</p>
		</div>
		<div class="deletebox" v-if="deleteshow">
			<span :style="{backgroundImage:'url('+picpath+')'}" @click="hidedelbox"></span>
			<p v-if="handlist.states!=1" @click="deleteImage"><em class="iconfont icon-icon1460188478041"></em></p>
		</div>
		<div v-if="showPopup" class="bg"></div>
		<div v-if="showPopup" class="Popupbox">
			<img src="../../assets/img/finishhand.png" alt="">
			<h2>已成功提交初诊手诊</h2>
			<p><span @click="showPopup=!showPopup">暂不</span><router-link :to="{path:'/healthindex',query:{health_id:health_id}}">去首页</router-link></p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				http:localStorage.http,
				health_id: this.$route.query.health_id,
				showrule : false,
				uploadname : this.$route.query.page,
				handlist : '',
				ruleLimit : '',
				ruleClaim : '',
				rulelist:{
					'hand':{limit:'手腕在内（约两指宽）；左右手的正面、背面各一张；',
								claim:'四指自然并拢，大拇指自然伸开，照片需清晰显示手部纹路与颜色；'},
					'face':{limit:'整个面部的正面；',
								claim:'面部无任何遮挡，眼睛平视前方，照片需清晰显示面部纹路与颜色；'},
					'ear':{limit:'耳朵正面，左右耳各一张；',
								claim:'耳朵无任何遮挡；'},
					'tougue':{limit:'舌头正面；',
								claim:'舌头自然伸出，照片需清晰显示舌部纹路与颜色；'},
					'shape':{limit:'全身正面、侧面各一张；',
								claim:'体现本人形体特点；'}
				},
				deleteshow: false,
				deletepic: '',
				picid: 0,
				nouppicid: '',
				picpath: '',
				showPopup: false
			}
		},
		created(){
			this.wechatConfig()
			this.gethandpic()
		},
		mounted() {
			let page = this.$route.query.page;
			this.ruleLimit = this.rulelist[page].limit;
			this.ruleClaim = this.rulelist[page].claim;
		},
		methods: {
			chooseImage(e){
				//if(isWechatBrow()==="wechat"){}/*如果是微信浏览器,就注入微信jssdk*/
				let el = e.target;
				let that = this;
				let name = $(el).attr('class');
				let name1 = $(el).attr('data-class');
				wx.chooseImage({
					count:1,//设置一次能选择的图片的数量 
					sizeType:['original','compressed'],//指定是原图还是压缩,默认二者都有
					sourceType:['album','camera'],//可以指定来源是相册还是相机,默认二者都有
					success:function(res){   //微信返回了一个资源对象 
						//res.localIds 是一个数组　保存了用户一次性选择的所有图片的信息
						var localIdVal = res.localIds[0]
						wx.uploadImage({
							localId: localIdVal, // 需要上传的图片的本地ID，由chooseImage接口获得
							isShowProgressTips: 0, // 默认为1，显示进度提示
							success: function (res) {
								var serverId = res.serverId; // 返回图片的服务器端ID
								let url = that.http+'/wechat.php/diagno/upload'
								that.$http({
									method:'post',
									url:url,
									data: that.qs.stringify({
										token:'06cd3b2382f7a92d76f62c21946aaf3c',
										serverid: serverId,
										pathpic: name,
										pathpic1: name1,
										health_id: that.health_id
									})
								})
								.then((res)=>{
									if(res.data.status == 1){
										$(el).siblings('.showImg').css('z-index','0')
										$(el).attr('data-img',res.data.data)
										// $(el).siblings('div').find('img').attr('src',localIdVal)
										$(el).siblings('.showImg').find('img').attr('src',res.data.data)
										$(el).siblings('.showImg').find('img').attr('id',res.data.jumpUrl)
										// $('ul li .showImg img').attr('id',)
									}else if (res.data.status == 2) {
										that.showDialog(res.data.msg);
										that.$router.replace({ path: '/'})
									}else if(res.data.status == 3){
										that.showDialog(res.data.msg);
									}	
								})
								.catch((err)=>{
									return that.showDialog(err)
								})
							}
						});
						images.localId=res.localIds;//把图片的路径保存在images[localId]中--图片本地的id信息，用于上传图片到微信浏览器时使用
						//ulLoadToWechat(0); //把这些图片上传到微信服务器  一张一张的上传
					}
				});
			},
			deleteImage() {
				let url = this.http+'/wechat.php/diagno/delhandpic'
				this.$http({
					method:'post',
					url:url,
					data: this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						hand_id: this.picid,
						path: this.picpath,
						path2: this.picpath
					})
				})
				.then((res)=>{
					if(res.data.status == 1){
						$('img[idt='+this.nouppicid+']').attr('src','')
						$('img[idt='+this.nouppicid+']').parent().css('z-index','-1')
						$('img[idt='+this.nouppicid+']').parent().siblings('input').attr('data-img','')
						this.deleteshow = !this.deleteshow;
						//this.showDialog('删除成功')
					}	
				})
				.catch((err)=>{
					return this.showDialog(err)
				})
			},
			wechatConfig() {
				let url1 = window.location.href.split("#")[0]
				let url = this.http+'/wechat.php/wechat/signpackage'
				this.$http({
					method:'post',
					url:url,
					data: this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						url: url1
					})
				})
				.then((res)=>{
					if(res.data.status == 1){
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: res.data.data.signPackage.appId, // 必填，公众号的唯一标识
							timestamp: res.data.data.signPackage.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.data.signPackage.nonceStr, // 必填，生成签名的随机串
							signature: res.data.data.signPackage.signature.toLowerCase(),// 必填，签名，见附录1
							jsApiList: [
								'checkJsApi',
								'chooseImage',
								'uploadImage'
							] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2

						});
					}	
				})
				.catch((err)=>{
					return this.showDialog(err)
				})
				wx.ready(function(res){
					console.log("wx.config>>>>>success"+JSON.stringify(res));
					wx.checkJsApi({
						jsApiList: [
							'checkJsApi',
							'chooseImage',
							'uploadImage'
						],
						success: function(res) {
							console.log("wx.checkJsApi>>>success"+JSON.stringify(res));
						}
					});
				});
				wx.error(function(res){
					console.log("wx.config>>>>>error"+JSON.stringify(res));
				});
			},
			puthandpic(pagenum,e){
				let event = e.target;
				let that = this;
				let flag = false;
				$(event).siblings('li').each(function(value){
					if($(this).find('input').attr('data-img') == '' || $(this).find('input').attr('data-img') == undefined){
						flag = true;
						return that.showDialog('请选择照片');
					}
				})
				if(flag == true){
					return;
				}
				if(pagenum == 1){
					var data = this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						health_id: this.health_id,
						hand_status: 1,
						handpic1: $(event).siblings('li:eq(0)').find('input').attr('data-img'),
						handpic2: $(event).siblings('li:eq(1)').find('input').attr('data-img'),
						handpic3: $(event).siblings('li:eq(2)').find('input').attr('data-img'),
						handpic4: $(event).siblings('li:eq(3)').find('input').attr('data-img'),
						handthumb1: $(event).siblings('li:eq(0)').find('input').attr('data-img'),
						handthumb2: $(event).siblings('li:eq(1)').find('input').attr('data-img'),
						handthumb3: $(event).siblings('li:eq(2)').find('input').attr('data-img'),
						handthumb4: $(event).siblings('li:eq(3)').find('input').attr('data-img')
					})
				}else if(pagenum == 2){
					var data = this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						health_id: this.health_id,
						face_status: 1,
						facepic: $(event).siblings('li').find('input').attr('data-img'),
						facepicthumb: $(event).siblings('li').find('input').attr('data-img')
					})
				}else if(pagenum == 3){
					var data = this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						health_id: this.health_id,
						ear_status: 1,
						earpic1:$(event).siblings('li:eq(0)').find('input').attr('data-img'),
						earpic2:$(event).siblings('li:eq(1)').find('input').attr('data-img'),
						earpicthumb1:$(event).siblings('li:eq(0)').find('input').attr('data-img'),
						earpicthumb2:$(event).siblings('li:eq(1)').find('input').attr('data-img'),
					})
				}else if(pagenum == 4){
					var data = this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						health_id: this.health_id,
						tongue_status: 1,
						tonguepic: $(event).siblings('li').find('input').attr('data-img'),
						tonguepicthumb: $(event).siblings('li').find('input').attr('data-img')
					})
				}else if(pagenum == 5){
					var data = this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						health_id: this.health_id,
						shape_status: 1,
						shapepic1: $(event).siblings('li:eq(0)').find('input').attr('data-img'),
						shapepic2: $(event).siblings('li:eq(1)').find('input').attr('data-img'),
						shapepicthumb1: $(event).siblings('li:eq(0)').find('input').attr('data-img'),
						shapepicthumb2: $(event).siblings('li:eq(1)').find('input').attr('data-img')
					})
				}
				let url = this.http+'/wechat.php/diagno/savehandpic'
				this.$http({
					method:'post',
					url:url,
					data: data
				})
				.then((res)=>{
					if(res.data.status == 1){
						this.showDialog('提交成功')
						if(res.data.data.is_finish == 0){
							this.$router.replace({path:'/hand',query: {health_id:this.health_id}});
						}else if(res.data.data.is_finish == 1){
							this.showPopup = true
						}
					}	
				})
				.catch((err)=>{
					return this.showDialog(err)
				})
			},
			gethandpic() {
				let url = this.http+'/wechat.php/diagno/handphoto'
				this.$http({
					method:'post',
					url:url,
					data: this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						health_id: this.$route.query.health_id,
						photoname: this.$route.query.page
					})
				})
				.then((res)=>{
					if(res.data.status == 1){
						this.handlist = res.data.data
					}else if (res.data.status == 2) {
						this.showDialog(res.data.msg);
						this.$router.replace({ path: '/'})
					}else {
						// this.handlist = null
					}	
				})
				.catch((err)=>{
					return this.showDialog(err)
				})
			},
			deletes(e) {
				let event = e.target;
				this.deleteshow = !this.deleteshow;
				var idt = $(event).attr('idt');
				this.nouppicid = idt;
				var pic = $(event).attr('src');
				this.picpath = pic;
				// $('img[idt='+this.nouppicid+']').attr('src',this.picpath)
				// this.deletepic = pic;
				if($(event).attr('id') != undefined){
					var id = $(event).attr('id');
					this.picid = id;
				}
			},
			hidedelbox(){
				this.deleteshow = !this.deleteshow;
				/*alert(this.nouppicid)
				alert(this.picpath)*/
				/*$('img[idt='+this.nouppicid+']').attr('src',this.picpath)
				alert($('img[idt='+this.nouppicid+']').attr('idt'))
				alert($('img[idt='+this.nouppicid+']').attr('src'))
				this.deletepic = $('img[idt='+this.nouppicid+']').attr('src');*/
			}
		}
	}
			
</script>

<style>
	#upload {
		text-align: right;
	}
	#upload>span{
		font-size: .26rem;
		display: inline-block;
		margin: .3rem .3rem .2rem 0;
	}
	#upload span i {
		margin-left:.1rem;
	}
	#upload .maskLayer {
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		z-index: 99;
	}
	#upload .maskLayer p {
		width: 80%;
		height: 40vh;
		background: #fff;
		margin: 30vh auto;
		padding: .4rem .3rem;
		text-align: left;
		line-height: .5rem
	}
	#upload ul {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 .68rem;
	}
	#upload ul li {
		width: 2.82rem;
		height: 3.46rem;
		position: relative;
		margin-bottom: .35rem;
	}
	#upload ul li input {
		width: 100%;
		height: 2.82rem;
		opacity: 0;
	}
	#upload ul li p {
		font-size: .3rem;
		line-height: .64rem;
		color: #717070;
		text-align: center;
	}
	#upload ul li .showImg{
		border: .02rem solid #bebebe;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2.82rem;
		z-index: -1;
		overflow: hidden;
	}
	#upload ul li .changeImg{
		border: .02rem solid #bebebe;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2.82rem;
		z-index: -1;
		overflow: hidden;
	}
	#upload ul li div img {
		width: 100%;
		height: auto;
	}
	#upload ul li .changeImg img:last-child {
		width: 50%;
		position: absolute;
		top: 25%;
		left: 25%;
		border: 0;
	}
	#upload button {
		position: fixed;
		bottom: 4%;
		left: 5%;
	}
	#upload .deletebox{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #000000;
		z-index: 1000;
	}
	#upload .deletebox span {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 60px;
		left: 0;
		background: center center no-repeat;
		background-size: contain;
	}
	#upload .deletebox p {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #0D0D0D;
		color: #FFFFFF;
		line-height: 60px;
		text-align: center;
	}
	#upload .deletebox p em{
		color: #FFFFFF;
		font-size: 24px;
	}
	#upload .bg {
		position: fixed;
		top: 0;
		bottom: 0;
		left:0;
		right: 0;
		background: rgba(0,0,0,.5)
	}
	#upload .Popupbox {
		width: 60%;
		height: 4rem;
		background: #fff;
		position: fixed;
		z-index: 9;
		left: 20%;
		top: 50%;
		margin-top: -2rem;
		border-radius: 5px;
		text-align: center;
	}
	#upload .Popupbox img {
		width: 44%;
		margin-top: .4rem;
		margin-bottom: .3rem;
	}
	#upload .Popupbox h2 {
		font-weight: normal;
		font-size: .3rem;
	}
	#upload .Popupbox p {
		height: .77rem;
		border-top: 1px solid #e7e7e7;
		display: flex;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	#upload .Popupbox p span {
		width: 50%;
		line-height: .77rem;
		color: #999;
	}
	#upload .Popupbox p a {
		width: 50%;
		height: 100%;
		border-left: 1px solid #e7e7e7;
		color: #47cce2;
		font-size: .28rem;
		line-height: .77rem;
	}
</style>