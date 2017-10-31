<template>
	<div id="information" class="information-box">
		<!-- <h2> {{msg}} </h2> -->
		<ul class="profile-box-item">
			<li class=""><span>头像</span><i class="iconfont icon-enter"></i><label><input type="file"></label></li>
			<li><span>{{username}}</span><input type="text" placeholder="请输入姓名" /></li>
			<li><span>{{usersex}}</span><input type="text" placeholder="请选择"/></li>
			<li><span>{{yeardate}}</span><input type="text" placeholder="请选择"/></li>
			<li><span>{{address}}</span><input type="text" placeholder="请选择"/><i class="iconfont icon-enter"></i></li>
			<li><span>{{detaddress}}</span><input type="text" placeholder="可选填"/><i class="iconfont icon-enter"></i></li>
			<li><span>{{telphone}}</span><input type="text" placeholder="可选填"/></li>
			<li><span>{{emali}}</span><input type="text" placeholder="可选填"/></li>
		</ul>
		<div class="Receman"><a href=""><span>收货管理</span></a><i class="arrow iconfont icon-enter"></i></div>
	</div>

</template>

<script>
export default {
  name: 'information',
  data () {
    return {
      username:'姓名',
      usersex:'性别',
      yeardate:'出生年月',
      telphone:'联系电话',
      address:'所在地区',
      detaddress:'详细地址',
      emali:'邮箱'
      
    }
  },
  mounted() {
    this.login()
  },
  /*methods: {
       login() {
        this.$http({
         method: 'post',
         url: 'http://www.anmei.com/weichat.php/index/information'        
        })
      }
  }*/

  methods: {
    login() {
      let _this = this;
      this.$http.post('http://www.anmei.com/weichat.php/index/information')
        .then(function (response) {
          if (response.data.status == 1) {
            _this.$router.replace({ path: '/'})
          }
        })
    }
  }
}
</script>

<style scoped>

.profile-box-item{
	border-top:.02rem solid #e5e5e5;
	border-bottom:.02rem solid #e5e5e5;
	background: #fff;
	margin-bottom: .2rem;
	text-align: left;
}
.profile-box-item li{
	margin-left: .3rem; 
	clear: both;
	overflow: hidden;
	color: #333;
	border-bottom:.02rem solid #e5e5e5;
	font-size: .3rem;
	height: .88rem;
	line-height: .88rem;
	padding-right: .3rem;
}
.profile-box-item li span{
	display: inline-block;
	font-size: .3rem;
	width: 1.8rem;
	float: left;
	text-align: left;
}
.profile-box-item li input{
	font-size: .3rem;
	height: .89rem;
	line-height: .89rem;
	width: 69%;
	float: left;
}
/* 信息资料 */
.profile-box-item li i{
	float: right;
	font-size: .5rem;
	width: .2rem;
}
.profile-box-item li:first-child{
	height: 1.5rem;
	line-height: 1.5rem; 
}
.profile-box-item li:first-child input{
	opacity: 0;
	width: 1.2rem;
	height: 1.2rem;
}
.profile-box-item li:first-child label{
	border: .01rem solid #ccc;
	width: 1.2rem;
	height: 1.2rem;
	float: left;
	border-radius: .05rem;
	margin-top: .15rem;
	 margin-right: .26rem;
}
.profile-box-item li:last-child{
	border-bottom: none;
}
.Receman{
	border-top:.02rem solid #e5e5e5;
	border-bottom:.02rem solid #e5e5e5;
	background: #fff;
	font-size: .3rem;
	color: #333;
	padding-left: .3rem;
	height: .88rem;
	line-height: .88rem;
	padding-right: .3rem;
	text-align: left;
}
.Receman a{
	 color: #333;
}
.Receman .arrow{
	float: right;
}
</style>
