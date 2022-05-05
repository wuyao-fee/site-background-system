<template>
  <div class="blog-list-container app-container">
    <el-table :data="data" border style="width: 100%" class="table-container">
      <el-table-column type="index" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章名称" width="250" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="fit"
              :preview-src-list="scrList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="gotoBlogHandle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="文章描述"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        prop="scanNumber"
        label="浏览数"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.scanNumber }}
        </template>
      </el-table-column>
      <el-table-column
        prop="commentNumber"
        label="评论量"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.commentNumber }}
        </template>
      </el-table-column>
      <el-table-column
        prop="category"
        label="所属分类"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.category === null ? '为分类' : scope.row.category.name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建日期"
        width="230"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip content="操作" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
              class="editBtn"
              @click="editBlogHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              class="deleteBtn"
              @click="deleteBlogHandle(scope.row)"
              circle
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination 
      class="pager-container"
      background layout="prev, pager, next, -> , jumper, sizes, total" 
      :current-page.sync="currentPageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="limit"
      :total="totalNum"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBlogListByPageApi, deleteBlogByIdApi } from "@/api/blog.js";
import { timestampToTime } from "@/utils/tools.js";
import { SERVERURL, FRONTENDURL } from "@/urlConfig.js";
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      scrList: [],
      currentPageNum: 1,          //当前页码（默认第一页）
      limit: 5,                   //每个页面的容量
      totalPageNum: 0,            //总页码
      totalNum: 0,                //总条数
      pagerCurrentPageNum: 1,     //分页器当前的页码
    };
  },
  methods: {
    fetchData() {
      getBlogListByPageApi(this.currentPageNum, this.limit).then((res) => {
        this.data = res.data.rows;
        for (let item of this.data) {
          item.createDate = timestampToTime(item.createDate);
          // item.thumb = `${SERVERURL}${item.thumb}`;
          this.scrList.push(item.thumb);
          this.totalNum = res.data.total;
          this.totalPageNum = Math.ceil(this.totalNum / this.limit);
          if (this.currentPageNum > this.totalPageNum) {
            this.currentPageNum = this.totalPageNum;
            this.fetchData();
          }
        }
      });
    },
    //编辑博客
    editBlogHandle(blogInfo) {
      //跳转到博客编辑页面
      console.log(blogInfo, 'aaaa');
      this.$router.push(`/blogAdmin/blogEdit/${blogInfo.id}`);
    },
    //删除博客
    deleteBlogHandle(blogInfo) {
      console.log(blogInfo, "blogInfo");
      console.log(this.data, "this.data1");
      this.$confirm(
        `此操作将永久删除【${blogInfo.title}】这篇博客及相关评论,
        是否继续?`,
        "删除博客",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlogByIdApi(blogInfo.id).then(() => {
            this.fetchData();
            console.log(this.data, "this.data2");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    commitDialogFormHandle() {},
    //跳转到具体的文章
    gotoBlogHandle(blogInfo) {
      window.open(`/article/${blogInfo.id}`);
      // window.open(`${FRONTENDURL}/article/${blogInfo.id}`);
    },
    //上一页
    prevClickHandle() {
      this.currentPageNum -= 1;
    },
    //下一页
    nextClickHandle() {
      this.currentPageNum += 1;
    },
    currentChangeHandle(pageNum) {
      this.currentPageNum = parseInt(pageNum);
      this.fetchData();
    },
    sizeChangeHandle(sizeNum) {
      this.limit = sizeNum;
      this.fetchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-list-container {
  .table-container {
    .editBtn {
      margin-right: 10px;
    }
    .deleteBtn {
      margin-left: 10px;
    }
  }

  .pager-container {
    margin-top: 30px;
  }
}
</style>
