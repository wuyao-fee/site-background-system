<template>
  <div class="blog-classify-container app-container">
    <!-- 输入框 -->
    <el-input
      placeholder="请输入需要添加的分类，并在左侧选择分类等级"
      v-model="input"
      class="input-with-select input-container"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择分类等级">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </el-input>
    <el-button type="primary" class="add-btn" @click="addBlogClassifyHandle"
      >添加</el-button
    >

    <!-- 表格 -->
    <el-table :data="data" border style="width: 100%" class="table-container">
      <el-table-column type="index" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="文章分类"
        width="500"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="articleCount"
        label="文章数量"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip content="操作" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
              @click="editBlogClassifyHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              class="deleteBtn"
              @click="deleteBlogClassifyHandle(scope.row)"
              circle
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <div class="dialog-container">
      <el-dialog
        title="编辑首页标语"
        :visible.sync="dialogFormVisible"
        top="5vh"
      >
        <el-form :model="form">
          <el-form-item label="分类名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="排序等级">
            <el-select v-model="form.order" placeholder="请选择分类等级">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBlogClassifyHandle"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getBlogTypeApi,
  addBlogTypeApi,
  getOneBlogTypeApi,
  updateOneBlogClassifyApi,
  deleteBlogClassifyApi,
} from "@/api/blog.js";
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      data: [],
      input: "",
      select: "1",
      dialogFormVisible: false,
      form: {
        name: "",
        order: "1",
      },
    };
  },
  methods: {
    //请求数据
    fetchData() {
      getBlogTypeApi().then((res) => {
        // console.log(res);
        this.data = res.data;
      });
    },
    //添加博客分类
    addBlogClassifyHandle() {
      if (this.input) {
        addBlogTypeApi({ name: this.input, order: this.select }).then(() => {
          this.input = "";
          this.fetchData();
          this.$message.success("添加文章分类成功");
        });
      } else {
        this.$message.error("添加文章分类不能为空");
      }
    },
    //编辑博客分类
    editBlogClassifyHandle({ id }) {
      //1.回填  2.打开dialog
      getOneBlogTypeApi(id).then((res) => {
        this.form = res.data;
        this.dialogFormVisible = true;
      });
    },
    //确认编辑博客分类
    confirmBlogClassifyHandle({ id }) {
      //1.关闭dialog  2.重新请求数据
      updateOneBlogClassifyApi({ id: this.form.id, data: this.form }).then(
        (res) => {
          // console.log(res, 'res');
          this.fetchData();
          // console.log(this.form, '后');
          // console.log(this.data, '后data');
          this.$message.success("更新博客分类信息成功");
          this.dialogFormVisible = false;
        }
      );
      // console.log(this.form);
    },
    //删除博客分类
    deleteBlogClassifyHandle({ id, name }) {
      this.$confirm(
        `此操作将删除【${name}】博客分类,
        是否继续?`,
        "删除博客分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlogClassifyApi(id).then(() => {
            this.fetchData();
            this.$message.success('删除博客分类成功');
          });
        })
        .catch(() => {
          this.$message.info('已取消删除博客分类');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  width: 400px;
  margin-bottom: 20px;
}
.add-btn {
  margin-left: 10px;
}
</style>
