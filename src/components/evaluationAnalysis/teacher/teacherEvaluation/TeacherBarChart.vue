<script setup lang="ts">
import { onMounted } from "vue";
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
    data: ['德育:讲卫生，能做到勤剪指甲', '英语:按时完成作业', '英语:没有按时认真完成作业。', '英语:英语暑假作业完成情况优异', '语文:你的口头作文真精彩！', '语文:声音响亮、有感情地朗读课文。', '德育:认真完成“学党史  颂党恩”手抄报。', '英语:按时完成作业', '英语:没有按时认真完成作业。', '德育:讲卫生，能做到勤剪指甲', '英语:按时完成作业', '幸福生活劳动:值日工作细致高效。', '音乐:恭喜你音乐知识笔试成绩90分以上。', '幸福生活劳动:积极完成劳动作业。', '科学:学习态度认真，第一次复习阶段按要求完成学习任务。']
  },
  series: [
    {
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(16, 151, 96, .2)',
        borderRadius: 30
      },
      type: 'bar',
      data: [18203, 23489, 104970, 131744, 630230, 104970, 29034, 104970, 131744, 630230, 104970, 131744, 23489, 29034, 104970],
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
  <div rounded-md b-rounded-2 mt-2 mb-2 h-140>
    <h4 style="background-color: #c7f4ff; color: white;" font-bold p-3 content-center text-lg text-gray-500>评语统计柱状图</h4>
    <div style="background-color: #def6ff;" id="bar-chart" w-full h-full></div>
  </div>
</template>

<style scoped lang="scss"></style>
