<template>
  <div class="wrapper">
    <v-head :name = 'this.name'></v-head>
    <v-sidebar :userType = 'this.userType'></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content_wrapper">
        <v-tags></v-tags>
        <div class="content" style="flex:1;">
          <div class="content_inner">
            <transition name="move" mode="out-in">
              <keep-alive :include="tagsList">
                <h1
                  style="font-weight: 200; margin-right: 50px;"
                >尊敬的{{ name }}，您的角色为{{userType}}<br/>欢迎登陆实验室课程管理系统！</h1>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import bus from "./bus";
import * as teacherApi from "../../apis/teachers.js";
export default {
  data() {

    return {
      name: sessionStorage.getItem("account"),
      userType: sessionStorage.getItem('userType'),
      tagsList: [],
      collapse: false
    };
  },
  methods: {
    queryInfo() {
      let str = { teacherNumber: sessionStorage.getItem("account") };
      //这里不需要请求老师，因为他可能是管理员
      // teacherApi
      //   .search(1, 1, str)
      //   .then(res => {
      //     if (res.code == "140001") {
      //       console.log(res);
      //       this.name = res.result.results[0].teacherName;
      //       sessionStorage.setItem("username", this.name);
      //     } else {
      //       this.$message.error("error" + res.message);
      //     }
      //   })
      //   .catch(error => {
      //     this.$message.error("" + error);
      //   });
    }
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  // beforeCreate(){
  //    //判断有没有登录
  //   if(!sessionStorage.getItem('account')){
  //     this.$router.push('/login')
  //   }
  // },
  created() {
    this.queryInfo();
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  }
};
</script>

<style scoped>
.content_wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  /* background: #f0f0f0; */
}

.content {
  width: auto;
  padding: 10px;
}

.content-collapse {
  left: 65px;
}

.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  /* border-radius: 5px; */
  /* box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04); */
}
</style>
