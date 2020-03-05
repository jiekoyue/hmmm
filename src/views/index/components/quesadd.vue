<template>
    <div>
        <el-dialog destroy-on-close
                   :show-close="false"
                   :title="editkey?'新增题库':'编辑题库'"
                   :visible.sync="dialogFormVisible" center fullscreen>
            <el-form :model="form" ref="addform" :rules="rules">
                <el-form-item label="学科" :label-width="formLabelWidth" prop="subject">
                    <sbjinput v-model="form.subject"></sbjinput>
                </el-form-item>
                <el-form-item label="阶段" :label-width="formLabelWidth" prop="step">
                    <el-select v-model="form.step" placeholder="请选择阶段" class="w150">
                        <el-option
                                v-for="item in stepopt"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业" :label-width="formLabelWidth" prop="enterprise">
                    <el-select
                            class="w150"
                            v-model="form.enterprise"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="entMethod"
                            :loading="loading">
                        <el-option
                                v-for="item in enterpriseopt"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
                    <el-cascader
                            class="w150"
                            v-model="form.city"
                            :options="options"
                            :props="{ expandTrigger: 'hover',value:'label' }"
                            @change="handleChange"></el-cascader>
                </el-form-item>
                <el-form-item label="题型" :label-width="formLabelWidth" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio :label="1">单选</el-radio>
                        <el-radio :label="2">多选</el-radio>
                        <el-radio :label="3">简答</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="难度" :label-width="formLabelWidth" prop="difficulty">
                    <el-radio-group v-model="form.difficulty">
                        <el-radio :label="1">简单</el-radio>
                        <el-radio :label="2">一般</el-radio>
                        <el-radio :label="3">困难</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form class="formpt" label-position="top" :model="form" ref="addform" :rules="rules">
                    <el-form-item>
                        <div class="fgx">
                            <el-divider></el-divider>
                        </div>
                    </el-form-item>
                    <el-form-item
                            label="试题标题"
                            :label-width="formLabelWidth" prop="title">
                        <wgfwb v-model="form.title"></wgfwb>
                    </el-form-item>
                </el-form>
                <el-form-item
                        prop="single_select_answer"
                        v-if="form.type==1"
                        label="单选" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.single_select_answer">
                        <group class="ssd" v-for="(item,index) in form.select_options"
                               :key="index" :label="item.label" :text.sync="item.text" :image.sync="item.image"></group>
                    </el-radio-group>

                </el-form-item>
                <el-form-item
                        prop="multiple_select_answer"
                        v-else-if="form.type==2"
                        label="多选"
                        :label-width="formLabelWidth">
                    <el-radio-group v-model="form.multiple_select_answer">
                        <group class="ssd" v-for="(item,index) in form.select_options"
                               :key="index" :label="item.label" :groupkey="false" :text.sync="item.text"
                               :image.sync="item.image"></group>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                        prop="short_answer"
                        v-else
                        label="简答"
                        :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="form.short_answer">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="fgx">
                        <el-divider></el-divider>
                    </div>
                </el-form-item>
                <el-form-item label="解析视频" :label-width="formLabelWidth">
                    <el-upload
                            class="upload-demo"
                            action="http://127.0.0.1/heimamm/public/question/upload"
                            :on-success="audioChange"
                            name="file"
                            :before-upload="audioBefor"
                            :show-file-list="false">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
                    </el-upload>
                    <video :src="audioSrc" controls></video>
                </el-form-item>
                <el-form class="formpt" label-position="top" :model="form" ref="addform" :rules="rules">
                    <el-form-item>
                        <div class="fgx">
                            <el-divider></el-divider>
                        </div>
                    </el-form-item>
                    <el-form-item
                            prop="answer_analyze"
                            label="答案解析"
                            :label-width="formLabelWidth">
                        <wgfwb v-model="form.answer_analyze"></wgfwb>
                    </el-form-item>
                </el-form>
                <el-form-item>
                    <div class="fgx">
                        <el-divider></el-divider>
                    </div>
                </el-form-item>
                <el-form-item label="试题备注" :label-width="formLabelWidth" prop="remark">
                    <el-input class="shitiput" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="offform">取 消</el-button>
                <el-button type="primary" @click="affirm">确 定</el-button>
            </div>
        </el-dialog>
        <!--                <el-dialog title="编辑用户" top="0" :visible.sync="editVisible" center width="477px">-->
        <!--                    <el-form :model="editform" ref="addform" :rules="rules">-->
        <!--                        <el-form-item label="头像" :label-width="formLabelWidth">-->
        <!--                                    <el-upload-->
        <!--                                            class="avatar-uploader"-->
        <!--                                            action="http://127.0.0.1/heimamm/public/uploads"-->
        <!--                                            :show-file-list="false"-->
        <!--                                            name="image"-->
        <!--                                            :on-success="handleAvatarSuccess"-->
        <!--                                            :before-upload="beforeAvatarUpload">-->
        <!--                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
        <!--                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--                                    </el-upload>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="用户名" :label-width="formLabelWidth">-->
        <!--                            <el-input v-model="editform.username" autocomplete="off"></el-input>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="邮箱" :label-width="formLabelWidth">-->
        <!--                            <el-input v-model="editform.email" autocomplete="off"></el-input>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="电话" :label-width="formLabelWidth">-->
        <!--                            <el-input v-model="editform.phone" autocomplete="off"></el-input>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="密码" placeholder="不修改密码可不填" :label-width="formLabelWidth" prop="password">-->
        <!--                            <el-tooltip class="item" content="不修改密码不必填" placement="top">-->
        <!--                                <el-input v-model="editform.password" autocomplete="off"></el-input>-->
        <!--                            </el-tooltip>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="角色" :label-width="formLabelWidth">-->
        <!--                            <el-select v-model="editform.role_id" placeholder="请选择角色">-->
        <!--                                <el-option label="超级管理员" :value="1"></el-option>-->
        <!--                                <el-option label="管理员" :value="2"></el-option>-->
        <!--                                <el-option label="老师" :value="3"></el-option>-->
        <!--                                <el-option label="学生" :value="4"></el-option>-->
        <!--                            </el-select>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="状态" :label-width="formLabelWidth">-->
        <!--                            <el-select v-model="editform.status" placeholder="请选择状态">-->
        <!--                                <el-option label="禁用" :value="0"></el-option>-->
        <!--                                <el-option label="启用" :value="1"></el-option>-->
        <!--                            </el-select>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="用户备注" :label-width="formLabelWidth">-->
        <!--                            <el-input v-model="editform.remark" autocomplete="off"></el-input>-->
        <!--                        </el-form-item>-->
        <!--                    </el-form>-->
        <!--                    <div slot="footer" class="dialog-footer">-->
        <!--                        <el-button @click="editVisible=false">取 消</el-button>-->
        <!--                        <el-button type="primary" @click="editfn">确 定</el-button>-->
        <!--                    </div>-->
        <!--                </el-dialog>-->
    </div>
