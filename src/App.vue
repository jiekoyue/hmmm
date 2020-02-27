<template>
    <div class="box">
        <!--        <p @click="add">{{$store.state.userName}}</p>-->
        <router-view></router-view>
    </div>
</template>

<script>
	export default {
		name: "App",
		// methods: {
		// 	add() {
		// 		// this.$store.commit('increment')
		// 	}
		// }
	}
</script>

<style scoped>
    .box {
        height: 100%;
        width: 100%;
    }
</style>