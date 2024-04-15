
<script setup lang="ts">
import * as echarts from "echarts";
import { ref, reactive, onMounted } from "vue";
import { getStudentList } from "@/api/base.ts"
import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue";
import ClassSelectionBox from "@/components/evaluationAnalysis/common/ClassSelectionBox.vue";
import { weekDatas } from "@/store/modules/evaluationAnalysis.ts";
import type { WeekOption, StudentRow, StudentHistoryData } from "@/types/evaluationAnalysis.ts"
import { getStudentEvaluationWeek } from "@/api/base.ts"
import type { StudentHistory } from "@/types/evaluationAnalysis.ts";
import StudentTableHistoryDialog from "@/components/evaluationAnalysis/student/studentEvaluation/StudentTableHistoryDialog.vue";
import { getClassEvaluation } from "@/api/base.ts"

import { getTermList } from "@/api/base.ts";
import exportToExcel from "@/utils/exportToExcel.ts";
import { ElMessage } from "element-plus";
import evaluationAnalysis from "@/router/modules/evaluationAnalysis";


type classSelectionBoxCtx = InstanceType<typeof ClassSelectionBox>
const classSelectionBox = ref<null | classSelectionBoxCtx>(null)
const selectedSchoolId = ref<number>();
const selectedTermId = ref<string>("14")
const weeks = ref<WeekOption[]>(weekDatas)
const selectedWeekId = ref<number>(0)
const isRadarDialogVisible = ref<boolean>(false)
const isHistoryDialogVisible = ref<boolean>(false)

const terms = ref<any>([]);
const historys = ref<StudentHistory[]>()
const isLoading = ref<boolean>(true)
const students = ref<StudentRow[]>([])
const selectedClassId = ref<string>("")
const totalScore = ref<number>(0)

const chartOption = ref<any>({
    color: ['rgb(92, 255, 255)'],
    radar: {
        // shape: 'circle',
        indicator: [
            { name: '学业', max: 6500 },
            { name: '审美', max: 16000 },
            { name: '劳动与实践', max: 30000 },
            { name: '身心', max: 38000 },
            { name: '品德', max: 52000 }
        ]
    },
    series: [
        {
            type: 'radar',
            data: [
                {
                    value: [4200, 3000, 20000, 35000, 50000],
                    name: 'Allocated Budget'
                }
            ]
        }
    ]
})


async function getTerms() {
    const res = await getTermList()
    terms.value = terms.value = res.data.map(({ termId, name }: any) => ({
        id: termId,
        name: name,
    }))
}

function disposeChart() {
    echarts.init(document.getElementById("radar-chart")!).dispose();
}

function initChart() {
    type EChartsOption = echarts.EChartsOption
    var chartDom = document.getElementById('radar-chart')
    var myChart = echarts.init(chartDom)
    var option: EChartsOption
    option = chartOption.value
    option && myChart.setOption(option)
}

async function handleChangeSelectedClassId(classId) {
    selectedClassId.value = classId
    doRefresh()
}

function showRadarChart(index: number) {
    isRadarDialogVisible.value = true
    setTimeout(() => {
        disposeChart()
        initChart()
    }, 300)
}

async function showHistoryChart(index: number) {
    console.log(isHistoryDialogVisible.value)
    isHistoryDialogVisible.value = true
    historys.value = currentClassEvaluations.value.filter(evaluation => evaluation.student_id === students.value[index].id).map(({ id, content, score, subject_id }: any) => ({
        id: id,
        content: content,
        score: score,
        subjectId: subject_id,
    }))
    console.log(currentClassEvaluations.value)
    console.log(historys.value)
}

function handleReset() {
}

function handleChangeSelectedSchoolId(schoolId) {
    selectedSchoolId.value = schoolId
    setTimeout(() => {
        classSelectionBox.value?.changeGradeId();
    }, 100)
}

function exportStudentData() {
    exportToExcel("studentTable", '学生评价统计表')
}

const allClassEvaluations = ref<any>([])
const currentClassEvaluations = ref<any>([])

async function doRefresh() {
    isLoading.value = true
    const res = await getClassEvaluation({
        class_id: selectedClassId.value,
        term_id: selectedTermId.value,
    });
    allClassEvaluations.value = currentClassEvaluations.value = res.data
    changeWeek()
    isLoading.value = false
}

function changeWeek() {
    currentClassEvaluations.value = allClassEvaluations.value
    if (selectedWeekId.value !== 0) {
        currentClassEvaluations.value = currentClassEvaluations.value.filter((evalutaion => evalutaion.week === selectedWeekId.value))
    }
    totalScore.value = currentClassEvaluations.value.reduce((acc, curr) => acc + curr.score, 0);
    getStudents()
}

