<template>
    <div>
        <el-radio :label="label" v-if="groupkey"></el-radio>
        <el-checkbox :label="label" v-else>
        </el-checkbox>
        <el-input class="ssdinput" v-model="mytext" @input="infn"></el-input>
        <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1/heimamm/public/question/upload"
                :show-file-list="false"
                name="file"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="myimage" :src="myimage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
	export default {
		name: "group",
		props: {
			label: String, text: String, image: String, groupkey: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				mytext: this.text,
				myimage: this.image,
			};
		},
		methods: {
			//头像上传
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.$emit('update:image', res.data.url);
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
			infn() {
				this.$emit('update:text', this.mytext);
			}
		}
	}
</script>

<style scoped>

</style>