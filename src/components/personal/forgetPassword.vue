<template>
  <div class="bgc" style="height:700px">
    <h1 style="text-align:center;font-weight:200;padding-top:5%">重置密码</h1>
    <br>
    <el-form
      :model="formInfo"
      :rules="rules"
      ref="formInfo"
      label-position="left"
      label-width="80px"
      class="forgetPW"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="formInfo.account"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="formInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formInfo.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input v-model="formInfo.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="formInfo.checkPass" type="password"></el-input>
      </el-form-item>
      <a type="primary" @click="submit" class="btn-add">提交</a>
    </el-form>
  </div>
</template>
<style>
.forgetPW {
  width: 420px;
  text-align: center;
  margin: auto;
}
</style>

<script>
import * as userApi from "../../apis/permission/user.js";
import * as teacherApi from "../../apis/teachers.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formInfo.checkPass !== "") {
          this.$refs.formInfo.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.formInfo.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var test = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱！"));
      }
    };
    return {
      formInfo: {
        account: "",
        name: "",
        phone: "",
        email: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账户", trigger: "blur" }],
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      info: {}
    };
  },
  methods: {
    queryInfo(str) {
      str = { teacherNumber: str };
      teacherApi
        .search(1, 1, str)
        .then(res => {
          if (res.code == "140001") {
            console.log(res);
            this.info = res.result.results[0];
            console.log(this.info);
          } else {
            this.$message.error("error" + res.message);
          }
        })
        .catch(error => {
          this.$message.error("" + error);
        });
    },
    checkInfo() {
      if (this.info.teacherName != this.formInfo.name) {
        this.$message.error("您输入的信息有误！");
        return false;
      } else if (this.info.email != this.formInfo.email) {
        this.$message.error("您输入的信息有误！");
        return false;
      } else if (this.info.phone != this.formInfo.phone) {
        this.$message.error("您输入的信息有误！");
        return false;
      } else {
        return true;
      }
    },
    submit() {
      this.queryInfo(this.formInfo.account);
      if (!this.checkInfo()) {
        return false;
      }
      let password = this.formInfo.pass;
      userApi
        .update(password)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("您已经成功重置密码！");
            this.$router.push("/login");
          } else {
            this.$message.warn("错误:" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    }
  }
};
</script>

