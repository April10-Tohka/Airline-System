<template>
  <div>
    <el-card class="box-card">
      <span style="font-size:20px;font-weight:bold;">嗨，您想去哪里？</span>
      <el-form
        :model="searchForm"
        :rules="rules"
        ref="searchBox"
        label-width="100px"
        class="searchForm"
      >
        <el-form-item label="出发城市" prop="departCity">
          <el-input v-model="searchForm.departCity"></el-input>
        </el-form-item>
        <el-form-item label="到达城市" prop="arriveCity">
          <el-input v-model="searchForm.arriveCity"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="airDate">
          <el-date-picker
            placeholder="点击选择"
            v-model="searchForm.airDate"
            style="width: 100%;"
            value-format="YYYY-MM-DD"
            format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>

      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
const router=useRouter();
//表单校验规则
const rules=reactive({
    departCity: [
        { required: true, message: "请输入出发城市", trigger: "blur" }
    ],
    arriveCity: [
        { required: true, message: "请输入到达城市", trigger: "blur" }
    ]
})
// 表单数据
const searchForm=ref({
    departCity: "",//出发地
    arriveCity: "",//目的地
    airDate: "",//日期
})
//提交表单按钮
function submitForm()
{
    console.log("提交表单,",searchForm.value);
    router.push({path:"/ticket",query:searchForm.value});
    /**
     * TODO: 1.校验表单数据
     *       2. 调用接口
     *       3.路由跳转到飞机票查询结果页面
     */
}
</script>


<style scoped>
.searchForm {
  margin-top: 20px;
  margin-left: 50px;
  width: 440px;
  height: 230px;
}
button {
  float: right;
  margin: 10px;
}
.box-card {
  width: 620px;
}
</style>
