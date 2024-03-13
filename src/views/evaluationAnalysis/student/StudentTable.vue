
<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import { getStudentList } from "@/api/base.ts"

const week = ref<number>(0)
const isDialogVisible = ref<boolean>(false)

const grades = ref<any>()
const selectedGradeId = ref<number>(0)
const students = ref<any>([
    {
        id: '2016-05-03',
        name: 'Tom',
        scoreAvg: 20,
        scoreTotal: 20,
        scoreWeek: 20,
        starWeek: 20,
        starProgress: 20,
    },
    {
        id: '2016-05-03',
        name: 'Tom',
        scoreAvg: 20,
        scoreTotal: 20,
        scoreWeek: 20,
        starWeek: 20,
        starProgress: 20,
    },
    {
        id: '2016-05-03',
        name: 'Tom',
        scoreAvg: 20,
        scoreTotal: 20,
        scoreWeek: 20,
        starWeek: 20,
        starProgress: 20,
    }
])

onMounted(async () => {
    await getStudentList({
        class_id: "838547f1-d5e3-4a72-8a3c-abc7edd46772"
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
    })
})

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

function showRadarChart(index: number) {
    isDialogVisible.value = true
    setTimeout(() => {
        disposeChart()
        initChart()
    }, 300)
}
</script>

<template>
    <div class="flex flex-col w-250 m-18">
        <div class="flex flex-row p-4">
            <div class="flex flex-row ml-7">
                <p>年级</p>
                <el-select v-model="selectedGradeId" placeholder="Select" size="large" style="width: 240px">
                    <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="flex flex-row ml-7">
                <p>班级</p>
                <el-select v-model="selectedGradeId" placeholder="Select" size="large" style="width: 240px">
                    <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="flex flex-row ml-7">
                <p>周次</p>
                <el-select v-model="selectedGradeId" placeholder="Select" size="large" style="width: 240px">
                    <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="flex flex-row ml-7">
                <el-button>导出</el-button>
            </div>
        </div>
        <div>
            <div class="c-white p-4 font-bold text-lg" style="background-color: rgb(199, 244, 255);">统计分析</div>
            <el-table :data="students" style="width: 100%">
                <el-table-column prop="id" label="学号" width="80">
                    <template #default="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="140" />
                <el-table-column prop="scoreAvg" label="班总平均分" width="120" sortable />
                <el-table-column prop="scoreTotal" label="总得分" width="120" sortable />
                <el-table-column prop="scoreWeek" label="本周得分" width="120" sortable />
                <el-table-column prop="starWeek" label="每周之星" width="120" sortable />
                <el-table-column prop="starProgress" label="超越之星" width="120" sortable />
                <el-table-column label="雷达图" width="120">
                    <template #default="scope">
                        <el-button @click="showRadarChart(scope.$index)" style="font-size: 20px;">✡︎</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog v-model="isDialogVisible" title="雷达图" width="500" align-center>
        <div class="bg-cyan-100 w-full h-100">
            <div ref="radarChart" id="radar-chart" />
        </div>
    </el-dialog>
</template>
  
<style lang="scss" scoped></style>
  