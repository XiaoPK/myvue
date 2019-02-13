<template>
<div>
    <el-checkbox-group v-model="rulesArray">
      <el-checkbox-button v-for="rule in rulesArray" :label="rule" :key="rule">{{city}}</el-checkbox-button>
    </el-checkbox-group>
</div>


</template>
<script>
export default {
    data(){
        return {
            rulesArray:[],
        }
        
    },
    methods:{}
    
}
</script>
<style>

</style>
