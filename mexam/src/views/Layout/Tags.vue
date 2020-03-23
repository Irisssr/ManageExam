<template>
    <div class="tags">
        <el-breadcrumb separator="/" class="my-breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in tagsList" :key="index">
                <router-link :to="item.path">{{ item.meta.title}}</router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags"
                >
                <el-button type="primary" size="small">标签选项<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown" size="small">
                    <el-dropdown-item command="closeother">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="closeall">关闭全部</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
    computed:{
        ...mapState({
            visitedView:state=>state.visitedViews,
            tagsList:state=>state.tagsList,
            token:state=>state.token
        }),
        routes(){
            console.log(this.tagsList);
            return this.$route.options[2].routes;
        }
    },
    data(){
        return{
            tagList:[]
        }
    },
    methods:{
        ...mapMutations(['addTags','clearAll','clearOther']),
        isActive(path){
            return path === this.$route.fullPath;
        },
        setTags(route){
            const isExit=this.tagsList.some(item=>{
                return item.path === route.fullPath
            })

            if(!isExit){
                this.addTags(route)
            }
        },
        closeTags(index){
            const delItem=this.tagsList.splice(index,1)[0];
            const item=this.tagsList[index]?this.tagsList[index]:this.tagsList[index-1];
            if(item){
                delItem.path === this.$route.fullPath && this.$router.push(item.path)
            }else{
                this.$router.push('/Index')
            }
        },
        handleTags(command){
            if(command === 'closeother'){
                this.clearOther(this.$route);
            }else if(command === 'closeall'){
                this.clearAll();
                this.$router.push('/Index')
            }
        }
    },
    created(){
        this.setTags(this.$route)
    },
    watch:{
        $route(newVal){
            this.setTags(newVal)
        }
    }
}
</script>

<style lang="scss">
    .my-breadcrumb{
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
    }
    .tags{
        background: #cdd0d3;
        box-sizing: border-box;
        box-shadow: 3px 5px 8px #e7e7e7;
        height: 40px;
        overflow: hidden;
        display: flex;
        align-items: center;
        z-index: 999;

        .tags-close-box{
            box-sizing: border-box;
            position: absolute;
            right: 0;
            top:0;
            padding-top: 1px;
            width: 110px;
            height: 30px;
            box-shadow: -3px 0 15px rgba(0, 0, 0,0.1);
            z-index: 10;
        }        
    }
</style>