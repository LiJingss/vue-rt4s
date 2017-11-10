<template>
	<div id="upload">
		<span @click="showRule()">查看照片规则<i class="iconfont icon-rule"></i></span>
		<ul id="handupload" v-if="uploadname == 'handupload'">
			<li>
				<input type="file" >
				<p>左手正面</p>
				<img src="../../assets/img/zuoshoubig-z.png" alt="">
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<li>
				<input type="file" >
				<p>左手背面</p>
				<img src="../../assets/img/zuoshoubig-f.png" alt="">
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<li>
				<input type="file" >
				<p>右手正面</p>
				<img src="../../assets/img/youshoubig-z.png" alt="">
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<li>
				<input type="file" >
				<p>右手背面</p>
				<img src="../../assets/img/youshoubig-f.png" alt="">
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<button class="blue-btn" @click="">确认上传</button>
		</ul>

		<ul id="faceupload" v-if="uploadname == 'faceupload'">
			<li>
				<input type="file" >
				<p>面部照片</p>
				<img src="../../assets/img/mianbubig.png" alt="">
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<button class="blue-btn" @click="">确认上传</button>
		</ul>

		<ul id="earsupload" v-if="uploadname == 'earsupload'">
			<li>
				<input type="file" >
				<p>左耳</p>
				<img src="../../assets/img/zuoerbig.png" alt="">
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<li>
				<input type="file" >
				<p>右耳</p>
				<img src="../../assets/img/youerbig.png" alt="">
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<button class="blue-btn" @click="">确认上传</button>
		</ul>

		<ul id="tougueupload" v-if="uploadname == 'tougueupload'">
			<li>
				<input type="file" >
				<p>舌部照片</p>
				<img src="../../assets/img/shebubig.png" alt="">
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<button class="blue-btn" @click="">确认上传</button>
		</ul>

		<ul id="shapeupload" v-if="uploadname == 'shapeupload'">
			<li>
				<input type="file" >
				<p>正身</p>
				<img src="../../assets/img/tx-01big.png" alt="">
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<li>
				<input type="file" >
				<p>侧身</p>
				<img src="../../assets/img/tx-02big.png" alt="">
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<button class="blue-btn" @click="">确认上传</button>
		</ul>

		<div class="maskLayer" v-if="showrule" @click.self="hideRule()">
			<p ref="ruleBox">
				拍照范围：{{ruleLimit}}<br>
				拍照要求：{{ruleClaim}}<br>
				所上传照片大小不超过5M，支持JPG、BMP、PNG等常见图片格式。
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showrule : false,
				uploadname : '',
				ruleLimit : '',
				ruleClaim : '',
				rulelist:{
					'handupload':{limit:'手腕在内（约两指宽）；左右手的正面、背面各一张；',
								claim:'四指自然并拢，大拇指自然伸开，照片需清晰显示手部纹路与颜色；'},
					'faceupload':{limit:'整个面部的正面；',
								claim:'面部无任何遮挡，眼睛平视前方，照片需清晰显示面部纹路与颜色；'},
					'earsupload':{limit:'耳朵正面，左右耳各一张；',
								claim:'耳朵无任何遮挡；'},
					'tougueupload':{limit:'舌头正面；',
								claim:'舌头自然伸出，照片需清晰显示舌部纹路与颜色；'},
					'shapeupload':{limit:'全身正面、侧面各一张；',
								claim:'体现本人形体特点；'}
				}
			}
		},
		mounted() {
			if(window.location.href.indexOf("upload#") != -1){
				var upload_url=window.location.href;
				var url_num=upload_url.indexOf("#");
				this.uploadname = upload_url.substr(url_num+1);
				this.ruleLimit = this.rulelist[upload_url.substr(url_num+1)].limit;
				this.ruleClaim = this.rulelist[upload_url.substr(url_num+1)].claim;
			}
		},
		methods: {
			showRule(){
				this.showrule = !this.showrule;
			},
			hideRule(){
				this.showrule = !this.showrule;
			}
		}
	}
			
</script>

<style>
	#upload {
		text-align: right;
	}
	#upload span{
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
		/*display: none;*/
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
	#upload ul li img{
		border: .02rem solid #bebebe;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: -1;
	}
	#upload ul li img:last-child {
		width: 50%;
		position: absolute;
		top: 22%;
		left: 25%;
		border: 0;
	}
	#upload button {
		position: fixed;
		bottom: 4%;
		left: 5%;
	}
</style>