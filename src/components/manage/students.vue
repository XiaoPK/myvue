<template>
  <div>
    <!-- 操作区----start -->
    <el-row class="right">
      <el-button size="medium" type="primary" @click="dialogAddVisible = true">添加学生</el-button>
      <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
    </el-row>
    <br>
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :default-sort="{prop: 'studentNumber', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="studentNumber" sortable label="学号" width="150"></el-table-column>
      <el-table-column prop="studentName" sortable label="姓名" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="birthday" sortable label="出生日期" width="150"></el-table-column>
      <el-table-column prop="grade" sortable label="年级" width="100"></el-table-column>
      <el-table-column prop="college" label="学院" width="150"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,sizes,prev, pager, next,jumper"
      :current-page="pageInfo.pageIndex"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.pageTotal"
      :page-sizes="[5, 10, 20, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <!-- 表格---end -->
    <!-- 编辑弹框---start -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="formEdit"
        class="demo-form-inline"
      >
        <el-form-item label="姓名">
          <el-input v-model="formEdit.studentName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="formEdit.studentNumber" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="formEdit.sex" label="2">女</el-radio>
          <el-radio v-model="formEdit.sex" label="1">男</el-radio>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="日期"
            v-model="formEdit.birthday"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="formEdit.grade" placeholder="年级"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="formEdit.college" placeholder="学院"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框---end -->
    <!-- 新增弹框---start -->
    <el-dialog title="添加学生" :visible.sync="dialogAddVisible" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="formAdd"
        class="demo-form-inline"
      >
        <el-form-item label="姓名">
          <el-input v-model="formAdd.studentName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="formAdd.studentNumber" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="formAdd.sex" label="2">女</el-radio>
          <el-radio v-model="formAdd.sex" label="1">男</el-radio>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="日期"
            v-model="formAdd.birthday"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="formAdd.grade" placeholder="年级"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="formAdd.college" placeholder="学院"></el-input>
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
.el-form-item__content {
  width: 220px;
}
.right {
  float: right;
}
</style>

<script>
import * as studentApi from "../../apis/students.js";
export default {
  name: "students",
  data() {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        pageTotal: 1
      },
      tableData: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      form: {
        studentNumber: "",
        studentName: "",
        sex: "",
        grade: "",
        birthday: "",
        college: ""
      },
      dialogFormVisible: false,
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        //表单对象
        studentNumber: "",
        studentName: "",
        sex: "",
        grade: "",
        birthday: "",
        college: ""
      },
      formEdit: {
        //表单对象
        studentNumber: "",
        studentName: "",
        sex: "",
        grade: "",
        birthday: "",
        college: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate();
        return Y+M+D;
    },
    handleEdit(rowData) {
      console.log(rowData);
      this.formEdit = rowData;
      if(this.formEdit.sex == "BOY"){
        this.formEdit.sex = "1"
      }else{
        this.formEdit.sex = "2"
      }
      this.dialogFormVisible = true;
    },
    deleteRow(id) {
      studentApi
        .del(id)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("删除成功！");
            this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
          } else {
            this.$message.error("error" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    queryTable(index, size) {
      studentApi
        .query(index, size)
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
            this.$message.success("请求成功");
            for (let i = 0; i < res.result.results.length; i++) {
              res.result.results[i].birthday = this.timestampToTime(res.result.results[i].birthday)     
              console.log(res.result.results[i])
            }
            this.tableData = res.result.results;
            this.pageInfo.pageTotal = parseInt(res.result.totalRecord);
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
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.queryTable(this.pageInfo.pageIndex, val);
    },
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.queryTable(val, this.pageInfo.pageSize);
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
      if (!this.dialogFormVisible) {
        console.log(this.formAdd);
        studentApi
          .add(this.formAdd)
          .then(res => {
            console.log(this.formAdd);
            if (res.code == "140001") {
              this.$message.success("添加成功");
              this.formAdd = {};
              this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
            } else {
              this.$message.error("error：" + res.message);
            }
          })
          .catch(error => {
            this.$message.error(error + "");
          });
        this.formAdd = {};
        this.dialogAddVisible = false;
      } else {
        studentApi
          .update(this.formEdit)
          .then(res => {
            console.log(res);
            if (res.code == "140001") {
              this.$message.success("保存成功");
              this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
              this.dialogFormVisible = false;
            } else {
              this.$message.error("error" + res.message);
            }
          })
          .catch(error => {
            this.$message.error(error + "");
          });
      }
    }
  },
  created() {
    this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
  }
};
</script>
