<template>
  <div>
    <!-- 操作区----start -->
    <el-row class="right">
      <el-button size="medium" type="primary" @click="dialogAddVisible = true">添加教师</el-button>
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
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="teacherId" sortable label="职工编号" width="130"></el-table-column>
      <el-table-column prop="name" sortable label="姓名" width="100"></el-table-column>
      <el-table-column prop="gender" label="性别" width="60"></el-table-column>
      <el-table-column prop="courses" label="教授课程" width="150"></el-table-column>
      <el-table-column prop="office" label="办公室" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
      <el-table-column prop="phone" label="电话" width="120"></el-table-column>
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
        <el-form-item label="职工编号">
          <el-input v-model="formEdit.teacherId" placeholder="职工编号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formEdit.name" placeholder="姓名"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio v-model="formEdit.gender" label="0">女</el-radio>
          <el-radio v-model="formEdit.gender" label="1">男</el-radio>
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
          <el-checkbox-group v-model="formEdit.courses" size="medium">
            <el-checkbox
              v-for="city in cities"
              :label="city"
              :key="city"
              border
              @change="handleCheckedCitiesChange"
            >{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        :rules="rules"
        class="demo-form-inline"
      >
        <el-form-item label="职工编号" prop="teacherId"> 
          <el-input v-model="formAdd.teacherId" placeholder="职工编号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formAdd.name" placeholder="姓名"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio v-model="formAdd.gender" label="0">女</el-radio>
          <el-radio v-model="formAdd.gender" label="1">男</el-radio>
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
          <el-checkbox-group v-model="formAdd.courses" size="medium">
            <el-checkbox
              v-for="city in cities"
              :label="city"
              :key="city"
              border
              @change="handleCheckedCitiesChange"
            >{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
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
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  name: "teachers",
  data() {
    return {
      rules: {
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一节课",
            trigger: "change"
          }
        ],
        teacherId: [{required:true, message: '请输入课程编号', trigger: 'blur'}],
        name:[{required:true, message: '请输入课程编号', trigger: 'blur'}],
        gender:[{required:true, message: '请输入课程编号', trigger: 'blur'}],
        email:[{type:"email",required:true, message: '请输入课程编号', trigger: 'blur'}],
        phone:[{type:"telephone",required:true, message: '请输入课程编号', trigger: 'blur'}],
        office:[{required:true, message: '请输入课程编号', trigger: 'blur'}]
      },
      cities: cityOptions,
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        pageTotal: 16
      },
      tableData: [
        {
          teacherId: "2015210912",
          name: "周灰灰",
          courses: ["上海","北京"],
          gender: "0",
          office: "9289",
          email: "137834956@qq.com",
          phone: "18171263421"
        },
        {
          teacherId: "2015210913",
          name: "赵灰灰",
          courses:  ["上海","北京"],
          gender: "0",
          office: "9289",
          email: "137834956@qq.com",
          phone: "18171263421"
        },
        {
          teacherId: "2015210911",
          name: "钱灰灰",
          courses:  ["上海","北京"],
          gender: 1,
          office: "9289",
          email: "137834956@qq.com",
          phone: "18171263421"
        },
        {
          teacherId: "2015210914",
          name: "孙灰灰",
          courses: ["上海","北京"],
          gender: 0,
          office: "9289",
          email: "137834956@qq.com",
          phone: "18171263421"
        },
        {
          teacherId: "2015210912",
          name: "周灰灰",
          courses:  ["上海","北京"],
          gender: 0,
          office: "9289",
          email: "137834956@qq.com",
          phone: "18171263421"
        }
      ],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      form: {
        teacherId: "",
        name: "",
        gender: "",
        email: "",
        office: "",
        courses: [],
        phone: ""
      },
      dialogFormVisible: false,
      dialogAddVisible: false,
      formLabelWidth: "120px",
      formAdd: {
        //表单对象
        teacherId: "",
        name: "",
        gender: "",
        email: "",
        courses: [],
        office: "",
        phone: ""
      },
      formEdit: {
        //表单对象
        teacherId: "",
        name: "",
        gender: "",
        email: "",
        courses: [],
        office: "",
        phone: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      console.log("点击");
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
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
    save() {
      let param = Object.assign({}, this.formAdd);
      this.tableData.push(param);
      this.dialogAddVisible = false;
    }
  }
};
</script>
