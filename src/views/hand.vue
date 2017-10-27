<template>
	<div id="hand">
		<nav>
			<button v-for="(value,index) in links" @click="goRoute(index,value.router)" :class="{'on':bg==index}">{{ value.name }}</button>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				'bg': 0,
				links: [
					{
						name: '手诊提交',
						router: '/hand/handdiagnosis'
					},
					{
						name:'手诊反馈',
						router: '/hand/handfeedback'
					}
				]
			}
		},
		methods: {
			goRoute(index,path){
				this.$router.push(path)
				this.bg = index
			}
		}
	}
</script>

<style>
	#hand {
		background: #fff;
		min-height: 100vh;
	}
	#hand nav{
		height: .89rem;
		border-bottom: .01rem solid #e5e5e5;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	#hand nav button {
		height: .87rem;
		font-size: .3rem;
		padding: 0 .1rem;
		color: #999;
		border-bottom: .04rem solid #fff;
	}
	#hand nav button.on {
		color: #47cce2;
		border-bottom: .04rem solid #47cce2;
	}
	#hand nav button:last-child {
		margin-left: .5rem;
	}
</style>
