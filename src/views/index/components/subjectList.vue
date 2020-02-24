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
            <el-button type="primary" @click="ifli">搜索</el-button>
            <el-button @click="claer">清除</el-button>
            <el-button type="primary" @click="dialogFormVisible=true">
                <i class="el-icon-plus"></i>
                新增学科
            </el-button>
        </div>
        <div class="main" v-if="tableData&&pagination">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="user_id"
                        label="序号"
                        width="60">
                </el-table-column>
                <el-table-column
                        fixed
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
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="text"
                                size="small">
                            启用
                        </el-button>

                        <el-button
                                v-else
                                style="color: #FF3D3D;font-weight:bold;"
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
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
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                v-if="!tableData[scope.$index].status"
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="text"
                                size="small">
                            启用
                        </el-button>
                        <el-button
                                v-else
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="text"
                                size="small">
                            禁用
                        </el-button>
                        <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
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
                    :total="pagination">
            </el-pagination>
        </div>
        <el-dialog title="学科新增" :visible.sync="dialogFormVisible" center width="600px">
            <el-form :model="form" ref="addform">
                <el-form-item label="学科编号" :label-width="formLabelWidth">
                    <el-input v-model="form.rid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科简称" :label-width="formLabelWidth">
                    <el-input v-model="form.short_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科简介" :label-width="formLabelWidth">
                    <el-input v-model="form.intro" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="offform">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
	import {infolist} from '@/api/index.js';

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
				currentPage4: 1,
				value: '',
				pagination: '',
				seah: {
					rid: '',
					name: '',
					username: '',
					status: '',
				},
				dialogFormVisible: false,
				form: {
					name: '',
					rid: '',
					short_name: '',
					intro: '',
					remark: '',
				},
				formLabelWidth: '120px',
			};
		},
		methods: {
			//页吗
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.ifli(val);
			},
			//获取学科列表
			ifli(page) {
				infolist({
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
					rid: '',
					name: '',
					username: '',
					status: '',
				};
			},

			//取消
			offform() {
				this.dialogFormVisible = false;
				this.$refs.addform.resetFields();
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