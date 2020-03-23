<template>
    <div class="exam">
        <!-- 设置打印 -->
        <h5>设置打印状态</h5>
        <div class="handle-box">
            <!-- 选择考次 -->
            <span style="margin:0 5px;">考次</span>
            <el-select v-model="printexamId">
                <el-option v-for="item in examidlist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"></el-option>
            </el-select>
            <!-- 选择打印状态 -->
            <span style="margin:0 5px;">打印状态</span>
            <el-select v-model="printStatus">
                <el-option v-for="item in printlist"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" style="margin:0 5px;" @click="handlePrint">设置</el-button>
        </div>
        <h5>下载准考证信息表</h5>
        <!-- 选择条件 -->
        <div class="handle-box">
            <!-- 选择考次 -->
            <span style="margin:0 5px;">考次</span>
            <el-select v-model="examId">
                <el-option v-for="item in examidlist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"></el-option>
            </el-select>
            <!-- 下载准考证 -->
            <div class="down-btn" @click="setTemp">
                <a class="downExcel" :href="tempUrl">下载准考证</a>
            </div>
        </div>
        <div class="handle-box">
            <!-- 导出准考证Excel -->
            <dw-excelBtn 
                title="导出准考证信息Excel"
                :infolist="tableData"
                infoTitle="考生准考证信息"
                :tHeader="tHeader"
                :filterVal="filterVal"></dw-excelBtn>
            <!-- 导入准考证信息Excel -->
            <excel-btn title="导入准考证信息Excel"
                @setExcel="getExcel"></excel-btn>
        </div>

        <el-table
            height="550px"
            :data="tableData"
            border highlight-current-row
            style="width:100%;">
            <el-table-column align="center" prop="signId" label="报名ID"></el-table-column>
            <el-table-column align="center" prop="" label="考生姓名"></el-table-column>
            <el-table-column align="center" prop="" label="身份证号"></el-table-column>
            <el-table-column align="center" prop="" label="考次名称"></el-table-column>
            <el-table-column align="center" prop="admissionNumber" label="准考证号"></el-table-column>
            <el-table-column align="center" prop="examAddr" label="考试地点"></el-table-column>
            <el-table-column align="center" prop="roomNumber" label="考场号"></el-table-column>
            <el-table-column align="center" prop="seatNumber" label="座位号"></el-table-column>
            <el-table-column align="center" label="打印状态">
                <template slot-scope="{row}">
                    <el-tag :type="row.status | statusType">{{ row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="description" label="备注"></el-table-column>
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
import ExcelBtn from '@/components/Buttons/UpExcelBtn.vue'
import Pagination from '@/components/Pagination.vue'
import DwExcelBtn from '@/components/Buttons/DwExcelBtn.vue'
import baseurl from '@/axios/base.js'
import XLSX from 'xlsx'

export default {
    components:{
        Pagination,
        ExcelBtn,
        DwExcelBtn,
    },
    filters:{
        statusType(type){
            const typeMap={
                '开启打印':'success',
                '关闭打印':'info'
            }
            return typeMap[type];
        }
    },
    data(){
        return{
            tHeader:["报名ID","考生姓名","身份证号","考次名称","准考证号","考试地点","考场号","座位号","打印状态","备注"],
            filterVal:["signId","","","","admissionNumber","examAddr","roomNumber","seatNumber","status"],
            printexamId:'',
            examId:'',
            printStatus:'',
            isUse:false,
            tempUrl:null,
            query:{
                pageSize:10,
                pageIndex:1,
                totalMsg:null
            },
            examidlist:[],
            tableData:[],
            printlist:[
                { label:'开启打印',value:'开启打印'},
                { label:'关闭打印',value:'关闭打印'},
            ],
            multipleSelection:[],
            dialogFormVisible:false,
            dialogEditForm:false,
            oneData:{},
        }
    },
    methods:{
        handlePrint(){//设置打印状态
            let that=this;
            if(!this.printexamId){
                return that.$message.error('请先选择考次');
            }
            if(!this.printStatus){
                return that.$message.error('请选择打印状态');
            }
            this.$api.statusadmission({
                exam_id:that.printexamId,
                status: that.printStatus
            }).then(res=>{
                if(res.err_code === 100){
                    that.printexamId='';
                    that.printStatus='';
                    that.$message.success('设置成功');
                    that.getAdminssion();
                }else{
                    that.$message.error('设置失败');
                }
            })
        },
        tempExcel(){
            this.$api.downtemplate().then(res => {
                let blob = new Blob([res.data],{
                    type:'application/vnd.ms-excel' 
                });
                let objectUrl = URL.createObjectURL(blob);
                window.location.href = objectUrl;
            })
        },
        getExcel(e){//上传Excel文件
            let that=this;
            const file = e.target.files[0];
            // this.readExcel(e);
            const formData = new FormData();
            formData.append('file',file);
            this.$api.upadmission(formData).then(res=>{
                console.log(res)
                that.$message(res.data.err_msg);
                that.getAdminssion();
            })
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
            }
        },
        getDialog(val){
            this.dialogFormVisible=val;
        },
        getEditDialog(val){
            this.getSignList();
            this.dialogEditForm=val;
        },
        getPageSize(size){
            this.query.pageSize=size;
            this.getAdminssion();
        },
        getPageIndex(index){
            this.query.pageIndex=index;
            this.getAdminssion();
        },
        setTemp(){
            if(!this.examId){
                return this.$message.error('请先选择考次');
            }
            let token=sessionStorage.getItem('token');
            this.tempUrl= baseurl.url+`/admin/admission/download/template/${this.examId}?Authorization=${token}`;
            console.log(this.examId,token,this.tempUrl)
        },
        getlistid(){//获取考次
            let that=this;
            this.$api.listid().then(res=>{
                that.examidlist=res.data.exams;
            })
        },
        getAdminssion(){//获取准考证信息
            let that=this;
            this.$api.admission({
                exam_id:that.examId,
                page_num:that.query.pageIndex,
                page_size:that.query.pageSize
            }).then(res=>{
                let data = res.data.admissions;
                that.tableData= data.list;
                console.log(that.tableData)
                that.query.totalMsg= data.total;
            })
        }
    },
    created(){
        this.getAdminssion();
        this.getlistid();
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
    .down-btn{
        box-sizing: border-box;
        border-radius: 5px;
        background: #45a1ff;
        padding: 10px 5px;
        margin: 0 5px;

        a{
            color: #fff;
        }

        &:hover{
            cursor: pointer;
        }
    }
</style>