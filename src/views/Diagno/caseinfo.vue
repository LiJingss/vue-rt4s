<template>
	<div id="caseinfo">
		<v-logo></v-logo>
		<ul class="item-content">
			<li v-for="(item,index) in pages" v-if="index < pagenum">
				<p @click="openBox(index)" :class="item.isshow?'on': ''">{{item.title}}</p><i :class="item.isshow?'iconfont icon-xia':'iconfont icon-gengduo'"></i>
				<div v-show="item.isshow">
					<span v-for="item in symptomlist.slice(num*index, num*(index+1))" :class="onlist != null&&onlist.indexOf(item.id) != -1 ? 'on': ''" :id="item.id" @click="addclass($event)">{{item.questionname}}</span>
				</div>
			</li>
		</ul>
		<button type="button" class="blue-btn" @click="putcaseinfo()">完成</button>
		<div v-if="showPopup" class="bg"></div>
		<div v-if="showPopup" class="Popupbox">
			<img src="../../assets/img/finishhand.png" alt="">
			<h2>已成功提交健康资料</h2>
			<p><span @click="showPopup=!showPopup">暂不</span><router-link to="/healthindex">去首页</router-link></p>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				http:localStorage.http,
				health_id: this.$route.query.health_id,
				open:false,
				symptomlist:null,
				onlist:null,
				pages: [{title:'第一部分',isshow:false},{title:'第二部分',isshow:false},{title:'第三部分',isshow:false},{title:'第四部分',isshow:false},{title:'第五部分',isshow:false},{title:'第六部分',isshow:false}],
				pagenum : null,
				num: 36,
				showPopup: false
			}
		},
		created(){
			let url = this.http+'/wechat.php/Health/caseinfo'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',
					health_id: this.health_id
				})
			}).then((res)=>{
				if (res.data.status == 1) {
					this.symptomlist = res.data.msg.questions;
					if(res.data.msg.tests != null){
						this.onlist = res.data.msg.tests.ids;
					}
					this.pagenum = Math.ceil(res.data.msg.questions.length/36)
				}else if(res.data.status == 2) {
					this.showDialog('您还没有登录')
					this.$router.replace({ path: '/'})
				}
			}).catch((err)=>{
				return this.showDialog('请求服务器错误')
			})
		},
		methods: {
			openBox(i){
				this.pages[i].isshow = !this.pages[i].isshow;
			},
			addclass(e) {
				let el = e.target;
				$(el).toggleClass('on')
			},
			putcaseinfo() {
				let arr = [];
				$('ul li div span.on').each(function(index,val){
					arr.push($(this).attr('id'));
				})
				if (arr.length<=0) {
					this.showDialog('您还未选择，请先选择！');
					return
				}
				let url = this.http+'/wechat.php/Health/baseinfo'
				this.$http({
					method: 'post',
					url: url,   
					data: this.qs.stringify({
						token:'06cd3b2382f7a92d76f62c21946aaf3c',
						health_id: this.health_id,
						status:2,
						ids: arr.join(',')
					})
				}).then((res)=>{
					if (res.data.status == 1) {
						if(res.data.msg == 0){
							this.$router.push({ path: '/healthinfo',query:{health_id:this.health_id}})
							this.showDialog('提交成功')
						}else if(res.data.msg == 1){
							this.showPopup=true
						}
					}else if(res.data.status == 2) {
						this.showDialog('您还没有登录')
						this.$router.replace({ path: '/'})
					}else if(res.data.status == 3){
						if(res.data.msg == 0){
							this.showDialog('修改成功')
							this.$router.push({ path: '/healthinfo',query:{health_id:this.health_id}})
						}else if(res.data.msg == 1){
							this.showPopup=true
						}
						
					}
				}).catch((err)=>{
					return this.showDialog('请求服务器错误')
				})
			}
		}
	}
</script>

<style>
	#caseinfo .item-content>li div{
		-display: none;
		background: #fbfbfb;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
		padding: .1rem .3rem;
		overflow: hidden;
	}
	#caseinfo .item-content>li div span{
		float: left;
		height: .6rem;
		line-height: .6rem;
		border: 1px solid #b2b2b2;
		padding: 0 .2rem;
		border-radius: .1rem;
		margin: .1rem .15rem .1rem 0;
		color: #b2b2b2;
	}
	#caseinfo .item-content>li p.on {
		border-bottom: 0;
	}
	#caseinfo .item-content>li div span.on {
		border-color: #47cce2;
		background: #47cce2;
		color: #fff;
	}
</style>
