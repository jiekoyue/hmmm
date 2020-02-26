<template>
    <div class="content_right">
        <div class="header">
            <span>用户名称</span>
            <el-input class="w100" v-model="seah.username"></el-input>
            <span>用户邮箱</span>
            <el-input class="w149" v-model="seah.email"></el-input>
            <span>角色</span>
            <el-select v-model="seah.role_id" placeholder="请选择" class="w149">
                <el-option
                        v-for="item in useropt"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="ifli">搜索</el-button>
            <el-button @click="claer">清除</el-button>
            <el-button type="primary" @click="dialogFormVisible=true">
                <i class="el-icon-plus"></i>
                新增用户
            </el-button>
        </div>
        <div class="main">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        fixed
                        type="index"
                        label="序号"
                        width="60">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="username"
                        label="用户名"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        width="210">
                </el-table-column>
                <el-table-column
                        prop="role_id"
                        label="角色"
                        :formatter="stateFormat"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注"
                        width="">
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
                                @click.native.prevent="statusfn(tableData[scope.$index].id)"
                                type="text"
                                size="small">
                            启用
                        </el-button>
                        <el-button
                                v-else
                                @click.native.prevent="statusfn(tableData[scope.$index].id)"
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
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination||0">
            </el-pagination>
        </div>
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible" center width="477px">
            <el-form :model="form" ref="addform" :rules="rules">
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
                    <el-select v-model="form.role_id" placeholder="请选择角色">
                        <el-option label="超级管理员" :value="1"></el-option>
                        <el-option label="管理员" :value="2"></el-option>
                        <el-option label="老师" :value="3"></el-option>
                        <el-option label="学生" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                    <el-select v-model="form.status" placeholder="请选择状态">
                        <el-option label="禁用" value="0"></el-option>
                        <el-option label="启用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="offform">取 消</el-button>
                <el-button type="primary" @click="affirm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑用户" :visible.sync="editVisible" center width="477px">
            <el-form :model="editform" ref="addform" :rules="rules">
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="editform.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="editform.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="editform.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
                    <el-select v-model="editform.role_id" placeholder="请选择角色">
                        <el-option label="超级管理员" :value="1"></el-option>
                        <el-option label="管理员" :value="2"></el-option>
                        <el-option label="老师" :value="3"></el-option>
                        <el-option label="学生" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                    <el-select v-model="editform.status" placeholder="请选择状态">
                        <el-option label="禁用" :value="0"></el-option>
                        <el-option label="启用" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
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
	import {adduser, deluser, userinfo, userstatus,} from '@/api/index.js';

	export default {
		name: "user",
		data() {
			return {
				tableData: [],
				useropt: [
					{
						value: 1,
						label: '超级管理员'
					}, {
						value: 2,
						label: '管理员'
					}, {
						value: 3,
						label: '老师'
					}, {
						value: 4,
						label: '学生'
					}
				],
				currentPage4: 1,
				value: '',
				pagination: '',
				seah: {
					username: '',
					email: '',
					role_id: '',
				},
				dialogFormVisible: false,
				form: {
					username: '',
					email: '',
					phone: '',
					role_id: '',
					status: '',
					remark: '',
				},
				rules: {
					username: [
						{required: true, message: '不能为空', trigger: 'blur'},
					],
					email: [
						{required: true, message: '不能为空', trigger: 'blur'},
						{
							pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
							message: '请输入正确的邮箱地址',
							trigger: 'change'
						},
					],
					phone: [
						{required: true, message: '不能为空', trigger: 'blur'},
						{
							pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
							message: '请输入正确的手机号', trigger: 'change'
						}
					],
					role_id: [
						{required: true, message: '不能为空', trigger: 'blur'},
					],
				},
				formLabelWidth: '101px',
				editVisible: false,
				editform: {}
			};
		},
		methods: {
			//表格筛选
			stateFormat(row) {
				return (row.role_id === 1 && "超级管理员") ||
					(row.role_id === 2 && "管理员") ||
					(row.role_id === 3 && "老师") || '学生';
			},
			//页码
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.ifli(val);
			},

			//获取用户列表
			ifli(page) {
				userinfo({
					page,
					...this.seah
				}).then(msg => {
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
					username: '',
					email: '',
					role_id: '',
				};
			},

			//确认
			affirm() {
				this.$refs.addform.validate((valid) => {
					if (valid) {
						adduser(this.form).then(msg => {
							if (msg.data.code == 200) {
								this.ifli(1);
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

			//修改用户状态
			statusfn(id) {
				userstatus(id).then(msg => {
					this.alt(msg.data.code);
				})
			},

			//删除用户
			delfn(id) {
				deluser(id).then(msg => {
					this.alt(msg.data.code);
				})
			},

			//编辑用户
			editbtn(index) {
				this.editform = {...this.tableData[index]};
				this.editVisible = true;
			},
			editfn() {
				// editsub(this.editform).then(msg => {
				// 	window.console.log(msg);
				// 	this.alt(msg.data.code);
				// 	if (msg.data.code == 200) {
				// 		this.editVisible = false;
				// 	}
				// });
			},
			//全局使用的方法
			alt(data) {
				if (data == 200) {
					this.$message.success('修改成功');
					this.ifli(1);
				} else {
					this.$message.error('修改失败');
				}
			}
		},
		created() {
			this.ifli(1);
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