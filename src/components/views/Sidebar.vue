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
        props:['userType'],
        data() {
            return {
                collapse: false,
                menuList:""
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

            if(this.userType == 'TEACHER'){
                this.menuList = [
                    {
                         icon: 'el-icon-tickets',
                        index:'1',
                        title:"相关课程",
                        subs:[{
                            index:"yourCourse",
                            title:"最近课程"
                        },
                        {
                            index:"classManage",
                            title:"课堂管理"
                        }
                        ]
                    },
                    {
                         icon: 'el-icon-tickets',
                        index:'2',
                        title:"个人信息",
                        subs:[{
                            index:"personalInfo",
                            title:"修改个人信息"
                        },
                        {
                            index:"changePassword",
                            title:"修改密码"
                        }
                        ]
                    }, 
                ]
            }else if(this.userType == 'ADMIN'){
                this.menuList = [
                    {
                         icon: 'el-icon-tickets',
                        index:'1',
                        title:"相关课程",
                        subs:[{
                            index:"yourCourse",
                            title:"最近课程"
                        },
                        {
                            index:"classManage",
                            title:"课堂管理"
                        }
                        ]
                    },
                    {
                         icon: 'el-icon-tickets',
                        index:'2',
                        title:"个人信息",
                        subs:[{
                            index:"personalInfo",
                            title:"修改个人信息"
                        },
                        {
                            index:"changePassword",
                            title:"修改密码"
                        }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: '3',
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
                        index: '4',
                        title: '课程分配',
                        subs: [
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
                        index: '5',
                        title: '权限与用户',
                        subs: [
                            {
                                index: 'menus',
                                title: '菜单管理'
                            }, 
                            {
                                index:'permissions',
                                title:"权限管理"
                            },
                            {
                                index: 'roles',
                                title: '角色管理'
                            },
                            {
                                index:'users',
                                title:'用户管理'
                            }
                        ]
                    }
                ]
            }
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
