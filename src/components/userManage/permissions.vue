<template>
  <div>
    <!-- 操作区----start -->
    <el-row>
      <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
      <el-button size="medium" type="primary" @click="addPermission()">添加新权限</el-button>
    </el-row>
    <br>
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="menuId" label="菜单Id" width="300"></el-table-column>
      <el-table-column prop="roleId" label="角色Id" width="300"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格---end -->
    <!-- 新增弹框---start -->
    <el-dialog title="添加新权限" :visible.sync="dialogAddVisible" width="800px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :model="formAdd"
      >
        <el-form-item label="权限">
          <el-checkbox-group v-model="menuArray" size="medium" style="width:600px">
            <el-checkbox-button
              v-for="menu in menuData"
              :label="menu.id"
              :key="menu.id"
              :value="menu.id"
            >{{menu.menuName}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formAdd.roleId" size="medium">
            <el-option
              v-for="role in roleData"
              :label="role.roleName"
              :key="role.id"
              :value="role.id"
            ></el-option>
          </el-select>
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

<style  scroped>
.right {
  float: right;
}
</style>

<script>
import * as menuApi from "../../apis/permission/menu.js";
import * as roleApi from "../../apis/permission/role.js";
import * as perApi from "../../apis/permission/permission.js";
export default {
  name: "permission",
  data() {
    return {
      menuArray: [],
      menuData: [],
      roleData: [],
      tableData: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      form: {
        menuIds: "",
        roleId: ""
      },
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        menuIds: "",
        roleId: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    //权限管理
    addPermission() {
      this.dialogAddVisible = true;
      this.menuArray = [];
    },
    deleteRow(id) {
      perApi
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
    queryMenu() {
      menuApi
        .query()
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
            this.menuData = res.result;
          } else {
            this.$message.error("请求失败，错误描述为：" + res.message);
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
          } else {
            this.$message.error("请求失败，错误描述为：" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    queryTable() {
      perApi
        .query()
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
            this.tableData = res.result;
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

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteMany() {
      var ids = this.multipleSelection.map(item => item.id);
      for (let i = 0; i < ids.length; i++) {
        this.deleteRow(ids[i]);
      }
    },

    save() {
      console.log(this.menuArray);
      this.formAdd.menuIds = this.menuArray;
      perApi
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
    this.queryMenu();
    this.queryRole();
  }
};
</script>
