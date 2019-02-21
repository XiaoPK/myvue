<template>
  <div style="width:600px;margin-left:200px">
      <h3 style="text-align:center;font-weight:200">修改个人信息</h3>
      <br>
    <el-form :model="formEdit" label-width="80px" label-position="center">
      <el-form-item label="职工编号">
        <el-input v-model="formEdit.teacherNumber" placeholder="职工编号" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formEdit.teacherName" placeholder="姓名" disabled="disabled"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio v-model="formEdit.sex" label="2"  disabled>女</el-radio>
        <el-radio v-model="formEdit.sex" label="1" disabled>男</el-radio>
      </el-form-item>
      <el-form-item label="办公室">
        <el-input v-model="formEdit.office" placeholder="办公室"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formEdit.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formEdit.phone" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item label="教授课程" prop="type">
        <el-checkbox-group
          v-model="formEdit.teachCourses"
          size="medium"
        >
          <el-checkbox
            v-for="course in courses"
            :label="course.courseName"
            :key="course.courseName"
            border
          >{{course.courseName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <a class="btn-add" @click="updateInfo">确认保存</a>
  </div>
</template>
<style>
</style>

<script>
import * as teacherApi from "../../apis/teachers.js";
import * as courseApi from "../../apis/courses.js";
export default {
  data() {
    return {
      courses:{},
      teachCourses: [],
      formEdit: {
        //表单对象
        teacherNumber: "",
        teacherName: "",
        sex: "",
        email: "",
        teachCourses: [],
        office: "",
        phone: ""
      }
    };
  },
  methods: {
    //课程
    getCourses() {
      courseApi
        .query(1, 10000)
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
            this.courses = res.result.results;
            console.log(this.courses);
          } else {
            this.$message.error("请求失败，错误描述为：" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    queryInfo() {
      let str = { teacherNumber: sessionStorage.getItem("account") };
      teacherApi
        .search(1, 1, str)
        .then(res => {
          if (res.code == "140001") {
            console.log(res);
            this.formEdit = res.result.results[0];
            if (this.formEdit.sex == "BOY") {
              this.formEdit.sex = "1";
            } else {
              this.formEdit.sex = "2";
            }
          } else {
            this.$message.error("error" + res.message);
          }
        })
        .catch(error => {
          this.$message.error("" + error);
        });
    },
    updateInfo() {
      teacherApi
        .update(this.formEdit)
        .then(res => {
          console.log(this.formEdit);
          if (res.code == "140001") {
            this.$message.success("保存成功");
          } else {
            this.$message.error("error" + res.message);
          }
          this.queryInfo();
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    }
  },
  created() {
    this.queryInfo();
    this.getCourses()
  }
};
</script>

