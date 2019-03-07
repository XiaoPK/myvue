<template>
<div>
    <el-table
    :data="tableData"
    highlight-current-row
    style="width: 100%"
  >
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column property="studentNumber" label="学号" width="200"></el-table-column>
    <el-table-column property="studentName" label="姓名" width="200"></el-table-column>
    <el-table-column>
         <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="getInfo(scope.row)">查看</el-button>
        </template>
    </el-table-column>
  </el-table>
    <el-dialog :visible.sync="dialogFormVisible" width="300px">
        <el-card class="card">
              <p>学号：{{ studentInfo.studentNumber }}</p>
            <p>姓名：{{ studentInfo.studentName }}</p>
            <p>性别：{{ studentInfo.sex }}</p>
            <p>生日：{{ timestampToTime(studentInfo.birthday) }}</p>
            <p>年级：{{ studentInfo.grade }}</p>
            <p>学院：{{ studentInfo.college }}</p>
            
        </el-card>
    </el-dialog>
</div>
</template>

<style>
.card{
    width: 100%;
}
.card p{
    font-size: 16px;
    font-weight: 200;
    margin-bottom: 8px;
}
</style>

<script>
import * as stuApi from '../../apis/students.js'
export default {
    data(){
        return {
            dialogFormVisible:false,
            tableData:[],
            students:[],
            studentInfo:{
                studentName:"",
                studentNumber:"",
                grade:"",
                birthday:"",
                college:"",
                sex:""
            }
        }
    },
    methods:{
        timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
      return Y + M + D;
    },
        getInfo(row){
            let str = {studentNumber:row.studentNumber}
            stuApi.search(1,1,str).then(res => {
                if(res.code == '140001'){
                    console.log(res.result.results[0])
                    this.studentInfo = res.result.results[0]
                    this.dialogFormVisible = true
                
                }else{
                    this.$message.error('err'+res.$message)
                }
            }).catch( error => {
                this.$message.error(''+ error)
            })
        },
        handleStu(){
            let stuArr = this.students
            let stuInfo = []
            for(let i = 0; i<stuArr.length;i++){
                stuInfo = stuArr[i].split('-')
                this.tableData.push({studentNumber:stuInfo[0],studentName:stuInfo[1]})
            }
        }     
    },
    created(){
        this.students = this.$route.params.student
        this.handleStu()
    }
};
</script>

