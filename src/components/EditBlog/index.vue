<template>
  <div class="blog-add-container app-container">
    <!-- 文章标题 -->
    <div class="blog-title-container mr-top-25">
      <div class="title-block">文章标题</div>
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <!-- 文章编辑 -->
    <div class="blog-edit-container mr-top-25">
      <div class="title-block">文章编辑</div>
      <Editor
        ref="toastuiEditor"
        :initialValue="form.editorText"
        height="600px"
        :options="editorOptions"
      />
    </div>
    <!-- 文章描述 -->
    <div class="blog-description-container mr-top-25">
      <div class="title-block">文章描述</div>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入文章描述"
        v-model="form.description"
      >
      </el-input>
    </div>
    <!-- 文章头图 -->
    <div class="blog-thumb-container mr-top-25">
      <Upload uploadTitle="文章头图" v-model="form.thumb" class="blog-thumb" />
    </div>
    <!-- 选择分类 -->
    <div class="blog-classify-container mr-top-25">
      <div class="title-block">选择分类</div>
      <el-select
        v-model="form.select"
        slot="prepend"
        placeholder="请选择文章分类"
        @change="changeHandle"
      >
        <el-option
          v-for="item in blogClassify"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <!-- 文章发布 -->
    <el-button type="primary" class="mr-top-25" @click="publicBlogHandle"
      >{{btnContent}}</el-button
    >
  </div>
</template>

<script>
import { addBlogApi, getBlogTypeApi, updateBlogApi, getBlogByIdApi } from "@/api/blog.js";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import "@toast-ui/editor/dist/i18n/zh-cn";
export default {
  props: ["mode"],
  created() {
    this.fetchBlogClassifyData();
    //判断是否需要回填数据
    if (this.mode == "update") {
      this.btnContent = '修改文章';
      this.id = this.$route.params.id;
      //根据id获取需要回填的数据
      getBlogByIdApi(this.id).then((res) => {
        console.clear();
        console.log(res);
        this.form = res.data;
        this.form.select =
          res.data.categoryId === null ? "" : res.data.category.id;
        this.$refs.toastuiEditor.invoke("setHTML", res.data.htmlContent);
      });
    }
  },
  data() {
    return {
      id: null,         //传递过来的文章id
      form: {
        title: "", //文章标题
        description: "", //文章描述
        editorText: "", //编辑的内容
        thumb: "", //文章头图
        select: "",
      },
      blogClassify: [], //博客分类
      imageUrl: "", //博客图片地址（服务器地址）
      editorOptions: {
        language: "zh-CN",
      },
      btnContent: '发布文章'
    };
  },
  components: {
    Editor,
    Upload,
  },
  methods: {
    fetchBlogClassifyData() {
      getBlogTypeApi().then((res) => {
        this.blogClassify = res.data;
        console.log(this.blogClassify);
      });
    },
    //发布文章
    publicBlogHandle() {
      const html = this.$refs.toastuiEditor.invoke("getHTML");
      const markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      const obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      if (obj.title && obj.description && obj.categoryId && obj.htmlContent) {
        if (this.mode == 'update')  {
            updateBlogApi({id: this.id, data: obj}).then(() => {
                this.$message.success("文章修改成功");
                this.$router.push("/blogAdmin/blogList");
            });
        } else {
            addBlogApi(obj).then(() => {
                this.$message.success("文章发布成功");
                this.$router.push("/blogAdmin/blogList");
            });
        }    
      } else {
        this.$message.error("请填写完整的内容再发布文章");
      }
    },
    //强制刷新（由于UI库的缺陷，需要强制刷新）
    changeHandle() {
        this.$forceUpdate();
    }
  },
};
</script>

<style lang="scss" scoped>
.blog-add-container {
  .title-block {
    margin-bottom: 10px;
  }

  .mr-top-25 {
    margin-top: 25px;
  }

  .blog-thumb-container {
    .blog-thumb {
      display: inline-block;
    }
  }

  .blog-classify-container {
    clear: both;
    margin-top: 25px;
  }
}
</style>
