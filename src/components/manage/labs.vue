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
          style="width: 600px"
          :default-sort="{prop: 'classroomNumber', order: 'descending'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="classroomNumber" sortable label="编号" width="100"></el-table-column>
          <el-table-column prop="classroomName" label="名称" width="100"></el-table-column>
          <el-table-column prop="capacity" label="容量" width="50"></el-table-column>
          <el-table-column prop="enabled" label="当前状态" width="80"></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="120">
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
          :page-sizes="[5, 10, 20, 50]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
        <!-- 表格---end -->
      </div>
      <div class="right wide" title="添加实验室信息">
        <el-row>
          <h2>添加实验室信息</h2>
        </el-row>
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
      </div>
    </div>
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
import * as labsApi from '../../apis/labs.js'
export default {
  name: "labs",
  data() {
    return {
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
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        pageTotal: 1
      },
      tableData: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
      form: {
        classroomNumber: "",
        classroomName: "",
        capacity: "",
        enabled: ""
      },
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
    handleEdit(rowData) {
      this.formEdit = rowData;
      if(this.formEdit.enabled == "NORMAL"){
        this.formEdit.enabled = "1";
      }else{
        this.formEdit.enabled = "2";
      }
      this.dialogFormVisible = true;
    },
    queryTable(index, size) {
      labsApi
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
        this.deleteRow(ids[i])
      }
    },
    save() {
      if (!this.dialogFormVisible) {
        console.log(this.formAdd);
        console.log(JSON.stringify(this.formAdd));
        //var abc = labsApi.add(JSON.stringify(this.formAdd));
        labsApi
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
