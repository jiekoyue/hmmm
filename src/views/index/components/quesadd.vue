<template>
    <div>
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
        <el-dialog title="编辑用户" top="0" :visible.sync="editVisible" center width="477px">
            <el-form :model="editform" ref="addform" :rules="rules">
                <el-form-item label="头像" :label-width="formLabelWidth">
                    <el-upload
                            class="avatar-uploader"
                            action="http://127.0.0.1/heimamm/public/uploads"
                            :show-file-list="false"
                            name="image"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="editform.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="editform.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="editform.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" placeholder="不修改密码可不填" :label-width="formLabelWidth" prop="password">
                    <el-tooltip class="item" content="不修改密码不必填" placement="top">
                        <el-input v-model="editform.password" autocomplete="off"></el-input>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="editform.role_id" placeholder="请选择角色">
                        <el-option label="超级管理员" :value="1"></el-option>
                        <el-option label="管理员" :value="2"></el-option>
                        <el-option label="老师" :value="3"></el-option>
                        <el-option label="学生" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="editform.status" placeholder="请选择状态">
                        <el-option label="禁用" :value="0"></el-option>
                        <el-option label="启用" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户备注" :label-width="formLabelWidth">
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
	export default {
		name: "quesadd",
        data(){
			return {
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
					password: [
						{min: 6, max: 12, message: '密码长度要为6~12字符', trigger: 'change'}
					]
				},
				formLabelWidth: '101px',
				editVisible: false,
				editform: {},
				imageUrl: '',
            };
        },
        methods:{
			//头像上传
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.editform.avatar = res.data.file_path;
				this.$message({
					message: '图片上传成功',
					type: 'success'
				});
			},
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
			//确认
			affirm() {
				this.$refs.addform.validate((valid) => {
					if (valid) {
						// adduser(this.form).then(msg => {
						// 	if (msg.data.code == 200) {
						// 		this.ifli();
                        //      this.form = {};
						// 		this.$message.success('添加成功');
						// 		this.dialogFormVisible = false;
						// 	} else {
						// 		this.$message.error(msg.data.message)
						// 	}
						// });
					}
				});
			},
			//取消
			offform() {
				this.dialogFormVisible = false;
				window.console.log(this.$refs.addform);
				this.$refs.addform.resetFields();
			},
			//编辑用户
			editfn() {
				// edituser(this.editform).then(msg => {
				// 	if (msg.data.code == 200) {
				// 		this.alt(msg.data.code);
				// 		this.editVisible = false;
				// 	// 	this.tablebol = false;
				// 	// 	this.tableData[this.editIndex] = {...this.editform};
				// 	// 	this.$nextTick(() => {
				// 	// 		this.tablebol = true;
				// 	// 	});
				// 	// 	this.editVisible = false;
				// 	// 	this.$message.success('编辑成功');
				// 	} else {
				// 	this.$message.error(msg.data.message);
				// 	}
				//
				// });
			},
        }
	}
</script>

<style scoped>

</style>