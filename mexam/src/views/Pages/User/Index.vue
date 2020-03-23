<template>
    <div class="user">
        <!-- 查询 -->
        <div class="handle-box">
            <span>查询条件</span>
            <el-select v-model="search.type">
                <el-option v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
            <el-input v-show="search.type ==='phone'" v-model="search.userPhone" placeholder="请输入手机号"></el-input>
            <el-input v-show="search.type ==='id'" v-model="search.userId" placeholder="请输入用户账号"></el-input>
            <el-select v-show="search.type ==='status'" v-model="search.userStatus">
                <el-option label="允许登陆" value="true"></el-option>
                <el-option label="禁止登陆" value="false"></el-option>
            </el-select>
            <el-select v-show="search.type ==='role'" v-model="search.userRole">
                <el-option label="考生" value="user"></el-option>
                <el-option label="管理员" value="admin"></el-option>
            </el-select>

            <el-button type="primary" @click="handlelSearch">搜索</el-button>
            <el-button  @click="handlelCancel" v-show="isSearch">取消</el-button>
        </div>
        <!-- 内容 -->
        <el-table
            height="520px"
            :data="tableData"
            border highlight-current-row
            style="width:100%;">
            <el-table-column align="center" prop="createdBy" label="创建人"></el-table-column>
            <el-table-column align="center" prop="createdTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="nickName" label="用户昵称"></el-table-column>
            <el-table-column align="center" prop="userId" label="用户账号"></el-table-column>
            <el-table-column align="center" width="250px" prop="userPass" label="用户密码"></el-table-column>
            <el-table-column align="center" prop="userPhone" label="用户手机号"></el-table-column>
            <el-table-column align="center" prop="userEmail" label="用户邮箱"></el-table-column>
            <el-table-column align="center" prop="userRole" label="用户角色">
                <template slot-scope="{row}">
                    <el-tag :type="row.userRole | roleType">{{ row.userRole | roleFilter}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="userStatus" label="用户状态">
                <template slot-scope="{row}">
                    <el-tag :type="row.userStatus | usersType">{{ row.userStatus | usersFilter}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="updatedBy" label="更新人"></el-table-column>
            <el-table-column align="center" prop="updatedTime" label="更新时间"></el-table-column>
            <el-table-column align="right" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
        <Edit title="用户更新"
            :oneData="oneData"
            @setDialog="getEditDialog"
            :dialogFormVisible="dialogEditForm"></Edit>
    </div>
</template>

<script>
import Edit from './editUser'
import Pagination from '@/components/Pagination.vue';
export default {
    components:{
        Pagination,
        Edit
    },
    filters:{
        roleType(type){
            const typeMap={
                user:'success',
                admin:''
            }
            return typeMap[type];
        },
        roleFilter(role){
            const roleMap={
                user:'考生',
                admin:'管理员'
            }
            return roleMap[role];
        },
        usersType(type){
            const typeMap={
                true:'success',
                false:'info'
            }
            return typeMap[type];
        },
        usersFilter(state){
            const stateMap={
                true:'允许登录',
                false:'禁止登录'
            }
            return stateMap[state]
        }
    },
    data(){
        return{
            typeOptions:[
                { label:'用户账号',value:'id'},
                { label:'用户手机号',value:'phone'},
                { label:'用户角色',value:'role'},
                { label:'用户状态',value:'status'}
            ],
            isSearch:false,
            tableData:[],
            search:{
                type:'',
                userId:'',
                userPhone:'',
                userRole:'',
                userStatus:''
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
            if(!this.search.type){
                return this.$message.error('请选择要查询的条件');
            }
            this.isSearch=true;
            this.getUser();
        },
        handlelCancel(){
            this.isSearch=false;
            this.search.type='';
            this.search.userId='';
            this.search.userPhone='';
            this.search.userRole='';
            this.search.userStatus='';
            this.getUser();
        },
        getEditDialog(val){//编辑
            this.dialogEditForm=val;
            console.log(val)
        },
        handleEdit(info){
            this.dialogEditForm=true;
            this.oneData=info;
        },
        getPageSize(val){//底部导航
            this.query.pageSize=val;
        },
        getPageIndex(val){
            this.query.pageIndex=val;
        },
        getUser(){
            let that=this;
            this.$api.aduser({
                userId:that.search.userId,
                userPhone:that.search.userPhone,
                userRole:that.search.userRole,
                userStatus:that.search.userStatus,
                page_num:that.query.pageIndex,
                page_size:that.query.pageSize
            }).then(res=>{
                let data =res.data.users;
                that.tableData=data.list;
                that.query.totalMsg= data.total;
            })
        }
    },
    created(){
        this.getUser();
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