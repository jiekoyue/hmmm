<template>
    <div style="height: 100%; display: flex;
    flex-direction: column;">
        <el-card class="box-card">
            <div class="radiusdiv">
                <span>{{myData.increment_users}}</span>
                <p>今日新增用户</p>
            </div>
            <div class="radiusdiv">
                <span>{{myData.total_users}}</span>
                <p>总用户量</p>
            </div>
            <div class="radiusdiv2">
                <span>{{myData.increment_questions}}</span>
                <p>新增试题</p>
            </div>
            <div class="radiusdiv2">
                <span>{{myData.total_questions}}</span>
                <p>总试题量</p>
            </div>
            <div class="radiusdiv3">
                <span>{{myData.total_done_questions}}</span>
                <p>总刷题量</p>
            </div>
            <div class="radiusdiv3">
                <span>{{myData.personal_questions}}</span>
                <p>人均刷题量</p>
            </div>
        </el-card>
        <el-card class="box-card">
            <div ref="echs" class="chers">

            </div>
        </el-card>
    </div>
</template>

<script>
	import echarts from 'echarts';
	import 'echarts/lib/echarts';
	import 'echarts/lib/chart/pie'
	import 'echarts/lib/component/tooltip'
	import 'echarts/lib/component/title'
	import {dataSta, dataTitle, hotCities} from '@/api/index.js';

	export default {
		name: "chart",
		data() {
			return {
				myChart: '',
				myData: {
					total_done_questions: '',
					personal_questions: '',
					total_users: '',
					increment_users: '',
					increment_questions: '',
					total_questions: '',
				},
				seriesData: '',
				legendData: '',
			};
		},
		methods: {
			charfn() {
				this.myChart = echarts.init(this.$refs.echs);
				this.myChart.setOption({
					title: {
						text: '整体数据',
						left: 55,
						top: 34,
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						right: 10,
						data: this.legendData
					},
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: ['50%', '80%'],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '30',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: this.seriesData
						}
					]
				});
			}
		},
		created() {
			dataTitle().then(msg => {
				if (msg.data.code == 200) {
					this.myData = msg.data.data;
				}
			});
			dataSta().then(msg => {
				window.console.log(msg);
			});

		},
		mounted() {
			hotCities().then(msg => {
				this.seriesData = msg.data.data.map(item => {
					return {value: item.hotNumber, name: item.name}
				});
				this.legendData = msg.data.data.map(item => {
					return item.name
				});
				this.charfn();
			});
		}
	}
</script>

<style scoped lang="less">
    .box-card:nth-child(1) {
        padding-bottom: 50px;
    }

    .box-card + .box-card {
        margin-top: 13px;
        width: 100%;
        height: 100%;
    }

    .radiusdiv {
        width: 99px;
        height: 99px;
        border: 2px solid rgba(0, 134, 250, 1);
        border-radius: 50%;
        display: flex;
        font-size: 35px;
        justify-content: center;
        align-items: center;
        color: rgba(0, 134, 250, 1);
        position: relative;

        p {
            width: inherit;
            text-align: center;
            position: absolute;
            bottom: -20px;
            height: 17px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(115, 115, 115, 1);
        }
    }

    .radiusdiv2 {
        width: 99px;
        height: 99px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 35px;
        border: 2px solid rgba(247, 97, 55, 1);;
        border-radius: 50%;
        color: rgba(247, 97, 55, 1);
        position: relative;

        p {
            width: inherit;
            text-align: center;
            position: absolute;
            bottom: -20px;
            height: 17px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(115, 115, 115, 1);
        }
    }

    .radiusdiv3 {
        width: 99px;
        height: 99px;
        border: 2px solid rgba(85, 205, 120, 1);
        border-radius: 50%;
        font-size: 35px;
        color: rgba(85, 205, 120, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        p {
            width: inherit;
            text-align: center;
            position: absolute;
            bottom: -20px;
            height: 17px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(115, 115, 115, 1);
        }
    }

    .chers {
        height: 100%;
        width: 80%;
        margin-right: 20%;
    }

</style>
<style>
    .el-card__body {
        display: flex;
        justify-content: space-around;
    }

    .el-card__body {
        padding: 10px !important;
    }

    .el-card__body {
        height: 100%;
    }
</style>
