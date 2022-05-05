<template>
  <div class="comment-admin-container app-container">
    <!-- 表格 -->
    <el-table :data="data" border style="width: 100%" class="table-container">
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (currentPageNum - 1) * limit }}
        </template>
      </el-table-column>
      <!-- 头像 -->
      <el-table-column prop="avatar" label="头像" align="center" width="100">
        <template slot-scope="scope">
          <el-image
           
            :src="scope.row.avatar"
            fit="contain"
            class="comment-avatar"
          ></el-image>
        </template>
      </el-table-column>
      <!-- 昵称 -->
      <el-table-column prop="nickname" label="昵称" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <!-- 评论文章 -->
      <el-table-column prop="blog.title" label="评论文章" align="center">
        <template slot-scope="scope">
          {{ scope.row.blog.title }}
        </template>
      </el-table-column>
      <!-- 评论内容 -->
      <el-table-column prop="content" label="评论内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <!-- 评论日期 -->
      <el-table-column
        prop="createDate"
        label="评论日期"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-tooltip content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              class="deleteBtn"
              @click="deleteCommentHandle(scope.row)"
              circle
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
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
import { getCommentByPageApi, deleteCommentApi } from "@/api/comment.js";
import { timestampToTime } from "@/utils/tools.js";
import { SERVERURL } from "@/urlConfig.js";
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      data: [],
      currentPageNum: 1,          //当前页码（默认第一页）
      limit: 10,                   //每个页面的容量
      totalPageNum: 0,            //总页码
      totalNum: 0,                //总条数
      pagerCurrentPageNum: 1,     //分页器当前的页码
    };
  },
  methods: {
    //请求数据
    fetchData() {
      getCommentByPageApi(this.currentPageNum, this.limit).then((res) => {
        console.clear();
        console.log(res);
        this.totalNum = res.data.total;
        this.totalPageNum = Math.ceil(this.totalNum / this.limit);
        for (let item of res.data.rows) {
          item.createDate = timestampToTime(item.createDate);
          // item.avatar2 = `${SERVERURL}${item.avatar}`;
          if (this.currentPageNum > this.totalPageNum) {
            this.currentPageNum = this.totalPageNum;
            this.fetchData();
          }
        }
        this.data = res.data.rows;
      });
    },
    //删除评论
    deleteCommentHandle(commentInfo) {
      console.log(commentInfo);
      this.$confirm(`此操作将删除【${commentInfo.content}】这条评论，是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelBUttonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteCommentApi(commentInfo.id).then(() => {
          this.$message.success('评论删除成功');
          this.fetchData();
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
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
.comment-admin-container {
  .comment-avatar {
    width: 30px;
    height:  30px;
    border-radius: 50%;
    border: 1px solid #000;
  }

  .pager-container {
    margin-top: 15px;
  }
}
</style>
