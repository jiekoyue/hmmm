<template>
    <div class="box">
        <router-view></router-view>
    </div>
</template>

<script>
	export default {
		name: "App",
		created() {
			if (localStorage.getItem('token')) {
				this.$router.push('/index');
			} else {
				this.$router.push('/login');
			}
		}
	}
</script>

<style scoped>
    .box {
        height: 100%;
        width: 100%;
    }
</style>