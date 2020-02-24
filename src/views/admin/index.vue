<template>
    <div class="indexbox" style="background: #E8E9EC;width: 100%;height: 100%;">
        <nav>
            <div class="left">
                <i class="el-icon-s-fold" v-if="!isCollapse" @click="isCollapse=!isCollapse"></i>
                <i class="el-icon-s-unfold" v-if="isCollapse" @click="isCollapse=!isCollapse"></i>
                <img class="logoimg" src="./imgs/index_logo.png" alt="">
                <p>黑马面面</p>
            </div>
            <div class="right">
                <img class="useimg" :src="avater" alt="">
                <p>{{username}}</p>
                <el-button type="primary" class="exit_btn">退出</el-button>
            </div>
        </nav>
        <div class="content">
            <div class="content_left">
                <el-menu default-active="1-4-1"
                         class="el-menu-vertical-demo"
                         @open="handleOpen"
                         @close="handleClose"
                         :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">导航一</span>
                        </template>

                        <el-submenu index="1-4">
                            <span slot="title">选项4</span>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="content_right">
                <div class="header">
                    <span>学科编号</span>
                    <el-input class="w100"></el-input>
                    <span>学科名称</span>
                    <el-input class="w149"></el-input>
                    <span>创建者</span>
                    <el-input class="w100"></el-input>
                    <span>状态</span>
                    <el-select v-model="value" placeholder="请选择" class="w149">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary">搜索</el-button>
                    <el-button>清除</el-button>
                    <el-button type="primary">
                        <i class="el-icon-plus"></i>
                        新增学科
                    </el-button>
                </div>
                <div class="main">
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                fixed
                                prop="status"
                                label="序号"
                                width="">
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
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="short_name"
                                label="简称"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="creater"
                                label="创建者"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="create_time"
                                label="创建日期"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="remark"
                                label="状态"
                                width="">
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
                                        @click.native.prevent="deleteRow(scope.$index, tableData)"
                                        type="text"
                                        size="small">
                                    启用
                                </el-button>
                                <el-button
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				avater: '',
				username: '',
				isCollapse: false,
				tableData: [
					{
						create_time: "2019-11-08 00:53:30",
						creater: "刘洋洋",
						id: 11,
						intro: "简介",
						is_del: 0,
						name: "前端与移动开发",
						remark: "备注",
						rid: "QD001",
						short_name: "前端",
						status: 1,
						update_time: "2019-11-21 11:52:22",
					}, {
						create_time: "2019-11-08 00:53:30",
						creater: "刘洋洋",
						id: 11,
						intro: "简介",
						is_del: 0,
						name: "前端与移动开发",
						remark: "备注",
						rid: "QD001",
						short_name: "前端",
						status: 1,
						update_time: "2019-11-21 11:52:22",
					},],
				options: [
					{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}],
				value: ''
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			}
		},
		created() {
			// let token = localStorage.getItem('token');
			this.$axios({
				url: 'info',
				withCredentials: true
			}).then(msg => {
				window.console.log(msg);
				this.username = msg.data.data.username;
				this.avater = process.env.VUE_APP_URL + '/' + msg.data.data.avatar;
			});
		}
	}
</script>

<style scoped lang="less">
    .indexbox {
        display: flex;
        flex-direction: column;
    }

    nav {
        width: 100%;
        height: 60px;
        background: #fff;
        box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);

        .left {
            float: left;
            height: 100%;
            display: flex;
            align-items: center;

            .el-icon-s-unfold, .el-icon-s-fold {
                font-size: 24px;
                margin-left: 24px;
            }

            .logoimg {
                margin-left: 22px;
            }

            p {
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(73, 161, 255, 1);
                margin-left: 11px;
                font-size: 22px;
            }
        }

        .right {
            float: right;
            height: 100%;
            display: flex;
            align-items: center;

            .exit_btn {
                margin-right: 28px;
            }

            p {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(99, 99, 99, 1);
                margin-right: 52px;
            }

            .useimg {
                width: 43px;
                height: 43px;
                margin-right: 9px;
                border-radius: 50%;
                overflow: hidden;
            }
        }

    }

    .content {
        flex: 1;
        width: 100%;
        display: flex;

        .content_left {
            box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
            /*width: 201px;*/
            overflow: hidden;

            .el-menu-vertical-demo {
                height: 100%;
                width: 201px;
                transition: all 1s;
            }

            .el-menu--collapse {
                width: 0;
                display: none;
            }
        }

        .content_right {
            padding: 20px 19px 0 18px;
            flex: 1;

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
            }
        }
    }
</style>