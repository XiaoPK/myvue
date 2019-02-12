<template>
  <div>
    <el-row>
      <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
    </el-row>
    <div class="tabwidth">
      <el-table
        :data="tableData"
        stripe
        :default-sort="{prop: 'termId', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="termId" sortable label="学期" width="180"></el-table-column>
        <el-table-column prop="studentId" label="学生" width="180"></el-table-column>
        <el-table-column prop="courseId" label="所选课程" width="180"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    </div>
    <!-- 表格---end -->
    <div class="wide" title="添加选课信息">
      <el-row>
        <h2>添加选课信息</h2>
      </el-row>
      <el-form :label-position="labelPosition" label-width="100px" :inline="true" :model="formAdd">
        <el-select v-model="formAdd.termId" placeholder="请选择学期">
          <el-option
            v-for="item in termData"
            :key="item.terName"
            :label="item.termName"
            :value="item.id"
          ></el-option>
        </el-select>

        <el-select v-model="formAdd.studentId" placeholder="请选择学生">
          <el-option
            v-for="item in studentData"
            :key="item.studentNumber"
            :label="item.studentName"
            :value="item.id"
          ></el-option>
        </el-select>

        <el-select v-model="formAdd.courseId" placeholder="请选择课程">
          <el-option
            v-for="item in courseData"
            :key="item.courseName"
            :label="item.courseName"
            :value="item.id"
          ></el-option>
        </el-select>

        <a class="btn-add" type="primary" @click="save()">确定添加</a>
      </el-form>
    </div>
  </div>
</template>

<style>
h2 {
  text-align: center;
  font-weight: normal;
  margin-bottom: 15px;
}
.el-form-item__content {
  width: 220px;
}

.tabwidth {
  width: 740px;
  float: left;
}
.wide {
  width: 300px;
  text-align: center;
  float: left;
}
.btn-add {
  display: block;
  width: 220px;
  height: 40px;
  line-height: 40px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  margin: 8px auto;
  background-color: #409eff;
  color: #fff;
}
.btn-add:hover {
  background-color: rgb(103, 178, 253);
}
</style>

<script>
import * as stuCouApi from "../../apis/studentCourse.js";
import * as courseApi from "../../apis/courses.js";
import * as studentApi from "../../apis/students.js";
import * as termApi from "../../apis/term.js";
export default {
  data() {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        pageTotal: 1
      },
      tableData: [],
      termData: [],
      courseData: [],
      studentData: [],
      form: {
        //表单对象
        termId: "",
        courseId: "",
        studentId: ""
      },
      formAdd: {
        //表单对象
        termId: "",
        courseId: "",
        studentId: ""
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      multipleSelection: []
    };
  },
  methods: {
    querytermData(page, size) {
      termApi
        .query(page, size)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("请求成功");
            this.termData = res.result.results;
            console.log(this.termData);
            console.log(res.result);
          } else {
            this.$message.error("请求失败，错误描述为：" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    querycourseData(page, size) {
      courseApi
        .query(page, size)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("请求成功");
            this.courseData = res.result.results;
            console.log(this.courseData);
          } else {
            this.$message.error("请求失败，错误描述为：" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    querystudentData(page, size) {
      studentApi
        .query(page, size)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("请求成功");
            this.studentData = res.result.results;
            console.log(this.studentData);
          } else {
            this.$message.error("请求失败，错误描述为：" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    queryTable(index, size) {
      stuCouApi
        .query(index, size)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("请求成功");
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

    deleteRow(id) {
      stuCouApi
        .del(id)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("删除成功");
            this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
          } else {
            this.$message.error("error" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    handleDelete(index, rowData) {
      var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
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
      stuCouApi
        .add(this.formAdd)
        .then(res => {
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
    }
  },
  created() {
    this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
    this.querytermData(1, 100);
    this.querycourseData(1, 100);
    this.querystudentData(1, 10000);
  }
};
</script>
