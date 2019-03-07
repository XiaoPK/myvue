<template>
  <div>
    <h2 class="welcome" v-if="this.tableData.length > 0">您最近的课程安排如下</h2>
    <h2 class="welcome" v-if="this.tableData.length == 0">您最近没有相关课程教授!</h2>
    <div class="course">
      <template v-for="item in tableData">
        <el-card class="box-card" :key="item.course" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ item.course }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="classManage(item.stuNames)">查看课堂</el-button>
          </div>
          <div class="text item">
            时间：{{ item.name }}
            <br>
            地点：{{ item.classroom }}
            <br>
            教师：{{ item.teacher }}
            <br>
            学生数量：{{ item.stuCount}}
          </div>
        </el-card>
      </template>
    </div>
  </div>
</template>

<style scoped>
.welcome {
  font-weight: normal;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 20px;
}
.course {
  margin-top: 10px;
  margin-left: 40px;
  margin-right: 40px;
  display: inline-flex;
}
.text {
  font-size: 16px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 240px;
  margin-right: 20px;
}
</style>

<script>
import * as assignApi from "../../apis/assignResult.js";
export default {
  data() {
    return {
      tableData:[],
      allResult: "",
      teacherName:sessionStorage.getItem('username')
    };
  },
  methods: {
    classManage(stuNames){
      console.log(stuNames)
      this.$router.push({
        name:'classManage',
        params:{student:stuNames}
      })
    },
    queryTable() {
      assignApi
        .queryAll()
        .then(res => {
          if (res.code == "140001") {
            console.log(res);
            this.allResult = res.result[res.result.length-1].assignResult;
            this.findCourse()
          } else {
            this.$message.error("error" + res.message);
          }
        })
        .catch(error => {
          this.$message.error("" + error);
        });
    },
    findCourse(){
      let allCourses = this.allResult
      console.log(allCourses)
      for(let i = 0; i< allCourses.length; i++){
        if(allCourses[i].teacher == this.teacherName){
            console.log(allCourses[i])
            this.tableData.push(allCourses[i])
          }
      }
      console.log(this.tableData)
      if(this.tableData.length==0){
        console.log('this is no course')
        this.$message('您没有相关课程可教授！')
      }
    },
  },
   created() {
      this.queryTable();
    }
};
</script>
