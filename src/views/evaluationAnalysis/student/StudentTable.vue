
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
import { getTeacherList } from "@/api/base"
import { getSubjectList, getCoinList } from "@/api/base.ts";


type classSelectionBoxCtx = InstanceType<typeof ClassSelectionBox>
const classSelectionBox = ref<null | classSelectionBoxCtx>(null)
const selectedSchoolId = ref<number>();
const selectedTermId = ref<string>("14")
const weeks = ref<WeekOption[]>(weekDatas)
const selectedWeekId = ref<number>(0)
const isRadarDialogVisible = ref<boolean>(false)
const isHistoryDialogVisible = ref<boolean>(false)
const emits = defineEmits(["checkStudentEvaluation"])


const terms = ref<any>([]);
const historys = ref<StudentHistory[]>() 
const isLoading = ref<boolean>(true)
const students = ref<StudentRow[]>([])
const selectedClassId = ref<string>("")
const totalScore = ref<number>(0)
const teacherMap = ref<any>()
const subjectMap = ref<any>()
const coinMap = ref<any>([])
const subjectCoinMap = ref<any>({})
const subjects = ref<any>([])

const chartIndicators = ref<any>([])
const chartData = ref<any>([])

const chartOption = ref<any>({
    color: ['rgb(92, 255, 255)'],
    radar: {
        // shape: 'circle',
        indicator: chartIndicators.value
    },
    series: [
        {
            type: 'radar',
            data: [
                {
                    value: chartData.value,
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
    const currentStudentEvaluations = currentClassEvaluations.value.filter(evaluation => evaluation.student_id === students.value[index].id)
    const scoreBySubjectId = currentStudentEvaluations
        .reduce((acc, obj) => {
            if (acc[subjectCoinMap.value[obj.subject_id]]) {
                acc[subjectCoinMap.value[obj.subject_id]] += obj.score;
            } else {
                acc[subjectCoinMap.value[obj.subject_id]] = obj.score;
            }
            return acc;
        }, {});
    chartData.value.splice(0, chartData.value.length)
    for (let i = 0; i < 5; i++) {
        chartData.value.push(i)
    }
    for (let i = 0; i < chartIndicators.value.length; i++) {
        const coinIdx = coinMap.value[chartIndicators.value[i].name]
        const coinVal = scoreBySubjectId[coinIdx]
        chartData.value[i] = coinVal ? coinVal : 0
    }
    const maxValue = Math.max(...chartData.value);
    const minValue = Math.min(...chartData.value);
    const normalizedData = chartData.value.map(value => (value - minValue) / (maxValue - minValue));
    const scaledData = normalizedData.map(value => Math.round(value * 100));
    chartData.value.splice(0, chartData.value.length)
    for (let i = 0; i < 5; i++) {
        chartData.value.push(i)
    }
    for (let i = 0; i < 5; i++) {
        chartData.value[i] = scaledData[i]
    }
    setTimeout(() => {
        disposeChart()
        initChart()
    }, 300)
}

async function showHistoryChart(index: number) {
    isHistoryDialogVisible.value = true
    historys.value = currentClassEvaluations.value.filter(evaluation => evaluation.student_id === students.value[index].id).map(({ id, content, score, student_id, teacher_id, subject_id, week }: any) => ({
        name: students.value.find(student => student.id === student_id).name,
        content: content,
        score: `${score}分`,
        teacher: teacherMap.value[teacher_id],
        subject: subjectMap.value[subject_id],
        week: `第${week}周`,
    }))
}

function handleReset() {
}

function handleChangeSelectedSchoolId(schoolId) {
    selectedSchoolId.value = schoolId
    getTeachers()
    getSubjects()
    getCoins()
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
    const min = 0;
    const max = 4;
    await getStudentList({
        class_id: selectedClassId.value
    }).then((res: any) => {
        students.value = res.data.map(({ id, name }: any) => ({
            id: id,
            name: name,
            scoreAvg: Math.round(totalScore.value / res.data.length * 10) / 10,
            scoreTotal: totalScore.value,
            scoreWeek: currentClassEvaluations.value.filter(evaluation => evaluation.student_id === id).reduce((acc, curr) => acc + curr.score, 0),
            starWeek: Math.floor(Math.random() * (max - min + 1)) + min,
            starProgress: Math.floor(Math.random() * (max - min + 1)) + min,
        }))
    })
}


async function getTeachers() {
    const res = await getTeacherList({
        school_id: selectedSchoolId.value
    })
    teacherMap.value = res.data.map(({ teacherId, teacherName, sex }: any) => ({
        id: teacherId,
        name: teacherName,
    })).reduce((acc, obj) => {
        acc[obj.id] = obj.name;
        return acc;
    }, {});
}


async function getCoins() {
    const res = await getCoinList({
        school_id: selectedSchoolId.value
    })
    chartIndicators.value.splice(0, chartIndicators.value.length)
    res.data.forEach(coin => {
        chartIndicators.value.push({
            name: coin.name, max: 100
        })
        coinMap.value[coin.name] = coin.id
    });
}

async function getSubjects() {
    const res = await getSubjectList({
        school_id: selectedSchoolId.value
    })
    subjects.value = res.data.map(({ id, subject, coin_id }: any) => ({
        id: id,
        name: subject,
        coin_id: coin_id,
    }))
    subjectMap.value = subjects.value.reduce((acc, obj) => {
        acc[obj.id] = obj.name;
        subjectCoinMap.value[obj.id] = obj.coin_id
        return acc;
    }, {});
}

function checkEvaluationData() {
  emits("checkStudentEvaluation")
}

onMounted(async () => {
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
                <el-table-column prop="scoreWeek" label="当前得分" width="130" sortable />
                <el-table-column prop="starWeek" label="每周之星" width="130" sortable />
                <el-table-column prop="starProgress" label="超越之星" width="130" sortable />
                <el-table-column label="雷达图" width="130">
                    <template #default="scope">
                        <el-button :disabled="students[scope.$index].scoreWeek === 0" @click="showRadarChart(scope.$index)"
                            style="font-size: 20px;">✡︎</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="评价详情" width="130">
                    <template #default="scope">
                        <el-button :disabled="students[scope.$index].scoreWeek === 0"
                            @click="showHistoryChart(scope.$index)" style="font-size: 20px;">⛄︎</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="评价指南" width="130"> 
                    <template #default="scope">
                        <el-button @click="checkEvaluationData" style="font-size: 20px;">✂︎</el-button>
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
  