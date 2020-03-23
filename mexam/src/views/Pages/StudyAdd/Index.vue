<template>
    <div class="user">
        <h4 class="ch4">教学点设置</h4>
        <!-- 查询 -->
        <div class="handle-box">
            <el-input placeholder="教学点" v-model="address"></el-input>
            <el-button type="primary" @click="handlelSearch">搜索</el-button>
            <el-button  @click="handlelCancel" v-show="isSearch">取消</el-button>
        </div>
        <!-- 按钮 -->
        <div class="handle-box">
            <el-button type="warning" @click="postExam">创建教学点</el-button>
        </div>
        <!-- 内容 -->
        <el-table
            height="520px"
            :data="tableData"
            border highlight-current-row
            style="width:100%;">
            <el-table-column align="center" prop="studyAddr" label="教学点"></el-table-column>
            <el-table-column align="center" prop="createdBy" label="创建人"></el-table-column>
            <el-table-column align="center" prop="createdTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="updatedBy" label="更新人"></el-table-column>
            <el-table-column align="center" prop="updatedTime" label="更新时间"></el-table-column>
            <el-table-column align="right" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
            <el-table-column align="right" label="删除">
                <template slot-scope="scope">
                    <el-button size="small" type="danger"  @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageIndex="query.pageIndex"
            :pageSize="query.pageSize"
            :totalMsg="query.totalMsg"
            @setPageSize="getPageSize"
            @setPageIndex="getPageIndex">
        </Pagination>
        <!-- 添加 -->
        <AddrFrom :oneData="addrMsg"
            :dialogFormVisible="dialogAdd"
            @setDialog="getAddDialog"
            @updateData="update"></AddrFrom>
        <!-- 编辑 -->
        <!-- <Edit title="用户更新"
            :oneData="oneData"
            @setDialog="getEditDialog"
            :dialogFormVisible="dialogEditForm"></Edit> -->
    </div>
</template>

<script>
// import Edit from './editUser'
import Pagination from '@/components/Pagination.vue';
import AddrFrom from './AddrFrom'

export default {
    components:{
        Pagination,
        AddrFrom
        // Edit
    },
    data(){
        return{
            isSearch:false,
            address:'',
            addrMsg:{},
            tableData:[],
            query:{
                pageIndex:1,
                pageSize:10,
                totalMsg:null
            },
            dialogAdd:false,
            dialogEditForm:false,
            oneData:{}
        }
    },
    methods:{
        getEditDialog(val){//编辑
            this.dialogEditForm=val;
            console.log(val)
        },
        handleEdit(info){
            this.dialogEditForm=true;
            this.oneData=info;
        },
        update(){
            this.getAddr();
        },
        postExam(){//创建考试点
            this.dialogAdd=true;
        },
        getAddDialog(val){
            this.dialogAdd=val;
        },
        handleDel(info){//删除
            let that=this;
            this.$api.deladdr(info.id).then(res=>{
                if(res.err_code === 100){
                    that.$message('删除成功');
                    this.getAddr();
                }else{
                    that.$message.error('删除失败');
                }
            })
        },
        handlelSearch(){//搜索
            if(!this.address){
                return this.$message.error('教学点不能为空');
            }
            this.isSearch=true;
            this.getAddr();
        },
        handlelCancel(){
            this.address='';
            this.isSearch=false;
            this.getAddr();
        },
        getPageSize(val){//底部导航
            this.query.pageSize=val;
            this.getAddr();
        },
        getPageIndex(val){
            this.query.pageIndex=val;
            this.getAddr();
        },
        getAddr(){
            let that =this;
            this.$api.addr({
                addr:that.address,
                page_num:that.query.pageIndex,
                page_size:that.query.pageSize
            }).then(res=>{
                let data =res.data.list;
                this.tableData=data.list;
                this.query.totalMsg=data.total;
            })
        }
    },
    created(){
        this.getAddr();
    }
}
</script>

<style lang="scss" scoped>
    .ch4{
        color: #303133;
    }
    .handle-box{
        .el-button{
            margin: 0 5px;
        }
        .el-input{
            width: 200px;
        }
    }
</style>