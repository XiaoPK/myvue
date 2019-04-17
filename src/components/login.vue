<template>
    <div class="bgc" style="height:700px">
		<h1 class="h1-style">欢迎使用实验室管理系统</h1>
		<br>
		<br>
        <div class="login-area">
            <div class="form-group">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">
                    <el-form-item prop="account">
                        <el-input v-model="loginForm.account" type="text" placeholder="account"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="password"></el-input>
                    </el-form-item>
                    <a class="btn-login" type="primary" @click="submitForm()">登录</a>
					<a class="textR" @click="forgetPw">忘记密码</a>
                </el-form>
                <div v-if="sysMsg" class="err-msg">{{sysMsg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import * as userApi from "../apis/permission/user.js"
import bus from './views/bus.js'
export default {
    data() {
        return {
            loginForm: {
                account: 'admin',
                password: '111111'
            },
            loginRules: {
                account: [
                    {required: true, message: '', trigger: 'blur'}
                ],
                password :[
                    {required: true, message: '', trigger: 'blur'}
                ]
            },
            sysMsg: ''
        }
    },
    methods: {
        submitForm(){
            userApi.login(this.loginForm).then(res => {
                if(res.code == "140001"){
                    let token = res.result.token
                    //console.log(res.result)
                    sessionStorage.setItem("token",token)
                    sessionStorage.setItem("account",this.loginForm.account)
                    sessionStorage.setItem('password',this.loginForm.password)
                    sessionStorage.setItem('userType',res.result.userType)
                    console.log(res.result.token)
                    //console.log(sessionStorage)
                    this.$router.push('/')                   
                }else{
                    this.$message.error('账号或密码错误！')
                }
            }).catch(res => {
                this.$message.error('账号或密码错误！')
            })
        },
        forgetPw(){
            this.$router.push('/forgetPassword')
        }
    }
}
</script>

<style scoped>
	.err-msg{
		color:red;
		text-align: center;
		font-size: 16px;
	}

	.textR{
		font-size: 14px;
		color: #409EFF;
		float:right;
	}
  	.login-area {
        width: 400px;
        margin: 0 auto;
    }
	.btn-login {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin: 10px 0;
        padding: 0;
        border: none;
        border-radius: 4px;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
	}
	.btn-login:hover{
		background-color:rgb(15, 124, 233);
	}

</style>
