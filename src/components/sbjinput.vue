<template>
    <!--    <el-select-->
    <!--            class="w150"-->
    <!--            v-model="seah.subject"-->
    <!--            filterable-->
    <!--            remote-->
    <!--            reserve-keyword-->
    <!--            placeholder="请输入关键词"-->
    <!--            :remote-method="remoteMethod"-->
    <!--            :loading="loading">-->
    <!--        <el-option-->
    <!--                v-for="item in subjectopt"-->
    <!--                :key="item.value"-->
    <!--                :label="item.label"-->
    <!--                :value="item.value">-->
    <!--        </el-option>-->
    <!--    </el-select>-->
    <el-select v-model="subject" placeholder="请选择学科" class="w150">
        <el-option
                v-for="item in subjectopt"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
	import {infolist} from '@/api/index.js'

	export default {
		name: "sbjinput",
		props: {
			value: {
				default: ''
			}
		},
		data() {
			return {
				subject: this.value,
				subjectopt: [],
			}
		},
		watch: {
			'subject': function () {
				this.$emit('input', this.subject);
			},
			value(val) {
				this.subject = val;
			}
		},
		created() {
			infolist({
				limit: '',
			}).then(msg => {
				if (msg.data.code == 200) {
					// subjectopt
					this.subjectopt = msg.data.data.items.map(item => {
						return {value: item.id, label: item.name}
					});
				}
				window.console.log(msg);
			});
		}
	}
</script>

<style scoped>

</style>