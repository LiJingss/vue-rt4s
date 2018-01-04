<template>
	<div id="checkup">
		<span ref="checkupspan" @click="showrule = !showrule">查看照片规则<i class="iconfont icon-rule"></i></span>
		<ul ref="checkuplist">
			<li v-for="(item,index) in exampics" class="uplist">
				<img :src="item.photo" @click="deletes($event)" :id="item.id">
			</li>
			<li v-for="(item,index) in showimgids" class="uplist">
				<img :src="item" @click="deletes($event)" :data-id="index" :data-img="serverIds[index].photo">
			</li>
			<li :id="num"  v-if="is_see != 1 || num >= 30 ">
				<input type="submit" @click="chooseImage($event)">
				<img src="../../assets/img/addicon.png" alt="" class="changeImg" >
			</li>
			<button v-if="is_see != 1" class="blue-btn" @click="putCheckpic">确认上传</button>
		</ul>
		
		<div class="maskLayer" v-if="showrule" @click.self="showrule = !showrule">
			<p ref="ruleBox">
				所上传照片大小不超过5M，支持JPG、BMP、PNG等常见图片格式。<br>
				最多可上传30张
			</p>
		</div>
		<div class="deletebox" v-if="deleteshow">
			<span :style="{backgroundImage:'url('+deletepic+')'}" @click.self="deleteshow = !deleteshow"></span>
			<p v-if="is_see != 1" @click="deleteImage"><em class="iconfont icon-icon1460188478041"></em></p>
		</div>
		<div v-if="loadingshow" class="loading">
			<b></b>
			<p><img src="../../assets/img/loading.gif" alt="">上传中...</p>
		</div>
		<div class="bg"></div>
		<div class="Popupbox">
			<img src="../../assets/img/finishhand.png" alt="">
			<h2>已成功提交初诊体检</h2>
			<p><span @click="reload()">继续上传</span><router-link :to="{path:'/healthindex',query:{health_id:health_id}}">去首页</router-link></p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				http:localStorage.http,
				showrule : false,
				health_id : this.$route.query.health_id,
				num : 0,
				is_see : '',
				exampics : '',
				deleteshow: false,
				loadingshow: false,
				deletepic: '',
				picid: '',
				picdataid: '',
				showimgids: [],
				Uploadids: [],
				serverIds: [],
				showPopup: false
			}
		},
		created(){
			this.wechatConfig()
			this.getCheckpic()
		},
		methods: {
			reload(){
//				this.showPopup=!this.showPopup
				window.location.reload()
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
			chooseImage(e){
				//if(isWechatBrow()==="wechat"){}/*如果是微信浏览器,就注入微信jssdk*/
				var that = this;
				wx.chooseImage({
					success:function(res){   //微信返回了一个资源对象 
						//res.localIds 是一个数组　保存了用户一次性选择的所有图片的信息
						var localIds = res.localIds
						// that.showimgids = that.showimgids.concat(localIds)
						if(that.num+res.localIds.length <= 30){
							that.syncUpload(localIds);
							that.loadingshow = !that.loadingshow
						}else {
							that.showDialog('最多可上传30张');
							return;
						}
					}
				});
			},
			syncUpload (localIds) {
				let that = this;
				var localId = localIds.pop(); 
				wx.uploadImage({ 
					localId: localId, 
					isShowProgressTips: 0, 
					success: function (res) {
						that.showimgids.push(localId)
						that.Uploadids.push({serverid:res.serverId})
						if(localIds.length > 0){ 
							that.syncUpload(localIds); 
						}else {
							let url = that.http+'/wechat.php/diagno/examUpload'
							that.$http({
								method:'post',
								url:url,
								data: that.qs.stringify({
									token:'06cd3b2382f7a92d76f62c21946aaf3c',
									serverids: that.Uploadids
								})
							})
							.then((res)=>{
								that.loadingshow = !that.loadingshow
								if(res.data.status == 1){
									that.Uploadids = [];
									that.num+=res.data.data.length;
									for(var i=0;i<res.data.data.length;i++){
										that.serverIds.push({
											photo: res.data.data[i],
											photothumb : res.data.data[i],
											is_first : 1,
											is_show : 1,
											health_id: that.health_id
										})
									}
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
					} 
				}); 
			},
			getCheckpic() {
				let url = this.http+'/wechat.php/diagno/checkup'
				this.$http({
					method:'post',
					url:url,
					data: this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						health_id: this.$route.query.health_id
					})
				})
				.then((res)=>{
					if(res.data.status == 1){
						this.exampics = res.data.data.exampic
						this.num = parseInt(res.data.data.num)
						this.is_see=res.data.data.is_see
					}else if (res.data.status == 2) {
						this.showDialog(res.data.msg);
						this.$router.replace({ path: '/'})
					}	
				})
				.catch((err)=>{
					return this.showDialog(err)
				})
			}, 
			putCheckpic() {
				if(this.serverIds.length <= 0){
					return this.showDialog('请选择照片');
				}
				let url = this.http+'/wechat.php/diagno/saveExam'
				this.$http({
					method:'post',
					url:url,
					data: this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						photo: this.serverIds
					})
				})
				.then((res)=>{
					if(res.data.status == 1){
						this.serverIds = []
						$('#checkup .bg').show()
						$('#checkup .Popupbox').show()
					}else if (res.data.status == 2) {
						this.showDialog(res.data.msg);
						this.$router.replace({ path: '/'})
					}else if(res.data.status == 3){
						this.showDialog(res.data.msg);
					}	
				})
				.catch((err)=>{
					return this.showDialog(err)
				})
			},
			deleteImage() {
				let url = this.http+'/wechat.php/diagno/delexam'
				if(this.picdataid != ''){
					this.$http({
						method:'post',
						url:url,
						data: this.qs.stringify({
							token:'06cd3b2382f7a92d76f62c21946aaf3c',
							exam_id: 0,
							path: this.deletepic,
							path2: this.deletepic
						})
					})
					.then((res)=>{
						if(res.data.status == 1){
							var index = parseInt(this.picdataid)
							this.showimgids.splice(index,1)
							this.serverIds.splice(index,1)
							this.deleteshow = !this.deleteshow;
							this.showDialog('删除成功')
							this.picdataid = ''
							this.num--;
						}	
					})
					.catch((err)=>{
						return this.showDialog(err)
					})
				}else if(this.picid != ''){
					this.$http({
						method:'post',
						url:url,
						data: this.qs.stringify({
							token:'06cd3b2382f7a92d76f62c21946aaf3c',
							exam_id: this.picid,
							path: this.deletepic,
							path2: this.deletepic
						})
					})
					.then((res)=>{
						if(res.data.status == 1){
							$('img[id='+this.picid+']').parent().remove()
							this.deleteshow = !this.deleteshow;
							this.showDialog('删除成功')
							this.picid = ''
							this.num--;
						}	
					})
					.catch((err)=>{
						return this.showDialog(err)
					})
				}
			},
			deletes(e) {
				let event = e.target
				this.deleteshow = !this.deleteshow;
				var pic;
				if($(event).attr('id') != undefined){
					pic = $(event).attr('src');
					this.deletepic = pic;
					var id = $(event).attr('id');
					this.picid = id;
				}else if ($(event).attr('data-id') != undefined) {
					pic = $(event).attr('data-img');
					this.deletepic = pic;
					var id = $(event).attr('data-id');
					this.picdataid = id;
				}
			}
		}
	}
			
