<template>
    <div class="addExam">
        <el-dialog title="添加教学点"
            @close="closeDialog"
            :visible.sync="dialogFormVisible_">
            <el-form v-model="oneData">
                <el-form-item label="教学点" :label-width="formLabelWidth">
                    <el-input v-model="oneData.studdr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="changeDialog">取 消</el-button>
                <el-button type="primary"  @click="addData">添 加</el-button>
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
            this.oneData.studdr='';
            this.dialogFormVisible_=false;
        },
        closeDialog(){
            this.oneData.studdr='';
            this.dialogFormVisible_=false;
        },
        addData(){
            let that =this;
            if(!that.oneData.studdr){
                return that.$message.error('填写不能为空');
            }
            this.$api.adaddr({
                list:that.oneData.studdr
            }).then(res=>{
                if(res.err_code === 100){
                    this.$message('添加成功');
                    this.oneData.studdr='';
                    this.$emit('updateData')
                }
            })
        }
    }
}
</script>