<template>
    <div class="DwExcelBtn">
        <el-button type="success" @click="exportExcel">{{ title}}</el-button>
    </div>
</template>

<script>
export default {
    props:{
        title:{ type:String,default:''},
        infolist:{ type:Array,default:null },
        infoTitle:{ type:String,default:''},
        tHeader:{ type:Array,default:null},
        filterVal:{ type:Array,default:null}
    },
    methods:{
        exportExcel(){//导出excel
            let that=this;
            import("@/excel/Export2Excel").then(excel=>{
                const data=this.formatJson(that.filterVal,that.infolist);
                excel.export_json_to_excel(that.tHeader,data,that.infoTitle);
            })
        },
        formatJson(filterVal,jsonData){
            return jsonData.map(v=>filterVal.map(j=>{
                return v[j];
            }))
        },
    }
}
</script>

<style lang="scss" scoped>
    .DwExcelBtn{
        margin: 0 5px;
    }
</style>