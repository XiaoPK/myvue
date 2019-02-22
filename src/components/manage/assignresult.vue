<template>
  <div>
    <h3 style="text-align:center; font-weight:200">分配结果如下</h3>
    <el-table :data="tableData" stripe style="width: 100%;padding-left:150px;">
      <el-table-column prop="course" label="课程" width="180"></el-table-column>
      <el-table-column prop="teacher" label="主讲老师" width="150"></el-table-column>
      <el-table-column prop="name" label="上课时间" width="180">
        <template slot-scope="scope">
          <el-select size="medium" v-model="scope.row.name">
            <el-option
              v-for="item in listTime"
              :key="item.name"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="stuCount" label="课程人数" width="100"></el-table-column>
      <el-table-column prop="classroom" label="所在教室" width="200"></el-table-column>
    </el-table>
    <br>
    <el-button style="margin-left:650px" type="primary" @click="changeRoute">重新分配</el-button>
    <el-button style="margin-left:50px" type="primary" @click="saveResult">保存结果</el-button>
  </div>
</template>
<style>
</style>

<script>
import bus from "../views/bus.js";
export default {
  data() {
    return {
      listTime: [
        {
          name: "星期一上午第一节",
          key: "1-1"
        },
        {
          name: "星期一上午第二节",
          key: "1-2"
        },
        {
          name: "星期一下午第一节",
          key: "1-3"
        },
        {
          name: "星期一下午第二节",
          key: "1-4"
        },
        {
          name: "星期一晚上第一节",
          key: "1-5"
        },
        {
          name: "星期一晚上第二节",
          key: "1-6"
        },
        {
          name: "星期二上午第一节",
          key: "2-1"
        },
        {
          name: "星期二上午第二节",
          key: "2-2"
        },
        {
          name: "星期二下午第一节",
          key: "2-3"
        },
        {
          name: "星期二下午第二节",
          key: "2-4"
        },
        {
          name: "星期二晚上第一节",
          key: "2-5"
        },
        {
          name: "星期二晚上第二节",
          key: "2-6"
        },
        {
          name: "星期三上午第一节",
          key: "3-1"
        },
        {
          name: "星期三上午第二节",
          key: "3-2"
        },
        {
          name: "星期三下午第一节",
          key: "3-3"
        },
        {
          name: "星期三下午第二节",
          key: "3-4"
        },
        {
          name: "星期三晚上第一节",
          key: "3-5"
        },
        {
          name: "星期三晚上第二节",
          key: "3-6"
        },
        {
          name: "星期四上午第一节",
          key: "4-1"
        },
        {
          name: "星期四上午第二节",
          key: "4-2"
        },
        {
          name: "星期四下午第一节",
          key: "4-3"
        },
        {
          name: "星期四下午第二节",
          key: "4-4"
        },
        {
          name: "星期四晚上第一节",
          key: "4-5"
        },
        {
          name: "星期四晚上第二节",
          key: "4-6"
        },
        {
          name: "星期五上午第一节",
          key: "5-1"
        },
        {
          name: "星期五上午第二节",
          key: "5-2"
        },
        {
          name: "星期五下午第一节",
          key: "5-3"
        },
        {
          name: "星期五下午第二节",
          key: "5-4"
        },
        {
          name: "星期五晚上第一节",
          key: "5-5"
        },
        {
          name: "星期五晚上第二节",
          key: "5-6"
        }
      ],
      tableData: [],
      form: {
        course: "",
        teacher: "",
        name: "",
        classroom: ""
      }
    };
  },

  methods: {
    changeRoute() {
      this.$router.push({ path: "/assignlabs" });
    },
    saveResult() {
      console.log(this.tableData);
    }
  },
  created() {
    this.tableData = JSON.parse(localStorage.assignR);
    console.log(this.tableData);
  }
};
</script>
