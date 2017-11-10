<template>
	<div id="noresule" >
		<div class="noresule-item">
			<img src="../../assets/img/recipe-no.jpg" alt="">
		</div>
	</div>
</template>
<script>
	export default {
		name: 'noresule',
		data () {
		    return {
		        // 无餐单
		        // recipeImg:'../assets/img/default_pic.jpg'
		    }
	},
	methods: {
	    
		}
	}
</script>
<style>
.noresule-item{
	background: #fff;
	padding: .6rem 0 0 0;
}
.noresule-item>img{
	width: 4.99rem;
	height: 2.94rem;
}
</style>