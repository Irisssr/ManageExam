<template>
    <div class="addExam">
        <h2>考试信息添加</h2>
        <el-form :model="ruleForm" :rules="rules"
            ref="ruleForm" label-width="150px">
            <div class="addExamBox">
                <div class="form-left">
                    <el-form-item label="考试名称" :label-width="formLabelWidth">
                        <el-input clearable v-model="ruleForm.examName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="考试类型" :label-width="formLabelWidth" prop="examType">
                        <el-select v-model="ruleForm.examType">
                            <el-option label="无" value="无"></el-option>
                            <el-option label="学位英语" value="学位英语"></el-option>
                            <el-option label="四六级" value="四六级"></el-option>
                            <el-option label="计算机考试" value="计算机考试"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试等级" :label-width="formLabelWidth">
                        <el-select v-model="ruleForm.examGrade">
                            <el-option label="无" value="无"></el-option>
                            <el-option label="一级" value="一级"></el-option>
                            <el-option label="二级" value="二级"></el-option>
                            <el-option label="三级" value="三级"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试报名开始时间" :label-width="formLabelWidth">
                        <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="ruleForm.startTime"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="考试报名截止时间" :label-width="formLabelWidth">
                        <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="ruleForm.deadlineTime"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="考试当天日期" :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="ruleForm.examDate"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="考生报道时间段" :label-width="formLabelWidth">
                        <el-time-picker
                            is-range
                            v-model="arriveTime"
                            range-separator="至"
                            value-format="HH:mm"
                            format="HH:mm"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="考生笔试时间段" :label-width="formLabelWidth">
                        <el-time-picker
                            is-range
                            v-model="examTime"
                            range-separator="至"
                            value-format="HH:mm"
                            format="HH:mm"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="考试发布状态" :label-width="formLabelWidth">
                        <el-select v-model="ruleForm.examStatus">
                            <el-option label="现在发布" value="true"></el-option>
                            <el-option label="按预定时间发" value="false"></el-option>
                            <el-option label="禁止发布" value="forbid"></el-option>
                        </el-select>
                    </el-form-item>                                      
                    <el-form-item label="准考证开放打印时间" :label-width="formLabelWidth">
                        <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="ruleForm.printTime"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="缴费代码" :label-width="formLabelWidth" prop="payCode">
                        <el-input clearable v-model="ruleForm.payCode" autocomplete="off"></el-input>
                    </el-form-item> 
                    <el-form-item label="缴费金额" :label-width="formLabelWidth" prop="payAmount">
                        <el-input clearable v-model="ruleForm.payAmount" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="缴费主题" :label-width="formLabelWidth">
                        <el-input clearable v-model="ruleForm.paySubject" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
                <div class="form-right">
                    <el-form-item label="考生须知" :label-width="formLabelWidth">
                        <Editor @setEditor="getEditorNotice" ></Editor>
                    </el-form-item>
                    <el-form-item label="考生提示" :label-width="formLabelWidth">
                            <Editor @setEditor="getEditorPrompt" ></Editor>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <div slot="footer" class="edit-footer">
            <el-button type="success"  @click="addExam('ruleForm')">添 加</el-button>
            <el-button type="danger"  @click="cancelExam">返 回</el-button>
        </div>
    </div>
</template>

<script>

import Editor from '@/components/Editor.vue'
import { isTime } from '@/func/time.js'

export default {
    components:{
        Editor
    },
    data(){
        return{
            examTime:null,
            arriveTime:null,
            textarea:'',
            rules:{
                payCode:[
                    { required:true,message:'请输入缴费代码'}
                ],
                payAmount:[
                    { required:true,message:'请输入缴费金额'}
                ]
            },
            ruleForm:{
                arriveTime:'',
                deadlineTime:'',
                examDate:'',
                examGrade:'',
                examName:'',
                examPrompt:'',
                examNotice:'',
                examTime:'',
                examType:'',
                payCode:'',
                paySubject:'',
                printTime:'',
                startTime:'',
                payAmount:0
            },
            formLabelWidth:'150px',   
        }
    },
    methods:{
        getEditorNotice(val){
            this.ruleForm.examNotice=val;
        },
        getEditorPrompt(val){
            this.ruleForm.examPrompt=val;
        },
        cancel(){
            this.$router.push('/Exam');
        },
        cancelExam(){
            this.$router.push('/Exam');
        },
        addExam(formName){
            let that=this,
            arriveTime =isTime(that.arriveTime),
            examTime =isTime(that.arriveTime);
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.$api.postExam({
                        arriveTime: arriveTime,
                        deadlineTime: that.ruleForm.deadlineTime,
                        examDate: that.ruleForm.examDate,
                        examGrade: that.ruleForm.examGrade,
                        examName: that.ruleForm.examName,
                        examPrompt: that.ruleForm.examPrompt,
                        examNotice: that.ruleForm.examNotice,
                        examTime: examTime,
                        examType: that.ruleForm.examType,
                        payCode:that.ruleForm.payCode,
                        payAmount:that.ruleForm.payAmount,
                        paySubject:that.ruleForm.paySubject,
                        printTime: that.ruleForm.printTime,
                        startTime: that.ruleForm.startTime,
                        examStatus: that.ruleForm.examStatus
                    }).then(res=>{
                        if(res.err_code === 100){
                            that.$message('考试发布成功');
                            that.$router.push('/Exam');
                        }else{
                            that.$message('考试发布失败');
                        }
                    })
                }else{
                    that.$message('请按要求填写');
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .addExam{
        width: 100%;
        display: flex;
        color: #000;
        font-weight: 600;
        flex-direction: column;
        background: #fff;
        h2{
            margin-bottom: 10px;
        }
    }
    .el-form{
        width: 100%;
    }
    .addExamBox{
        padding: 20px 5px;
        width: 100%;
        display: flex;
        .el-input{
            width: 300px;
        }
    }
    .textarea{
        box-sizing: border-box;
    }
    .edit-footer{
        margin: 0 auto 100px;
    }
</style>