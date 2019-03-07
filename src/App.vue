<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // 关闭浏览器窗口的时候清空浏览器缓存在Storage的数据
    window.onbeforeunload = function(e) {
      if (
        (event.clientX > document.body.clientWidth && event.clientY < 0) ||
        event.altKey
      ) {
        var storage = window.localStorage;
        var storage2 = sessionStorage;
        storage.clear();
        storage2.clear();
      }
    };
  }
};
</script>

<style>
@import "../static/css/main.css";
</style>
