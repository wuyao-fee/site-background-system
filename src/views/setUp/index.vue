<template>
  <div class="set-up-container app-container">
    <!-- 展示表单 -->
    <div class="set-up-form-container">
      <!-- 网站信息 -->
      <div class="website-info-container">
        <div class="title">网站信息</div>
        <!-- 网站标题 -->
        <div class="website-title-container mr-top-25">
          <div class="title-block">网站标题</div>
          <el-input
            v-model="form.siteTitle"
            placeholder="请填写网站标题"
            disabled
          ></el-input>
        </div>
        <!-- 邮箱 -->
        <div class="website-title-container mr-top-25">
          <div class="title-block">邮箱地址</div>
          <el-input
            v-model="form.mail"
            placeholder="请填写邮箱地址"
            disabled
          ></el-input>
        </div>
        <!-- 备案号 -->
        <div class="website-title-container mr-top-25">
          <div class="title-block">备案号</div>
          <el-input
            v-model="form.icp"
            placeholder="请填写备案号"
            disabled
          ></el-input>
        </div>
      </div>

      <hr />

      <!-- 网站头像信息 -->
      <div class="website-avatar-container">
        <div class="title">网站头像</div>
        <el-image
          style="width: 100px; height: 100px; border: 1px solid #000"
          :src="form.avatar"
        ></el-image>
      </div>

      <hr />

      <!-- 网址图标 -->
      <div class="website-icon-container">
        <div class="title">网址图标</div>
        <!-- 网址图标地址 -->
        <div class="website-title-container mr-top-25">
          <div class="title-block">网址图标地址</div>
          <el-input
            v-model="form.favicon"
            placeholder="请填写网址图标地址"
            disabled
          ></el-input>
        </div>
        <!-- 网址图标预览 -->
        <div class="website-title-container mr-top-25">
          <div class="title-block">网址图标预览</div>
          <el-image
            style="width: 100px; height: 100px; border: 1px solid #000"
            :src="form.favicon"
          ></el-image>
        </div>
      </div>

      <hr />

      <!-- GitHub信息 -->
      <div class="website-avatar-container">
        <div class="title">GitHub信息</div>
        <!-- github名称 -->
        <div class="github-name-container mr-top-25">
          <div class="title-block">github名称</div>
          <el-input
            v-model="form.githubName"
            placeholder="请填写github名称"
            disabled
          ></el-input>
        </div>
        <!-- github地址 -->
        <div class="github-name-container mr-top-25">
          <div class="title-block">github地址</div>
          <el-input
            v-model="form.github"
            placeholder="请填写github地址"
            disabled
          ></el-input>
        </div>
      </div>

      <hr />

      <!-- QQ信息 -->
      <div class="website-icon-container">
        <div class="title">QQ信息</div>
        <!-- QQ号码 -->
        <div class="website-title-container mr-top-25">
          <div class="title-block">QQ号码</div>
          <el-input
            v-model="form.qq"
            placeholder="请填写QQ号码"
            disabled
          ></el-input>
        </div>
        <!-- 网址图标预览 -->
        <div class="website-title-container mr-top-25">
          <div class="title-block">QQ二维码图片预览</div>
          <el-image
            style="width: 100px; height: 100px; border: 1px solid #000"
            :src="form.qqQrCode"
          ></el-image>
        </div>
      </div>

      <hr />

      <!-- 微信信息 -->
      <div class="website-icon-container">
        <div class="title">微信信息</div>
        <!-- 微信号 -->
        <div class="website-title-container mr-top-25">
          <div class="title-block">微信号</div>
          <el-input
            v-model="form.weixin"
            placeholder="请填写微信号"
            disabled
          ></el-input>
        </div>
        <!-- 网址图标预览 -->
        <div class="website-title-container mr-top-25">
          <div class="title-block">微信二维码图片预览</div>
          <el-image
            style="width: 100px; height: 100px; border: 1px solid #000"
            :src="form.weixinQrCode"
          ></el-image>
        </div>
      </div>

      <hr />

      <!-- 编辑模式 -->
      <el-button type="primary" @click="editSetupHandle">进入编辑模式</el-button>
    </div>

    <!-- 弹出框 -->
    <div class="set-up-dialog-container">
      <el-dialog 
        title="请编辑信息"
        :visible.sync="dialogFormVisible"
        width="50%"
        top="5vh"
        fullscreen
      >
        <el-form :model="form2">
          <el-form-item label="网站标题">
            <el-input v-model="form2.siteTitle" placeholder="请输入网站标题"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址">
            <el-input v-model="form2.mail" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item label="备案号">
            <el-input v-model="form2.icp" placeholder="请输入备案号"></el-input>
          </el-form-item>
          <Upload uploadTitle="网站头像" v-model="form2.avatar" class="upload"/>
          <el-form-item label="网站图标地址">
            <el-input v-model="form2.favicon" placeholder="请输入网站图标地址"></el-input>
          </el-form-item>
          <el-form-item label="github名称">
            <el-input v-model="form2.githubName" placeholder="请输入github名称"></el-input>
          </el-form-item>
          <el-form-item label="github地址">
            <el-input v-model="form2.github" placeholder="请输入github地址"></el-input>
          </el-form-item>
          <el-form-item label="QQ账号">
            <el-input v-model="form2.qq" placeholder="请输入QQ账号"></el-input>
          </el-form-item>
          <Upload uploadTitle="QQ二维码" v-model="form2.qqQrCode" class="upload"/>
          <el-form-item label="微信账号">
            <el-input v-model="form2.weixin" placeholder="请输入微信账号"></el-input>
          </el-form-item>
          <Upload uploadTitle="微信二维码" v-model="form2.weixinQrCode" class="upload"/>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmEditSetting">确 定</el-button>
      </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSetUpApi, updateSetUpApi } from "@/api/setup.js";
