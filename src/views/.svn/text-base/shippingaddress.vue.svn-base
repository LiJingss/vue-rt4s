<template>
  <div id="shipadd" class="shipadd-box">
    <!-- <h2> {{msg}} </h2> -->
      <ul class="profile-box-item">
        <li><span>{{username}}</span><input type="text" placeholder="请输入姓名" /></li>
        <li><span>{{telphone}}</span><input type="text" placeholder="请输入联系电话" name="phoneNum" maxLength="11" /></li>
        <li><span>{{address}}</span><input type="text" placeholder="请选择"/></li>
        <li><span>{{detaddress}}</span><input type="text" placeholder="请填写详细地址"/></li>
      </ul>
      <router-link to="/shipaddressXq"><button type="button" class="blue-btn">保存</button></router-link>
     <!-- <button type="button" class="blue-btn" @click="PhoneNumLen">保存</button> -->
  </div>

</template>

<script>
export default {
  name: 'shippingaddress',
  data () {
    return {
      username:'姓名',
      telphone:'联系电话',
      address:'所在地区',
      detaddress:'详细地址'
      
    }
  },
  methods: {
      PhoneNumLen() {
        alert(1)
            if (this.phoneNum.length > 11) {
                return this.phoneNum = this.phoneNum.substring(0, 11);
            }
      },
  }
}
</script>

<style scoped>
.shipadd-box{
  text-align: left;
}
.profile-box-item{
  border-top:.02rem solid #e5e5e5;
  border-bottom:.02rem solid #e5e5e5;
  background: #fff;
  margin-bottom: .2rem;
}
.profile-box-item li{
    margin-left: .3rem; 
    clear: both;
    overflow: hidden;
    color: #333;
    border-bottom:.02rem solid #e5e5e5;
    font-size: .34rem;
    height: .88rem;
    line-height: .88rem;
}
/* .profile-box-item li:last-child{
    border-bottom: none;
} */
.profile-box-item li span{
    display: inline-block;
    font-size: .34rem;
    width: 1.8rem;
    float: left;
}
.profile-box-item li input{
    font-size: .34rem;
    height: .88rem;
    line-height: .88rem;
    width: 74%;
    float: left;
}
</style>
