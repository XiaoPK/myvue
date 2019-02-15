<template>
  <div>
    <h3>分配结果如下</h3>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="course" label="课程" width="180"></el-table-column>
      <el-table-column prop="teacher" label="主讲老师" width="180"></el-table-column>
      <el-table-column prop="name" label="上课时间"></el-table-column>
      <el-table-column prop="classroom" label="所在教室"></el-table-column>
    </el-table>
    <a class="btn-add" type="primary">重新分配</a>
  </div>
</template>
<style>
</style>

<script>
import bus from "../views/bus.js";
import * as resultApi from "../../apis/assignResult.js";
export default {
  data() {
    return {
      tableData: [
      ],
      form: {
        course: "",
        teacher: "",
        name: "",
        classroom: ""
      }
    };
  },

  methods: {
    //   queryTable(){
    //     resultApi.assign().then(res => {
    //       if(res.code == "140001"){
    //         this.$message.success("分配成功！")
    //         this.tableData = res.result.results
    //       }else{
    //         this.$message.error("error:" + error)
    //       }
    //     }).catch(error => {
    //       this.$message.error(error + '')
    //     })
    //   }
  },
  created() {
    bus.$on("result", msg => {
      let arr = []
      for (let i = 0; i < msg.length; i++) {
        arr.push(msg[i])
      }
      this.tableData = arr;
      console.log("输出表格数据");
      console.log(this.tableData);
    });
  }
};
</script>
