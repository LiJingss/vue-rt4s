<template>
  <div id="recipeDes" class="recipe-box">          
      <div class="recipe-text-box">
          <p>恭喜您选择了健康长寿理念和实践!让我们共同开始了一段拥抱健康的旅程。接下来我们将共同经历：调理期+3～12个月的终身维持期。</p>
         <p>健康长寿理念和实践的最终意义是学习一种健康的生活方式。达到真正意义上的长寿健康。</p>
         <p>您要认真执行此调理方案的原则要求，这对您自身健康意义非常重大。</p>
         <p>适当运动，保证达到两次后背发热。</p>
         <p>适当饮水（除碳酸饮料不喝）淡茶水、白开水、矿泉水都可以喝。除冲餐包外再喝2500毫升水，慢慢喝水。</p>
         <p>熟悉食物秤的使用（因为您需要按量进食物）。每餐的分量很重要，都是根据您的实际情况制定的，执行得越严格，效果越明显。</p>
         <p>从调理的第二天早起须验尿（取纸杯或塑料杯或玻璃杯，接早起第一次尿的中间段，用您手中的试纸在尿中湿透，时间约2秒，取出后4-5秒和数值对比，自己做好记录的同时报告您的“健康教练）。</p>
         <h2>关于做菜的参考提示：</h2>
         <p> ① 要求所有食用蔬菜优先选择生吃（凉拌），其次清炒、清蒸，不用焖煮和油炸。</p>
         <p> ② 10毫升优质亚麻籽油或橄榄油可以用于凉拌、清炒，也可以直接服用。</p>
          <p> ③ 烹调中可以使用盐、生抽、辣椒、醋、芥茉、生姜、大蒜调料。不可使用油类、黄豆酱、糖、酒类、味精、芝麻酱等调料。</p>       
        <h2>调理期的调整反映</h2>
        <p>在强化调理的过程中大部分人会出现“调整反应”，这是调理方法对症见效的正常好转反应，完全健康的人不会出现调整反应。正常出现的心慌（心脏、神经）、头晕（气血）、胸闷（心肺）、头疼（缺血、神经）、关节疼（寒湿）、恶心（肝）、腰疼或尿频（肾）、困乏（脑神经）、皮肤痒（肺）等问题，正是身体隐藏某些问题或疾病的针对性反应。一般一周左右会自然缓解，之后会身体轻松、精力充沛、康复加速。</p>
        <p>在调理期间，黄尿是正常现象。<br>随时与您的健康教练联系：如果出现饥饿、低血糖、便秘等情况，或您打破了餐单，或您有应酬，或任何的疑问随时通过电话或短信与您的健康教练联系。</p>
      </div>
      <!--  <router-link to="/shipaddressXq"><button type="button" class="blue-btn" @click="postData">确定</button></router-link> -->
     
  </div>

</template>

<script>
export default {
        data (){
            return {
               
            }
        },
        methods: {
            
        }
    }
</script>

<style scoped>
.recipe-box{
    background: #fff;
}
.recipe-box-item{
    clear: both;
    overflow: hidden;
    text-align: center;
    height: .89rem;
    border-bottom: .01rem solid #ccc;
    line-height: .89rem;  
}
.recipe-box-item span{ 
    /* float: left; */
    font-size: .3rem;
    color: #47cce2;
    display: inline-block;
    height: .89rem;
    line-height: .89rem
}
.recipe-text-box{
    padding:0 .3rem .4rem .3rem;
    margin-top: .36rem;  
}
.recipe-text-box p{
    text-indent: 2em;
    text-align: left;
    color: #b2b2b2;
    font-size: .28rem;
    line-height: .4rem;
}
.recipe-text-box h2{
    font-size: .32rem;
    color: #47cce2;
    text-align: left;
    margin-top: .46rem;
    font-weight: normal;
}
</style>
