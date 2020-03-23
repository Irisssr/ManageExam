<template>
    <div class="user">
        <!-- 查询 -->
        <div class="handle-box">
            <!-- <span>查询条件</span> -->
            <el-input v-model="search.cardNum"></el-input>
            <el-button type="primary" @click="handlelSearch">搜索</el-button>
            <el-button  @click="handlelCancel" v-show="isSearch">取消</el-button>
        </div>
        <!-- 内容 -->
        <el-table
            height="520px"
            :data="tableData"
            border highlight-current-row
            style="width:100%;">
            <el-table-column align="center" prop="userId" label="报考号"></el-table-column>
            <el-table-column align="center" prop="realName" label="真实姓名"></el-table-column>
            <el-table-column align="center" prop="sex" label="性别"></el-table-column>
            <el-table-column align="center" prop="cardType" label="证件类型"></el-table-column>
            <el-table-column align="center" prop="cardNum" label="证件号码"></el-table-column>
            <el-table-column align="center" label="考生照片">
                <template slot-scope="{ row }">
                        <el-image
                        fit="cover"
                        style="width:50px;height:50px;"
                        :src="row.photo | photoFilter"></el-image>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="category" label="考生类别"></el-table-column>
            <el-table-column align="center" prop="degree" label="学历"></el-table-column>
            <el-table-column align="center" prop="enterDate" label="入学时间"></el-table-column>
            <el-table-column align="center" prop="graduationDate" label="毕业时间"></el-table-column>
            <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
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
            <el-table-column align="right" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <Pagination :pageIndex="query.pageIndex"
            :pageSize="query.pageSize"
            :totalMsg="query.totalMsg"
            @setPageSize="getPageSize"
            @setPageIndex="getPageIndex">
        </Pagination>
        <!-- 编辑 -->
        <Edit title="考生信息更新"
            :oneData="oneData"
            @setDialog="getEditDialog"
            :dialogFormVisible="dialogEditForm"></Edit>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import Edit from './editForm'
import URL from '@/axios/base.js'
export default {
    components:{
        Pagination,
        Edit
    },
    filters:{
        photoFilter(img){
            return URL.url+img;
        }
    },
    data(){
        return{
            isSearch:false,
            tableData:[],
            search:{
                cardNum:''
            },
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
            this.isSearch=true;
            this.getInfo();
        },
        handlelCancel(){
            this.isSearch=false;
            this.search.cardNum='';
            this.getInfo();
        },
        handleDel(info){//删除
            let that = this;
            console.log(info);
            this.$api.delinfo(info.id).then(res=>{
                console.log(res)
                if(res.err_code === 100){
                    that.$message.success('删除成功');
                    that.getInfo();
                }else{
                    that.$message.error(res.err_msg);
                }
            })
        },
        getEditDialog(val){//编辑
            this.dialogEditForm=val;
        },
        handleEdit(info){
            this.dialogEditForm=true;
            this.oneData=info;
        },
        getPageSize(val){//底部导航
            this.query.pageSize=val;
            this.getInfo();
        },
        getPageIndex(val){
            this.query.pageIndex=val;
            this.getInfo();
        },
        getInfo(){
            let that=this;
            this.$api.getinfo({
                card_num:that.search.cardNum,
                page_num:that.query.pageIndex,
                page_size:that.query.pageSize
            }).then(res=>{
                let data =res.data.infos;
                that.tableData=data.list;
                that.query.totalMsg= data.total;
            })
        }
    },
    created(){
        this.getInfo();
    }
}
</script>

<style lang="scss" scoped>
    .handle-box{
        .el-input{
            width: 200px;
        }
        .el-select,
        .el-button{
            margin: 0 5px;
        }
    }
</style>