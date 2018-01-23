<template>
	<div id="shipaddressXq" class="shipadd-box">  
		<v-logo></v-logo>
		<ul class="shipadd-boxlist">
			<li v-for="(item,index) in addresslist" :id="item.id">
				<p><span class="ship_span">{{item.username}}</span><input type="text" :value="item.linktel" disabled="disabled" /></p>
				<p class="ship-address" :data-province-name ="item.province" :data-city-name="item.city" :data-town-name="item.town" :data-province ="item.province1" :data-city="item.city1" :data-town="item.town1" :data-address="item.address" >{{item.province}} {{item.city}} {{item.town}} {{item.address}}</p>
				<p class="status-box">
					<span v-if="item.is_default == 1" :data-isdefault="item.is_default"><i class="iconfont icon-duihao2"></i><em class="default fl">默认</em></span>
					<span v-else @click="setDefault" :data-isdefault="item.is_default"><i class="iconfont icon-weixuanzhong"></i><em class="default fl">设为默认</em></span>
					<em v-if='item.is_default != 1' class="delete fr" @click="deletebtn"><i class="icon iconfont icon-icon1460188478041"></i>删除</em>
					<em class="edit fr" @click="editBtn(item.id)" :data-id="item.id"><i class="icon iconfont icon-bianji1" ></i>编辑</em>
				</p>
			</li>
		</ul>
		<button type="button" class="blue-btn" @click="goRoute">新增收货地址</button>
	</div>
</template>

<script>
export default {
	name: 'shipaddressXq',
	data () {
		return {
			http:localStorage.http,
			addresslist:[]
		}
	},
	created() {
		let url = this.http+'/wechat.php/Address/shippingAddress'
		this.$http({
			method: 'post',
			url: url,   
			data: this.qs.stringify({
				token:'06cd3b2382f7a92d76f62c21946aaf3c'
			})
		}).then((res)=>{
			if (res.data.status == 1) {	 	
				if(res.data.data != null){
					res.data.data.forEach((value) => {
						this.addresslist.push(value);
					})
				}
			}else if(res.data.status == 2) {
				this.$parent.showDialog(res.data.msg)
				this.$router.replace({ path: '/'})
			}else {
				
			}
		}).catch((err)=>{
			this.$parent.showDialog(err.data.msg)
		}) 
	},
	methods: {
		deletebtn(e){
			let el = e.target;
			let url = this.http+'/wechat.php/Address/del'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',	
					id:$(el).parents('li').attr('id')
				})
			}).then((res)=>{
				if (res.data.status == 1) {	 
					$(el).parents('li').remove();
					this.$parent.showDialog(res.data.msg)
				}else if(res.data.status == 2) {
					this.$parent.showDialog(res.data.msg)
					this.$router.replace({ path: '/'})
				}else {
					this.$parent.showDialog(res.data.msg)
				}
			}).catch((err)=>{
				return this.$parent.showDialog('请求服务器错误')
			}) 
		},
		setDefault(e) {
			let el = e.target;
			let url = this.http+'/wechat.php/Address/setDefault'
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',	
					id:$(el).parents('li').attr('id')
				})
			}).then((res)=>{
				if (res.data.status == 1) {	 	
					this.$parent.showDialog(res.data.msg)
					let timer = setTimeout(() => {
						window.location.reload()
					}, 1000);
				}else if(res.data.status == 2) {
					this.$parent.showDialog(res.data.msg)
					this.$router.replace({ path: '/'})
				}else {
					this.$parent.showDialog(res.data.msg)
				}
			}).catch((err)=>{
				return this.$parent.showDialog('请求服务器错误')
			})
		},
		editBtn(id) {
//			let el = e.target;
			let edit_id = id;
			this.$router.push({path:'/shippingaddress', query: {
				id : $("[data-id="+edit_id+"]").parents('li').attr('id'),
				username :$("[data-id="+edit_id+"]").parent().siblings('p').find('span').html(),
				linktel : $("[data-id="+edit_id+"]").parent().siblings('p').find('input').val(),
				province : $("[data-id="+edit_id+"]").parent().prev('p').attr('data-province'),
				city : $("[data-id="+edit_id+"]").parent().prev('p').attr('data-city'),
				town : $("[data-id="+edit_id+"]").parent().prev('p').attr('data-town'),
				provinceName : $("[data-id="+edit_id+"]").parent().prev('p').attr('data-province-name'),
				cityName :$("[data-id="+edit_id+"]").parent().prev('p').attr('data-city-name'),
				townName : $("[data-id="+edit_id+"]").parent().prev('p').attr('data-town-name'),
				address :$("[data-id="+edit_id+"]").parent().prev('p').attr('data-address'),
				isdefault : $("[data-id="+edit_id+"]").siblings('span').attr('data-isdefault')
			}});
		},
		goRoute() {
			if($('.shipadd-boxlist li').length <= 0){
				this.$router.push({path:'/shippingaddress', query: {list:0}});
			}else {
				this.$router.push({path:'/shippingaddress'});
			}
		}
	}
}
</script>

<style scoped>
	#shipaddressXq{
		margin-top: 0;
		text-align: left;
	}
	#shipaddressXq .shipadd-boxlist li{
		border-top:.02rem solid #e5e5e5;
		border-bottom:.02rem solid #e5e5e5;
		background: #fff;
		padding:.15rem .3rem 0; 
		color: #333;
		margin-bottom: .2rem;
		font-size: .34rem;
	}
	#shipaddressXq .shipadd-boxlist li p{
		clear: both;
		overflow: hidden;
	}
	#shipaddressXq .shipadd-boxlist li span{
		display: inline-block;
		font-size: .3rem;
		float: left;
		text-align: left;
	}
	#shipaddressXq .shipadd-boxlist li span.ship_span{
		width: 1.8rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	#shipaddressXq .shipadd-boxlist li{
		clear: both;
		overflow: hidden;
	}
	#shipaddressXq .shipadd-boxlist input{
		float: left;
		font-size: .3rem;
	}
	#shipaddressXq .ship-address{
		display: block;
		font-size: .26rem;
		line-height: .36rem;
		color: #ccc;
		border-bottom:.01rem solid #e5e5e5;
		padding: .16rem 0;
	}
	#shipaddressXq .shipadd-box em{
		color: #ccc;
		font-size: .26rem;
	}
	#shipaddressXq .status-box i{
		float: left;
		font-size: .35rem;
		vertical-align: middle;
		color: #a2a2a2;
		margin-right: .1rem;
	}
	#shipaddressXq .status-box{
		padding: .2rem 0 .2rem 0;
	}
	#shipaddressXq .shipadd-box em.edit{
		margin-right: .6rem
	}
	#shipaddressXq .blue-btn {
		margin-top: .2rem;
	}
	#shipaddressXq i.icon-duihao2{
		color:#47CCE2;
	}
</style>
