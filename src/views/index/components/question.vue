<template>
    <div class="content_right">
        <div class="header">
            <div class="headiv">
                <span>学科</span>
                <!--                <el-select v-model="seah.subject" placeholder="请选择学科" class="w150">-->
                <!--                    <el-option-->
                <!--                            v-for="item in subjectopt"-->
                <!--                            :key="item.value"-->
                <!--                            :label="item.label"-->
                <!--                            :value="item.value">-->
                <!--                    </el-option>-->
                <!--                </el-select>-->
                <el-select
                        class="w150"
                        v-model="seah.subject"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                    <el-option
                            v-for="item in subjectopt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <span>阶段</span>
                <el-select v-model="seah.step" placeholder="请选择阶段" class="w150">
                    <el-option
                            v-for="item in stepopt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <span>企业</span>
                <!--                <el-select v-model="seah.enterprise" placeholder="请选择企业" class="w150">-->
                <!--                    <el-option-->
                <!--                            v-for="item in enterpriseopt"-->
                <!--                            :key="item.value"-->
                <!--                            :label="item.label"-->
                <!--                            :value="item.value">-->
                <!--                    </el-option>-->
                <!--                </el-select>-->
                <el-select
                        class="w150"
                        v-model="seah.enterprise"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入关键词"
                        :remote-method="entMethod"
                        :loading="loading">
                    <el-option
                            v-for="item in enterpriseopt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <span>题型</span>
                <el-select v-model="seah.type" placeholder="请选择题型" class="w150">
                    <el-option
                            v-for="item in typeopt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="headiv">
                <span>难度</span>
                <el-select v-model="seah.difficulty" placeholder="请选择难度" class="w150">
                    <el-option
                            v-for="item in difficultyopt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <span>作者</span>
                <el-input class="w150" v-model="seah.username"></el-input>
                <span>状态</span>
                <el-select v-model="seah.status" placeholder="请选择状态" class="w150">
                    <el-option
                            v-for="item in statusopt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <span>日期</span>
                <el-date-picker
                        prefix-icon="el"
                        class="w150"
                        change="datefn"
                        :editable="false"
                        popper-class="dateclass"
                        v-model="seah.create_date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                </el-date-picker>
            </div>
            <span>标题</span>
            <el-input class="w388" v-model="seah.title"></el-input>
            <el-button type="primary" @click="ifli2">搜索</el-button>
            <el-button @click="claer">清除</el-button>
            <el-button type="primary" @click="dialogFormVisible=true">
                <i class="el-icon-plus"></i>
                新增试题
            </el-button>
        </div>
        <div class="main">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="题目"
                        width="">
                    <template slot-scope="scope">
                        <div v-html="scope.row.title"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="step"
                        label="学科.阶段"
                        width="">
                    <template slot-scope="scope">
                        {{scope.row.subject_name}}.{{(scope.row.step==1&&'初级')||(scope.row.step==2&&'中级')||(scope.row.step==3&&'高级')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="题型"
                        width="">
                    <template slot-scope="scope">
                        {{(scope.row.step==1&&'单选')||(scope.row.step==2&&'多选')||(scope.row.step==3&&'简答')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="enterprise_name"
                        label="企业"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="创建者"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        width="">
                    <template slot-scope="scope">
                        <el-button
                                v-if="scope.row.status"
                                style="color:rgba(90,93,98,1);font-weight:bold;"
                                type="text"
                                size="small">
                            启用
                        </el-button>

                        <el-button
                                v-else
                                style="color: #FF3D3D;font-weight:bold;"
                                type="text"
                                size="small">
                            禁用
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="reads"
                        label="访问量"
                        width="">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="editbtn(scope.row)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                v-if="!tableData[scope.$index].status"
                                @click.native.prevent="statusfn(scope.$index)"
                                type="text"
                                size="small">
                            启用
                        </el-button>
                        <el-button
                                v-else
                                @click.native.prevent="statusfn(scope.$index)"
                                type="text"
                                size="small">
                            禁用
                        </el-button>
                        <el-button
                                @click.native.prevent="delfn(tableData[scope.$index].id)"
                                type="text"
                                size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class="mypage"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="seah.page"
                    :page-sizes="[5,10, 20, 30, 40]"
                    :page-size="seah.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination">
            </el-pagination>
        </div>
        <quseadd></quseadd>
    </div>
</template>

<script>
	import {delques, infolist, priselist, quesstatus, questioninfo} from '@/api/index.js'
	import quseadd from './quesadd.vue';

	export default {
		name: "question",
		components: {
			quseadd
		},
		data() {
			return {
				tableData: [],
				loading: false,
				subjectopt: [],
				stepopt: [
					{
						value: 1,
						label: '初级'
					}, {
						value: 2,
						label: '中级'
					}, {
						value: 3,
						label: '高级'
					},
				],
				enterpriseopt: [],
				typeopt: [
					{
						value: 1,
						label: '单选'
					}, {
						value: 2,
						label: '多选'
					}, {
						value: 3,
						label: '简答'
					},
				],
				difficultyopt: [
					{
						value: 1,
						label: '简单'
					}, {
						value: 2,
						label: '一般'
					}, {
						value: 3,
						label: '困难'
					},
				],
				statusopt: [
					{
						value: 1,
						label: '启用'
					}, {
						value: 0,
						label: '禁用'
					},
				],
				value: '',
				pagination: 0,
				seah: {
					title: '',
					subject: '',
					enterprise: '',
					type: '',
					step: '',
					username: '',
					status: '',
					difficulty: '',
					create_date: '',
					page: 1,
					limit: 5,
				},
			};
		},
		methods: {
			//搜索获取远程数据
			remoteMethod(name) {
				infolist({
					name,
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
			},
			entMethod(name) {
				priselist({
					name,
					limit: '',
				}).then(msg => {
					if (msg.data.code == 200) {
						// subjectopt
						this.enterpriseopt = msg.data.data.items.map(item => {
							return {value: item.id, label: item.name}
						});
					}
					window.console.log(msg);
				});
			},

			//页码
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.seah.limit = val;
				this.seah.page = 1;
				this.ifli();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.seah.page = val;
				this.ifli();
			},

			//筛选按钮
			ifli2() {
				this.seah.page = 1;
				this.ifli();
			},
			//获取用户列表
			ifli() {
				questioninfo(this.seah).then(data => {
					window.console.log(data);
					this.tableData = data.data.data.items;
				})
			},

			//清除
			claer() {
				this.seah = {
					username: '',
					email: '',
					role_id: '',
				};
			},


			//修改用户状态
			statusfn(index) {
				quesstatus(this.tableData[index].id).then(msg => {
					if (msg.data.code == 200) {
						this.tableData[index].status = +(!(this.tableData[index].status));
						this.$message.success('修改成功');
					} else {
						this.$message.error('修改失败');
					}
				})
			},

			//删除用户
			delfn(id) {
				delques(id).then(msg => {
					if (msg.data.code == 200) {
						if (this.tableData.length == 1) {
							if (this.seah.page != 1) {
								this.seah.page--;
							}
						}
					}
					this.alt(msg.data.code);
				})
			},

			//编辑用户
			// editbtn(row) {
			// 	if (this.editIndex != row.id) {
			// 		this.editform = {...row};
			// 	}
			// 	this.editIndex = row.id;
			// 	this.editVisible = true;
			// 	this.imageUrl = process.env.VUE_APP_URL + '/' + this.editform.avatar;
			// },

			//全局使用的方法
			alt(data) {
				if (data == 200) {
					this.$message.success('修改成功');
					this.ifli();
				} else {
					this.$message.error('修改失败');
				}
			}
		},
		created() {
			this.ifli();
			// priselist({
			// 	limit: ''
			// }).then(msg => {
			// 	window.console.log(msg);
			// })
		}
	}
</script>

<style scoped lang="less">
    .content_right {

        .header {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
            border-radius: 4px;
            margin-bottom: 19px;
            padding: 21px 0 21px 23px;

            .headiv {
                margin-bottom: 24px;
            }

            span {
                font-size: 14px;
                font-weight: bold;
                color: rgba(122, 124, 127, 1);
                margin-right: 30px;
            }

            .w150 {
                width: 150px !important;
                margin-right: 30px;
            }

            .w388 {
                width: 388px !important;
                margin-right: 30px;
            }

            .el-input {
                width: auto;
            }
        }

        .main {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
            border-radius: 4px;
            width: 100%;
            padding: 15px;

            .mypage {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 82px;
            }
        }
    }

</style>
<style lang="less">
    .el-dialog__header {
        background: linear-gradient(to right, #11bfee, #2491e9);
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 87px;
        height: 87px;
        line-height: 87px;
        text-align: center;
    }

    .avatar {
        width: 87px;
        height: 87px;
        display: block;
        margin: 0 auto;
    }

    .el-dialog--center .el-dialog__body {
        padding-bottom: 0 !important;
    }

    .dateclass {
        width: 300px;
    }
</style>