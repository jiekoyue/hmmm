<template>
    <div>
        <div ref="fwb1" class="toolbar">
        </div>
        <div ref="fwb2" class="con">

        </div>
    </div>
</template>

<script>
	import wangEditor from 'wangeditor';

	export default {
		name: "fuwenben",
		props: {
			value: {
				type: String
			}
		},
		data() {
			return {
				txt: this.value,
				febk: '',
			};
		},
		mounted() {
			this.febk = new wangEditor(this.$refs.fwb1, this.$refs.fwb2);
			this.febk.customConfig.onchange = html => {
				// html 即变化之后的内容
				this.$emit('input', html);
			};
			this.febk.create();
		},
		watch: {
			value(val) {
				this.febk.txt.html(val);
			}
		}
	}
</script>

<style scoped>
    .toolbar {
        border: 1px solid #ccc;
        width: 835px;
        height: 50px;
    }

    .con {
        border: 1px solid #ccc;
        width: 835px;
        height: 60px;
    }
</style>