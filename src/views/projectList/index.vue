<template>
  <div class="project-list-container app-container">
    <!-- 表格 -->
    <el-table :data="data" border style="width: 100%" class="table-container">
      <el-table-column type="index" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名称"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip content="项目地址" placement="top">
            <a :href="scope.row.url" target="_blank" class="project-a">{{ scope.row.name }}</a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="项目描述"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.description.toString() }}
        </template>
      </el-table-column>
      <el-table-column label="预览图" width="300" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.thumb"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-tooltip content="GitHub" placement="top">
            <el-button
              type="primary"
              icon="el-icon-message"
              size="small"
              circle
              class="editBtn"
              @click="openGitHubHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
              class="editBtn"
              @click="editProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              class="deleteBtn"
              @click="deleteProjeHandle(scope.row)"
              circle
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog
      title="请编辑该项目信息"
      :visible.sync="dialogFormVisible"
      fullscreen
      class="project-dialog-container"
    >
      <el-form :model="form">
        <!-- 项目名称 -->
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <!-- 项目描述 -->
        <el-form-item label="项目描述（每一项描述以英文逗号分割）">
          <el-input v-model="form.description">

          </el-input>
        </el-form-item>

        <!-- 项目链接 -->
        <el-form-item label="项目链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>

        <!-- github 地址 -->
        <el-form-item label="Github 地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>

        <!-- 预览图 -->
        <!-- <el-form-item label="预览图"> -->
          <Upload uploadTitle="预览图" v-model="form.thumb" class="project-thumb" />
        <!-- </el-form-item> -->

        <!-- 项目等级 -->
        <el-form-item label="排序等级" class="mr-25">
          <el-select v-model="form.order" placeholder="分类等级" class="select">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 确认和取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditProjectHandle"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBlogListByPageApi, deleteBlogByIdApi } from "@/api/blog.js";
import { getProjectListApi, upadateProjectApi, deleteProjectApi } from "@/api/project.js";
import { timestampToTime } from "@/utils/tools.js";
import { SERVERURL, FRONTENDURL } from "@/urlConfig.js";
import Upload from "@/components/Upload";
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      scrList: [],
      form: {
        name: '',
        description: '',
        thumb: '',
        url: '',
        github: '',
        order: '1'
      },
    };
  },
  components: {
    Upload,
  },
  methods: {
    fetchData() {
      getProjectListApi().then((res) => {
        console.clear();
        console.log(res);
        this.data = res.data;
        // for (let item of this.data) {
        //   item.thumbWhole = `${SERVERURL}${item.thumb}`;  
        // }
      });
      // getBlogListByPageApi(this.currentPageNum, this.limit).then((res) => {
      //   this.data = res.data.rows;
      //   for (let item of this.data) {
      //     item.createDate = timestampToTime(item.createDate);
      //     item.thumb = `${SERVERURL}${item.thumb}`;
      //     this.scrList.push(item.thumb);
      //     this.totalNum = res.data.total;
      //     this.totalPageNum = Math.ceil(this.totalNum / this.limit);
      //     if (this.currentPageNum > this.totalPageNum) {
      //       this.currentPageNum = this.totalPageNum;
      //       this.fetchData();
      //     }
      //   }
      // });
    },
    //github地址跳转
    openGitHubHandle(projectInfo) {
      window.open(projectInfo.github);
    },
    //编辑项目
    editProjectHandle(projectInfo) {
      console.log(projectInfo);
      //1.数据回填  2.打开dialog
      this.dialogFormVisible = true;
      this.form = {...projectInfo, description : projectInfo.description.toString()}
    },
    //确认编辑项目
    confirmEditProjectHandle() {
      console.log(this.form);
      let obj = {...this.form};
      obj.description = this.form.description.split(',');
      obj.order = parseInt(this.form.order);
      if (this.form.name && this.form.description && this.form.url && this.form.github && this.form.thumb) {
        upadateProjectApi({id: obj.id, data: obj}).then(() => {
          this.$message.success('项目信息修改成功');
          this.dialogFormVisible = false;
          this.fetchData();
        });
      } else {
        this.$message.error('请填写完整的项目信息再提交');
      }
    },
    //删除项目
    deleteProjeHandle(projectInfo) {
      this.$confirm(`此操作将删除【${projectInfo.name}】项目, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        deleteProjectApi(projectInfo.id).then(() => {
          this.$message.success('删除项目成功');
          this.fetchData();
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.project-list-container {
  .table-container {
    .editBtn {
      margin-right: 10px;
    }
    .deleteBtn {
      margin-left: 10px;
    }
  }

  .project-a:hover {
    color: #0ff;
  }

  .project-dialog-container {
    .project-thumb {
      display: inline-block;
      margin-top: 10px;
    }

    

    .dialog-footer {
      display: inline-block;
    }
  }

  .pager-container {
    margin-top: 30px;
  }

  .mr-25 {
    margin-top: 25px;
  }
}
</style>
