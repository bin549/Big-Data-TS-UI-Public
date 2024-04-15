<script setup lang="ts">
import {onMounted, ref} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  xData: Array<any>,
  yData: Array<any>,
})

const mXData = ref<any>(['元卜顾', '萧尹姚', '邵湛汪', '狄米贝', '董祝梁', '项杜阮', '贾路娄', '柯昝管', '胡凌霍', '房裘缪', '应宗丁', '虞万支', '解宣贲', '杭洪包', '裴陆荣'])
const mYData = ref<Array<number>>([18203, 23489, 29034, 104970, 131744, 630230, 104970, 131744, 23489, 29034, 104970, 131744, 630230, 104970, 131744])


const barChart = ref<any>(null)

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
    data: mXData.value
  },
  series: [
    {
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(16, 151, 96, .2)',
        borderRadius: 30
      },
      type: 'bar',
      data: mYData.value,
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
  mXData.value.splice(0, mXData.value.length)
  mYData.value.splice(0, mYData.value.length)
  barChart.value.classList.add("chart-hide")
  echarts.init(document.getElementById("bar-chart")!).dispose()
}

function initChart() {
  barChart.value.classList.remove("chart-hide")
  for (let i = 0; i < props.xData.length; i++) {
    mXData.value[i] = props.xData[i]
    mYData.value[i] = props.yData[i]
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
  initChart()
})
</script>

<template>
  <div b-rounded-2 h-200 flex flex-col style="background-color: #def6ff;">
    <div b-rounded-2 style="height: 100%">
      <h4 bg-white font-bold pl-3 content-center text-lg text-gray-500 mt-4 p-4>评价数量</h4>
      <div class="bar-chart-column">
        <div ref="barChart" id="bar-chart" class="bar-chart-render" w-full h-full></div>
      </div>
    </div>
  </div>``
</template>

<style scoped lang="scss">

.chart-hide 
{
  display: none;
}

.bar-chart-card {
  height: 400px;
}

.bar-chart-render {
  height: 2400px;
}

.bar-chart-column {
  height: 600px;
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
