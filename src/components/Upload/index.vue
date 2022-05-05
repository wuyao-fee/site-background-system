<template>
  <div class="upload-container">
    <div class="uploadTitle">{{ uploadTitle }}</div> 

    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="header"
    >
      <img v-if="value" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { SERVERURL } from '../../../serverURL.js';
export default {
    props: ['uploadTitle', 'value'],

    computed: {
        imageUrl() {
            if (this.value) {
                console.log("this.value::::", this.value);
                return this.value;
                // return SERVERURL + this.value;
            }
        },
        header() {
            return {
                Authorization: 'Bearer ' + localStorage.getItem('adminToken')
            }
        }
    },

    methods: {
        handleAvatarSuccess(res) {
            console.log('图片上传成功');
            console.log(res);
            if (!res.code && res.data) {
                // res.data = `${SERVERURL}${res.data}`;
                this.$emit('input', res.data);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.upload-container {
    // border: 1px solid #f40;
    .uploadTitle {
        margin: 15px 0;
    }

    .avatar-uploader {
        margin: 0 auto;
        // border: 1px solid #000;
        img {
            margin: 0 auto;
        }
    }
}

.avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
