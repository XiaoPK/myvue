<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu"  :collapse="collapse" background-color="#E6E6E6"
             active-text-color="#444444" unique-opened router>
           <template v-for="(item,i) in menuList">
                <template v-if="item.subs&&item.subs.length">
                    <el-submenu :index="item.index" :key="i">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from './bus.js'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                collapse: false,
                menuList: [
                    {
                        icon: 'el-icon-tickets',
                        index: '1',
                        title: '管理信息',
                        subs: [
                            {
                                index: 'students',
                                title: '学生管理'
                            },
                            {
                                index: 'labs',
                                title: '实验室管理'
                            },
                             {
                                index: 'courses',
                                title: '课程管理'
                            },
                             {
                                index: 'teachers',
                                title: '教师管理'
                            },
                            {
                                index: 'term',
                                title: '学期管理'
                            },
                            {
                                index: 'studentCourse',
                                title: '学生选课表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '2',
                        title: '课程分配',
                        subs: [
                            {
                                index: 'assignrules',
                                title: '分配规则'
                            },
                            {
                                index: 'assignlabs',
                                title: '分配实验室'
                            }, 
                            
                            {
                                index: 'assignresult',
                                title: '分配结果'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '3',
                        title: '其他',
                        subs: [
                            {
                                index: 'assignlabs',
                                title: '分配实验室'
                            }, 
                            {
                                index: 'adjustment',
                                title: '调整实验室'
                            }
                        ]
                    }
                ]
            }
        },
        //mapState 用来监控多个函数的变化
        computed:mapState({
            //menuList:state=>state.menu.menuList,
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }),
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    /*/定义滚动条的样式 */
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
