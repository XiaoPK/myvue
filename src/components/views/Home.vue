<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content_wrapper">
                <v-tags></v-tags>
                <div class="content" style="flex:1;">
                    <div class="content_inner">
                        <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
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
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        }
    },
    components: {
        vHead, vSidebar,vTags
    },
    created() {
        bus.$on('collapse', msg => {
            this.collapse = msg;
        })

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        })
    }
}
</script>

<style>
    .content_wrapper{
       display: flex;
       flex-direction: column;
       height:100%;
    }
    .content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
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
