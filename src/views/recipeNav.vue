<template>
	<div id="recipeNav">
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
						name: '餐单说明',
						router: '/recipeNav/recipeDes'
					},
					{
						name:'健康餐单',
						router: '/recipeNav/recipe'
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
	#recipeNav {
		background: #fff;
		min-height: 100vh;
	}
	#recipeNav nav{
		height: .89rem;
		border-bottom: .01rem solid #e5e5e5;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	#recipeNav nav button {
		height: .87rem;
		font-size: .3rem;
		padding: 0 .1rem;
		color: #999;
		border-bottom: .04rem solid #fff;
	}
	#recipeNav nav button.on {
		color: #47cce2;
		border-bottom: .04rem solid #47cce2;
	}
	#recipeNav nav button:last-child {
		margin-left: .5rem;
	}
</style>
