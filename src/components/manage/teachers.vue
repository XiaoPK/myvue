<template>
  <div>
    <!-- 操作区----start -->
    <el-row >
      <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
      <el-button size="medium" type="primary" @click="dialogAddVisible = true;this.formAdd={};">添加教师</el-button>
      <el-button size="medium" type="primary" @click="cleanCache">导入数据</el-button>
      <a class="export" href="http://alish1.iyuhui.cn:8089/teacher/query/1/1000/export/excel
">导出数据</a>
    </el-row>
    <br>
    <!-- 操作区----end -->
    <!-- 表格---start -->
   
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :default-sort="{prop: 'teacherNumber', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="teacherNumber" sortable label="教师编号" width="130"></el-table-column>
        <el-table-column prop="teacherName" sortable label="教师姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="teachCourses" label="可授课程" width="150"></el-table-column>
        <el-table-column prop="office" label="办公室" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
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
        <el-form-item label="职工编号">
          <el-input v-model="formEdit.teacherNumber" placeholder="职工编号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formEdit.teacherName" placeholder="姓名"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio v-model="formEdit.sex" label="2">女</el-radio>
          <el-radio v-model="formEdit.sex" label="1">男</el-radio>
        </el-form-item>
        <el-form-item label="办公室">
          <el-input v-model="formEdit.office" placeholder="办公室"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formEdit.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formEdit.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="教授课程" prop="type">
          <el-checkbox-group
            v-model="formEdit.teachCourses"
            size="medium"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="course in courses"
              :label="course.courseName"
              :key="course.courseName"
              border
            >{{course.courseName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框---end -->
    <!-- 新增弹框---start -->
    <el-dialog title="添加教师" :visible.sync="dialogAddVisible" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="formAdd"
        class="demo-form-inline"
      >
        <el-form-item label="职工编号" prop="teacherNumber">
          <el-input v-model="formAdd.teacherNumber" placeholder="职工编号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="teacherName">
          <el-input v-model="formAdd.teacherName" placeholder="姓名"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio v-model="formAdd.sex" label="2">女</el-radio>
          <el-radio v-model="formAdd.sex" label="1">男</el-radio>
        </el-form-item>
        <el-form-item label="办公室" prop="office">
          <el-input v-model="formAdd.office" placeholder="办公室"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formAdd.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formAdd.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="教授课程" prop="type">
          <el-checkbox-group
            v-model="formAdd.teachCourses"
            size="medium"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="course in courses"
              :label="course.courseName"
              :key="course.courseName"
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
    <!-- 上传数据开始 -->
    <el-dialog title="导入数据" :visible.sync="dialogUploadVisible" width="400px">
      <a href="http://alish1.iyuhui.cn:8089/teacher/query/import-template">不知道格式?先下载模板</a>
      <br>
      <br>
      <el-upload
        class="upload"
        action="http://alish1.iyuhui.cn:8089/teacher/add/import/validate"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :limit="1"
        :on-success="handleSuccess"
        :on-error="handleError"
        accept="xls"
        :file-list="fileList"
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
.export{
  display: inline-block;
  width: 100px;
  height: 35px;
  line-height: 35px;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  margin-left:8px;
  background-color: #409eff;
  color: #fff;
}
.upload {
  text-align: center;
}
.error {
  color: red;
}
.el-form-item__content {
  width: 220px;
}
.right {
  float: right;
}
</style>

<script>
import * as teacherApi from "../../apis/teachers.js";
import * as courseApi from "../../apis/courses.js";
//const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  name: "teachers",
  data() {
    return {
      fileList:[],
      courses: {},
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        pageTotal: 16
      },
      tableDataCache:[],
      tableData: [],
      disabled:"",
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      form: {
        teacherNumber: "",
        teacherName: "",
        sex: "",
        email: "",
        office: "",
        teachCourses: [],
        phone: ""
      },
      tip: "",
      errorTip:"",
      dialogUploadVisible: false,
      dialogFormVisible: false,
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        //表单对象
        teacherNumber: "",
        teacherName: "",
        sex: "",
        email: "",
        teachCourses: [],
        office: "",
        phone: ""
      },
      formEdit: {
        //表单对象
        teacherNumber: "",
        teacherName: "",
        sex: "",
        email: "",
        teachCourses: [],
        office: "",
        phone: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    //导出模块
    //导入模块
    cleanCache(){
      this.tip = '';
      this.errorTip = ''
      this.tableDataCache = []
      this.fileList =[];
      this.dialogUploadVisible = true
    },
    submitUpload() {
      teacherApi
        .queryCache()
        .then(res => {
          if (res.result.cached) {
            this.tip = "文件缓存成功,请及时保存!";
            this.disabled = false
          } else {
            this.$message.error("缓存失败,请按照报错信息修改后重新上传！" + res.message);
          }
        })
        .catch(error => {
          this.$message.error(error + "");
        });
    },
    importCache() {
      teacherApi
        .uploadCache()
        .then(res => {
          console.log(res);
          if (res.code == "140001") {
            this.$message.success("保存成功!");
            this.queryTable(this.pageInfo.pageIndex,this.pageInfo.pageSize)
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
    getErrors(param){
      for (let i = 0; i < param.length; i++) {
        if(param[i].isError != ''){
          console.log(param[i].isError)
          this.errorTip += "教师编号"+param[i].teacherNumber + '发生错误：' + param[i].isError + "'\'"
        }
      }
      console.log(this.errorTip) 
    },
    handleSuccess(res) {
      console.log("文件上传成功");
      console.log(res.result.rows);
      console.log(res.result.rows[0]);
      let abc = res.result.rows;
      //总数据
      for (let i = 0; i < abc.length; i++) {
        let teacherObj = {};
        teacherObj.isError='';
        //每一行有七个格子
        for (let item in abc[i].cells) {   
          console.log(abc[i].cells[item].errorMessage);
          if (abc[i].cells[item].errorMessage != "") {
            teacherObj.isError += "【"+abc[i].cells[item].fieldName + ":"+abc[i].cells[item].errorMessage + "】";
          }
          if (abc[i].cells[item].fieldName == "教师编号") {
            teacherObj.teacherNumber = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "教师姓名") {
            teacherObj.teacherName = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "性别") {
            teacherObj.sex = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "邮箱") {
            teacherObj.email = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "手机号码") {
            teacherObj.phone = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "办公室") {
            teacherObj.office = abc[i].cells[item].value;
          }
          if (abc[i].cells[item].fieldName == "可授课程") {
            teacherObj.teachCourses = abc[i].cells[item].value.split(",");
          }
        }
        console.log(teacherObj);
        this.tableDataCache.push(teacherObj);
        console.log("列表————————");
        console.log(this.tableData)
        console.log(this.tableDataCache);
      }
      this.getErrors(this.tableDataCache)
    },
    handleError(res) {
      this.$message.error("error:" + res.message);
    },

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
            this.pageInfo.pageTotal = parseInt(res.result.totalRecord);
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
      teacherApi
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
      teacherApi
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
      if (!this.dialogFormVisible) {
        console.log(this.formAdd);
        teacherApi
          .add(this.formAdd)
          .then(res => {
            console.log(this.formAdd);
            if (res.code == "140001") {
              this.$message.success("添加成功");
              this.formAdd = {};
              this.queryTable(this.pageInfo.pageIndex, this.pageInfo.pageSize);
            } else {
              this.$message.error("error：" + res.message);
              console.log(res.message)
            }
          })
          .catch(error => {
            this.$message.error(error + "");
          });
        this.formAdd = {};
        this.dialogAddVisible = false;
      } else {
        teacherApi
          .update(this.formEdit)
          .then(res => {
            console.log(this.formEdit);
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
    this.getCourses();
  }
};
</script>

