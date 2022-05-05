<template>
  <div class="dashboard-container">
    <PanelGroup 
      @handleSetLineChartData="handleSetLineChartData"
      :projectNum="this.projectNum"  
      :articleNum="this.articleNum"
      :commentNum="this.commentNum"
      :messageNum="this.messageNum"
    />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <LineChart :chart-data="lineChartData" :xAxisData="xAxisData"/>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import * as echarts from "echarts";
import PanelGroup from '@/components/PanelGroup';
import LineChart from '@/components/LineChart';
import { getFrontMonths, isBelongTheMonth, timestampToTimeStr } from '@/utils/tools.js';
import { getProjectListApi } from '@/api/project.js';
import { getBlogListByPageApi } from '@/api/blog.js';
import { getCommentByPageApi } from '@/api/comment.js';
import { getMessageByPageApi } from '@/api/messageBoard.js';

const lineChartData = {
  visitors: {
    expectedData: [13, 14, 14, 12, 15, 10, 16, 12, 14, 15, 11, 9],
    actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  articles: {
    expectedData: [13, 14, 14, 12, 15, 10, 16, 12, 14, 15, 11, 9],
    actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  projects: {
    expectedData: [13, 14, 14, 12, 15, 10, 16, 12, 14, 15, 11, 9],
    actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  comments: {
    expectedData: [13, 14, 14, 12, 15, 10, 16, 12, 14, 15, 11, 9],
    actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  messages: {
    expectedData: [13, 14, 14, 12, 15, 10, 16, 12, 14, 15, 11, 9],
    actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
}
//访问数量visitors
//博客数量articles
//项目数量projects
//评论数量Comments
//留言数量Messages
export default {
  async created() {
    this.xAxisData = getFrontMonths(+new Date()).reverse();
    // console.clear();

    //处理项目数据
    const projectRes = await getProjectListApi();
    this.projectNum = projectRes.data.length;
    lineChartData.projects.actualData[11] = this.projectNum;

    //处理博客相关数据
    const blog = await getBlogListByPageApi();
    this.articleNum = blog.data.total;
    const blogRes = await getBlogListByPageApi(1, this.articleNum);
    for (let item of blogRes.data.rows) {
      const time = timestampToTimeStr(item.createDate);
      const index = this.xAxisData.indexOf(time);
      if (index !== -1) {
        lineChartData.articles.actualData[index]++;
      }
    }

    //处理评论数据
    const comment = await getCommentByPageApi();
    this.commentNum = comment.data.total;
    const commentRes = await getCommentByPageApi(1, this.commentNum);
    for (let item of commentRes.data.rows) {
      const time = timestampToTimeStr(item.createDate);
      const index = this.xAxisData.indexOf(time);
      if (index !== -1) {
        lineChartData.comments.actualData[index]++;
      }
    }
    // console.log(lineChartData.comments.actualData);

    //处理留言数据
    const message = await getMessageByPageApi();
    this.messageNum = message.data.total;
    const messageRes = await getMessageByPageApi(1, this.messageNum);
    for (let item of messageRes.data.rows) {
      const time = timestampToTimeStr(item.createDate);
      const index = this.xAxisData.indexOf(time);
      if (index !== -1) {
        lineChartData.messages.actualData[index]++;
      }
    }
  },
  data() {
    return {
      lineChartData: lineChartData.visitors,
      projectNum: 0,
      xAxisData: [],
      articleNum: 0,
      commentNum: 0,
      messageNum: 0,
    }
  },
  components: {
    PanelGroup,
    LineChart,
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  background-color: rgb(240, 242, 245);
  padding: 32px;
}
</style>
