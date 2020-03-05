<template>
    <el-container class="mycont">
        <el-header class="myhead">
            <div class="left">
                <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse"></i>
                <img class="logoimg" src="./imgs/index_logo.png" alt="">
                <p>黑马面面</p>
            </div>
            <div class="right">
                <img class="useimg" :src="$store.state.userUrl" alt="">
                <p>{{$store.state.userName}},你好</p>
                <el-button type="primary" size="small" class="exit_btn" @click="exit">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside v-if="pathkey" class="myaside" width="auto">
                <el-menu
                        router
                        :collapse="isCollapse"
                        :default-active="mrpath"
                        class="el-menu-vertical-demo">
                    <template v-for="(item,index) in childs">
                        <el-menu-item :key="index" :index="'/index/'+item.path"
                                      v-if="item.meta.roles.includes($store.state.jurisdiction)">
                            <i :class="item.meta.icon"></i>
                            <span slot="title">{{item.meta.title}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-main class="mymain">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
	import {logout} from '@/api/index.js';
	import childs from '@/router/childrens.js'

	export default {
		name: "index",
		data() {
			return {
				isCollapse: false,
				mrpath: '',
				pathkey: true,
				childs,

			};
		},
		watch: {
			'$route.path': function () {
				this.pathkey = false;
				this.mrpath = this.$route.path;
				this.$nextTick(() => {
					this.pathkey = true;
				});
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				window.console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				window.console.log(key, keyPath);
			},
			//退出事件
			exit() {
				this.$confirm('是否继续退出?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					logout().then(msg => {
						window.console.log(msg);
					});
					this.$router.push('/login');
					this.$store.commit('stname',);
					this.$store.commit('sturl',);
					this.$message({
						type: 'success',
						message: '退出成功!'
					});
				}).catch(() => {

				});

			},
		},
		created() {
			this.mrpath = this.$route.path;
			// info().then(msg => {
			// 	// window.console.log(msg);
			// 	if (msg.data.code == 200) {
			// 		this.username = msg.data.data.username;
			// 		this.avater = process.env.VUE_APP_URL + '/' + msg.data.data.avatar;
			// 	}
			// });
		}
	}
</script>

<style scoped lang="less">
    .mycont {
        height: 100%;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .myhead {
        height: 100%;
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

    .myaside {
        height: 100%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    }

    .mymain {
        height: 100%;
        background: #E8E9EC;
    }
</style>
<style>
    .content_right .header {
        padding-top: 30px !important;
    }

    body .el-table th.gutter {
        display: table-cell !important;
    }

    body .el-table colgroup.gutter {
        display: table-cell !important;
    }
</style>