<template>
	<div id="notification">
		<v-logo></v-logo>
		<div class="noti-items-box">
			<scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller" style="padding-top: 1.1rem;">
				<section class="noti-item" v-for="(item,index) in items"   @click="toogle(index)" :data-id="item.id"  >
					<div @click="seenotification(item.id,item.is_see)" :is_see="item.is_see" >
						<p ><span>{{item.title}}</span><br><b>{{getdate(item.add_time)}}</b></p>
						<em :class="item.is_see == 0?'on':''"></em>
						<i  :class="activeIndex == index?'iconfont  icon-xia':'iconfont icon-gengduo'" ></i>
					</div>
					<p class="text-main" v-show="activeIndex == index">{{item.content}}</p>
				</section>
			</scroller>
		</div>
	</div>
</template>

<script>
export default {
	name: 'notification',
	data () {
		return {
			http:localStorage.http,
			health_id:'',
			items:[],
			seen:false,
			see_id:'',
			counter: 0, //当前页
            noData: '',
            note_id:'',
            activeIndex:-1,
            status:''
            
		}
	},	
	mounted() { //页面加载就执行函数
//  	this.getnotification()
  	},
  	created(){
// 		this.notification()
	},
	methods: {
		toogle(index){
			this.activeIndex = index;
		},
		getdate(date) {
			var date = new Date(date*1000)
			var Y = date.getFullYear();
			var M = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
			var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
			var H = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
			var N = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
			var S = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
			return Y+'-'+M+'-'+D+' '+H+':'+N+':'+S;
		},
		refresh(done) {
            this.$refs.myscroller.resize();
        },
//      获取通知消息
        infinite(done,is_see) {
        	if(this.noData) {
				setTimeout(()=>{
					this.$refs.myscroller.finishInfinite(2);
				})
				return;
			}
			setTimeout(() => {				
				let url = this.http+'/wechat.php/notification/notification';
				this.$http.post(url,this.qs.stringify({
					'token' : "06cd3b2382f7a92d76f62c21946aaf3c",
					'page' : this.counter
				})).then((res) => {
					if(res.data.status == 1){
						res.data.msg.forEach((value) => {
							this.items.push(value);
						})
					}else if(res.data.status == 2){
						this.$router.replace({ path: '/'})
						this.showDialog(res.data.msg)
					}else {
						this.noData = "没有更多数据";
					}
				}, (response) => {
					console.log('error');
				});
				this.$refs.myscroller.resize();
				setTimeout(()=>{
					done()
				},1000)
				this.counter++;
			},100)
        },
//		点击消息查看
		seenotification(id,is_see){
			let isSee_id = id;
			$("[data-id="+isSee_id+"]").find('em').remove();
			this.see_id=is_see;
//			未查看过消息请求接口
			   if(this.see_id == 0){
				let url = this.http+'/wechat.php/notification/isSee'
				this.$http({
			        method: 'post',
			        url: url,   
			        data: this.qs.stringify({
			         	token:'06cd3b2382f7a92d76f62c21946aaf3c',
			         	isSee_id:isSee_id
			        })
		        })
		        .then((res)=>{
		        	if (res.data.status == 2) {
		        		this.showDialog(res.data.msg)
						let timer = setTimeout(() => {
							this.$router.replace({ path: '/'})
						}, 2000);
		      		}else if (res.data.status == 1) {
//		        		this.status=res.data.status
		        	};
		        	
		        })
		        .catch((err)=>{
//		        	return this.showDialog('请求服务器错误')
		        })
			}
			
			
		}
	}
}
</script>

<style scoped>
	#notification .noti-items-box{
		/*border-top: 1px solid #e5e5e5;*/
		background: #fff;
		margin: .2rem 0;
	}
	#notification .noti-items-box .noti-item{
		background: #FFFFFF;
	}
	#notification .noti-items-box .noti-item div {
		display: flex;
		align-items: center;
		height: 1.2rem;
		border-bottom: 1px solid #e5e5e5;
		padding: 0 .3rem;
	}
	#notification .noti-items-box .noti-item div p {
		text-align: left;
		width: 100%;
	}
	#notification .noti-items-box .noti-item div p span{
		font-size: .3rem;
	}
	#notification .noti-items-box .noti-item div p b{
		font-size: .26rem;
		color: #999;
	}
	#notification .noti-items-box .noti-item div i {
		font-size: .34rem;
		color: #c7c7cc;
	}
	#notification .noti-items-box .noti-item div em {
		display: inline-block;
		width: .2rem;
		height: .19rem;
		border-radius: 50%;
		
	}
	#notification .noti-items-box .noti-item div em.on {
		background: #ff706b;
	}
	#notification .noti-items-box .noti-item>p {
		font-size: .26rem;
		color: #666;
		line-height: .36rem;
		padding: .2rem .55rem;
		background: #fbfbfb;
		text-align: left;
		border-bottom: 1px solid #e5e5e5;
	}
	#notification .logo{
		position: relative;
		z-index: 6;
	}
	/*#notification .noti-items-box .text-main{
		display: none;
	}
	#notification .noti-items-box .noti-item.on{
		display: block;
	}*/
</style>