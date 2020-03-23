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
        <h5>查询条件</h5>
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
            <el-button type="primary" style="margin:0 5px;" @click="handleSearch">查询</el-button>
            <el-button style="margin:0 5px;" @click="handleCancel" v-show="isUse">取消</el-button>
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
            <!-- 下载准考证模板 -->
            <down-temp :url="tempUrl"></down-temp>
        </div>

        <el-table
            height="550px"
            :data="tableData"
            border highlight-current-row
            style="width:100%;">
            <el-table-column align="center" prop="" label=""></el-table-column>
            <el-table-column align="center" prop="" label=""></el-table-column>
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

    </div>
</template>

<script>
import ExcelBtn from '@/components/Buttons/UpExcelBtn.vue'
import Pagination from '@/components/Pagination.vue'
import DwExcelBtn from '@/components/Buttons/DwExcelBtn.vue'
import DownTemp from '@/components/Buttons/DownBtn.vue'
import baseurl from '@/axios/base.js'
import XLSX from 'xlsx'

export default {
    components:{
        Pagination,
        ExcelBtn,
        DwExcelBtn,
        DownTemp
    },
    data(){
        return{
            tHeader:[],
            filterVal:[],
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
        handleSearch(){//查询
            this.isUse=true;
            this.getAdminssion();
        },
        handleCancel(){//取消
            this.examId='';
            this.isUse=false;
            this.getAdminssion();
        },
        handlePrint(){//设置打印状态
            let that=this;
            this.$api.statusadmission({
                exam_id:that.printexamId,
                status: that.printStatus
            }).then(res=>{
                if(res.err_code === 100){
                    that.printexamId='';
                    that.printStatus='';
                    that.$message.success('设置成功');
                }else{
                    that.$message.error('设置失败');
                }
            })
        },
        handleEdit(){//编辑

        },
        handleDelete(){//删除

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
                console.log(res)
                let data = res.data.admissions;
                that.tableData= data.list;
                that.query.totalMsg= data.total;
            })
        }
    },
    created(){
        let token=sessionStorage.getItem('token');
        this.tempUrl= baseurl.url+'/admin/admission/download/template?Authorization='+token;
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
</style>