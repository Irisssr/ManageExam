<template>
    <div class="exam">
        <!-- {{ excelTable.header }}----{{ excelTable.results}} -->
        <input type="file" ref="excel-upload-input" accept=".xlsx,.xls"
            @change="selectExcel">
        <el-button type="success" @click="handleUpload">上传Excel文件</el-button>

        <el-table :data="tableData" border highlight-current-row
            style="width: 100%;margin-top:20px;">
            <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
            <!-- <el-table-column v-for="item of tableData" :key="item" prop="item" :label="item" /> -->
        </el-table>
        <!-- <el-table
            height="6550"
            ref="multipleTable"
            :data="excelTable.results"
            tooltip-effect="drak"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column align="center" label="2019级课组类别" prop="__EMPTY"></el-table-column>
            <el-table-column align="center" label="2016/2017/2018级课组类别" prop="__EMPTY_1"></el-table-column>
            <el-table-column align="center" label="课程名" prop="__EMPTY_2"></el-table-column>
            <el-table-column align="center" label="课程号" prop="__EMPTY_3"></el-table-column>
            <el-table-column align="center" label="开课单位" prop="__EMPTY_4"></el-table-column>
            <el-table-column align="center" label="学分" prop="__EMPTY_5"></el-table-column>
            <el-table-column align="center" label="学时" prop="__EMPTY_6"></el-table-column>
            <el-table-column align="center" label="邮箱" prop="__EMPTY_7"></el-table-column>
            <el-table-column align="center" label="邮箱" prop="__EMPTY_8"></el-table-column>
            <el-table-column align="center" label="邮箱" prop="__EMPTY_9"></el-table-column>
            <el-table-column align="center" label="邮箱" prop="__EMPTY_10"></el-table-column>
            <el-table-column align="center" label="邮箱" prop="__EMPTY_11"></el-table-column>
            <el-table-column align="center" label="邮箱" prop="__EMPTY_12"></el-table-column>
            <el-table-column align="center" label="邮箱" prop="__EMPTY_13"></el-table-column>
            <el-table-column align="center" label="邮箱" prop="__EMPTY_14"></el-table-column>
            <el-table-column align="center" label="邮箱" prop="__EMPTY_15"></el-table-column>
            <el-table-column align="center" label="邮箱" prop="__EMPTY_16"></el-table-column>
        </el-table> -->
    </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
    data(){
        return{
            tableHeader:[],
            tableData:[]
        }
    },
    methods:{
        generateData({ results}){
            this.tableHeader=results[0];
            this.tableData=results;
            for(let key of this.tableData){
                console.log(key)
                // console.log(this.tableData[key])
            }
        },
        selectExcel(e){
            const files = e.target.files;
            const rawFile = files[0];
            if( !rawFile) return;
                this.upload(rawFile);
        },
        upload(rawFile){
            this.$refs['excel-upload-input'].value=null;
            this.readerData(rawFile);
        },
        readerData(rawFile){
            const reader = new FileReader();
            reader.onload = e=>{
                const data = e.target.result
                const workbook = XLSX.read(data, { type: 'array' })
                console.log(workbook)
                const firstSheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[firstSheetName]
                const header = this.getHeaderRow(worksheet)
                const results = XLSX.utils.sheet_to_json(worksheet)
                this.generateData({ header, results })
            }
            reader.readAsArrayBuffer(rawFile);            
        },
        getHeaderRow(sheet){
            const headers=[]
            const range = XLSX.utils.decode_range(sheet['!ref']);
            let C;
            const R =range.e.c;
            for(C=range.s.c;C<=range.e.c;++C){
                const cell = sheet[XLSX.utils.encode_cell({c:C,r:R})]
                let hdr = C;
                if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
                headers.push(hdr)
            }
            return headers;
        },
        handleUpload(){

        },
        handleSelectionChange(){}
    }
}
</script>

<style>

</style>