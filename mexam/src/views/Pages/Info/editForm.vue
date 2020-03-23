<template>
    <div class="addExam">
        <el-dialog :title="title"
            @close="closeDialog"
            :visible.sync="dialogFormVisible_">
            <el-form v-model="oneData">
                <el-form-item label="真实姓名" :label-width="formLabelWidth">
                    <el-input v-model="oneData.realName"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="oneData.sex" label="男">男</el-radio>
                    <el-radio v-model="oneData.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="证件类型" :label-width="formLabelWidth">
                    <el-select v-model="oneData.cardType" placeholder="请选择证件类型">
                        <el-option v-for="(item,index) in peopleOptions"
                            :key="index" 
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" :label-width="formLabelWidth">
                    <el-input v-model="oneData.cardNum"></el-input>
                </el-form-item>
                <el-form-item label="证件号码" :label-width="formLabelWidth">
                    <el-input v-model="oneData.cardNum"></el-input>
                </el-form-item>
                <el-form-item label="考生类别" :label-width="formLabelWidth">
                    <el-radio v-model="oneData.category" label="成教">成教</el-radio>
                    <el-radio v-model="oneData.category" label="网教">网教</el-radio>
                    <el-radio v-model="oneData.category" label="自考">自考</el-radio>
                </el-form-item>
                <el-form-item label="入学时间" :label-width="formLabelWidth">
                    <div class="school">
                        <el-date-picker
                            v-model="oneData.enterDate"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="入学时间">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="毕业时间" :label-width="formLabelWidth">
                    <div class="school">
                        <el-date-picker
                            v-model="oneData.graduationDate"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="毕业时间">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="oneData.phone"></el-input>
                </el-form-item>
                <el-form-item label="教学点（选填）" :label-width="formLabelWidth">
                    <el-select v-model="oneData.studyAddr" placeholder="请选择教学点">
                        <el-option v-for="(item,index) in studyAddrOptions"
                            :key="index" 
                            :label="item.studyAddr"
                            :value="item.studyAddr"></el-option>
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
    data(){
        return{
            studyAddrOptions:[],
            peopleOptions:[
                { label:'中华人民共和国居民身份证',value:'中华人民共和国居民身份证'},
                { label:'台湾居民往来大陆通行证',value:'台湾居民往来大陆通行证'},
                { label:'港澳居民往来大陆通行证',value:'港澳居民往来大陆通行证' },
                { label:'护照',value:'护照' },
                { label:'香港身份证',value:'香港身份证' },
                { label:'澳门身份证',value:'澳门身份证' },
                { label:'港澳居民居住证',value:'港澳居民居住证' },
                { label:'台湾居民居住证',value:'台湾居民居住证' }
            ],
            degreeOptions:[
                { label:'本科',value:'本科'},
                { label:'研究生',value:'研究生'},
                { label:'硕士',value:'硕士'},
                { label:'博士',value:'博士'}
            ]
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
            that.oneData.graduationDate=that.oneData.graduationDate.replace("00:00:00","");
            that.oneData.enterDate=that.oneData.enterDate.replace("00:00:00","");
            this.$api.putinfo(that.oneData.id,{
                cardNum:that.oneData.cardNum,
                cardType:that.oneData.cardType,
                degree:that.oneData.degree,
                enterDate:that.oneData.enterDate,
                graduationDate:that.oneData.graduationDate,
                phone:that.oneData.phone,
                photo:that.oneData.photo,
                sex:that.oneData.sex,
                realName:that.oneData.realName,
                studyAddr:that.oneData.studyAddr,
                workPlace:that.oneData.workPlace,
                category:that.oneData.category
            }).then(res=>{
                if(res.err_code === 100){
                    that.$message.success('信息更新成功');
                    that.dialogFormVisible_=false;
                }else{
                    that.$message.error('信息更新失败');
                }
            })
        },
        getAddr(){//获取教学点
            this.$api.addr().then(res=>{
                this.studyAddrOptions=res.data.list.list;
            })
        }
    },
    created(){
        this.getAddr();
    }
}
</script>