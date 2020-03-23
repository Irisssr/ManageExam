<template>
    <div class="upload">
        <form enctype="multippart/form-data">
            <div class="upload-excel">
                <input type="file" class="upload-input"
                ref="excel-upload-input"
                accept=".xlsx,.xls"
                @change="selectExcel"/>
                {{ title }}
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props:{
        title:{ type:String,default:''}
    },
    methods:{
        selectExcel(e){
            // console.log(e)
            this.$emit('setExcel',e)
        }
    }
}
</script>

<style lang="scss" scoped>
    .upload{
        display: flex;
        align-items: flex-end;
    }
    .upload-excel{
        width: 180px;
        height: 42px;
        margin: 0 8px;
        border-radius: 5px;
        background: #e6a23c;
        position: relative;
        color: #fff;
        line-height: 42px;
        text-align: center;

        &:hover{
            cursor: pointer;
        }
    }

    .upload-input{
        position: absolute;
        // width: 100px;
        height: 46px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>