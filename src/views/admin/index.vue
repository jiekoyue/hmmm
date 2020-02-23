<template>
    <div style="background: #E8E9EC;width: 100%;height: 100%;">
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
            <div class="content_right"></div>
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
				isCollapse: false
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
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
        width: 100%;
        height: 100%;
        display: flex;

        .content_left {
            box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
            /*width: 201px;*/
            overflow: hidden;
        }

        .el-menu-vertical-demo {
            height: 100%;
            transition: all 1s;
        }

        .el-menu--collapse {
            width: 0;
            display: none;
        }

        .content_right {
            padding: 20px 19px 0 18px;
            background: skyblue;
            width: 100%;
        }
    }
</style>