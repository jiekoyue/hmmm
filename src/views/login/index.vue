<template>
    <div class="login-warp">
        <div class="login-box">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark infomsg">
                        <img src="./imgs/logo.png" alt="" class="logoimg fl">
                        <span class="hmzt fl">黑马面面</span>
                        <div class="xian fl"></div>
                        <span class="hmzt fl">用户登录</span>
                    </div>
                </el-col>
            </el-row>
            <el-input placeholder="请输入验证码" v-model="username" class="baseinp">
                <i slot="prefix" class="el-input__icon  iconfont icon-denglu"></i>
            </el-input>
            <el-input placeholder="请输入验证码" v-model="userpass" class="baseinp">
                <i slot="prefix" class="el-input__icon  iconfont icon-mima"></i>
            </el-input>
            <el-row class="baseinp">
                <el-col :span="18">
                    <div class="grid-content bg-purple-dark">
                        <el-input placeholder="请输入验证码" v-model="useryzm">
                            <i slot="prefix" class="el-input__icon  iconfont icon-yanzhengma"></i>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark yzm"></div>
                </el-col>
            </el-row>
            <el-checkbox v-model="checked" class="baseinp chkbox" @click="checked=!checked">
                我已阅读并同意<span>用户协议</span>和<span>隐私条款</span></el-checkbox>
            <el-button type="primary" class="baseinp" @click="login">登录</el-button>
            <el-button type="primary" class="baseinp" style="margin-left: 0;">注册</el-button>
        </div>
        <img src="./imgs/login_banner_ele.png" alt="">
    </div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				username: '',
				userpass: '',
				useryzm: '',
				checked: false
			};
		},
		methods: {
			login() {
				if (this.username.match(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/)) {
					if (this.userpass.match(/^.{6,12}$/)) {
						alert(1);
					} else {
						alert(2);
					}
				}
			}
		}
	}
</script>

<style scoped lang="less">
    @import "../../style/font_1emtj6m6vvo/iconfont.css";

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
    }

    .yzm {
        height: 100%;
        background: #fff;
    }

    .baseinp {
        margin-top: 25px;
        display: block;
        width: 100%;
    }

    .logoimg {
        margin: 10px 16px 0 5px;
    }

    .infomsg {
        height: 40px;
    }

    .hmzt {
        font-size: 24px;
        color: rgba(12, 12, 12, 1);
    }

    .xian {
        width: 1px;
        height: 28px;
        margin: 6px 14px 0;
        background: rgba(199, 199, 199, 1);
    }

    .chkbox {
        padding-left: 4px;

        span {
            color: #3296FA;
        }
    }
</style>