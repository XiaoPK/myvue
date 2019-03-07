<template>
  <div  style="width:400px">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
    >
    <el-form-item label="请输入原密码" prop="oldpass">
        <el-input type="password" v-model="oldpass" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <a class="btn-add" @click="changePaw">确定</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import * as userApi from "../../apis/permission/user.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      account: sessionStorage.getItem("account"),
      oldpass:'',
      ruleForm: {
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
      getOldpass(value){
          if(sessionStorage.getItem('password') == value){
              return true
          }else{
              return false
          }
      },
    changePaw() {
      if(!this.getOldpass(this.oldpass)){
          this.$message.error("原密码输入错误!")
          return
      }
      let password = this.ruleForm.pass;
      userApi
        .update(password)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("您已经成功修改密码！");
            console.log(res)
            this.$router.push('/login')
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
