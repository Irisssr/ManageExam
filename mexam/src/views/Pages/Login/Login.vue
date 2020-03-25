<template>
    <div class="login">
        <div class="login-form">
            <h2>Login</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="用户账号" prop="username">
                    <el-input v-model="ruleForm.username"
                        placeholder="用户账号"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input type="password"
                        placeholder="用户密码" 
                        v-model="ruleForm.password"></el-input>
                </el-form-item>
                <div class="el-form-item">
                    <div class="toRegister">
                        <el-checkbox v-model="checked">记住我</el-checkbox>
                    </div>
                </div>
                <el-form-item>
                    <el-button style="width:100%" type="primary" @click="toLogin('ruleForm')">登录</el-button>
                </el-form-item>
                <el-form-item>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            checked:false,
            ruleForm:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    { required:true,message:'请输入用户名',trigger:'blur'}
                ],
                password:[
                    { required:true,message:'请输入用户密码',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        toLogin(ruleForm){
            let that = this;
            this.$refs[ruleForm].validate((valid)=>{
                if(valid){
                    that.$api.login({
                        account: that.ruleForm.username,
                        password: that.ruleForm.password,
                        remeberMe: that.checked,
                        role: 'admin'
                    }).then(res=>{
                        if(res.err_code === 100){
                            sessionStorage.setItem('token','Bearer '+res.data.token);
                            that.$router.push('/User');
                            that.$message('登录成功');               
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>