<template>
  <div>
    <!-- 操作区----start -->
    <el-row>
      <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
      <el-button size="medium" type="primary" @click="dialogAddVisible = true">添加课程</el-button>
      <el-button size="medium" type="primary" @click="cleanCache">导入数据</el-button>
      <a href="http://alish1.iyuhui.cn:8089/course/query/1/1000/export/excel
" class="export">导出数据</a>
      <div style="display:inline-block;margin-left:150px;">
        <el-input placeholder="请输入内容" size="medium" v-model="search" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="名称" value="courseName"></el-option>
            <el-option label="编号" value="courseNumber"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchAll"></el-button>
        </el-input>
      </div>
    </el-row>
    <br>
    <div>
      <!-- 表格---start -->
      <el-table
        :data="tableData"
        stripe
        :default-sort="{prop: 'courseNumber', order: 'descending'}"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="courseNumber" sortable label="课程编号" width="150"></el-table-column>
        <el-table-column prop="courseName" label="课程名称" width="180"></el-table-column>
        <el-table-column prop="period" label="课时" width="100"></el-table-column>
        <el-table-column prop="courseDesc" label="课程简介" width="260"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
        :page-sizes="[5, 10, 20, 50, 1000]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <!-- 表格---end -->
    </div>

    <!-- 新增弹框 -->
    <el-dialog title="添加实验室信息" :visible.sync="dialogAddVisible" width="400px">
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
    </el-dialog>
    <!-- 新增弹框结束 -->
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
    <!-- 上传数据开始 -->
    <el-dialog title="导入数据" :visible.sync="dialogUploadVisible" width="400px">
      <a href="http://alish1.iyuhui.cn:8089/course/query/import-template">不知道格式?先下载模板</a>
      <br>
      <br>
      <el-upload
        class="upload"
        action="http://alish1.iyuhui.cn:8089/course/add/import/validate"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :limit="1"
        :file-list="fileList"
        :on-success="handleSuccess"
        :on-error="handleError"
        accept="xls"
      >
        <el-button slot="trigger" size="medium" type="primary">选择文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="medium"
          type="success"
          @click="submitUpload()"
        >缓存文件</el-button>
        <div v-if="tip">{{ tip }}</div>
        <div class="error" v-if="errorTip!=''">{{ errorTip }}</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUploadVisible = false">取 消</el-button>
        <el-button type="primary" @click="importCache()" :disabled="disabled">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 上传数据结束 -->
  </div>
</template>

<style scroped>
h2 {
  text-align: center;
  font-weight: normal;
  margin-bottom: 15px;
}
.error {
  color: red;
}
.el-form-item__content {
  width: 220px;
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
      loading: false,
      select: "",
      search: "",
      searchFlag: false,
      fileList: [],
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 1
      },
      disabled: "",
      tableData: [],
      tableDataCache: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
      form: {
        courseNumber: "",
        courseName: "",
        period: "",
        courseDesc: ""
      },
      tip: "",
      errorTip: "",
      dialogUploadVisible: false,
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
    //搜索
    searchAll(page, size) {
      this.loading = true;
      let str = {};
      if (this.select == "courseName") {
        str.courseName = this.search;
      } else if (this.select == "courseNumber") {
        str.courseNumber = this.search;
      } else {
        this.$message.error("请选择搜索关键字");
      }
      courseApi
        .search(this.pageInfo.pageIndex, this.pageInfo.pageSize, str)
        .then(res => {
          if (res.code == "140001") {
            this.tableData = res.result.results;
            this.searchFlag = true;
            this.loading = false;
            this.pageInfo.pageTotal = parseInt(res.result.totalRecord);
          } else {
            this.$message.error("error" + res.message);
          }
        })
        .catch(error => {
          this.$message.error("" + error);
        });
    },
    cleanCache() {
      this.tip = "";
      this.errorTip = "";
      this.tableDataCache = [];
      this.fileList = [];
      this.dialogUploadVisible = true;
    },
    submitUpload() {
      courseApi
        .queryCache()
        .then(res => {
          if (res.result.cached) {
            this.tip = "文件缓存成功,请及时保存!";
            this.disabled = false;
          } else {
            this.$message.error(
              "缓存失败,请按照报错信息修改后重新上传！" + res.message
            );
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    importCache() {
      courseApi
        .uploadCache()
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
            this.$message.success("保存成功!");
            this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
          } else {
            this.$message.error("保存失败:" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
      this.dialogUploadVisible = false;
    },

    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    getErrors(param) {
      for (let i = 0; i < param.length; i++) {
        if (param[i].isError != "") {
          console.log(param[i].isError);
          this.errorTip +=
            "课程编号" +
            param[i].classroomNumber +
            "发生错误：" +
            param[i].isError +
            "''";
        }
      }
      console.log(this.errorTip);
    },
    handleSuccess(res) {
      console.log("文件上传成功");
      console.log(res.result.rows);
      console.log(res.result.rows[0]);
      let abc = res.result.rows;
      //总数据
      for (let i = 0; i < abc.length; i++) {
        let labObj = {};
        labObj.isError = "";
        //每一行有七个格子
        for (let item in abc[i].cells) {
          console.log(abc[i].cells[item].errorMessage);
          if (abc[i].cells[item].errorMessage != "") {
            labObj.isError +=
              "【" +
              abc[i].cells[item].fieldName +
              ":" +
              abc[i].cells[item].errorMessage +
              "】";
          }
          if (abc[i].cells[item].fieldName == "课程编号") {
            labObj.courseNumber = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "课程名称") {
            labObj.courseName = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "课时量") {
            labObj.period = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "课程简介") {
            labObj.courseDesc = abc[i].cells[item].value;
          }
        }
        console.log(labObj);
        this.tableDataCache.push(labObj);
        console.log("列表————————");
        console.log(this.tableData);
        console.log(this.tableDataCache);
      }
      //this.tableData = this.tableData.concat(this.tableDataCache);
      this.getErrors(this.tableDataCache);
    },
    handleError(res) {
      this.$message.error("error:" + res.message);
    },

    handleEdit(rowData) {
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
      this.loading = true;
      courseApi
        .query(index, size)
        .then(res => {
          if (res.code == "140001") {
            this.tableData = res.result.results;
            this.pageInfo.pageTotal = parseInt(res.result.totalRecord);
            this.loading = false;
          } else {
            this.$message.error("请求失败，错误描述为：" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      if (this.searchFlag) {
        this.searchAll(this.pageInfo.pageIndex, val);
      }
      this.queryTable(this.pageInfo.pageIndex, val);
    },
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      if (this.searchFlag) {
        this.searchAll(val, this.pageInfo.pageSize);
      }
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
    check(param) {
      if (param.courseNumber == "") {
        this.$message.error("请输入课程编号");
        return false;
      }
      if (param.courseName == "") {
        this.$message.error("请输入课程名称");
        return false;
      }
      if (param.period == "") {
        this.$message.error("请输入课时量");
        return false;
      }
      return true;
    },
    save() {
      if (!this.dialogFormVisible) {
        if (!this.check(this.formAdd)) {
          return false;
        }
        courseApi
          .add(this.formAdd)
          .then(res => {
            if (res.code == "140001") {
              this.$message.success("添加成功");
              this.dialogAddVisible = false;
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
        if (!this.check(this.formEdit)) {
          return false;
        }
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
            this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
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
