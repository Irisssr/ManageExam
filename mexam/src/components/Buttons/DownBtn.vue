<template>
    <div class="down-btn" @click="setTemp">
        <a class="downExcel" :href="url">下载准考证</a>
    </div>
</template>

<script>
export default {
    props:{
        url:{ type:String,default:null},
        examId:{ type:Number,default:null}
    },
    methods:{
        setTemp(){
            this.$emit('sendTemp',this.examId)
        }
    }
}
</script>

<style lang="scss" scoped>
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