</script>

<style>
	#checkup .bg{
		display: none;
	}
	#checkup .Popupbox{
		display: none;
	}
	#checkup {
		text-align: right;
		min-height: 100vh;
	}
	#checkup>span{
		font-size: .26rem;
		display: inline-block;
		height: .8rem;
		line-height: .8rem;
		position: absolute;
		top: 0;
		right: .3rem;
		z-index: 2;
	}
	#checkup span i {
		margin-left:.1rem;
	}
	#checkup .maskLayer {
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		z-index: 99;
	}
	#checkup .maskLayer p {
		width: 80%;
		height: 40vh;
		background: #fff;
		margin: 30vh auto;
		padding: .4rem .3rem;
		text-align: left;
		line-height: .5rem
	}
	#checkup ul {
		min-height: 100vh;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		position: relative;
		padding: .9rem .68rem 1.5rem;
		align-content:flex-start;
	}
	#checkup ul li {
		width: 2.82rem;
		height: 2.82rem;
		position: relative;
		margin-bottom: .35rem;
		border: .02rem solid #bebebe;
		background: #fff;
		overflow: hidden;
	}
	#checkup ul li input {
		position: absolute;
		left: 0;
		width: 100%;
		height: 2.82rem;
		opacity: 0;
		z-index: 9;
	}
	#checkup ul li .changeImg {
		width: 50%;
		position: absolute;
		top: 25%;
		left: 25%;
		border: 0;
		z-index: 2;
		min-height: auto;
	}
	#checkup ul li img {
		width: 100%;
		min-height: 100%;
		height: auto;
		position: absolute;
		top: 0;
		left: 0;
	}
	#checkup button {
		width: 6.7rem;
		position: absolute;
		bottom: .4rem;
		left: 5%;
	}
	#checkup .deletebox{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #000000;
		z-index: 1000;
	}
	#checkup .deletebox span {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 60px;
		left: 0;
		background: center center no-repeat;
		background-size: contain;
	}
	#checkup .deletebox p {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #0D0D0D;
		color: #FFFFFF;
		line-height: 60px;
		text-align: center;
	}
	#checkup .deletebox p em{
		color: #FFFFFF;
		font-size: 24px;
	}
</style>