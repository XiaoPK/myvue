<template>
  <div>
    <!-- 操作区----start -->
    <el-row>
      <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
      <el-button size="medium" type="primary" @click="dialogAddVisible = true">添加实验室</el-button>
      <el-button size="medium" type="primary" @click="cleanCache">导入数据</el-button>
      <a
        href="http://alish1.iyuhui.cn:8089/classroom/query/1/1000/export/excel
"
        class="export"
      >导出数据</a>
      <div style="display:inline-block;margin-left:150px;">
        <el-input placeholder="请输入内容" size="medium" v-model="search" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="名称" value="classroomName"></el-option>
            <el-option label="编号" value="classroomNumber"></el-option>
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
        style="width: 900px"
        :default-sort="{prop: 'classroomNumber', order: 'descending'}"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="classroomNumber" sortable label="编号" width="100"></el-table-column>
        <el-table-column prop="classroomName" label="名称" width="150"></el-table-column>
        <el-table-column prop="capacity" label="容量" width="100"></el-table-column>
        <el-table-column prop="enabled" label="当前状态" width="150"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="150">
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
        :page-sizes="[5, 10, 20, 50, 10000]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <!-- 表格---end -->
    </div>
    <!-- 新增弹框 -->
    <el-dialog title="添加实验室信息" :visible.sync="dialogAddVisible" width="700px">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :inline="true"
        :rules="rules"
        :model="formAdd"
      >
        <el-form-item label="实验室编号">
          <el-input v-model="formAdd.classroomNumber" placeholder="实验室编号"></el-input>
        </el-form-item>
        <el-form-item label="实验室名称">
          <el-input v-model="formAdd.classroomName" placeholder="实验室名称"></el-input>
        </el-form-item>
        <el-form-item label="可容纳人数">
          <el-input v-model="formAdd.capacity" type="number" min="0" placeholder="可容纳人数"></el-input>
        </el-form-item>

        <el-form-item label="是否可用">
          <el-radio v-model="formAdd.enabled" label="2">否</el-radio>
          <el-radio v-model="formAdd.enabled" label="1">是</el-radio>
        </el-form-item>
        <a class="btn-add" type="primary" @click="save()">确定添加</a>
      </el-form>
    </el-dialog>
    <!-- 新增弹框结束 -->
    <!-- 编辑弹框---start -->
    <el-dialog title="修改实验室信息" :visible.sync="dialogFormVisible" width="400px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="formEdit"
        class="demo-form-inline"
      >
        <el-form-item label="实验室编号">
          <el-input v-model="formEdit.classroomNumber" placeholder="实验室编号"></el-input>
        </el-form-item>
        <el-form-item label="实验室名称">
          <el-input v-model="formEdit.classroomName" placeholder="实验室名称"></el-input>
        </el-form-item>

        <el-form-item label="可容纳人数">
          <el-input v-model="formEdit.capacity" placeholder="可容纳人数"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-radio v-model="formEdit.enabled" label="2">否</el-radio>
          <el-radio v-model="formEdit.enabled" label="1">是</el-radio>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框---end -->
    <!-- 上传数据开始 -->
    <el-dialog title="导入数据" :visible.sync="dialogUploadVisible" width="400px">
      <a href="http://alish1.iyuhui.cn:8089/classroom/query/import-template">不知道格式?先下载模板</a>
      <br>
      <br>
      <el-upload
        class="upload"
        action="http://alish1.iyuhui.cn:8089/classroom/add/import/validate"
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
.upload {
  text-align: center;
}
.error {
  color: red;
}
h2 {
  text-align: center;
  font-weight: normal;
  margin-bottom: 15px;
}
.el-form-item__content {
  width: 220px;
}
</style>

<script>
import * as labsApi from "../../apis/labs.js";
export default {
  name: "labs",
  data() {
    return {
      loading: false,
      rules: {
        classroomNumber: [
          { required: true, messsage: "请输入实验室编号", trigger: "blur" }
        ],
        classroomName: [
          { required: true, message: "请输入实验室名称", trigger: "blur" }
        ],
        capacity: [
          { required: true, message: "请输入实验室容量", trigger: "blur" }
        ],
        enabled: [
          {
            type: "boolen",
            required: true,
            message: "请输入实验室状态",
            trigger: "blur"
          }
        ]
      },
      select: "",
      search: "",
      searchFlag: false,
      fileList: "",
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        pageTotal: 1
      },
      tableData: [],
      tableDataCache: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
      form: {
        classroomNumber: "",
        classroomName: "",
        capacity: "",
        enabled: ""
      },
      disabled: "",
      tip: "",
      errorTip: "",
      dialogUploadVisible: false,
      dialogFormVisible: false,
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        //表单对象
        classroomNumber: "",
        classroomName: "",
        capacity: "",
        enabled: ""
      },
      formEdit: {
        //表单对象
        classroomNumber: "",
        classroomName: "",
        capacity: "",
        enabled: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    //搜索
    searchAll(page, size) {
      this.loading = true;
      let str = {};
      if (this.select == "classroomName") {
        str.classroomName = this.search;
      } else if (this.select == "classroomNumber") {
        str.classroomNumber = this.search;
      } else {
        this.$message.error("请选择搜索关键字");
      }
      labsApi
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
    // 导入模块
    cleanCache() {
      this.tip = "";
      this.errorTip = "";
      this.tableDataCache = [];
      this.fileList = [];
      this.dialogUploadVisible = true;
    },
    submitUpload() {
      labsApi
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
      labsApi
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
            "教室编号" +
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
          if (abc[i].cells[item].fieldName == "教室编号") {
            labObj.classroomNumber = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "教室名称") {
            labObj.classroomName = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "容量") {
            labObj.capacity = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "是否可用") {
            labObj.enabled = abc[i].cells[item].value;
          }
        }
        console.log(labObj);
        this.tableDataCache.push(labObj);
        console.log("列表————————");
        console.log(this.tableData);
        console.log(this.tableDataCache);
      }
      this.getErrors(this.tableDataCache);
    },
    handleError(res) {
      this.$message.error("error:" + res.message);
    },

    handleEdit(rowData) {
      this.formEdit = rowData;
      if (this.formEdit.enabled == "NORMAL") {
        this.formEdit.enabled = "1";
      } else {
        this.formEdit.enabled = "2";
      }
      this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
      this.dialogFormVisible = true;
    },
    queryTable(index, size) {
      this.loading = true;
      labsApi
        .query(index, size)
        .then(res => {
          if (res.code == "140001") {
            this.$message.success("请求成功");
            this.tableData = res.result.results;
            this.loading = false;
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
      labsApi
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
      if (this.searchFlag) {
        this.searchAll(this.pageInfo.pageSize, val);
        return;
      }
      this.queryTable(this.pageInfo.pageIndex, val);
    },
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      if (this.searchFlag) {
        this.searchAll(val, this.pageInfo.pageSize);
        return;
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
        labsApi
          .add(this.formAdd)
          .then(res => {
            if (res.code == "140001") {
              this.$message.success("添加成功");
              this.formAdd = {};
              this.dialogAddVisible = false;
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
        labsApi
          .update(this.formEdit)
          .then(res => {
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
