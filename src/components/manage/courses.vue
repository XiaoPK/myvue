<template>
  <div>
    <!-- 操作区----start -->
    <el-row>
      <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
    </el-row>
    <br>
    <div>
      <div class="tabwidth">
        <!-- 表格---start -->
        <el-table
          :data="tableData"
          stripe
          style="width: 640px"
          :default-sort="{prop: 'courseNumber', order: 'descending'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="courseNumber" sortable label="课程编号" width="100"></el-table-column>
          <el-table-column prop="courseName" label="课程名称" width="100"></el-table-column>
          <el-table-column prop="period" label="课时" width="50"></el-table-column>
          <el-table-column prop="courseDesc" label="课程简介" width="160"></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="120">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <!-- 表格---end -->
      </div>
      <div class="right wide" title="添加课程信息">
        <el-row>
          <h2>添加课程信息</h2>
        </el-row>
        <el-form
          :rules="rules"
          :label-position="labelPosition"
          label-width="100px"
          :inline="true"
          :model="formAdd"
        >
          <el-form-item label="课程编号" prop="courseNumber">
            <el-input v-model="formAdd.courseNumber" placeholder="课程编号"></el-input>
          </el-form-item>
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="formAdd.courseName" placeholder="课程名称"></el-input>
          </el-form-item>
          <el-form-item label="课时量" prop="period">
            <el-input v-model="formAdd.period" type="number" placeholder="课时量"></el-input>
          </el-form-item>
          <el-form-item label="课程简介" prop="courseDesc">
            <el-input type="textarea" v-model="formAdd.courseDesc" placeholder="课程简介"></el-input>
          </el-form-item>

          <a class="btn-add" type="primary" @click="save()">确定添加</a>
        </el-form>
      </div>
    </div>
    <!-- 编辑弹框---start -->
    <el-dialog title="修改课程信息" :visible.sync="dialogFormVisible" width="400px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="formEdit"
        class="demo-form-inline"
      >
        <el-form-item label="课程编号">
          <el-input v-model="formEdit.courseNumber" placeholder="课程编号"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="formEdit.courseName" placeholder="课程名称"></el-input>
        </el-form-item>

        <el-form-item label="课时量">
          <el-input v-model="formEdit.period" placeholder="课时量"></el-input>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input type="textarea" v-model="formEdit.courseDesc" placeholder="课程简介"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save(formEdit)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框---end -->
  </div>
</template>

<style scroped>
h2 {
  text-align: center;
  font-weight: normal;
  margin-bottom: 15px;
}
.el-form-item__content {
  width: 220px;
}

.tabwidth {
  width: 640px;
  float: left;
}
.wide {
  width: 400px;
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
import * as courseApi from "../../apis/courses.js";
export default {
  courseName: "courses",
  data() {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 1
      },
      tableData: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
      form: {
        courseNumber: "",
        courseName: "",
        period: "",
        courseDesc: ""
      },
      dialogFormVisible: false,
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        //表单对象
        courseNumber: "",
        courseName: "",
        period: "",
        courseDesc: ""
      },
      rules: {
        courseNumber: [
          { required: true, message: "请输入课程编号", trigger: "blur" }
        ],
        courseName: [
          { required: true, message: "请输入课程名称", trigger: "blur" }
        ],
        period: [{ required: true, message: "请输入课时量", trigger: "blur" }],
        courseDesc: [
          { required: true, message: "请输入课程简介", trigger: "blur" }
        ]
      },
      formEdit: {
        //表单对象
        courseNumber: "",
        courseName: "",
        period: "",
        courseDesc: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    handleEdit(index, rowData) {
      // var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
      // this.$message({
      //   message: msg,
      //   type: "success"
      // });
      // console.log(rowData);
      this.formEdit = rowData;
      this.dialogFormVisible = true;
    },

    deleteRow(id) {
      courseApi
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
          this.$message.info("已取消删除");
        });
    },

    queryTable(index, size) {
      courseApi
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
    handleSizeChange(val) {
      this.queryTable(this.pageInfo.pageIndex, val);
    },
    handleCurrentChange(val) {
      this.queryTable(val, this.pageInfo.pageSize);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteMany() {
      var ids = this.multipleSelection.map(item => item.id);
      for (let i = 0; i < ids.length; i++) {
        this.deleteRow(ids[i])
      }
    },
    save() {
      if (!this.dialogFormVisible) {
        console.log(this.formAdd);
        console.log(JSON.stringify(this.formAdd));
        //var abc = courseApi.add(JSON.stringify(this.formAdd));
        courseApi
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
      } else {
        courseApi
          .update(this.formEdit)
          .then(res => {
            console.log(res);
            if (res.code == "140001") {
              this.$message.success("保存成功");
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
