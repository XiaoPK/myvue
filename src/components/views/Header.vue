<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">实验室管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link" style="font-size:16px">
                    {{ name }}<i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <a href=" " target="_blank">
                            <el-dropdown-item>修改密码</el-dropdown-item>
                        </a> -->
                        <el-dropdown-item  command = "changePw">修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from './bus.js'
    export default {
        //接受父组件的传值！
        props:['name'],
        data() {
            return {
                collapse: false
            }
        },
        // computed:{
        //     username(){
        //         let username = sessionStorage.getItem("username");
        //         console.log(username)
        //         return username ? username : this.name;
        //     }
        // },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    sessionStorage.clear()
                    this.$router.push('/login');
                }
                if(command == 'changePw'){
                    this.$router.push('/changePassword')
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },

        },
        created(){
            
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color:#fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;

    }

    .user-name{
        margin-left: 10px;
        color:#fff;
    }
    .el-dropdown-link{
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
