<template>
  <div class="project-add-container app-container">
      <!-- 项目名称 -->
      <div class="project-name-container">
        <div class="title-block">项目名称</div>
        <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
      </div>
      <!-- 项目描述 -->
      <div class="project-name-container mr-top-25">
        <div class="title-block">项目描述（每项描述以英文逗号分割）</div>
        <el-input v-model="form.description" placeholder="请输入项目项目描述（例如：描述1,描述2,描述3）"></el-input>
      </div>
      <!-- 项目链接 -->
      <div class="project-name-container mr-top-25">
        <div class="title-block">项目链接</div>
        <el-input v-model="form.url" placeholder="请输入项目链接"></el-input>
      </div>
      <!-- github地址 -->
      <div class="project-name-container mr-top-25">
        <div class="title-block">github地址</div>
        <el-input v-model="form.github" placeholder="请输入github地址"></el-input>
      </div>
      <!-- 项目预览图 -->
      <div class="project-thumb-container mr-top-25">
        <Upload uploadTitle="项目预览图" v-model="form.thumb" class="project-thumb"/>
      </div>
      <!-- 项目等级 -->
      <div class="project-select-container mr-top-25">
        <div class="title-block">分类等级</div>
        <el-select v-model="form.order" placeholder="分类等级" class="select">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </div>
      <!-- 发布项目 -->
      <div class="project-public-container mr-top-25">
        <el-button type="primary" @click="publicProjecthandle">发布项目</el-button>
      </div>
  </div>
</template>

<script>
import Upload from '@/components/Upload';
import { addProjectApi } from '@/api/project.js';
export default {
  data() {
    return {
      form: {
        name: '',               //项目名称
        description: '',        //项目描述
        url: '',                //项目链接
        github: '',             //github地址
        thumb: '',              //项目预览图
        order: '1',             //项目排序等级
      }
    }
  },
  components: {
    Upload,
  },
  methods: {
    //发布项目
    publicProjecthandle() {
      console.log(this.form);
      let obj = {...this.form};
      obj.description = obj.description.split(',');
      obj.order = parseInt(obj.order);
      addProjectApi(obj).then(() => {
        this.$router.push('/projectAdmin/projectList');
        this.$message.success('项目添加成功');
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.project-add-container {
  .title-block {
    margin-bottom: 10px;
  }
  .mr-top-25 {
    margin-top: 25px;
  }
  .project-thumb-container {
    .project-thumb {
      display: inline-block;
    }
  }
}
</style>