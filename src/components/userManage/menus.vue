<template>
  <div>
    <!-- 操作区----start -->
    <el-row>
      <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
      <el-button size="medium" type="primary" @click="dialogAddVisible = true">添加新菜单</el-button>
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
      <el-table-column prop="menuName"  label="菜单名称" width="100"></el-table-column>
      <el-table-column prop="menuType"  label="菜单类型" width="100"></el-table-column>
      <el-table-column prop="menuDesc" label="菜单描述" width="180"></el-table-column>
      <el-table-column prop="menuAddress" label="菜单地址" width="180"></el-table-column>
      <el-table-column prop="pid" label="父级ID" width="200"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格---end -->
    <!-- 新增弹框---start -->
    <el-dialog title="添加新菜单" :visible.sync="dialogAddVisible" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="formAdd"
        class="demo-form-inline"
      >
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="formAdd.menuName" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio v-model="formAdd.menuType" label="1">页面</el-radio>
          <el-radio v-model="formAdd.menuType" label="2">API接口</el-radio>

        </el-form-item>

        <el-form-item label="菜单描述" prop="menuDesc">
          <el-input v-model="formAdd.menuDesc"  placeholder="菜单描述"></el-input>
        </el-form-item>
        <el-form-item label="菜单地址" prop="menuAddress">
          <el-input v-model="formAdd.menuAddress" placeholder="菜单地址"></el-input>
        </el-form-item>
        <el-form-item label="父级ID" prop="pid">
          <el-input v-model="formAdd.pid" placeholder="父级ID"></el-input>
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
import * as menuApi from "../../apis/permission/menu.js";
export default {
  name: "menus",
  data() {
    return {
      courses: [],
      tableData: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      form: {
          menuName:"",
          menuType:"",
          menuDesc:"",
          menuAddress:"",
          pid:""
      },
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
          menuName:"",
          menuType:"",
          menuDesc:"",
          menuAddress:"",
          pid:""
      },
      multipleSelection: []
    };
  },
  methods: {
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      console.log("点击");
      this.checkAll = checkedCount === this.courses.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.courses.length;
    },
    deleteRow(id) {
      menuApi
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
      menuApi
        .query()
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
            this.tableData = res.result
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
        console.log(this.formAdd)
      menuApi
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
