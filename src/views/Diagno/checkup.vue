<template>
	<div id="checkup">
		<span ref="checkupspan" @click="showRule()">查看照片规则<i class="iconfont icon-rule"></i></span>
		<ul ref="checkuplist">
			<li>
				<input type="file" >
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<li>
				<input type="file" >
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<li>
				<input type="file" >
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<li>
				<input type="file" >
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<li>
				<input type="file" >
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<li>
				<input type="file" >
				<img src="../../assets/img/addicon.png" alt="">
			</li>
			<button class="blue-btn" @click="" ref="checkupbtn">确认上传</button>
		</ul>
		
		<div class="maskLayer" v-if="showrule" @click.self="hideRule()">
			<p ref="ruleBox">
				所上传照片大小不超过5M，支持JPG、BMP、PNG等常见图片格式。
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showrule : false
			}
		},
		mounted() {
			var height = document.documentElement.clientHeight-this.$refs.checkupspan.getBoundingClientRect().height;
			this.$refs.checkuplist.style.minHeight = height +'px';
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
	#checkup {
		text-align: right;
		min-height: 100vh;
	}
	#checkup span{
		font-size: .26rem;
		display: inline-block;
		-margin: .3rem .3rem .2rem 0;
		height: .8rem;
		line-height: .8rem;
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
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		position: relative;
		padding: 0 .68rem 1.5rem;
	}
	#checkup ul li {
		width: 2.82rem;
		height: 2.82rem;
		position: relative;
		margin-bottom: .35rem;
		border: .02rem solid #bebebe;
		background: #fff;
	}
	#checkup ul li input {
		position: absolute;
		left: 0;
		width: 100%;
		height: 2.82rem;
		opacity: 0;
		z-index: 99;
	}
	#checkup ul li img {
		width: 50%;
		position: absolute;
		top: 25%;
		left: 25%;
		border: 0;
		z-index: 9;
	}
	#checkup button {
		width: 6.7rem;
		position: absolute;
		bottom: 4%;
		left: 5%;
	}
</style>