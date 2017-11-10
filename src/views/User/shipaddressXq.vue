<template>
  <div id="shipaddressXq" class="shipadd-box">  
      <ul class="shipadd-box-item">
        <li>
          <p><span>{{username}}</span><input type="text" value="13718517583" disabled="disabled" /></p>
          <p class="ship-address">{{address}}</p>
          <p class="status-box"><i class="icon iconfont icon-yuankongxin"></i><em class="default fl">设为默认</em><em class="delete fr"><i class="icon iconfont icon-icon1460188478041"></i>删除</em><em class="edit fr"><i class="icon iconfont icon-bianji1"></i>编辑</em></p>
        </li>
      </ul>
      <router-link to="/shippingaddress"><button type="button" class="blue-btn" >新增收货地址</button></router-link>
  </div>

</template>

<script>
export default {
  name: 'shipaddressXq',
  data () {
    return {
      username:'王叶凡',
      address:'北京市通州区梨园镇北京京联安美健康科技有限公司5门505a'
     
    }
  }
}
</script>

<style scoped>
.shipadd-box{
    margin-top: .2rem;
    text-align: left;
}
.shipadd-box-item{
    padding:.3rem 0 0 .3rem;
    border-top:.02rem solid #e5e5e5;
    border-bottom:.02rem solid #e5e5e5;
    background: #fff;
    margin-bottom: .2rem;
}
.shipadd-box-item li{
    margin:0 .3rem 0 0; 
    clear: both;
    overflow: hidden;
    color: #333;
    /* border-bottom:.02rem solid #e5e5e5; */
    font-size: .34rem;
}
.shipadd-box-item li p{
    clear: both;
    overflow: hidden;
}
.shipadd-box-item li span{
    display: inline-block;
    font-size: .34rem;
    width: 1.8rem;
    float: left;
    text-align: left;
}
.shipadd-box-item li{
    clear: both;
    overflow: hidden;
}
.shipadd-box-item input{
    float: left;
    font-size: .34rem;
}
.ship-address{
    display: block;
    font-size: .28rem;
    line-height: .38rem;
    color: #ccc;
    border-bottom:.01rem solid #e5e5e5;
    padding: .16rem 0;
}
.shipadd-box em{
    color: #ccc;
    font-size: .28rem;
}
#shipaddressXq .status-box i{
  float: left;
  font-size: .36rem;
  vertical-align: middle;
  color: #a2a2a2;
  margin-right: .1rem;
}
.status-box{
    padding: .2rem 0 .2rem 0;
}
.shipadd-box em.edit{
    margin-right: .6rem
}
</style>
