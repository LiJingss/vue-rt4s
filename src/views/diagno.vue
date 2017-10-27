<template>
	<div id="diagno">
		<p>
			<router-link to="/intro"><i class="iconfont icon-jianjie"></i>初诊简介</router-link>
			<router-link to="/hand"><i class="iconfont icon-hand"></i>初诊手诊</router-link>
			<router-link to="/checkup"><i class="iconfont icon-tijianxuzhi"></i>初诊体检</router-link>
			<router-link to="/healthinfo"><i class="iconfont icon-wenjuan"></i>健康资料</router-link>
		</p>
	</div>
</template>

<style>
	#diagno {
		font-size: .38rem;
		background: #fff;
		min-height: 100vh;
		display: flex;
		align-items:center;
	}
	#diagno p {
		width: 100%;
	}
	#diagno p a {
		width: 92%;
		height: 2.1rem;
		line-height: 2rem;
		margin: .4rem auto 0;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content:center;
	}
	#diagno p a i {
		font-size: .6rem;
		margin-right: .15rem;
	}
	#diagno p a:first-child {
		margin-top: 0;
		background: url('../assets/img/diagno_1.png') no-repeat;
		background-size: contain;
	}
	#diagno p a:nth-child(2){
		background: url('../assets/img/diagno_2.png') no-repeat;
		background-size: contain;
	}
	#diagno p a:nth-child(3){
		background: url('../assets/img/diagno_3.png') no-repeat;
		background-size: contain;
	}
	#diagno p a:nth-child(4){
		background: url('../assets/img/diagno_4.png') no-repeat;
		background-size: contain;
	}
</style>