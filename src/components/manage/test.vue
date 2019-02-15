<template>
  <div>
    <div>
      <span class="demonstration">1、请选择学期</span>

      <el-select v-model="termId" placeholder="请选择学期">
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
          <el-select v-model="ruleLine.ruleKey" placeholder="请选择分配规则">
            <el-option
              v-for="item in allRules"
              :key="item.ruleKey"
              :label="item.ruleDetail.ruleName"
              :value="item.ruleKey"
              @click="getCourses"
            ></el-option>
          </el-select>
          <br>
        </el-form-item>
        <el-form-item label="请选择课程">
          <el-select v-model="ruleLine.ruleValue">
            <el-option
              v-for="item in courses"
              :key="item.courseName"
              :label="item.courseName"
              :value="item.Id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button class="btn" type="primary" @click="assignlabs()">开始分配</el-button>
    </div>
  </div>
</template>
btn-step
<script>
import * as termApi from "../../apis/term.js";
import * as ruleApi from "../../apis/rules.js";
import * as courseApi from "../../apis/courses.js";
import * as assignApi from "../../apis/assignResult.js";
export default {
  data() {
    return {
      termId:"",
      termData: [],
      ruleLine: {},
      ruleResult: {},
      courses: [],
      courseData: [],
      allRules: []
    };
  },
  methods: {
    getCourses() {
      if (this.termId == "") {
        this.$message.warn("请先选择学期!");
      }
      var term = this.termData.filter(function(item){
        return item.id == this.termId
      })
      for (let i = 0 ; i < this.term.offerCourses.length; i++) {
        var data = this.courseData.filter(function(item) {
          return item.id == this.term.offerCourses[i];
        });
        this.courses.push(data);
      }
      console.log(this.courses);
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
      var rules = [];
      this.check(this.allRules);
      console.log(this.allRules);
      if (!this.check(this.allRules) || this.termId == "") {
        this.$message.error("请选择学期!");
        return false;
      } else {
        rules = this.setRules(this.allRules);
      }
      console.log(this.termId);
      assignApi
        .assign(this.termId, rules)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("分配成功！");
            console.log(res);
            this.$router.push({ path: "/assignresult" });
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
    this.queryCourseData()
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
