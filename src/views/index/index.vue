<template>
  <div class="index-container app-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="table-container"
    >
      <el-table-column type="index" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        align="center"
      ></el-table-column>
      <el-table-column label="中图预览" width="300" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.midImg"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" width="300" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.bigImg"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-tooltip content="操作" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
              @click="editDialogHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="dialog-container">
      <el-dialog title="编辑首页标语" :visible.sync="dialogFormVisible" top="5vh">
        <el-form :model="form">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="首页中图">
                <Upload v-model="form.midImg"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="首页大图">
                <Upload v-model="form.bigImg"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitDialogFormHandle"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getBannerApi, setBannerApi } from "@/api/banner.js";
import { SERVERURL } from "@/urlConfig.js";
import Upload from '@/components/Upload';
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: '',
        title: '',
        description: '',
        midImg: '',
        bigImg: ''
      }
    };
  },

  components: {
    Upload,
  },

  created() {
    this.getBanner();
  },

  methods: {
    getBanner() {
      getBannerApi().then((res) => {
        // console.log('getBannerApi:::::::', res);
        this.tableData = res.data;
        // console.log("this.table::::",this.tableData);
        // for (var prop of this.tableData) {
        //   // prop.midImg2 = `${SERVERURL}${prop.midImg}`;
        //   // prop.bigImg2 = `${SERVERURL}${prop.bigImg}`;
          // prop.midImg2 = SERVERURL + prop.midImg;
          // prop.bigImg2 = SERVERURL + prop.bigImg;
        // }
        // console.log(data);
      });
    },
    //编辑对话框
    editDialogHandle(bannerRowInfo) {
      // console.log(bannerRowInfo);
      this.form = {...bannerRowInfo};
      this.dialogFormVisible = true;
    },
    //提交对话框信息
    commitDialogFormHandle() {
      let arr = [...this.tableData];
      // console.log('arr:::::', arr);
      // console.log('form::::', this.form);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == this.form.id) {
          arr[i] = this.form;
        }
      }
      setBannerApi(arr).then((res) => {
        // console.log('set:::::',res);
        // console.log('set:::tableData:::',this.tableData);
         this.dialogFormVisible = false;
         this.$message({
           message: '修改成功',
           type: 'success'
         });
         this.getBanner();
       });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
