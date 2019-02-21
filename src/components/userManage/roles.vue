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
      <el-table-column prop="roleName" label="角色名称" width="100"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="100"></el-table-column>
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
        <el-form-item label="角色名称">
          <el-input v-model="formAdd.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formAdd.roleDesc" placeholder="角色描述"></el-input>
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
export default {
  name: "permission",
  data() {
    return {
      tableData: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      form: {
        roleName: "",
        roleDesc: ""
      },
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        roleName: "",
        roleDesc: ""
      }
    };
  },
  methods: {
    deleteRow(id) {
      roleApi
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
    queryTable() {
      roleApi
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
      roleApi
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
  }
};
</script>
