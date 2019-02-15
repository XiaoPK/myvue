<template>
  <div>
    <div>
      <span class="demonstration">1、请选择学期</span>

      <el-select v-model="termId" placeholder="请选择学期" @change="getCourses">
        <el-option
          v-for="item in termData"
          :key="item.termName"
          :label="item.termName"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div>
      <span class="demonstration">2、请选择分配规则</span>
      <el-form :inline="true" :model="ruleLine">
        <el-form-item label="请选择分配规则">
          <el-select v-model="ruleLine.ruleKey" placeholder="请选择分配规则" @change="changeRule">
            <el-option
              v-for="item in allRules"
              :key="item.ruleKey"
              :label="item.ruleDetail.ruleName"
              :value="item.ruleKey"
            ></el-option>
          </el-select>
          <br>
        </el-form-item>
        <el-form-item label="请选择课程" v-if="flagCourse">
          <el-select v-model="ruleLine.courseId">
            <el-option
              v-for="item in courseData"
              :key="item.courseName"
              :label="item.courseName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="flagCount">
          <el-input-number
            v-model="ruleLine.classCount"
            controls-position="right"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item v-if="flagChoice">
            <el-radio v-model="ruleLine.ruleValue" label="true">是</el-radio>
  <el-radio v-model="ruleLine.ruleValue" label="false">否</el-radio>
        </el-form-item>
        <el-button @click="getRules">继续添加</el-button>
        <div> {{ ruleResult }}</div>
      </el-form>
    </div>
    <div>
      <el-button class="btn" type="primary" @click="assignlabs()">开始分配</el-button>
    </div>
    <div>
       <el-table :data="assignResult" border style="width: 100%">
      <el-table-column prop="course" label="课程" width="180"></el-table-column>
      <el-table-column prop="teacher" label="主讲老师" width="180"></el-table-column>
      <el-table-column prop="name" label="上课时间"></el-table-column>
      <el-table-column prop="classroom" label="所在教室"></el-table-column>
    </el-table>
    </div>
  </div>
</template>
btn-step
<script>
import * as termApi from "../../apis/term.js";
import * as ruleApi from "../../apis/rules.js";
import * as courseApi from "../../apis/courses.js";
import * as assignApi from "../../apis/assignResult.js";
import bus from "../views/bus.js"
export default {
  data() {
    return {
      termId: "",
      termData: [],
      offerCourses: [],
      ruleLine: {
        ruleKey: "",
        ruleValue: ""
      },
      flagCourse: false,
      flagCount: false,
      flagChoice: false,
      ruleResult: [],
      coursesArray: [],
      courseData: [],
      allRules: [],
      assignResult:[]
    };
  },
  methods: {
    getCourses(val) {
      this.termId = val;
      var term = this.termData.filter(function(item) {
        return item.id == val;
      });
      this.offerCourses = term[0].offerCourses;
      console.log(this.offerCourses);
      console.log(term);
      // for (let i = 0 ; i < term.offerCourses.length; i++) {
      //   console.log(term.offerCourses[i])
      //   var data = this.courseData.filter(function(item) {
      //     return item.id == term.offerCourses[i];
      //   });
      //   console.log(data)
      //   this.courses.push(data);
      // }
      // console.log(this.courses);
    },
    getRules(){
      this.ruleResult.push(this.ruleLine)
      console.log(this.ruleResult)
      this.ruleLine = {}
    },
    changeRule(val) {
      if (val == "COURSE_CLASS_COUNT") {
        this.flagCourse = true;
        this.flagCount = true;
        this.flagChoice = false;
      } else if (val == "MULTIPART_CLASS_SEPARATE_DAY") {
        this.flagCourse = false;
        this.flagCount = true;
        this.flagChoice = false;
      } else {
        this.flagChoice = true;
        this.flagCourse = false;
        this.flagCount = false;
      }
    },
    queryRuleData() {
      ruleApi
        .query()
        .then(res => {
          if ((res.code = "140001")) {
            console.log(res.result);
            this.allRules = res.result;
          } else {
            this.$message.error("请求错误!" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    queryTermData() {
      termApi
        .query(1, 1000)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("请求成功！");
            this.termData = res.result.results;
          } else {
            this.$message.error("请检查网络连接" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    queryCourseData() {
      courseApi
        .query(1, 1000)
        .then(res => {
          if ((res.code = "140001")) {
            console.log(res.result.results);
            this.courseData = res.result.results;
          } else {
            this.$message.error("请求错误!" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },

    check(allRules) {
      for (let i = 0; i < allRules.length; i++) {
        if (allRules[i].ruleName == "配置课程教学课堂数量") {
          if (!/^[1-9]$/.test(allRules[i].ruleValue)) {
            this.$message.error("配置课程教学课堂数量错误!请输入1-9之间的整数");
            return false;
          }
        } else if (allRules[i].ruleName == "配置每周多节课课程相隔天数") {
          if (!/^[1-4]$/.test(allRules[i].ruleValue)) {
            this.$message.error(
              "配置每周多节课课程相隔天数错误!请输入1-4之间的整数"
            );
            return false;
          }
        } else if (allRules[i].ruleName == "配置每周多节课不均时排课倾向") {
          if (allRules[i].ruleValue != "front" && allRules[i] != "behind") {
            this.$message.error(
              "配置每周多节课不均时排课倾向错误!请输入front 或 behind"
            );
            return false;
          }
        } else {
          if (
            allRules[i].ruleValue != "true" &&
            allRules[i].ruleValue != "false"
          ) {
            this.$message.error(
              allRules[i].ruleValue + "请检查true 和 false 输入是否正确!"
            );
            return false;
          }
        }
      }
      return true;
    },

    setRules(allRules) {
      let obj = {};
      let ruleArr = [];
      for (let i = 0; i < allRules.length; i++) {
        obj.ruleKey = allRules[i].ruleKey;
        obj.ruleValue = allRules[i].ruleValue;
        ruleArr.push(obj);
        obj = {};
      }
      console.log(ruleArr);
      return ruleArr;
    },
    assignlabs() {
      // var rules = [];
      // this.check(this.allRules);
      // console.log(this.allRules);
      // if (!this.check(this.allRules) || this.termId == "") {
      //   this.$message.error("请选择学期!");
      //   return false;
      // } else {
      //   rules = this.setRules(this.allRules);
      // }
      //this.ruleResult.push(this.ruleLine);
      console.log(this.ruleResult);
      console.log(this.termId);
      assignApi
        .assign(this.termId, this.ruleResult)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("分配成功！");
            console.log(res);
            this.assignResult = res.result
            //bus.$emit('result', res.result)
           // this.$router.push({ path: "/assignresult"});
          } else {
            this.$message.error("error" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    }
  },
  created() {
    this.queryTermData();
    this.queryRuleData();
    this.queryCourseData();
  }
};
</script>
<style scroped>
.tb-edit .el-input {
  display: none;
}
.tb-edit .current-row .el-input {
  display: block;
}
.tb-edit .current-row .el-input + span {
  display: none;
}
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
.btn {
  margin-left: 500px;
}
</style>
