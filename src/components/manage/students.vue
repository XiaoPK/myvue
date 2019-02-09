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
      :default-sort="{prop: 'studentId', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="studentId" sortable label="学号" width="150"></el-table-column>
      <el-table-column prop="name" sortable label="姓名" width="100"></el-table-column>
      <el-table-column prop="gender" label="性别" width="80"></el-table-column>
      <el-table-column prop="date" sortable label="出生日期" width="150"></el-table-column>
      <el-table-column prop="grade" sortable label="年级" width="100"></el-table-column>
      <el-table-column prop="collage" label="学院" width="150"></el-table-column>
      <el-table-column label="操作" fixed="right">
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
          <el-input v-model="formEdit.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="formEdit.studentId" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="formEdit.gender" label="0">女</el-radio>
          <el-radio v-model="formEdit.gender" label="1">男</el-radio>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="日期"
            v-model="formEdit.date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="formEdit.grade" placeholder="年级"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="formEdit.collage" placeholder="学院"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save(formEdit)">确 定</el-button>
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
          <el-input v-model="formAdd.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="formAdd.studentId" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="formAdd.gender" label="0">女</el-radio>
          <el-radio v-model="formAdd.gender" label="1">男</el-radio>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="日期"
            v-model="formAdd.date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="formAdd.grade" placeholder="年级"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="formAdd.collage" placeholder="学院"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="save(formAdd)">确 定</el-button>
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
export default {
  name: "students",
  data() {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        pageTotal: 16
      },
      tableData: [
        {
          studentId: "2015210912",
          name: "周灰灰",
          date: "2017-1-12",
          gender: "0",
          grade: "2015",
          collage: "计算机学院"
        },
        {
          studentId: "2015210913",
          name: "赵灰灰",
          date: "2017-1-12",
          gender: "0",
          grade: "2015",
          collage: "计算机学院"
        },
        {
          studentId: "2015210911",
          name: "钱灰灰",
          date: "2017-1-12",
          gender: 1,
          grade: "2016",
          collage: "计算机学院"
        },
        {
          studentId: "2015210914",
          name: "孙灰灰",
          date: "2017-1-12",
          gender: 0,
          grade: "2014",
          collage: "计算机学院"
        },
        {
          studentId: "2015210912",
          name: "周灰灰",
          date: "2017-1-12",
          gender: 0,
          grade: "2015",
          collage: "计算机学院"
        },
        {
          studentId: "2015210913",
          name: "赵灰灰",
          date: "2017-1-12",
          gender: 0,
          grade: "2015",
          collage: "计算机学院"
        },
        {
          studentId: "2015210911",
          name: "钱灰灰",
          date: "2017-1-12",
          gender: 1,
          grade: "2016",
          collage: "计算机学院"
        },
        {
          studentId: "2015210914",
          name: "孙灰灰",
          date: "2017-1-12",
          gender: 0,
          grade: "2014",
          collage: "计算机学院"
        },
        {
          studentId: "2015210912",
          name: "周灰灰",
          date: "2017-1-12",
          gender: 0,
          grade: "2015",
          collage: "计算机学院"
        },
        {
          studentId: "2015210913",
          name: "赵灰灰",
          date: "2017-1-12",
          gender: 0,
          grade: "2015",
          collage: "计算机学院"
        },
        {
          studentId: "2015210911",
          name: "钱灰灰",
          date: "2017-1-12",
          gender: 1,
          grade: "2016",
          collage: "计算机学院"
        },
        {
          studentId: "2015210914",
          name: "孙灰灰",
          date: "2017-1-12",
          gender: 0,
          grade: "2014",
          collage: "计算机学院"
        },
        {
          studentId: "2015210912",
          name: "周灰灰",
          date: "2017-1-12",
          gender: 0,
          grade: "2015",
          collage: "计算机学院"
        },
        {
          studentId: "2015210913",
          name: "赵灰灰",
          date: "2017-1-12",
          gender: 0,
          grade: "2015",
          collage: "计算机学院"
        },
        {
          studentId: "2015210911",
          name: "钱灰灰",
          date: "2017-1-12",
          gender: 1,
          grade: "2016",
          collage: "计算机学院"
        },
        {
          studentId: "2015210914",
          name: "孙灰灰",
          date: "2017-1-12",
          gender: 0,
          grade: "2014",
          collage: "计算机学院"
        }
      ],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      form: {
        studentId: "",
        name: "",
        gender: "",
        grade: "",
        date: "",
        collage: ""
      },
      dialogFormVisible: false,
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        //表单对象
        studentId: "",
        name: "",
        gender: "",
        grade: "",
        date: "",
        collage: ""
      },
      formEdit: {
        //表单对象
        studentId: "",
        name: "",
        gender: "",
        grade: "",
        date: "",
        collage: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    handleEdit(index, rowData) {
      var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
      this.$message({
        message: msg,
        type: "success"
      });
      console.log(rowData);
      this.formEdit = rowData;
      this.dialogFormVisible = true;
    },
    handleDelete(index, rowData) {
      var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!" + msg
          });
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
      this.$message({
        message:
          "第" +
          this.pageInfo.pageIndex +
          "页，" +
          "size:" +
          this.pageInfo.pageSize,
        type: "success"
      });
    },
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.$message({
        message:
          "第" +
          this.pageInfo.pageIndex +
          "页，" +
          "size:" +
          this.pageInfo.pageSize,
        type: "success"
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$message({
        message: "选中的项是:" + JSON.stringify(this.multipleSelection),
        type: "success"
      });
    },
    deleteMany() {
      var ids = this.multipleSelection.map(item => item.id).join();
      this.$message({
        message: "删除的项是:" + JSON.stringify(this.multipleSelection),
        type: "success"
      });
    },
    save(param) {
      //let param = Object.assign({}, this.formAdd);
      let flag = true;
      let flagstr = "";
      Object.keys(param).forEach(function(key) {
        if (!param[key]) {
          flag = false;
          flagstr += key + ",";
        }
      });
      if (flag) {
        if (!this.dialogFormVisible) {
          this.tableData.push(param);
          this.formAdd = {};
          this.dialogAddVisible = false;
        } else {
          this.formEdit = param;
          this.dialogFormVisible = false;
        }
      } else {
        let msg = "请输入" + flagstr;
        this.$message({
          message: msg,
          type: "warning"
        });
      }
    }
  }
};
</script>
