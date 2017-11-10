<template>
    <div id="trainer" class="trainer-box">
        <dl class="trainer-box-item">
            <dt><img src="../../assets/img/default_pic.jpg" alt=""></dt>
            <dd>
                <span>李小四</span>
                <a class="iconfont icon-dianhua" href="tel://13654152224"></a>
            </dd>
        </dl>
        <div class="introduce">
            <h2 class="tainter_title">自我介绍</h2>
            <p>
                本人性格内外结合,适应能力强，为人诚实，有良好的人际交往能力，具备相关的专业知识和认真。细心、耐心的工作态度及良好的职业道德修养。相信团体精神的我对工作认真负责，总希望能把事情做得更好! 性格开朗，对文字语言和数字敏感，对生活充满希望，对工作充满热情! 能在短期间内适应新环境，有强烈的品质意识;对工作认真负责，上进心强! 懂电脑基本操作，熟练小键盘操作!
            </p>
        </div>  
        <div class=" appraise">
            <h2 class="tainter_title">TA的评价<router-link to="/trainerAppraise"><span class="fr">去评价</span></router-link></h2>
            <dl>
                <dt><img src="../../assets/img/default_pic.jpg" alt=""></dt>
                <dd>
                    <span>13718517583</span> 
                    <div>
                       <em class="iconfont icon-wujiaoxing"></em>
                       <em class="iconfont icon-wujiaoxing"></em>
                       <em class="iconfont icon-wujiaoxing"></em>
                       <em class="iconfont icon-wujiaoxing"></em>
                       <em class="iconfont icon-wujiaoxing"></em>
                    </div>
                    <p>本人性格内外结合,适应能力强，为人诚实，有良好的人际交往能力，具备相关的专业知识和认真。</p>
                </dd>
            </dl>
            <dl>
                <dt><img src="../../assets/img/default_pic.jpg" alt=""></dt>
                <dd>
                    <span>13718517583</span> 
                    <div>
                        <em class="iconfont icon-wujiaoxing"></em>
                        <em class="iconfont icon-wujiaoxing"></em>
                        <em class="iconfont icon-wujiaoxing"></em>
                        <em class="iconfont icon-wujiaoxing"></em>
                        <em class="iconfont icon-wujiaoxing"></em>
                    </div>
                    <p>本人性格内外结合,适应能力强，为人诚实，有良好的人际交往能力，具备相关的专业知识和认真。</p>
                </dd>
            </dl>
        </div>  
        <!-- 无教练 no-trainer.jpg-->
        <div class="noresule-item">
            <img src="../../assets/img/no-trainer.jpg" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: 'trainer',
    data () {
        return {
            // Protein:'蛋白日'
        }
    },
    methods: {
        
    }
}
</script>
<style>
#trainer{
    margin-top: .2rem;
}
#trainer>.trainer-box-item{
    background: #fff;
    border-top: .01rem solid #e5e5e5;
    border-bottom: .01rem solid #e5e5e5;
    clear: both;
    overflow: hidden;
    padding: .2rem .3rem;
}
#trainer>.trainer-box-item dt,#trainer>.trainer-box-item dt img{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    float: left;
}
#trainer>.trainer-box-item dd{
    height: .6rem;
    line-height: .6rem;
    float: left;
    margin-top: .42rem;
    width: 70%;
}
#trainer>.trainer-box-item dd span{
    font-size: .38rem;
    float: left;
    margin-top: .04rem;
    margin-left: .2rem;
}
#trainer>.trainer-box-item dd a{
    float: right;
    font-size: .7rem;
    color: #47cce2;
    font-weight: bold;
}
#trainer .tainter_title{
    font-size: .32rem;
    border-bottom: .01rem solid #e5e5e5;
    padding: .3rem 0;
    padding-right: .3rem;
}
#trainer .introduce{
    margin-top: .2rem;
    border-top: .01rem solid #e5e5e5;
    border-bottom: .01rem solid #e5e5e5;
    background: #fff;
    text-align: left;
    padding: 0 .3rem ;
}
#trainer .appraise{
    margin-top: .2rem;
    border-top: .01rem solid #e5e5e5;
    border-bottom: .01rem solid #e5e5e5;
    background: #fff;
    text-align: left;
    padding: 0 0 0 .3rem ;
}
#trainer .introduce>p{
    /* text-indent: 2em; */
    font-size: .28rem;
    line-height: .46rem;
    color: #b2b2b2;
    padding:.2rem 0;
}
#trainer .tainter_title span{
    color: #47cce2;
}
#trainer .appraise>dl{
    clear: both;
    overflow: hidden;
    margin-top: .2rem;
    
}
#trainer .appraise>dl>dt,#trainer .appraise>dl>dt>img{
    width: .8rem;
    height: .8rem;
    float: left;
    border-radius: 50%;
}
#trainer .appraise>dl>dd{
    width: 86%;
    float: left;
    margin-left: .2rem;
    font-size: .26rem;
   border-bottom: .01rem solid #e5e5e5;
}
#trainer .appraise>dl:last-child>dd{
    border-bottom: none;
}
#trainer .appraise>dl>dd>div{
     margin-top: .1rem;
}
#trainer .appraise>dl>dd>p{
    font-size: .26rem;
    margin-bottom: .3rem;
    margin-top: .1rem;
    padding-right: .3rem;
}
#trainer .appraise>dl>dd em{
    color: #f9952e;
}
#trainer .noresule-item{
    background: #fff;
    padding: 1.75rem 0 0 0;
}
#trainer .noresule-item>img{
    width: 3.01rem;
    height: 3.88rem;
}
</style>
