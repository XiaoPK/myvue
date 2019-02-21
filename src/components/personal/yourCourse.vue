<template>
  <div>
    <h1 class="welcome">尊敬的老师，欢迎您!</h1>
    <h3 class="welcome" style="margin-top: 50px;">>>>您最近的课程安排如下</h3>
    <div class="course">
      <template v-for="item in tableData">
        <el-card class="box-card" :key="item.course" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ item.course }}</span>
          </div>
          <div class="text item">
            时间：{{ item.name }}
            <br>
            地点：{{ item.classroom }}
          </div>
        </el-card>
      </template>
    </div>
  </div>
</template>

<style>
.welcome {
  font-weight: normal;
  margin-left: 50px;
  margin-right: 50px;
}
.course {
  margin-top: 10px;
  margin-left: 40px;
  margin-right: 40px;
  display: inline-flex;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 200px;
  margin-right: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          classroom: "计科五号机房",
          course: "iOS 开发",
          forbidden: false,
          name: "星期五下午第一节",
          stuCount: 2,
          teacher: "李路",
          whickDay: "星期五",
          whickSection: "pmFir"
        },
        {
          classroom: "计科五号机房",
          course: "iOS 开发 2",
          forbidden: false,
          name: "星期五下午第一节",
          stuCount: 2,
          teacher: "李路",
          whickDay: "星期五",
          whickSection: "pmFir"
        }
      ]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>
