<template>
  <div>
    <!-- 操作区----start -->
    <el-row>
      <el-button size="medium" type="primary" @click="dialogAddVisible = true">添加新菜单</el-button>
    </el-row>
    <br>
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="account" label="账户" width="100"></el-table-column>
      <el-table-column prop="password" label="密码" width="400"></el-table-column>
      <el-table-column prop="userType" label="用户类型" width="100px"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格---end -->
    <!-- 新增弹框---start -->
    <el-dialog title="添加新角色" :visible.sync="dialogAddVisible" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="formAdd"
        class="demo-form-inline"
      >
        <el-form-item label="账户">
          <el-input v-model="formAdd.account" placeholder="账户"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formAdd.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-radio v-model="formAdd.userType" label="1">管理员</el-radio>
          <el-radio v-model="formAdd.userType" label="2">教师</el-radio>
          <el-radio v-model="formAdd.userType" label="3">学生</el-radio>
          <!-- <el-select v-model="formAdd.userType" size="medium">
            <el-option
              v-for="role in roleData"
              :label="role.roleName"
              :key="role.roleName"
              :value="role.id"
            ></el-option>
          </el-select>-->
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增弹框---end -->
  </div>
</template>

<style>
.right {
  float: right;
}
</style>

<script>
import * as roleApi from "../../apis/permission/role.js";
import * as userApi from "../../apis/permission/user.js";
export default {
  name: "permission",
  data() {
    return {
      roleData: [],
      tableData: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      form: {
        account: "",
        password: "",
        userType: ""
      },
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        account: "",
        password: "",
        userType: ""
      }
    };
  },
  methods: {
    deleteRow(id) {
      userApi
        .del(id)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("删除成功！");
            this.queryTable();
          } else {
            this.$message.error("error" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    queryRole() {
      roleApi
        .query()
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
            this.roleData = res.result;
            console.log(this.roleData);
          } else {
            this.$message.error("请求失败，错误描述为：" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    queryTable() {
      userApi
        .query()
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
            this.tableData = res.result;
            console.log(this.tableData);
          } else {
            this.$message.error("请求失败，错误描述为：" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    handleDelete(rowData) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRow(rowData.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    save() {
      console.log(this.formAdd);
      userApi
        .add(this.formAdd)
        .then(res => {
          console.log(this.formAdd);
          if (res.code == "140001") {
            this.$message.success("添加成功");
            this.formAdd = {};
            this.queryTable();
          } else {
            this.$message.error("error：" + res.message);
            console.log(res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
      this.formAdd = {};
      this.dialogAddVisible = false;
    }
  },
  created() {
    this.queryTable();
    this.queryRole();
  }
};
</script>
