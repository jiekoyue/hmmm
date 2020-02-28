<template>
    <div class="content_right">
        <div class="header">
            <span>学科编号</span>
            <el-input class="w100" v-model="seah.rid"></el-input>
            <span>学科名称</span>
            <el-input class="w149" v-model="seah.name"></el-input>
            <span>创建者</span>
            <el-input class="w100" v-model="seah.username"></el-input>
            <span>状态</span>
            <el-select v-model="seah.status" placeholder="请选择" class="w149">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="ifli2">搜索</el-button>
            <el-button @click="claer">清除</el-button>
            <el-button type="primary" @click="dialogFormVisible=true">
                <i class="el-icon-plus"></i>
                新增学科
            </el-button>
        </div>
        <div class="main">
            <el-table
                    v-if="tablebol"
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="rid"
                        label="学科编号"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="学科名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="short_name"
                        label="简称"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="创建者"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        label="创建日期"
                        width="210">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        width="130">
                    <template slot-scope="scope">
                        <el-button
                                v-if="tableData[scope.$index].status"
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
                        label="操作"
                        width="">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="editbtn(scope.$index)"
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
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination">
            </el-pagination>
        </div>
        <el-dialog title="新增学科" :visible.sync="dialogFormVisible" center width="600px">
            <el-form :model="form" ref="addform" :rules="rules">
                <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
                    <el-input v-model="form.rid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
                    <el-input v-model="form.short_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
                    <el-input v-model="form.intro" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="offform">取 消</el-button>
                <el-button type="primary" @click="affirm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑学科" :visible.sync="editVisible" center width="600px">
            <el-form :model="editform" ref="addform" :rules="rules">
                <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
                    <el-input v-model="editform.rid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="editform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
                    <el-input v-model="editform.short_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
                    <el-input v-model="editform.intro" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
                    <el-input v-model="editform.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible=false">取 消</el-button>
                <el-button type="primary" @click="editfn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
	import {addsubject, amend, delsub, editsub, infolist} from '@/api/index.js';

	export default {
		name: "subjectList",
		data() {
			return {
				tableData: [],
				options: [
					{
						value: 1,
						label: '启用'
					}, {
						value: 0,
						label: '禁用'
					}],
				value: '',
				pagination: 0,
				seah: {
					rid: '',
					name: '',
					username: '',
					status: '',
					page: 1,
					limit: '',
				},
				dialogFormVisible: false,
				form: {
					name: '',
					rid: '',
					short_name: '',
					intro: '',
					remark: '',
				},
				rules: {
					rid: [
						{required: true, message: '请输入学科编号', trigger: 'blur'},
					],
					name: [
						{required: true, message: '请输入学科名称', trigger: 'blur'},
					],
				},
				formLabelWidth: '120px',
				editVisible: false,
				editform: {},
				editIndex: '',
				tablebol: true,
			};
		},
		methods: {
			//页吗
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
			//获取学科列表
			ifli() {
				infolist(this.seah).then(msg => {
					window.console.log(msg);
					if (msg.data.code == 200) {
						this.tableData = msg.data.data.items;
						this.pagination = msg.data.data.pagination.total;
					}
				})
			},

			//清除
			claer() {
				this.seah = {
					rid: '',
					name: '',
					username: '',
					status: '',
				};
			},

			//确认
			affirm() {
				this.$refs.addform.validate((valid) => {
					if (valid) {
						addsubject(this.form).then(msg => {
							if (msg.data.code == 200) {
								this.ifli();
								this.$message.success('添加成功');
								this.dialogFormVisible = false;
							} else {
								this.$message.error(msg.data.message)
							}
						});
					}
				});
			},

			//取消
			offform() {
				this.dialogFormVisible = false;
				window.console.log(this.$refs.addform);
				this.$refs.addform.resetFields();
			},

			//修改学科状态
			statusfn(index) {
				amend(this.tableData[index].id).then(msg => {
					if (msg.data.code == 200) {
						this.tableData[index].status = +(!(this.tableData[index].status));
						this.$message.success('修改成功');
					} else {
						this.$message.error('修改失败');
					}
				})
			},

			//删除学科
			delfn(id) {
				delsub(id).then(msg => {
					this.alt(msg.data.code);
				})
			},

			//编辑学科
			editbtn(index) {
				if (this.editIndex != index) {
					this.editform = {...this.tableData[index]};
				}
				this.editIndex = index;
				this.editVisible = true;
			},
			editfn() {
				window.console.log(1);
				editsub(this.editform).then(msg => {
					window.console.log(msg);
					// this.alt(msg.data.code);
					if (msg.data.code == 200) {
						this.tablebol = false;
						this.tableData[this.editIndex] = {...this.editform};
						this.$nextTick(() => {
							this.tablebol = true;
						});
						this.editVisible = false;
						this.$message.success('编辑成功');
					} else {
						this.$message.error(msg.data.message);
					}

				});
			},
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
		}
	}
</script>

<style scoped lang="less">
    .content_right {

        .header {
            height: 103px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
            border-radius: 4px;
            margin-bottom: 19px;
            padding: 21px 0 0 23px;

            span {
                font-size: 14px;
                font-weight: bold;
                color: rgba(122, 124, 127, 1);
                margin-right: 11px;
            }

            .w149 {
                width: 149px !important;
                margin-right: 11px;
            }

            .w100 {
                width: 100px !important;
                margin-right: 11px;
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
</style>