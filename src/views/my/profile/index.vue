<script setup></script>

<template>
  <div>
    <div class="header">
      <h3>我的信息</h3>
    </div>
    <div class="account-form">
      <el-form label-width="200px">
        <el-form-item label="手机">
          <span>137****1384</span>
          <a href="#">修改</a>
        </el-form-item>
        <el-form-item label="邮箱">
          <span>未填写</span>
          <a href="#">验证</a>
        </el-form-item>
        <el-form-item label="昵称">
          <span>未设置</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>未设置</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>未设置</span>
        </el-form-item>
        <el-form-item label="生日">
          <span>未设置</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: #eaf5ff;
  border-top: 2px solid #155ebd;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border-bottom: 1px solid #c5ddf4;
  line-height: 35px;
  padding-left: 10px;
  height: 33px;
  > h3 {
    font-size: 14px;
  }
}
.account-form {
  padding: 20px 10px;
  border: 1px solid #cccccc;
  border-top: none;
}
a {
  margin-left: 10px;
  color: #0066cc;
}
a:hover {
  text-decoration: underline;
}
</style>
