<template>
  <!-- 关于我 -->
  <div class="about-me-container app-container">
    <div class="title-block">项目名称</div>
    <el-input v-model="url" :disabled="isDisabled" placeholder="请输入url"></el-input>
    <el-button type="primary" class="editBtn" @click="clickAboutMeHandle">{{ btnContent }}</el-button>
  </div>
</template>

<script>
import { getAboutMeApi, updateAboutMeApi } from '@/api/aboutMe.js';
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      url: '',                      //url地址
      isDisabled: true,             //禁止编辑
      btnContent: '编辑'
    }
  },
  methods: {
    fetchData() {
      getAboutMeApi().then((res) => {
        console.clear();
        console.log(res);
        this.url = res.data;
      });
    },
    //编辑关于我
    clickAboutMeHandle() {
      if (this.btnContent == '编辑') {
        this.isDisabled = !this.isDisabled;
        this.btnContent = '完成';
      } else {
        if (this.url) {
          this.isDisabled = !this.isDisabled;
          this.btnContent = '编辑';
          updateAboutMeApi({url: this.url}).then(() => {
            this.$message.success('修改url成功');
          });
        } else {
          this.$message.error('请填写完整内容再提交保存');
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.about-me-container {
  .title-block {
    margin-bottom: 15px;
  }
  .editBtn {
    margin-top: 15px;
  }
}
</style>