<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { countContent } from "@/utils/tools.ts";

import type { StudentEvaluation } from "@/types/evaluationAnalysis.ts";

const xData = ref<any>([
  '德育:讲卫生，能做到勤剪指甲', '英语:按时完成作业', '英语:没有按时认真完成作业。', '英语:英语暑假作业完成情况优异', '语文:你的口头作文真精彩！', '语文:声音响亮、有感情地朗读课文。', '德育:认真完成“学党史  颂党恩”手抄报。', '英语:按时完成作业', '英语:没有按时认真完成作业。', '德育:讲卫生，能做到勤剪指甲', '英语:按时完成作业', '幸福生活劳动:值日工作细致高效。', '音乐:恭喜你音乐知识笔试成绩90分以上。', '幸福生活劳动:积极完成劳动作业。', '科学:学习态度认真，第一次复习阶段按要求完成学习任务。'
])
const yData = ref<Array<number>>([18203, 23489, 29034, 104970, 131744, 630230, 104970, 131744, 23489, 29034, 104970])

const barChart = ref<any>(null)

const props = defineProps({
  selectedStudentEvaluations: Array<StudentEvaluation>,
  isLoading: Boolean
})

var option = {
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
    data: xData.value
  },
  series: [
    {
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(16, 151, 96, .2)',
        borderRadius: 30
      },
      type: 'bar',
      data: yData.value,
      itemStyle: {
        normal: {
          color: function (params) {
            return '#A1CDFF';
          },
          label: {
            show: true, //开启显示
            textStyle: {
              color: '#333',
              fontSize: 8
            }
          }
        }
      }
    }
  ]
};

function disposeChart() {
  xData.value.splice(0, xData.value.length)
  yData.value.splice(0, yData.value.length)
  barChart.value.classList.add("chart-hide")
  echarts.init(document.getElementById("bar-chart")!).dispose()
}

function initChart() {
  barChart.value.classList.remove("chart-hide")
  const [contents, frequencies] = countContent(props.selectedStudentEvaluations)
  for (let i = 0; i < contents.length; i++) {
    xData.value.push(contents[i].length > 10 ? contents[i].slice(0, 10) : contents[i])
    yData.value.push(frequencies[i])
  }
  const chartDom = document.getElementById('bar-chart')!
  const myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
}

defineExpose({
  disposeChart,
  initChart
})

onMounted(() => {
  initChart();
});
</script>

<template>
  <div style="background-color: #def6ff;" class="b-rounded-2 mt-2 mb-2 bar-chart-card" relative>
    <h4 style="background-color: #c7f4ff; color: white;" font-bold p-3 content-center text-lg text-gray-500>评语统计柱状图</h4>
    <div class="bar-chart-column">
      <div style="background-color: #def6ff;" class="bar-chart-render" ref="barChart" id="bar-chart" w-full h-full></div>
    </div>
    <el-empty description="无数据" absolute top-20 left-42
      v-if="props.selectedStudentEvaluations.length === 0 && !props.isLoading" />
  </div>
</template>

<style scoped lang="scss">
.chart-hide {
  display: none;
}

.bar-chart-card {
  height: 400px;
}

.bar-chart-render {
  height: 2300px;
}

.bar-chart-column {
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
}

.bar-chart-column::-webkit-scrollbar {
  width: 10px;
}

.bar-chart-column::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.bar-chart-column::-webkit-scrollbar-thumb {
  background-color: #888;
}

.bar-chart-column::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
