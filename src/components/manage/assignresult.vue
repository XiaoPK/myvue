<template>
<div>
  <h3>分配结果如下</h3>
     <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="courseName" label="课程" width="180"></el-table-column>
    <el-table-column prop="teacherName" label="主讲老师" width="180"></el-table-column>
    <el-table-column prop="date" label="上课时间"></el-table-column>
    <el-table-column prop="classroomName" label="所在教室"></el-table-column>
  </el-table>
  <a class="btn-add" type="primary">重新分配</a>
</div>
 
</template>
<style>
</style>

<script>
import * as resultApi from '../../apis/assignResult.js'
export default {
  data() {
    return {
      tableData: [
          {
              courseName:"java",
              teacherName:"王俊平",
              date:"星期三",
              classroomName:"计算机二层89"
          }
      ]
    };
  },
  methods:{
    queryTable(){
      resultApi.query().then(res => {
        if(res.code == "140001"){
          this.$message.success("分配成功！")
          this.tableData = res.result.results
        }else{
          this.$message.error("error:" + error)
        }
      }).catch(error => {
        this.$message.error(error + '')
      })
    }
  },
  created(){
    this.queryTable();
  }
};
</script>
