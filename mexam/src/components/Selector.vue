<template>
    <div class="selector">
        <span>{{ text }}</span>
        <el-select v-model="value_">
            <el-option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    props:{
        text:{type:String,default:''},
        value:{ type:String,default:null},
        options:{ type:Array,default:null}
    },
    computed:{
        value_:{
            get(){
                return this.value;
            },
            set(val){
                this.$emit('setValue',val)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .selector{
        display: flex;
        justify-content: space-around;
        align-items: center;

        span{
            color: #333;
            margin: 0 5px;
        }
    }
</style>