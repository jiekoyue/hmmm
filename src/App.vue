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

<style>
    @import "./assets/css/base.css";

    .box {
        width: 100%;
        height: 100%;
        background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
    }
</style>