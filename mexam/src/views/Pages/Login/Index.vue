<template>
    <div class="user-login">
        <router-view></router-view>
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
    data(){
        return{
            editor:null
        }
    },
    updated(){
        console.log(this.$refs.editor)
        this.editor=new E(this.$refs.editor)
        this.editor.create();
        console.log(this.editor)
    }
}
</script>

<style lang="scss">
    .user-login{
        width: 100vw;
        height: 100vh;
        background: url('../../../assets/bg.png') no-repeat fixed;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-form{
            width: 450px;
            background: #fff;
            border-radius: 5px;
            z-index: 100;
            position: relative;
            padding: 10px 25px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            h2{
                font-size: 28px;
                color: #333;
                text-align: center;
                margin-bottom: 20px;
            }
            .toRegister{
                margin: 10px 0;
                text-align: center;
            }

            .telePhone{
                display: flex;
                .el-button{
                    margin-left: 10px;
                }
            }
        }
    }
</style>