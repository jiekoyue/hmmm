<template>
    <div class="box">
        <router-view></router-view>
    </div>
</template>

<script>
	export default {
		name: "App",
	}
</script>

<style scoped>
    .box {
        height: 100%;
        width: 100%;
    }
</style>