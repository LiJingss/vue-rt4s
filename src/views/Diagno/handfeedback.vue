<template>
	<div id="handfeedback">
		<div v-if="feedback">1</div>
		<p v-else="feedback"><img src="../../assets/img/nofeedback.png" alt=""></p>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				feedback : false
			}
		}
	}
</script>

<style>
	#handfeedback p{
		width: 4rem;
		margin: 0 auto;
	}
	#handfeedback p img {
		width: 100%;
	}
</style>