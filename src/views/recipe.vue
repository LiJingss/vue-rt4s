<template>
  <div id="recipe" class="recipe-box">
      <ul class="recipe-box-item">
            <li><span>餐单日期</span><em>2017-10-30——2017-10-31</em><i class="iconfont icon-enter"></i></li>
            <li><span>蛋白日（1-3）</span><i class="iconfont icon-enter"></i></li>
            <li><span>常规日（4-6）</span><i class="iconfont icon-enter"></i></li>
    </ul>
    <!-- 无餐单 -->
    <div class="noresule-item">
            <img src="../assets/img/recipe-no.jpg" alt="">
    </div>
  </div>
</template>
<script>
export default {
    name: 'recipe',
    data () {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
<style>
.recipe-box-item{
    text-align: left;
}
#recipe .recipe-box-item>li{
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
#recipe .recipe-box-item>li>span{
    margin-right: .6rem;
}
#recipe .recipe-box-item>li>i{
    float: right;
    font-size: .42rem;
    margin-top: .2rem;
    color: #c7c7cc;
    font-weight: bold;
}
.noresule-item{
    background: #fff;
    padding: .6rem 0 0 0;
}
.noresule-item>img{
    width: 4.99rem;
    height: 2.94rem;
}
</style>
