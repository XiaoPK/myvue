<template>
  <div>
    <h3 style="text-align:center">分配结果如下</h3>
    <el-table :data="tableData" stripe style="width: 100%;padding-left:150px;" >
      <el-table-column prop="course" label="课程" width="180"></el-table-column>
      <el-table-column prop="teacher" label="主讲老师" width="150"></el-table-column>
      <el-table-column prop="name" label="上课时间" width="150"></el-table-column>
      <el-table-column prop="stuCount" label="课程人数" width="100"></el-table-column>
      <el-table-column prop="classroom" label="所在教室" width="200"></el-table-column>
    </el-table>
    <br>
    <a class="btn-add" type="primary" @click="changeRoute">重新分配</a>
  </div>
</template>
<style>
</style>

<script>
import bus from "../views/bus.js";
export default {
  data() {
    return {
      tableData: [],
      form: {
        course: "",
        teacher: "",
        name: "",
        classroom: ""
      }
    };
  },

  methods: {
    changeRoute(){
      this.$router.push({path:'/assignlabs'})
    }
  },
  created() {
   this.tableData = JSON.parse(localStorage.assignR)
   console.log(this.tableData)
  }
};
</script>
