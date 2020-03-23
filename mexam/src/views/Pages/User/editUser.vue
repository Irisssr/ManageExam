<template>
    <div class="addExam">
        <el-dialog :title="title"
            @close="closeDialog"
            :visible.sync="dialogFormVisible_">
            <el-form v-model="oneData">
                <el-form-item label="报名状态" :label-width="formLabelWidth">
                    <el-select v-model="oneData.paymentStatus" placeholder="状态">
                        <el-option label="已缴费" value="已缴费"></el-option>
                        <el-option label="未缴费" value="未缴费"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="缴费状态" :label-width="formLabelWidth">
                    <el-select v-model="oneData.paymentStatus" placeholder="状态">
                        <el-option label="已缴费" value="已缴费"></el-option>
                        <el-option label="未缴费" value="未缴费"></el-option>
                    </el-select>
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
            console.log(that.oneData)
            // that.$api.upaduser({

            // }).then(res=>{
            //     console.log(res)
            // })
        }
    }
}
</script>