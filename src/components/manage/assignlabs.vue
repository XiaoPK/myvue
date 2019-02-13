<template>
  <div>
    <div class="time">
      <span class="demonstration">2、请选择分配规则</span>
      <el-checkbox-group
            v-model="assignRules"
            size="medium"
            @change="handleCheckedChange"
          >
            <el-checkbox
              v-for="item in allRules"
              :label="item"
              :key="item"
              border
            >{{item}}</el-checkbox>
          </el-checkbox-group>
    </div>
    <div>
      <el-button class="btn" type="primary" @click="assignlabs()">开始分配</el-button>
    </div>
  </div>
</template>
btn-step
<script>
export default {
  data() {
    return {
      value: "",
      assignRules:[],
      allRules:[
        "节假日除外",
        "一位教师最多带两门课",
        "课堂号"
      ]
    };
  },
  methods: {
    handleCheckedChange(value) {
      let checkedCount = value.length;
      console.log("点击");
      this.checkAll = checkedCount === this.allRules.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allRules.length;
    },
    assignlabs(){

    }
  }
};
</script>
<style scroped>
.demonstration {
  display: block;
  color: #606266;
  font-size: 18px;
  margin-bottom: 20px;
}
.time {
  padding: 40px 0;
  text-align: center;
  border-right: solid 1px #eff2f6;
}
.btn{
  margin-left:500px;
}
</style>
