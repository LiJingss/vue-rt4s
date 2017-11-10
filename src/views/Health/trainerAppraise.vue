<template>
  <div id="trainerAppraise" class="trainerAppraise-box">
        <div class="trainerAppraise-item">
            <div class="tainter_title">
            <h2 class="fl">服务态度</h2> 
            <div class="fl">
               <em class="iconfont icon-wujiaoxing"></em>
               <em class="iconfont icon-wujiaoxing"></em>
               <em class="iconfont icon-wujiaoxing"></em>
               <em class="iconfont icon-wujiaoxing"></em>
               <em class="iconfont icon-wujiaoxing"></em>
            </div>
        </div>
        <textarea value="请对你的教练做评价"></textarea>
        </div>
        
        <button type="button" class="blue-btn">提交</button>
  </div>
</template>
<script>
export default {
    name: 'trainer',
    data () {
        return {
           
        }
    },
    methods: {
        
    }
}
</script>
<style>
#trainerAppraise .trainerAppraise-item{
    margin-top: .2rem;
    text-align: left;
    background: #fff;
    padding: 0 0 0 .3rem;
    border-bottom: .01rem solid #e5e5e5;
    border-top: .01rem solid #e5e5e5;
    font-size: .32rem;
}
#trainerAppraise .tainter_title{
    font-size: .32rem;
    border-bottom: .01rem solid #e5e5e5;
    padding: .3rem 0;
    padding-right: .3rem;
    clear: both;
    overflow: hidden;
}
#trainerAppraise .tainter_title>div{
    margin-left: .2rem;
}
#trainerAppraise .tainter_title>div>em{
    display: inline-block;
    margin-left: .34rem;
    color: #b2b2b2;
}
#trainerAppraise textarea{
    width: 100%;
    height: 3rem;
    resize: none;
    padding: .24rem 0rem;
}
#trainerAppraise .blue-btn{
    margin-top: .2rem;
}
</style>
