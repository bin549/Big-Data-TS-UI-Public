
<script setup lang="ts">
import * as echarts from "echarts";
import { ref } from "vue";
import { getStudentList } from "@/api/base.ts"
import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue";
import ClassSelectionBox from "@/components/evaluationAnalysis/common/ClassSelectionBox.vue";
import { weekDatas } from "@/store/modules/evaluationAnalysis.ts";
import type { WeekOption, StudentRow } from "@/types/evaluationAnalysis.ts"
import { ElMessage } from "element-plus";

type classSelectionBoxCtx = InstanceType<typeof ClassSelectionBox>
const classSelectionBox = ref<null | classSelectionBoxCtx>(null)

const selectedSchoolId = ref<number>();
const terms = ref<WeekOption[]>(weekDatas)
const selectedTermId = ref<number>(0)
const weeks = ref<WeekOption[]>(weekDatas)
const selectedWeekId = ref<number>(0)
const isRadarDialogVisible = ref<boolean>(false)
const isHistoryDialogVisible = ref<boolean>(false)
    
const isLoading = ref<boolean>(true)

const students = ref<StudentRow[]>([])
const radarChart = ref<any>()

const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
    },
    yAxis: {
        type: 'category',
        data: [1],
    },
    series: [
        {
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(16, 151, 96, .2)',
                borderRadius: 30
            },
            type: 'bar',
            data: [1],
            itemStyle: {
                normal: {
                    color: function (params) {
                        return '#A1CDFF';
                    },
                    label: {
                        show: true,
                        textStyle: {
                            color: '#333',
                            fontSize: 8
                        }
                    }
                }
            }
        }
    ]
}

function disposeChart() {
    echarts.init(document.getElementById("radar-chart")!).dispose();
}

function initChart() {
    const chartDom = document.getElementById('radar-chart')!;
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
}

async function handleChangeSelectedClassId(classId) {
    isLoading.value = true
    await getStudentList({
        class_id: classId
    }).then((res: any) => {
        students.value = res.data.map(({ id, name }: any) => ({
            id: id,
            name: name,
            scoreAvg: 20,
            scoreTotal: 20,
            scoreWeek: 20,
            starWeek: 20,
            starProgress: 20,
        }))
        isLoading.value = false
    })
}

function showRadarChart(index: number) {
    isRadarDialogVisible.value = true
    setTimeout(() => {
        disposeChart()
        initChart()
    }, 300)
}

function showHistoryChart(index: number) {
    isHistoryDialogVisible.value = true
}

function handleReset() {
}

function handleChangeSelectedSchoolId(schoolId) {
    selectedSchoolId.value = schoolId
    setTimeout(() => {
        classSelectionBox.value?.changeGradeId();
    }, 100)
}

function exportData() {
    ElMessage.info("功能未实现，敬请期待。")
}
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
                    <el-select v-model="selectedWeekId" placeholder="Select" size="large" style="width: 240px">
                        <el-option v-for="week in weeks" :key="week.id" :label="week.name" :value="week.id" />
                    </el-select>
                </div>
                <div class="flex flex-row ml-7">
                    <p>周次</p>
                    <el-select v-model="selectedWeekId" placeholder="Select" size="large" style="width: 240px">
                        <el-option v-for="week in weeks" :key="week.id" :label="week.name" :value="week.id" />
                    </el-select>
                </div>
                <div class="flex flex-row ml-7">
                    <el-button @click="exportData">导出</el-button>
                </div>
            </div>
        </div>
        <div class="w-350 c-white p-4 font-bold text-lg" style="background-color: rgb(199, 244, 255);">统计分析</div>
        <div class="w-350 bg-white avatar-container">
            <el-table :data="students" style="width: 100%" v-loading="isLoading">
                <el-table-column prop="id" label="学号" width="130">
                    <template #default="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="160" />
                <el-table-column prop="scoreAvg" label="班总平均分" width="160" sortable />
                <el-table-column prop="scoreTotal" label="总得分" width="160" sortable />
                <el-table-column prop="scoreWeek" label="本周得分" width="160" sortable />
                <el-table-column prop="starWeek" label="每周之星" width="160" sortable />
                <el-table-column prop="starProgress" label="超越之星" width="160" sortable />
                <el-table-column label="雷达图" width="160">
                    <template #default="scope">
                        <el-button @click="showRadarChart(scope.$index)" style="font-size: 20px;">✡︎</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="详情" width="160">
                    <template #default="scope">
                        <el-button @click="showHistoryChart(scope.$index)" style="font-size: 20px;">✡︎</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template #default="scope">
                        <el-button @click="showRadarChart(scope.$index)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog v-model="isRadarDialogVisible" title="雷达图" width="500" align-center>
        <div class="bg-cyan-100 w-full h-100">
            <div ref="radarChart" id="radar-chart" />
        </div>
    </el-dialog>
    <el-dialog v-model="isHistoryDialogVisible" title="雷达图" width="500" align-center>
        <div class="bg-cyan-100 w-full h-100">
            <div ref="radarChart" id="radar-chart" />
        </div>
    </el-dialog>
</template>
  
<style lang="scss" scoped>
.avatar-container {
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
  