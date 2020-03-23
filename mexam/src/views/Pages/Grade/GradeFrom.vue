<template>
    <div class="addExam">
        <el-dialog :title="title"
            @close="closeDialog"
            :visible.sync="dialogFormVisible_">
            <el-form v-model="oneData">
                <el-form-item label="考生成绩" :label-width="formLabelWidth">
                    <el-input v-model="oneData.sumGrade"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="changeDialog">取 消</el-button>
                <el-button type="primary"  @click="update">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:{
        oneData:{ type:Object},
        title:{ type:String,default:''},
        dialogFormVisible:{ type:Boolean,default:false},
        formLabelWidth:{ type:String,default:'120px'},
    },
    computed: {
        dialogFormVisible_:{
            get(){
                return this.dialogFormVisible;
            },
            set(val){
                this.$emit('setDialog',val);
            }
        }
    },
    methods:{
        changeDialog(){
            this.dialogFormVisible_=false;
        },
        closeDialog(){
            this.dialogFormVisible_=false;
        },
        update(){
            let that=this;
            this.$api.putgrade({
                id:that.oneData.id,
                grade:that.oneData.sumGrade
            }).then(res=>{
                if(res.err_code === 100){
                    that.$message('更新成功');
                    that.dialogFormVisible_=false;
                }else{
                    that.$message('更新失败');
                }
            })
        }
    }
}
</script>

<style>

</style>