<template>
    <div class="exam">
        <!-- 查询 -->
        <div class="handle-box">
            <el-input placeholder="准考证号" v-model="testNum"></el-input>
            <span style="margin:0 5px;">考次</span>
            <el-select v-model="examId">
                <el-option v-for="item in examidlist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    @change="getId"></el-option>
            </el-select>
            <span>成绩状态</span>
            <el-select v-model="gradeStatus">
                <el-option v-for="item in gradeOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" style="margin:0 5px;" @click="handleSearch">搜索</el-button>
            <div class="el-button" @click="handleCancel" v-show="isUse">取消</div>
        </div>

        <div class="handle-box">
            <!-- 导出考生成绩信息Excel -->
            <dw-excelBtn 
                title="导出考生成绩信息Excel"
                :infolist="allExcelData"
                infoTitle="考生成绩信息"
                :tHeader="tHeader"
                :filterVal="filterVal"></dw-excelBtn>
            <!-- 导入考生成绩Excel -->
            <excel-btn title="导入考生成绩Excel"
                @setExcel="getExcel"></excel-btn>
            <!-- 成绩下载模板 -->
            <down-temp :url="tempUrl"></down-temp>
        </div>

        <el-table
            height="550px"
            :data="tableData"
            border highlight-current-row
            style="width:100%;">
            <el-table-column align="center" prop="admissionNumber" label="准考证号"></el-table-column>
            <el-table-column align="center" prop="sumGrade" label="考试成绩"></el-table-column>
            <el-table-column align="center" prop="status" label="考试成绩状态">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | typeFilter">{{ row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="createdBy" label="创建人"></el-table-column>
            <el-table-column align="center" prop="createdTime" label="创建时间"></el-table-column>

            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="success" @click="handleEdit(scope.row)">编辑</el-button>
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
        <EditGrade title="考生成绩编辑"
            :oneData="oneData"
            @setDialog="getEditDialog"
            :dialogFormVisible="dialogEditForm"></EditGrade>

    </div>
</template>

<script>
import ExcelBtn from '@/components/Buttons/UpExcelBtn.vue'
import Pagination from '@/components/Pagination.vue'
import DwExcelBtn from '@/components/Buttons/DwExcelBtn.vue'
import EditGrade from './GradeFrom'
import XLSX from 'xlsx'
import DownTemp from '@/components/Buttons/DownBtn.vue'
import baseurl from '@/axios/base.js'

export default {
    components:{
        Pagination,
        ExcelBtn,
        DwExcelBtn,
        EditGrade,
        DownTemp
        // Edit
    },
    filters:{
        typeFilter(type){
            const typeMap={
                '通过':'success',
                '未通过':'danger'
            }
            return typeMap[type];
        }
    },
    data(){
        return{
            tHeader:["准考证","考试成绩","考试成绩状态","创建人","创建时间"],
            filterVal:["admissionNumber","sumGrade","status","updatedBy","updatedTime"],
            isUse:false,
            query:{
                pageSize:10,
                pageIndex:1,
                totalMsg:null
            },
            testNum:'',
            examId:'',
            gradeStatus:'',
            gradeOptions:[
                { label:'通过',value:'通过'},
                { label:'未通过',value:'未通过'}
            ],
            tempUrl:null,
            tableData:[],
            dialogFormVisible:false,
            dialogEditForm:false,
            oneData:{},
            allExcelData:[],
            examidlist:[]
        }
    },
    methods:{
        //搜索
        getId(id){
            this.examId=id;
        },
        handleSearch(){
            console.log(this.gradeStatus,this.examId,this.testNum)
            this.isUse=true;
            this.getGradeList();
        },
        handleCancel(){//取消
            this.isUse=false;
            this.examId='';
            this.testNum='';
            this.gradeStatus='';
            this.getGradeList();
        },
        getExcel(e){
            // this.readExcel(e);
            let that = this;
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file',file);
            this.$api.upgrade(formData).then(res=>{
                console.log(res)
                if(res.data.err_code === 101){
                    that.$message('数据重复');
                }
            })
            this.getGradeList();
        },
        readExcel(e){//表格导入事件
            let that=this,file=e.target.files;
            if(file.length<=0) return;
            else if(!/\.(xls|xlsx)$/.test(file[0].name.toLowerCase())){
                return that.$message.error('上传文件格式不正确,请上传正确格式的文件')
            }
            const reader = new FileReader();
            reader.readAsBinaryString(file[0]);
            reader.onload= function(ev){
                const data= ev.target.result;
                const workbook = XLSX.read(data,{
                    type:'binary'
                })
                const wsname = workbook.SheetNames[0];
                const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
                console.log(ws)
                // that.tableData=
            }
        },
        formData(data){
            const formMap={
                '准考证号':'examId',
            }
            return formMap[data];
        },
        tempExcel(){//下载模板
            this.$api.gradetemplate().then(res => {
                let blob = new Blob([res.data],{
                    type:'application/vnd.ms-excel' 
                });
                let objectUrl = URL.createObjectURL(blob);
                window.location.href = objectUrl;
            })
        },//编辑
        getDialog(val){
            this.dialogFormVisible=val;
        },
        handleEdit(info){
            this.oneData=info;
            this.dialogEditForm=true;
        },
        getEditDialog(val){
            this.getCradeList();
            this.dialogEditForm=val;
        },//底部导航页面
        getPageSize(size){
            this.query.pageSize=size;
            this.getGradeList();
        },
        getPageIndex(index){
            this.query.pageIndex=index;
            this.getGradeList();
        },
        handleDelete(scope){//单项删除
            let that=this;
            this.$confirm('确定删除吗?','提示',{
                type:'warning'
            }).then(()=>{
                that.$api.gradedel(scope.id).then(res=>{
                    console.log(res);
                    that.$message('删除失败');
                    that.getSignList();
                })
            }).catch(()=>{})
        },
        getGradeList(){//获得成绩信息
            let that=this;
            this.$api.getgrade({
                admissionNum:that.testNum,
                examId:that.examId,
                status:that.gradeStatus,
                pageNum:that.query.pageIndex,
                pageSize:that.query.pageSize,
            }).then(res=>{
                console.log(res)
                if(res.err_code ===100){
                    let data=res.data.grades;
                    that.query.totalMsg=data.total;
                    that.tableData=data.list;
                }else{
                    that.$message.error('查询失败');
                }
                
            })
            this.getExcelList();
        },
        getExcelList(){//导出Excel
            let that=this;
            this.$api.getgrade({
                admissionNum:that.testNum,
                status:that.gradeStatus,
                examId:that.examId,
                pageNum:1,
                pageSize:that.query.totalMsg
            }).then(res=>{
                let data=res.data.grades;
                that.allExcelData=data.list;
            })
        },
        getlistid(){//获得考次
            let that=this;
            this.$api.listid().then(res=>{
                that.examidlist=res.data.exams;
            })
        }
    },
    created(){
        let token=sessionStorage.getItem('token');
        this.tempUrl= baseurl.url+'/admin/grade/download/template?Authorization='+token;
        this.getlistid();
        this.getGradeList();
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