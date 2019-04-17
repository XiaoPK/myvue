<template>
  <div>
    <div class="box">
      <el-select v-model="termId" placeholder="请选择学期" @change="getCourses">
        <el-option
          v-for="item in termData"
          :key="item.termName"
          :label="item.termName"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="box">
      <el-form :inline="true" :model="ruleLine">
        <el-form-item label="">
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
        <el-button @click="getRules" type="primary">保存</el-button>
        <div>
          <h3>已选规则列表</h3>
          <el-table :data="ruleResultName" stripe style="width: 100%">
            <el-table-column prop="ruleName" label="规则" width="300"></el-table-column>
            <el-table-column prop="ruleValue" label="取值" width="200"></el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
    <div>
      <el-button class="btn" type="primary" @click="assignlabs()">开始分配</el-button>
    </div>
  </div>
</template>
<script>
  import * as termApi from "../../apis/term.js";
  import * as courseApi from "../../apis/courses.js";
  import * as assignApi from "../../apis/assignResult.js";
  import bus from "../views/bus.js";

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
        ruleResultName: [],
        courseData: [],
        allRules: [],
        assignResult: []
      };
    },
    methods: {
      getCourses(val) {
        this.termId = val;
        var term = this.termData.filter(function (item) {
          return item.id == val;
        });
        this.offerCourses = term[0].offerCourses;
        console.log(this.offerCourses);
        console.log(term);
      },
      getRules() {
        this.ruleResult.push(this.ruleLine);
        let ruKey = this.ruleLine.ruleKey
        for (let i = 0; i < this.allRules.length; i++) {
          if (this.allRules[i].ruleKey == ruKey) {
            var ruleName = this.allRules[i].ruleDetail.ruleName
          }
        }
        if (this.ruleLine.ruleKey == "COURSE_CLASS_COUNT") {
          var courId = this.ruleLine.courseId
          var course = this.courseData.filter(function (item) {
            return item.id == courId
          })
          console.log(course)
          if (!course && (this.offerCourses.indexOf(courId) > 0)) {
            this.$message.error("该课程不在本学期开设，请重新选择!")
          } else {
            this.ruleLine.ruleValue = course[0].courseName + '——' + this.ruleLine.classCount + '课堂'
          }
        }
        if (this.ruleLine.ruleKey == "MULTIPART_CLASS_SEPARATE_DAY") {
          this.ruleLine.ruleValue = this.ruleLine.classCount
        }
        this.ruleResultName.push({ruleName: ruleName, ruleValue: this.ruleLine.ruleValue})
        console.log(this.ruleResultName);
        this.ruleLine = {};
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
        assignApi
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

      setRules(ruleResult) {
        let ruleArr = [];
        let couArr = ""; //定义课程
        let couStr = "";
        let obj = {};
        for (let i = 0; i < ruleResult.length; i++) {
          if (ruleResult[i].ruleKey === "COURSE_CLASS_COUNT") {
            couStr =
              "{" +
              '"courseId":' +
              ruleResult[i].courseId +
              ',' +
              '"classCount":' +
              ruleResult[i].classCount +
              '}';
            if (!couArr) {
              couArr = "[" + couStr;
            } else {
              couArr += "," + couStr;
            }
          } else {
            ruleArr.push(ruleResult[i]);
          }
        }
        if (ruleResult.length !== 0) {
          couArr += "]";
          ruleArr.push({ruleKey: "COURSE_CLASS_COUNT", ruleValue: couArr});
        }
        return ruleArr;
      },
      assignlabs() {
        console.log(this.ruleResult);
        var rules = this.setRules(this.ruleResult);
        console.log(rules);
        assignApi
          .assign(this.termId, rules)
          .then(res => {
            if (res.code == "140001") {
              this.$message.success("分配成功！");
              console.log(res);
              this.assignResult = res.result;
              localStorage.setItem('assignR', JSON.stringify(this.assignResult))
              this.$router.push({path: "/assignresult"});
            } else {
              this.$message.error("error" + res.message);
            }
          })
          .catch(error => {
            this.$message.error(error + "");
          });
      }
    },
    beforeDestroy() {
      bus.$emit('result', this.assignResult)
    },
    created() {
      this.queryTermData();
      this.queryRuleData();
      this.queryCourseData();
    }
  };
</script>
<style scroped>
  h3 {
    font-weight: 200;
  }

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
    color: #343538;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .box {
    margin-bottom: 40px;
    margin-left: 30px;
  }

  .btn {
    margin-left: 500px;
  }
</style>
