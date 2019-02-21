<template>
    <div class="bgc">
		<h1>欢迎使用实验室管理系统</h1>
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
					<a href="" class="textR" >忘记密码</a>
                </el-form>
                <div v-if="sysMsg" class="err-msg">{{sysMsg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import * as userApi from "../apis/permission/user.js"
export default {
    data() {
        return {
            loginForm: {
                account: '',
                password: ''
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
                    sessionStorage.setItem("token",token)
                    sessionStorage.setItem("account",this.loginForm.account)
                    console.log(res.result.token)
                    this.$router.push('/')                   
                }else{
                    this.sysMsg="账号或密码错误！"
                }
            }).catch(error => {
                this.sysMsg = "error" + error
            })
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
	h1{
		padding-top: 10%;
		text-align: center;
		font-size: 40px;
	}
</style>
