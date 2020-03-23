<template>
    <div class="user">
        <!-- 查询 -->
        <div class="handle-box">
            <el-input placeholder="用户账号" v-model="account"></el-input>
            <el-button type="primary" @click="handlelSearch">搜索</el-button>
            <el-button  @click="handlelCancel" v-show="isSearch">取消</el-button>
        </div>
        <!-- 内容 -->
        <el-table
            height="520px"
            :data="tableData"
            border highlight-current-row
            style="width:100%;">
            <el-table-column align="center" prop="opDetail" label="内容"></el-table-column>
            <el-table-column align="center" prop="opIp" label="创建地点"></el-table-column>
            <el-table-column align="center" prop="opTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="userId" label="用户账号"></el-table-column>
        </el-table>

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
export default {
    components:{
        Pagination,
    },
    data(){
        return{
            isSearch:false,
            tableData:[],
            account:'',
            query:{
                pageIndex:1,
                pageSize:10,
                totalMsg:null
            },
            dialogEditForm:false,
            oneData:{}
        }
    },
    methods:{
        handlelSearch(){//查询
            if(!this.account){
                return this.$message.error('填写不能为空');
            }
            this.isSearch=true;
            this.getAdlog();
        },
        handlelCancel(){
            this.account='';
            this.isSearch=false;
            this.getAdlog();
        },
        getPageSize(val){//底部导航
            this.query.pageSize=val;
            this.getAdlog();
        },
        getPageIndex(val){
            this.query.pageIndex=val;
            this.getAdlog();
        },
        getAdlog(){//日志数据
            let that=this;
            this.$api.adlog({
                account:that.account,
                page_num:that.query.pageIndex,
                page_size:that.query.pageSize
            }).then(res=>{
                let data = res.data.logs,that=this;
                that.query.totalMsg = data.total;
                that.tableData = data.list;
            })
        }
    },
    created(){
        this.getAdlog();
    }
}
</script>

<style lang="scss" scoped>
    .handle-box{
        .el-input{
            width: 200px;
        }
        .el-button{
            margin: 0 5px;
        }
    }
</style>