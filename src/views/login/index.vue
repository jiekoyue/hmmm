<template>
    <div class="login-warp">
        <div class="login-box">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark infomsg">
                        <img src="./imgs/logo.png" alt="" class="logoimg">
                        <span class="hmzt">黑马面面</span>
                        <div class="xian"></div>
                        <span class="hmzt">用户登录</span>
                    </div>
                </el-col>
            </el-row>
            <el-form ref="form" :model="form" :rules="rules" status-icon>
                <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号" v-model="form.phone" class="baseinp" clearable autocomplete="off">
                        <i slot="prefix" class="el-input__icon  el-icon-user"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="form.password" class="baseinp" clearable show-password>
                        <i slot="prefix" class="el-input__icon  el-icon-lock"></i>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-row class="baseinp">
                        <el-col :span="17">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item prop="code">
                                    <el-input placeholder="请输入验证码" v-model="form.code" clearable>
                                        <i slot="prefix" class="el-input__icon  el-icon-key"></i>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple-dark yzm">
                                <img :src="codeurl" @click="codeinfo" alt="">
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item prop="checked">
                    <el-checkbox class="baseinp chkbox" name="checked" v-model="form.checked">
                        我已阅读并同意<a href="javascript:;">用户协议</a>和<a href="javascript:;">隐私条款</a>
                    </el-checkbox>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="baseinp" @click="login">登录</el-button>
                    <el-button type="primary" @click="goreg" class="baseinp" style="margin-left: 0;">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <img src="./imgs/login_banner_ele.png" alt="">
        <register ref="zc"></register>
    </div>
</template>

<script>
	import register from './components/register.vue';

	export default {
		name: "index",
		components: {
			register,
		},
		data() {
			return {
				codeurl: '',
				form: {
					phone: '',
					password: '',
					code: '',
					checked: false
				},
				rules: {
					phone: [
						{required: true, message: '不能为空', trigger: 'blur'},
						{
							pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
							message: '请输入正确的手机号', trigger: 'change'
						}
					],
					password: [
						{required: true, message: '不能为空', trigger: 'blur'},
						{min: 6, max: 12, message: '密码长度要为6~12字符', trigger: 'change'}
					],
					code: [
						{required: true, message: '不能为空', trigger: 'blur'}
					],
					checked: [
						{pattern: /true/, message: '请同意用户协议和隐私条款', trigger: 'change'}
					],
				}
			};
		},
		methods: {
			login() {
				this.$refs.form.validate(v => {
					if (v) {
						this.form.code
						this.$axios({
							url: 'login',
							method: 'post',
							data: this.form,
							withCredentials: true
						}).then(msg => {
							window.console.log(msg);
							if (msg.data.code == 200) {
								this.$message({
									message: '登录成功',
									type: 'success'
								});
								window.localStorage.setItem("token", msg.data.data.token)
							} else {
								this.$message.error(msg.data.message);
							}
						});
					}
				})
			},
			goreg() {
				this.$refs.zc.zckey = true;
			},
			codeinfo() {
				this.codeurl = process.env.VUE_APP_URL + '/captcha?type=login&t=' + Math.random() * 99;
			}
		},
		created() {
			this.codeinfo();
			window.console.log();
		}
	}
</script>

<style scoped lang="less">

    .login-warp {
        width: 100%;
        height: 100%;
        background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .login-box {
        width: 478px;
        height: 550px;
        background: rgba(245, 245, 245, 1);
        padding: 47px 42px 0;

        .el-form-item {
            margin: 0;
        }
    }

    .yzm {
        height: 100%;
        background: rgba(243, 251, 254);

        img {
            width: 100%;
        }
    }

    .baseinp {
        margin-top: 25px;
        display: block;
        width: 100%;
    }

    .logoimg {
        margin: 0px 16px 0 5px;
        width: 22px;
        height: 17px;
    }

    .infomsg {
        height: 40px;
        display: flex;
        align-items: center;
    }

    .hmzt {
        font-size: 22px;
        color: rgba(12, 12, 12, 1);
    }

    .xian {
        width: 1px;
        height: 28px;
        margin: 0px 14px 0;
        background: rgba(199, 199, 199, 1);
    }

    .chkbox {
        padding-left: 4px;

        a {
            color: #3296FA;
        }
    }

    .zhuce {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        z-index: 999;

        .zhucebox {
            width: 610px;
            height: 100%;
            margin: 0 auto;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(78, 78, 78, 1);

            .zc-top {
                width: 100%;
                height: 53px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));

                p {
                    font-size: 18px;
                    color: #FEFEFE;
                }
            }
        }
    }

    .demo-ruleForm {
        padding-right: 27px;

        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 179px;
            height: 179px;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .zc-btn {
            width: 140px;
            margin-left: 21px;
        }

        .zx-flex {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }


</style>