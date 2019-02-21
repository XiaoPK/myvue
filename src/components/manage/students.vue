<template>
  <div>
    <!-- 操作区----start -->
    <el-row class="row">
      <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
      <el-button size="medium" type="primary" @click="dialogAddVisible = true">添加学生</el-button>
      <el-button size="medium" type="primary" @click="cleanCache">导入数据</el-button>
      <a class="export" href="http://alish1.iyuhui.cn:8089/student/query/1/1000/export/excel
">导出数据</a>
      <div style="display:inline-block;margin-left:150px;">
        <el-input placeholder="请输入内容" size="medium" v-model="search" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="姓名" value="studentName"></el-option>
            <el-option label="学号" value="studentNumber"></el-option>
            <el-option label="年级" value="grade"></el-option>
            <el-option label="学院" value="college"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchAll"></el-button>
        </el-input>
      </div>
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
    <!-- 上传数据开始 -->
    <el-dialog title="导入数据" :visible.sync="dialogUploadVisible" width="400px">
      <a href="http://alish1.iyuhui.cn:8089/student/query/import-template">不知道格式?先下载模板</a>
      <br>
      <br>
      <el-upload
        class="upload"
        action="http://alish1.iyuhui.cn:8089/student/add/import/validate"
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
        <div v-if="tip" style="color='blue'">{{ tip }}</div>
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

<style>
.el-form-item__content {
  width: 220px;
}
.error {
  color: red;
}
.right {
  float: right;
}
.row {
  display: inline;
}
.el-select .el-input {
  width: 100px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

<script>
import * as studentApi from "../../apis/students.js";
export default {
  name: "students",
  data() {
    return {
      search:"",
      select:"",
      searchFlag:false,
      fileList: [],
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        pageTotal: 1
      },
      disabled: "",
      tableData: [],
      tableDataCache: [],
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
      tip: "",
      errorTip: "",
      dialogUploadVisible: false,
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
    searchAll(page,size){
      let str = {}
      if(this.select=="studentName"){
        str.studentName = this.search;
      }else if(this.select=="studentNumber"){
        str.studentNumber = this.search
      }else if(this.select=="grade"){
        str.grade = this.search
      }else if(this.select=="college"){
        str.college = this.search
      }
      studentApi.search(this.pageInfo.pageIndex,this.pageInfo.pageSize,str).then(res => {
        if(res.code == "140001"){
          for (let i = 0; i < res.result.results.length; i++) {
              res.result.results[i].birthday = this.timestampToTime(
                res.result.results[i].birthday
              );
              console.log(res.result.results[i]);
            }
          this.tableData = res.result.results
          this.searchFlag = true;
          this.pageInfo.pageTotal = parseInt(res.result.totalRecord);
        }else{
          this.$message.error("error" + res.message)
        }
      }).catch(error => {
        this.$message.error("" + error)
      })
    },
    cleanCache() {
      this.tip = "";
      this.errorTip = "";
      this.tableDataCache = [];
      this.fileList = [];
      this.dialogUploadVisible = true;
    },
    submitUpload() {
      studentApi
        .queryCache()
        .then(res => {
          if (res.result.cached) {
            this.tip = "文件缓存成功,请及时保存!";
            this.disabled = false;
          } else {
            this.$message.error("请求失败,请稍后重试!" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    importCache() {
      studentApi
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
            "学号" +
            param[i].studentNumber +
            "发生错误：" +
            param[i].isError +
            "''n";
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
        let teacherObj = {};
        teacherObj.isError = "";
        //每一行有七个格子
        for (let item in abc[i].cells) {
          console.log(abc[i].cells[item].errorMessage);
          if (abc[i].cells[item].errorMessage != "") {
            teacherObj.isError +=
              "【" +
              abc[i].cells[item].fieldName +
              ":" +
              abc[i].cells[item].errorMessage +
              "】";
          }
          if (abc[i].cells[item].fieldName == "学号") {
            teacherObj.studentNumber = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "学生姓名") {
            teacherObj.studentName = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "性别") {
            teacherObj.sex = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "出生日期") {
            teacherObj.birthday = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "年级") {
            teacherObj.grade = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "所在学院") {
            teacherObj.college = abc[i].cells[item].value;
          }
        }
        console.log(teacherObj);
        this.tableDataCache.push(teacherObj);
        console.log("列表————————");
        console.log(this.tableData);
        console.log(this.tableDataCache);
      }
      //this.tableData = this.tableData.concat(this.tableDataCache)
      this.getErrors(this.tableDataCache);
    },
    handleError(res) {
      this.$message.error("error:" + res.message);
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
      return Y + M + D;
    },
    handleEdit(rowData) {
      console.log(rowData);
      this.formEdit = rowData;
      if (this.formEdit.sex == "BOY") {
        this.formEdit.sex = "1";
      } else {
        this.formEdit.sex = "2";
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
              res.result.results[i].birthday = this.timestampToTime(
                res.result.results[i].birthday
              );
              console.log(res.result.results[i]);
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
      if(this.searchFlag){
        this.searchAll(this.pageInfo.pageIndex, val)
        return
      }
      this.queryTable(this.pageInfo.pageIndex, val);
    },
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val;
       if(this.searchFlag){
        this.searchAll(val, this.pageInfo.pageSize)
        return
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
      for (let item in param) {
        if (param[item] == "") {
          this.$message.error("请把信息输入完整，不得为空!");
          return false;
        }
      }
      return true;
    },
    save() {
      if (!this.dialogFormVisible) {
        if (!this.check(this.formAdd)) {
          return false;
        }
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
            this.$message.error(error + "请检查参数是否合法!");
          });
        this.formAdd = {};
        this.dialogAddVisible = false;
      } else {
        if (!this.check(this.fromEdit)) {
          return false;
        }
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
            this.$message.error(error + "请检查参数是否合法!");
          });
      }
    }
  },
  created() {
    this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
  }
};
</script>
