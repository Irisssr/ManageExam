<template>
    <div class="exam">
         <!-- 条件筛选 -->
         <div class="handle-box">
            <el-input placeholder="考生证件号" v-model="cardNum"></el-input>
            <span style="margin:0 5px;">考次</span>
            <el-select v-model="examId">
                <el-option v-for="item in examidlist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"></el-option>
            </el-select>
            <el-button type="primary" style="margin:0 5px;" @click="handleSearch">查询</el-button>
            <div class="el-button" @click="handleCancel" v-show="isUse">取消</div>
        </div>

        <div class="handle-box">
            <!-- 导出Excel -->
            <dw-excelBtn 
                title="导出考生报名信息Excel"
                :infolist="tableAllData"
                infoTitle="考生准考证信息"
                :tHeader="tHeader"
                :filterVal="filterVal"></dw-excelBtn>
            <div class="upload">
                <excel-btn title="导入考生报名信息"
                @setExcel="getExcel"></excel-btn>
            </div>
            
        </div>
        <!-- 内容 -->
        <el-table
            height="550px"
            :data="tableData"
            border highlight-current-row
            style="width:100%;">
            <el-table-column align="center" prop="examName" label="考试名称"></el-table-column>
            <el-table-column align="center" prop="examType" label="考试类型"></el-table-column>
            <el-table-column align="center" prop="realName" label="考生姓名"></el-table-column>
            <el-table-column align="center" prop="category" label="考生类别"></el-table-column>
            <el-table-column align="center" prop="cardType" label="考生证件类型"></el-table-column>
            <el-table-column align="center" prop="cardNum" label="考生证件号"></el-table-column>
            <el-table-column align="center" label="考生证件照">
                <template slot-scope="{ row }">
                        <el-image
                        fit="cover"
                        style="width:50px;height:50px;"
                        :src="row.url"></el-image>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="sex" label="考生性别"></el-table-column>
            <el-table-column align="center" prop="enterDate" label="考生入学时间"></el-table-column>
            <el-table-column align="center" prop="graduationDate" label="考生毕业时间"></el-table-column>
            <el-table-column align="center" prop="studyAddr" label="教学点"></el-table-column>
            <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
            <el-table-column align="center" prop="userId" label="用户账号"></el-table-column>
            <el-table-column align="center" prop="workPlace" label="工作单位"></el-table-column>
            <el-table-column align="center" prop="enrollmentStatus" label="审核状态">
                <template slot-scope="{ row }">
                    <el-tag :type="row.enrollmentStatus| enFilter">{{ row.enrollmentStatus }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="paymentStatus" label="缴费状态">
                <template slot-scope="{ row }">
                    <el-tag :type="row.paymentStatus|payFilter">{{ row.paymentStatus }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="applicationStatus" label="报考状态"></el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="success" @click="handleEdit(scope.row)">编辑状态</el-button>
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

        <!-- 考试信息编辑 -->
        <Edit title="考生报名状态更新"
            :oneData="oneData"
            @setDialog="getEditDialog"
            :dialogFormVisible="dialogEditForm"></Edit>

    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import Edit from './EditSign'
import DwExcelBtn from '@/components/Buttons/DwExcelBtn.vue'
import ExcelBtn from '@/components/Buttons/UpExcelBtn.vue'

export default {
    components:{
        Pagination,
        Edit,
        DwExcelBtn,
        ExcelBtn
    },
    filters:{
        payFilter(status){
            const payMap={
                '未缴费':'info',
                '已缴费':'success'
            }
            return payMap[status];
        },
        enFilter(status){
            const enMap={
                '待审核':'info',
                '审核通过':'success',
                '审核不通过':'danger'
            }
            return enMap[status];
        }
    },
    data(){
        return{
            tableAllData:[],
            tHeader:["考试名称","考试类型","考生姓名","考生类别","考生证件类型","考生证件号","考生性别","考生入学时间","考生毕业时间","教学点","联系电话","用户账号","工作单位","审核状态","缴费状态","报考状态"],
            filterVal:["examName","examType","realName","category","cardType","cardNum","sex","enterDate","enrollmentTime","studyAddr","phone","userId","workPlace","enrollmentStatus","paymentStatus","applicationStatus"],
            isUse:false,
            query:{
                pageSize:10,
                pageIndex:1,
                totalMsg:null
            },
            examidlist:[],
            examId:'',
            cardNum:'',
            tableData:[],
            dialogFormVisible:false,
            dialogEditForm:false,
            oneData:{}
        }
    },
    methods:{
        handleSearch(){//搜索
            if(!this.cardNum && !this.examId){
                return this.$message.error('请至少输入一项查询');
            }
            this.isUse=true;
            this.getSignList();
        },
        handleCancel(){//取消
            this.isUse=false;
            this.cardNum='';
            this.examId='';
            this.getSignList();
        },
        getExcel(e){
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file',file);
            this.$api.upsign(formData).then(res=>{
                console.log(res)
            })
        },
        getDialog(val){
            this.dialogFormVisible=val;
        },
        getEditDialog(val){
            this.getSignList();
            this.dialogEditForm=val;
        },
        getPageSize(size){//底部导航
            this.query.pageSize=size;
            this.getSignList();
        },
        getPageIndex(index){
            this.query.pageIndex=index;
            this.getSignList();
        },
        handleEdit(info){//编辑
            this.oneData=info;
            this.dialogEditForm=true;
        },
        handleDelete(scope){//单项删除
            let that=this;
            this.$confirm('确定删除吗?','提示',{
                type:'warning'
            }).then(()=>{
                that.$api.deleteSign(scope.id).then(res=>{
                    if(res.err_code === 101){
                        that.$message('删除成功');
                    }else{
                        that.$message('删除失败');
                    }
                    that.getSignList();
                })
            }).catch(()=>{})
        },
        getSignList(){
            let that = this;
            this.$api.getSign({
                examId:that.examId,
                cardNum:that.cardNum,
                pageNum:that.query.pageIndex,
                pageSize:that.query.pageSize
            }).then(res=>{
                if(res.err_code === 100 ){
                    that.tableData=res.data.signs;
                    that.query.totalMsg=res.data.count;
                }else{
                    that.$message.error(res.err_msg)
                }
            })
            this.allData();
        },
        allData(){
            let that = this;
            this.$api.getSign({
                examId:that.examId,
                cardNum:that.cardNum,
                pageNum:1,
                pageSize:that.query.totalMsg
            }).then(res=>{
                if(res.err_code === 100 ){
                    that.tableAllData=res.data.signs;
                }
            })
        },
        getlistid(){//下拉考次
            let that=this;
            this.$api.listid().then(res=>{
                that.examidlist=res.data.exams;
            })
        }
    },
    created(){
        this.getSignList();
        this.getlistid();
    }
}
</script>

<style lang="scss" scoped>
    .handle-box{
        .el-input{
            width: 200px;
        }
        .testTitle{
            margin: 0 20px;
        }
    }
</style>