import Upload from "@/components/Upload";
import { SERVERURL } from '@/urlConfig.js';
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      form: {
        siteTitle: "", //网站标题
        mail: "", //邮箱地址
        icp: "", //备案号
        avatar: "", //网站头像地址
        favicon: "", //网址图标地址
        githubName: "", //github名称
        github: "", //github地址
        qq: "", //qq号
        qqQrCode: "", //qq二维码图片
        weixin: "", //微信号
        weixinQrCode: "", //微信二维码图片
      },
      form2: {
        siteTitle: "", //网站标题
        mail: "", //邮箱地址
        icp: "", //备案号
        avatar: "", //网站头像地址
        favicon: "", //网址图标地址
        githubName: "", //github名称
        github: "", //github地址
        qq: "", //qq号
        qqQrCode: "", //qq二维码图片
        weixin: "", //微信号
        weixinQrCode: "", //微信二维码图片
      },
      dialogFormVisible: false
    };
  },
  components: {
    Upload,
  },
  methods: {
    //请求数据
    fetchData() {
      getSetUpApi().then((res) => {
        console.clear();
        console.log(res);
        this.form = res.data;
        // this.form.avatar2 = `${SERVERURL}${this.form.avatar}`;
        // this.form.qqQrCode2 = `${SERVERURL}${this.form.qqQrCode}`;
        // this.form.weixinQrCode2 = `${SERVERURL}${this.form.weixinQrCode}`;
        this.form2 = {...this.form};
      });
    },
    //编辑设置
    editSetupHandle() {
      this.dialogFormVisible = true;
    },
    //确定编辑设置
    confirmEditSetting() {
      updateSetUpApi(this.form2).then(() => {
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success('设置修改成功');
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.set-up-container {
  .title {
    font-size: 23px;
    font-weight: 600;
  }
  .title-block {
    margin-bottom: 10px;
  }
  .mr-top-25 {
    margin-top: 25px;
  }
  hr {
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .upload {
    display: inline-block;
    font-weight: 600;
  }
}
</style>
