<template>
    <div class="zhuce" v-if="zckey">
        <div class="zhucebox">
            <div class="zc-top">
                <p>用户注册</p>
            </div>
            <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="87px"
                     class="demo-ruleForm">
                <el-form-item label="头像" prop="avatar">
                    <el-upload
                            v-model="ruleForm.avatar"
                            class="avatar-uploader zx-flex"
                            action="http://127.0.0.1/heimamm/public/uploads"
                            :show-file-list="false" name="image"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imgUrl" :src="imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="昵称" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>

                <el-form-item label="手机" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>

                <el-form-item label="图形码" prop="code">
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="ruleForm.code"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <img :src="codeurl" alt="" @click="codeinfo" class="zc-btn">
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="验证码" prop="rcode">
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="ruleForm.rcode"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button class="zc-btn" :disabled="set!=0" @click="phoneifon">
                                {{set==0?'获取用户验证码':'还有'+set+'秒'}}
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item>
                    <div class="zx-flex">
                        <el-button @click="closefn">取消</el-button>
                        <el-button type="primary" @click="submitForm">确认</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
	import {sendsms} from '@/api/sendsms.js';

	export default {
		name: "register",
		data() {
			return {
				set: 0,
				codeurl: '',
				baseurl: process.env.VUE_APP_URL,
				zckey: false,
				imgUrl: '',
				ruleForm: {
					username: '',
					email: '',
					phone: '',
					password: '',
					code: '',
					rcode: '',
					avatar: ''
				},
				rules: {
					rcode: [
						{required: true, message: '图片不能为空', trigger: 'blur'},
						{min: 4, max: 4, message: '长度为4', trigger: 'change'}
					],
					code: [
						{required: true, message: '图片不能为空', trigger: 'blur'},
						{min: 4, max: 4, message: '长度为4', trigger: 'change'}
					],
					avatar: [
						{required: true, message: '图片不能为空', trigger: 'change'},
					],
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
					username: [
						{required: true, message: '不能为空', trigger: 'blur'},
						{min: 2, max: 6, message: '用户名长度为2~6', trigger: 'change'}
					],
					email: [
						{required: true, message: '不能为空', trigger: 'blur'},
						{
							pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
							message: '请输入正确的邮箱地址',
							trigger: 'change'
						},
					],
				}
			};
		},
		methods: {
			//登录事件
			submitForm() {
				this.$refs.ruleForm.validate(v => {
					if (v) {
						// if (imgUrl)
						this.$axios({
							url: 'register',
							method: 'post',
							data: this.ruleForm
						}).then(msg => {
							window.console.log(msg);
							if (msg.data.code == 200) {
								this.$message({
									message: '注册成功',
									type: 'success'
								});
								// window.console.log(msg.data.data.user_id);
								this.closefn();
								this.$parent.form.phone = this.ruleForm.phone;
								this.$parent.form.password = this.ruleForm.password;
							} else {
								this.$message.error(msg.data.message);
							}
						});
					}
				})
			},

			//图片上传成功
			handleAvatarSuccess(res, file) {
				this.imgUrl = URL.createObjectURL(file.raw);
				this.ruleForm.avatar = res.data.file_path;
				this.$refs.ruleForm.validateField('avatar');
				this.$message({
					message: '图片上传成功',
					type: 'success'
				});
			},

			//图片上传事件
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},

			//获取图片验证码
			codeinfo() {
				this.codeurl = this.baseurl + '/captcha?type=sendsms&t=' + Math.random() * 99;
			},

			//获取手机验证码
			phoneifon() {
				if (!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.ruleForm.phone))) {
					return this.$message.error('请输入正确的手机号');
				}
				if (this.ruleForm.code.length != 4) {
					return this.$message.error('验证码长度错误');
				}
				this.set = 60;
				let setcode = setInterval(() => {
					this.set--;
					if (this.set <= 0) {
						clearInterval(setcode);
					}
				}, 1000);
				this.phonecode = true;
				sendsms({
					code: this.ruleForm.code,
					phone: this.ruleForm.phone,
				}).then(msg => {
					if (msg.data.code == 200) {
						// alert(msg.data.data.captcha);
						this.$message({
							message: '验证码已发送，请在60s内注册完毕，' + msg.data.data.captcha,
							type: 'success'
						});
					} else {
						this.$message.error(msg.data.message);
						this.set = 0;
						clearInterval(setcode);
					}
					window.console.log(msg);
				}).catch(() => {
					this.set = 0;
					clearInterval(setcode);
				});
			},

			//取消按钮
			closefn() {
				this.zckey = false;
				this.imgUrl = '';
				this.$refs.ruleForm.resetFields();
			}

		},
		created() {
			this.codeinfo();
		}
	}
</script>

<style scoped lang="less">
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

        .el-upload {
            /*border: 1px dashed #d9d9d9;*/
            /*border-radius: 6px;*/
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 179px;
            height: 179px;
        }

        .el-icon-plus {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
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