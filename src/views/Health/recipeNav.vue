<template>
	<div id="recipeNav">
		<v-logo></v-logo>
		<nav>
			<button v-for="(value,index) in links" @click="goRoute(index,value.router,value.query)" :class="{'on':bg==index}">{{ value.name }}</button>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				http:localStorage.http,
				'bg': 0,
				links: [
					{
						name: '餐单说明',
						router: '/recipeNav/recipeDes',
						query:{
							health_id:this.$route.query.health_id,
							cycle_id:this.$route.query.cycle_id
						}
					},
					{
						name:'健康餐单',
						router: '/recipeNav/recipe',
						query:{
							health_id:this.$route.query.health_id,
							cycle_id:this.$route.query.cycle_id
						}
					}
				]
			}
		},
		mounted() {
//			alert(this.$route.query.health_id)
			var url = window.location.href.split('/#/')[1].split('/')[1].split('?')[0];
			if(url.indexOf() == 'recipeDes'){
				this.bg = 0
			}else if(url == 'recipe') {
				this.bg = 1
			}
		},
		methods: {
			goRoute(index,path,query){
				this.$router.push({path:path,query:{health_id:query.health_id,cycle_id:query.cycle_id}})
				this.bg = index
			}
		}
	}
</script>

<style>
	#recipeNav {
		min-height: 100vh;
	}
	#recipeNav nav{
		background: #fff;
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
