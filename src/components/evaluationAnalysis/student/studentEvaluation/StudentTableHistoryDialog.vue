<script setup lang="ts">
import exportToExcel from "@/utils/exportToExcel.ts";
import type { StudentHistory } from "@/types/evaluationAnalysis.ts";

defineProps({
    historys: Array<StudentHistory>
})

function exportHistoryData() {
    exportToExcel("historyTable", '学生历史评价表')
}
</script>

<template>
    <div class="w-full h-100">
        <div class="relative w-full h-10 ml-200">
            <el-button @click="exportHistoryData">导出评价</el-button>
        </div>
        <el-table id="historyTable" class="history-table" :data="historys" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="100" />
            <el-table-column prop="teacher" label="评价人" width="100" />
            <el-table-column prop="subject" label="学科" width="100" />
            <el-table-column prop="content" label="评价内容" width="280" />
            <el-table-column prop="score" label="得分" width="180" />
            <el-table-column prop="week" label="评价时间" width="180" />
        </el-table>
    </div>
</template>

<style scoped lang="scss">
.history-table {
    overflow-x: hidden;
    overflow-y: scroll;
    height: 25vh;
}

.history-table::-webkit-scrollbar {
    width: 10px;
}

.history-table::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}

.history-table::-webkit-scrollbar-thumb {
    background-color: #888;
}

.history-table::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}
</style>