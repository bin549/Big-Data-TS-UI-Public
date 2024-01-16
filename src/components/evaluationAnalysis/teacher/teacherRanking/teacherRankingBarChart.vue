<script setup lang="ts">

import {onMounted} from "vue";
import * as echarts from "echarts";

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
    data: ['元卜顾', '萧尹姚', '邵湛汪', '狄米贝', '董祝梁', '项杜阮', '贾路娄', '柯昝管', '胡凌霍', '房裘缪', '应宗丁', '虞万支', '解宣贲', '杭洪包', '裴陆荣']
  },
  series: [
    {
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(16, 151, 96, .2)',
        borderRadius: 30
      },
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230, 104970, 131744, 23489, 29034, 104970, 131744, 630230, 104970, 131744],
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

function initChart() {
  var chartDom = document.getElementById('bar-chart')!;
  var myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
}

onMounted(() => {
  initChart();
});
</script>

<template>
  <div b-rounded-2 h-200 flex flex-col bg-white>
    <div b-rounded-2 style="height: 100%">
      <h4 bg-white font-bold pl-3 content-center text-lg text-gray-500 mt-4 p-4>评价数量</h4>
      <div id="bar-chart" w-full h-full></div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
