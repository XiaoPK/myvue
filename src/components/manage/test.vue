<template>
  <div>
    <!-- 步骤条 -->
    <div>
      <el-steps :active="active" finish-status="success" space="300px" align-center>
        <el-step title="学期时间">
        </el-step>
        <el-step title="分配规则"></el-step>
        <el-step title="分配完成"></el-step>
      </el-steps>
       <!-- 时间 -->
          <div class="time">
            <span class="demonstration">请选择本学期起止时间</span>
            <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>

      <el-button class="btn-step" @click="next">下一步</el-button>
    </div>
  </div>
</template>
btn-step
<script>
export default {
  data() {
    return {
      value: "",
      active: 0
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  }
};
</script>
<style>
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 18px;
  margin-bottom: 20px;
}
.time {
  padding: 80px 0;
  text-align: center;
  border-right: solid 1px #eff2f6;
}
.btn-step{
  margin: auto;
}
</style>