</template>

<script>
	import {addques, editques, priselist} from '@/api/index.js';
	import {regionDataPlus} from 'element-china-area-data'
	import wgfwb from './fuwenben.vue';
	import group from './group.vue';

	export default {
		name: "quesadd",
		components: {
			wgfwb,
			group,
		},
		data() {
			return {
				editkey: true,
				fileList: [],
				dialogFormVisible: false,
				enterpriseopt: [],
				loading: false,
				stepopt: [
					{
						value: 1,
						label: '初级'
					}, {
						value: 2,
						label: '中级'
					}, {
						value: 3,
						label: '高级'
					},
				],
				form: {
					type: 1,
					select_options: [
						{
							"label": "A",
							"text": "狗不理",
							"image": "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
						},
						{
							"label": "B",
							"text": "猫不理",
							"image": "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
						},
						{
							"label": "C",
							"text": "麻花",
							"image": "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
						},
						{
							"label": "D",
							"text": "炸酱面",
							"image": "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
						}
					]
				},
				rules: {
					subject: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
					step: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
					enterprise: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
					city: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
					type: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
					difficulty: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
					title: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
					single_select_answer: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
					multiple_select_answer: [
						{type: 'array', required: true, message: '至少选两个', trigger: 'change'},
						{min: 3, max: 5, message: '至少选两个', trigger: 'change'},
					],
					short_answer: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
					answer_analyze: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
					remark: [
						{required: true, message: '不能为空', trigger: 'change'},
					],
				},
				formLabelWidth: '378px',
				editVisible: false,
				editform: {},
				imageUrl: '',
				options: regionDataPlus,
				audioSrc: '',
			};
		},
		methods: {
			//对话框关闭
			closedhk() {
				window.console.log(11);
			},
			//视频上传
			audioBefor(file) {
				const isJPG = file.type === 'audio/mp4' || 'audio/avi';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传视频只能是 MP4/avi 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传视频大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			audioChange(res, file) {
				this.audioSrc = URL.createObjectURL(file.raw);
				this.form.video = file.data.url;
			},
			//省市联动
			handleChange(value) {
				console.log(value);
			},
			//搜索获取远程数据
			entMethod(name) {
				priselist({
					name,
					limit: '',
				}).then(msg => {
					if (msg.data.code == 200) {
						// subjectopt
						this.enterpriseopt = msg.data.data.items.map(item => {
							return {value: item.id, label: item.name}
						});
					}
					window.console.log(msg);
				});
			},

			//确认
			affirm() {
				this.$refs.addform.validate((valid) => {
					if (valid) {
						if (this.editkey) {
							addques(this.form).then(msg => {
								if (msg.data.code == 200) {
									this.$parent.ifli();
									this.$refs.addform.resetFields();
									// this.form = {};
									this.$message.success('添加成功');
									this.form = {
										type: 1,
										select_options: [
											{
												"label": "A",
												"text": "狗不理",
												"image": "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
											},
											{
												"label": "B",
												"text": "猫不理",
												"image": "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
											},
											{
												"label": "C",
												"text": "麻花",
												"image": "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
											},
											{
												"label": "D",
												"text": "炸酱面",
												"image": "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
											}
										]
									};
									this.dialogFormVisible = false;
								} else {
									this.$message.error(msg.data.message)
								}
							});
						} else {
							editques(this.form).then(msg => {
								if (msg.data.code == 200) {
									this.$parent.ifli();
									this.$refs.addform.resetFields();
									// this.form = {};
									this.$message.success('修改成功');
									this.dialogFormVisible = false;
								} else {
									this.$message.error(msg.data.message)
								}
							});
						}

					}
				});
			},
			//取消
			offform() {
				this.dialogFormVisible = false;
				this.form = {
					type: 1,
					select_options: [
						{
							"label": "A",
							"text": "狗不理",
							"image": "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
						},
						{
							"label": "B",
							"text": "猫不理",
							"image": "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
						},
						{
							"label": "C",
							"text": "麻花",
							"image": "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
						},
						{
							"label": "D",
							"text": "炸酱面",
							"image": "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
						}
					]
				};
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
    .w150 {
        width: 364px;
    }

    .shitiput {
        width: 754px;
    }

    .fgx {
        width: 832px;
        margin: 0 auto;
    }

    .formpt {
        padding: 0 318px;
    }

    .ssd {
        display: flex;
        width: 760px;
        align-items: center;
    }

    .ssd + .ssd {
        margin-top: 45px;
    }

    .el-icon-plus {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ssdinput {
        margin: 0 20px 0 14px;
        width: 476px;
    }
</style>
<style>
    .el-radio-group .ssd .el-radio__label {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
    }
</style>