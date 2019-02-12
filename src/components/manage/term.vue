<template>
  <div>
    <!-- 操作区----start -->
    <el-row>
      <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
      <el-button size="medium" type="primary" @click="dialogAddVisible = true">添加学期</el-button>
    </el-row>
    <br>
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :default-sort="{prop: 'termId', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="termName" sortable label="学期" width="100"></el-table-column>
      <el-table-column prop="beginDay" sortable label="开始时间" width="180"></el-table-column>
      <el-table-column prop="endDay" label="结束时间" width="180"></el-table-column>
      <el-table-column prop="teachWeeks" label="教学周数" width="100"></el-table-column>
      <el-table-column prop="weeks" label="学期周数" width="100"></el-table-column>
      <el-table-column prop="offerCourses" label="开设课程" width="200"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
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
    <!-- 新增弹框---start -->
    <el-dialog title="添加新学期" :visible.sync="dialogAddVisible" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="formAdd"
        class="demo-form-inline"
      >
        <el-form-item label="学期" prop="termName">
          <el-input v-model="formAdd.termName" placeholder="学期"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginDay">
          <el-date-picker v-model="formAdd.beginDay"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="结束时间" prop="endDay">
          <el-date-picker v-model="formAdd.endDay"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="教学周数" prop="teachWeeks">
          <el-input v-model="formAdd.teachWeeks" placeholder="教学周数"></el-input>
        </el-form-item>
        <el-form-item label="学期周数" prop="weeks">
          <el-input v-model="formAdd.weeks" placeholder="学期周数"></el-input>
        </el-form-item>
        <el-form-item label="开设课程" prop="type">
          <el-checkbox-group
            v-model="formAdd.offerCourses"
            size="medium"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="course in courses"
              :label="course.id"
              :key="course.id"
              border
            >{{course.courseName}}</el-checkbox>
          </el-checkbox-group>
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
import * as termApi from "../../apis/term.js";
import * as courseApi from "../../apis/courses.js";
export default {
  name: "term",
  data() {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        pageTotal: 16
      },
      courses: [],
      tableData: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      form: {
        beginDay: "",
        endDay: "",
        offerCourses: [],
        teachWeeks: "",
        termName: "",
        weeks: ""
      },
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        beginDay: "",
        endDay: "",
        offerCourses: [],
        teachWeeks: "",
        termName: "",
        weeks: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    //得到课程
    getCourses() {
      courseApi
        .query(1, 10000)
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
            this.$message.success("请求成功");
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
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      console.log("点击");
      this.checkAll = checkedCount === this.courses.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.courses.length;
    },
    deleteRow(id) {
      termApi
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
      termApi
        .query(index, size)
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
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
        console.log(this.formAdd)
      termApi
        .add(this.formAdd)
        .then(res => {
          console.log(this.formAdd);
          if (res.code == "140001") {
            this.$message.success("添加成功");
            this.formAdd = {};
            this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
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
    this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
    this.getCourses();
  }
};
</script>

