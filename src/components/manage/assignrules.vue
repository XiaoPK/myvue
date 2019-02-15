<template>
<div>

    <div>
        <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="termName" sortable label="学期" width="100"></el-table-column>
      <el-table-column prop="beginDay" sortable label="开始时间" width="180"></el-table-column>
      <el-table-column prop="endDay" label="结束时间" width="180"></el-table-column>
      <el-table-column prop="teachWeeks" label="教学周数" width="100"></el-table-column>
      <el-table-column prop="weeks" label="学期周数" width="100"></el-table-column>
      <el-table-column prop="offerCourses" label="开设课程" width="200"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div>
    <el-checkbox-group v-model="rulesResult"> 
      <el-checkbox v-for="rule in rulesArray" :label="rule" :key="rule"  border>{{rule}}</el-checkbox>
    </el-checkbox-group>
    </div>

</div>
</template>
<script>
import * as ruleApi from '../../apis/rules.js'
export default {
    data(){
        return {
            tableData:[],
            rulesArray:["上课不许吃东西","不许说法","不许喝水"],
            rulesResult:[],
        }
        
    },
    methods:{
        queryData(){
            ruleApi.query().then(res => {
                if(res.code == "140001"){
                    this.rulesArray = res.result.results
                    this.$message.success("请求成功")
                }else{
                    this.$message.error("error " + res.message)
                }
            }).catch(error => {
                this.$message.error(error + '')
            })
        },
        // save(){
        //     ruleApi.add().then(res => {
        //         if(res.code == "140001"){
        //             this.$message.success("保存成功")
        //         }else{
        //             this.$message.error("error " + res.message)
        //         }
        //     }).catch(error => {
        //          this.$message.error(error + '')
        //     })
        // },
        
    }
    
}
</script>
<style>

</style>