async function getStudents() {
    await getStudentList({
        class_id: selectedClassId.value
    }).then((res: any) => {
        students.value = res.data.map(({ id, name }: any) => ({
            id: id,
            name: name,
            scoreAvg: Math.round(totalScore.value / res.data.length * 10) / 10,
            scoreTotal: totalScore.value,
            scoreWeek: currentClassEvaluations.value.filter(evaluation => evaluation.student_id === id).reduce((acc, curr) => acc + curr.score, 0),
            starWeek: 20,
            starProgress: 20,
        }))
    })
}

onMounted(() => {
    getTerms()
})
</script>

<template>
    <div class="flex flex-col w-full m-2 items-center justify-center">
        <div class="w-350 bg-white">
            <div style="background-color: #def6ff"
                class="nav-bar flex flex-col gap-y-13 rounded-md b-rounded-2 mt-2 mb-2 w-full">
                <SchoolSelectionBox @reset="handleReset" @changeSelectedSchoolId="handleChangeSelectedSchoolId" />
                <ClassSelectionBox ref="classSelectionBox" @changeSelectedClassId="handleChangeSelectedClassId"
                    :selectedSchoolId="selectedSchoolId" />
            </div>
            <div class="flex flex-row p-4">
                <div class="flex flex-row ml-7">
                    <p>学期</p>
                    <el-select v-model="selectedTermId" @change="doRefresh" placeholder="Select" size="large"
                        style="width: 240px">
                        <el-option v-for="term in terms" :key="term.id" :label="term.name" :value="term.id" />
                    </el-select>
                </div>
                <div class="flex flex-row ml-7">
                    <p>周次</p>
                    <el-select v-model="selectedWeekId" @change="changeWeek" placeholder="Select" size="large"
                        style="width: 240px">
                        <el-option v-for="week in weeks" :key="week.id" :label="week.name" :value="week.id" />
                    </el-select>
                </div>
                <div class="flex flex-row ml-7">
                    <el-button @click="exportStudentData">导出</el-button>
                </div>
            </div>
        </div>
        <div class="w-350 c-white p-4 font-bold text-lg" style="background-color: rgb(199, 244, 255);">统计分析</div>
        <div class="w-350 bg-white avatar-container">
            <el-table id="studentTable" :data="students" style="width: 100%" v-loading="isLoading">
                <el-table-column prop="id" label="学号" width="130">
                    <template #default="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="130" />
                <el-table-column prop="scoreAvg" label="班总平均分" width="130" sortable />
                <el-table-column prop="scoreTotal" label="总得分" width="130" sortable />
                <el-table-column prop="scoreWeek" label="本周得分" width="130" sortable />
                <el-table-column prop="starWeek" label="每周之星" width="130" sortable />
                <el-table-column prop="starProgress" label="超越之星" width="130" sortable />
                <el-table-column label="雷达图" width="130">
                    <template #default="scope">
                        <el-button @click="showRadarChart(scope.$index)" style="font-size: 20px;">✡︎</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="评价详情" width="130">
                    <template #default="scope">
                        <el-button :disabled="students[scope.$index].scoreWeek === 0" @click="showHistoryChart(scope.$index)" style="font-size: 20px;">⛄︎</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="评价指南" width="130">
                    <template #default="scope">
                        <el-button @click="ElMessage.info('跳转不了!哈哈哈!')" style="font-size: 20px;">✂︎</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog v-model="isRadarDialogVisible" title="雷达图" width="500" align-center>
        <div class="w-full h-100" style="background-color: rgb(239, 251, 255); border: solid 1px #94ffff;">
            <div id="radar-chart" :style="{ width: '450px', height: '400px' }" />
        </div>
    </el-dialog>
    <el-dialog v-model="isHistoryDialogVisible" title="评分详情" width="1000" align-center>
        <StudentTableHistoryDialog :historys="historys" />
    </el-dialog>
</template>
  
<style lang="scss" scoped> .avatar-container {
     overflow-x: hidden;
     overflow-y: scroll;
     height: 50vh;
 }

 .avatar-container::-webkit-scrollbar {
     width: 10px;
 }

 .avatar-container::-webkit-scrollbar-track {
     background-color: #f1f1f1;
 }

 .avatar-container::-webkit-scrollbar-thumb {
     background-color: #888;
 }

 .avatar-container::-webkit-scrollbar-thumb:hover {
     background-color: #555;
 }
</style>
  