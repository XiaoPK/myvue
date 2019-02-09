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
          :default-sort="{prop: 'courseId', order: 'descending'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="courseId" sortable label="课程编号" width="100"></el-table-column>
          <el-table-column prop="name" label="课程名称" width="100"></el-table-column>
          <el-table-column prop="period" label="课时" width="50"></el-table-column>
          <el-table-column prop="summary" label="课程简介" width="160"></el-table-column>
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
          <el-form-item label="课程编号" prop="courseId">
            <el-input v-model="formAdd.courseId" placeholder="课程编号"></el-input>
          </el-form-item>
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="formAdd.name" placeholder="课程名称"></el-input>
          </el-form-item>
          <el-form-item label="课时量" prop="period">
            <el-input v-model="formAdd.period" type="number" placeholder="课时量"></el-input>
          </el-form-item>
          <el-form-item label="课程简介" prop="summary">
            <el-input type="textarea" v-model="formAdd.summary" placeholder="课程简介"></el-input>
          </el-form-item>

          <a class="btn-add" type="primary" @click="save(formAdd)">确定添加</a>
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
          <el-input v-model="formEdit.courseId" placeholder="课程编号"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="formEdit.name" placeholder="课程名称"></el-input>
        </el-form-item>

        <el-form-item label="课时量">
          <el-input v-model="formEdit.period" placeholder="课时量"></el-input>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input type="textarea" v-model="formEdit.summary" placeholder="课程简介"></el-input>
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
export default {
  name: "courses",
  data() {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        pageTotal: 16
      },
      tableData: [
        {
          courseId: "9301",
          name: "1号机房",
          period: "50",
          summary: "从前有座山，山里有座庙，庙里有个盆，盆里有个人。"
        },
        {
          courseId: "9301",
          name: "1号机房",
          period: "50",
          summary: "1"
        },
        {
          courseId: "9302",
          name: "2号机房",
          period: "50",
          summary: "1"
        },
        {
          courseId: "9303",
          name: "3号机房",
          period: "50",
          summary: "1"
        },
        {
          courseId: "9304",
          name: "4号机房",
          period: "50",
          summary: "1"
        }
      ],
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
      form: {
        courseId: "",
        name: "",
        period: "",
        summary: ""
      },
      dialogFormVisible: false,
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        //表单对象
        courseId: "",
        name: "",
        period: "",
        summary: ""
      },
      rules: {
        courseId: [
          { required: true, message: "请输入课程编号", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        period: [{ required: true, message: "请输入课时量", trigger: "blur" }],
        summary: [
          { required: true, message: "请输入课程简介", trigger: "blur" }
        ]
      },
      formEdit: {
        //表单对象
        courseId: "",
        name: "",
        period: "",
        summary: ""
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
          console.log(index + "---" + rowData.courseId);
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
