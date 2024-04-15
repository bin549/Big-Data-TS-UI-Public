<script setup lang="ts">
import type { StudentEvaluation } from "@/types/evaluationAnalysis.ts";
import { countContent } from "@/utils/tools";
import { ref } from "vue";

const props = defineProps({
  selectedStudentEvaluations: Array<StudentEvaluation>,
})

const topEvaluations = ref<Array<string>>(["德育-德育:早上“入室即静、入座即读”，认真早读。 共2次", "德育-德育:值日认真负责。 共2次", "语文-语文:流利地背诵课文。 共2次"])

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
  <div rounded-md b-rounded-2>
    <h4 style="background-color: #c7f4ff; color: white;" font-bold pl-3 content-center text-lg>数据统计</h4>
    <div h-full style="background-color: #def6ff;">
      <el-row>
        <el-col :span="4" b-gray b-1>
          <div content-center style="font-size: 14px;">
            评价总数
          </div>
        </el-col>
        <el-col :span="8" b-white b-1>
          <div class="grid-content ep-bg-purple-light color-black font-bold">
            {{ props.selectedStudentEvaluations.length }}
          </div>
        </el-col>
        <el-col :span="4" b-gray b-1>
          <div content-center style="font-size: 14px;">
            平均每学期给出的评价数
          </div>
        </el-col>
        <el-col :span="8" b-gray b-1>
          <div class="grid-content ep-bg-purple" />
          205
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" b-gray b-1>
          <div content-center style="font-size: 14px;">
            正面评价
          </div>
        </el-col>
        <el-col :span="8" b-gray b-1>
          <div class="grid-content ep-bg-purple-light" />
          488 / 79.35%
        </el-col>
        <el-col :span="4" b-gray b-1>
          <div class="grid-content ep-bg-purple" />
          负面评价
        </el-col>
        <el-col :span="8" b-gray b-1>
          <div class="grid-content ep-bg-purple" />
          127 / 20.65%
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" b-gray b-1>
          <div content-center style="font-size: 14px;">
            给出最多的评价前三
          </div>
        </el-col>
        <el-col :span="8" b-white b-1>
          <div content-center style="font-size: 14px;">
            <p class="c-black font-bold" v-for="(evalutaion, index) in topEvaluations">
              {{ index + 1 }}. {{ evalutaion }}
            </p>
            <p class="c-red" v-if="topEvaluations.length === 0">无数据</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
