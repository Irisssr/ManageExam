<template>
    <div class="exam">
        
        <div class="handle-box">
            <el-input placeholder="考试名称关键字" v-model="search.testKey"></el-input>
            <span class="testTitle">考试发布状态</span>
            <el-select v-model="search.testStatus">
                <el-option v-for="item in testOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
            <span class="testTitle">考试类型</span>
            <el-select v-model="search.testType">
                <el-option v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
            <span class="testTitle"></span>
            <el-button type="primary"
                @click="handleSearch">搜索</el-button>
            <div class="el-button" @click="handleCancel" v-show="isUse">取消</div>
        </div>

        <div class="handle-box">
            <dw-excelBtn 
                title="导出考生成绩信息Excel"
                :infolist="allExcelData"
                infoTitle="考试信息"
                :tHeader="tHeader"
                :filterVal="filterVal"></dw-excelBtn>
            <el-button type="warning" @click="postExam">发布考试</el-button>
        </div>

        <!-- 内容 -->
        <el-table
            height="520px"
            :data="tableData"
            border highlight-current-row
            style="width:100%;">
            <el-table-column align="center" prop="createdBy" label="创建人"></el-table-column>
            <el-table-column align="center" prop="createdTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="startTime" label="考试报名开始时间"></el-table-column>
            <el-table-column align="center" prop="deadlineTime" label="考试报名截止时间"></el-table-column>
            <el-table-column align="center" prop="examName" label="考试名称"></el-table-column>
            <el-table-column align="center" prop="examType" label="考试类型"></el-table-column>
            <el-table-column align="center" prop="examDate" label="考试当天日期"></el-table-column>
            <el-table-column align="center" prop="examTime" label="笔试时间段"></el-table-column>
            <el-table-column align="center" prop="arriveTime" label="考生报道时间段"></el-table-column>
            <el-table-column align="center" prop="examGrade" label="考试等级"></el-table-column>
            <el-table-column align="center" prop="examNotice" label="考生须知"></el-table-column>
            <el-table-column align="center" prop="examPrompt" label="考点提示"></el-table-column>
            <el-table-column align="center" label="发布状态">
                <template slot-scope="{row}">
                    <el-tag :type="row.examStatus | typeFilter">{{ row.examStatus | statusFilter}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="payAmount" label="缴费金额"></el-table-column>
            <el-table-column align="center" prop="payCode" label="缴费代码"></el-table-column>
            <el-table-column align="center" prop="paySubject" label="缴费主题"></el-table-column>
            <!-- <el-table-column align="center" prop="updatedBy" label="更新人"></el-table-column>
            <el-table-column align="center" prop="updatedTime" label="更新时间"></el-table-column> -->
            <el-table-column align="right" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 底部导航栏 -->
        <Pagination :pageIndex="query.pageIndex"
            :pageSize="query.pageSize"
            :totalMsg="query.totalMsg"
            @setPageSize="getPageSize"
            @setPageIndex="getPageIndex">
        </Pagination>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import DwExcelBtn from '@/components/Buttons/DwExcelBtn.vue'
import { mapMutations  } from 'vuex'

export default {
    filters:{
        typeFilter(type){
            const typeMap={
                true:'success',
                false:'danger',
                forbid:'info'
            }
            return typeMap[type];
        },
        statusFilter(status){
            const statusMap={
                true:'现在发布',
                false:'按预定时间发布',
                forbid:'禁止发布'
            }
            return statusMap[status];
        }
    },
    components:{
        Pagination,
        DwExcelBtn
    },
    data(){
        return{
            tHeader:["创建人","创建时间","考试报名开始时间","考试报名截止时间","考试名称","考试类型","考试当天日期","笔试时间段","考试等级","考生须知","考点提示","发布状态","缴费金额","缴费代码","缴费主题","更新人","更新时间"],
            filterVal:["createdBy","createdTime","startTime","deadlineTime","examName","examType","examDate","examTime","examGrade","examNotice","examPrompt","examStatus","payAmount","payCode","paySubject","updatedBy","updatedTime"],
            search:{
                testKey:'',
                testStatus:'',
                testType:''
            },
            query:{
                pageSize:10,
                pageIndex:1,
                totalMsg:null
            },
            testOptions:[
                { label:"已发布",value:"true"},
                { label:"预发布",value:"false"},
                { label:"禁止发布",value:"forbid"}
            ],
            typeOptions:[
                { label:"学位英语",value:"学位英语"},
                { label:"四六级",value:"四六级"},
                { label:"计算机",value:"计算机"}
            ],
            isUse:false,
            tableData:[],
            dialogFormVisible:false,
            list:[],
            allExcelData:[]
        }
    },
    methods:{
        ...mapMutations([
            'getExamList'
        ]),
        getDialog(val){
            this.dialogFormVisible=val;
        },
        handleSearch(){
            this.isUse=true;
            this.getTests();
        },
        handleCancel(){
            this.isUse=false;
            this.search.testKey='';
            this.search.testStatus='';
            this.search.testType='';
            this.getTests();
        },
        postExam(){
            this.$router.push('/AddExam');
        },
        getPageSize(size){
            this.query.pageSize=size;
            this.getTests();
        },
        getPageIndex(index){
            this.query.pageIndex=index;
            this.getTests();
        },
        handleEdit(info){//编辑
            sessionStorage.setItem('info',JSON.stringify(info))
            this.$router.push({ path:'/EditExam',query:{data:info.id}});
        },
        handleDelete(scope){//单项删除
            let that=this;
            this.$confirm('确定删除吗?','提示',{
                type:'warning'
            }).then(()=>{
                that.$api.delExam(scope.id).then(res=>{
                    if(res.err_code === 100){
                        that.getTests();
                        that.$message('删除成功');
                    }else{
                        that.$message('删除失败');
                    }
                })
            }).catch(()=>{})            
        },
        getTests(){//获取考试信息
            let that = this;
            this.$api.getExam({
                keyword: that.search.testKey,
                status: that.search.testStatus,
                type: that.search.testType,
                pageNum: that.query.pageIndex,
                pageSize: that.query.pageSize
            }).then(res=>{
                that.query.totalMsg=res.data.exams.list.length;
                that.tableData=res.data.exams.list;
                // console.log(that.tableData[0].examNotice.replace(/[&ampt;lg/]/g,""))
                // console.log(that.tableData[0].examPrompt.replace(/[&ampt;lg/]/g,""))
            })
            
            this.getExcelList();
        },
        getExcelList(){
            let that=this;
            this.$api.getExam({
                keyword: that.search.testKey,
                status: that.search.testStatus,
                type: that.search.testType,
                pageNum: 1,
                pageSize: that.query.totalMsg
            }).then(res=>{
                that.allExcelData=res.data.exams.list;
            })
        }
    },
    created(){
        this.getTests();
    },
    watch:{
        $route(){
            this.getTests();
        }
    }
}
</script>

<style lang="scss" scoped>
    .handle-box{
        .el-input{
            width: 300px;
        }
        .testTitle{
            margin: 0 20px;
        }
    }
</style>