<template>
    <div class="pagination">
        <!-- 底部导航 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10,50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalMsg ">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props:{
        totalMsg:{ type:Number,default:null},
        pageSize:{ type:Number, default:10},
        pageIndex:{ type:Number,default:1}
    },
    methods:{
        handleSizeChange(val){
            this.$emit('setPageSize',val);
        },
        handleCurrentChange(val){
            this.$emit('setPageIndex',val);
        }
    }
}
</script>

<style>

</style>