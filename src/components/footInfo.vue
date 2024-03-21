<template>
  <div>
    <el-row>
      <el-col :span="6" class="grid-content bg-blue">
        <div style="padding-left:50px">
          <figure>
            <h3>
                <el-icon><Promotion /></el-icon>
                关于本站
            </h3>
          </figure>
          <ul>
            <li>声明</li>

          </ul>
        </div>
      </el-col>
      <el-col :span="6" class="grid-content bg-blue">
        <div style="padding-left:50px">
          <figure>
            <h3>
                <el-icon><Promotion /></el-icon>联系我们
            </h3>
          </figure>
          <ul>
            <li>TEL:10086</li>
            <li>MAIL:root@air.com</li>

          </ul>
        </div>
      </el-col>
      <el-col :span="6" class="grid-content bg-blue">
        <div style="padding-left:50px">
          <figure>
            <h3>
                <el-icon><Promotion /></el-icon>友情链接
            </h3>
          </figure>
          <ul>
            <li>广东医科大学</li>

          </ul>
        </div>
      </el-col>
      <el-col :span="6" class="grid-content bg-blue">
        <div style="padding-left:50px">
          <figure>
            <h3>
                <el-icon><Promotion /></el-icon>关注我们
            </h3>
          </figure>
          <ul>

          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row class="grid-bottom bg-blue" type="flex" justify="center">
      Copyright©2022-2030 GDMU. All rights reserved.
    </el-row>
  </div>


</template>

<script>

</script>

<style scope>
li {
  list-style: none;
}

.bg-blue {
  background: #0066b1;
}
.grid-content {
  min-height: 130px;
  color: white;
}
.grid-bottom{
  color: white;
  text-align: center;
}

</style>
