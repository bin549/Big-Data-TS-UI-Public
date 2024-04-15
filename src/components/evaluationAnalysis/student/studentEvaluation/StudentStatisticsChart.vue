<script setup lang="ts">
import type { StudentEvaluation } from "@/types/evaluationAnalysis.ts";
import { countContent } from "@/utils/tools.ts";
import { ref } from "vue"

const topEvaluations = ref<Array<string>>(["德育-德育:早上“入室即静、入座即读”，认真早读。 共2次", "德育-德育:值日认真负责。 共2次", "语文-语文:流利地背诵课文。 共2次"])

const props = defineProps({
  selectedStudentEvaluations: Array<StudentEvaluation>,
})

async function cleanData() {
  topEvaluations.value.splice(0, topEvaluations.value.length)
}

async function fetchData() {
  if (props.selectedStudentEvaluations.length === 0) {
    return
  }
  const [contents, frequencies] = countContent(props.selectedStudentEvaluations)
  if (frequencies.length < 2) {
    topEvaluations.value = contents
    return
  }
  const sortFrequencies = frequencies.sort((a, b) => b - a)
  const topIndexs = sortFrequencies.length > 3 ? sortFrequencies.slice(0, 3) : sortFrequencies
  topEvaluations.value = topIndexs.map(topIndex => contents[topIndex])
}

defineExpose({
  cleanData,
  fetchData
})
</script>

<template>
  <div style="background-color: #def6ff;" rounded-md>
    <h4 style="background-color: #c7f4ff;  color: white;" font-bold p-3 content-center text-lg text-gray-500>数据统计</h4>
    <div h-full>
      <el-row>
        <el-col :span="4" b-white b-1>
          <div content-center style="font-size: 14px;">
            评价总数
          </div>
        </el-col>
        <el-col :span="8" b-white b-1>
          <div class="grid-content ep-bg-purple-light color-black font-bold">
            {{ props.selectedStudentEvaluations.length }}
          </div>
        </el-col>
        <el-col :span="4" b-white b-1>
          <div content-center style="font-size: 14px;">
            平均每学期收到评价数
          </div>
        </el-col>
        <el-col :span="8" b-white b-1>
          <div class="grid-content ep-bg-purple" />
          4
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" b-white b-1>
          <div content-center style="font-size: 14px;">
            正面评价
          </div>
        </el-col>
        <el-col :span="8" b-white b-1>
          <div class="grid-content ep-bg-purple-light" />
          13 / 92.86%
        </el-col>
        <el-col :span="4" b-white b-1>
          <div class="grid-content ep-bg-purple" />
          负面评价
        </el-col>
        <el-col :span="8" b-white b-1>
          <div class="grid-content ep-bg-purple" />
          1 / 7.14%
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" b-white b-1>
          <div content-center style="font-size: 14px;">
            收到最多的评价前三
          </div>
        </el-col>
        <el-col :span="8" b-white b-1>
          <div content-center style="font-size: 14px;">
            <p class="c-black font-bold" v-for="(evalutaion, index) in topEvaluations">
             {{index+1}}. {{ evalutaion }}
            </p>
            <p class="c-red" v-if="topEvaluations.length === 0">无数据</p>
          </div>
        </el-col>
        <el-col :span="4" b-white b-1>
          <div content-center style="font-size: 14px;">
            班级平均数
          </div>
        </el-col>
        <el-col :span="8" b-white b-1>
          <div content-center style="font-size: 14px;">
            39
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
