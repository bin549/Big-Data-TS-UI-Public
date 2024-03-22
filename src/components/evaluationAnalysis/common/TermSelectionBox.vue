<script setup lang="ts">
import { ref } from "vue";
import { getTermList } from "@/api/base.ts";

import type { Option } from "@/types/evaluationAnalysis"

const emits = defineEmits(["changeSelectedTerms"])
const selectedTerms = ref<any>([]);
const allTerms = ref<Option[]>([])
const terms = ref<Option[]>([])
const isLoading = ref<boolean>(true)
const isCheckAll = ref<boolean>(false)

async function getTerms() {
  isLoading.value = true
  selectedTerms.value = []
  const res = await getTermList()
  allTerms.value = terms.value = res.data.map(({ termId, name }: any) => ({
    key: termId,
    label: name,
    disabled: false,
  }))
  isCheckAll.value = true
  toggleCheckAll()
  isLoading.value = false
}

function setupTerms(gradeId) {
  terms.value = allTerms.value.slice(0, gradeId * 2)
}

function toggleCheckAll() {
  selectedTerms.value = isCheckAll.value ? terms.value.filter((term: Option) => term.disabled === false).map((term: Option) => term.key) : []
  changeSelectedTerms()
}

function changeSelectedTerms() {
  isCheckAll.value = terms.value.filter((term: Option) => term.disabled === false).length === selectedTerms.value.length ? true : false
  emits('changeSelectedTerms', selectedTerms.value)
}

defineExpose({
  setupTerms,
  getTerms,
});
</script>

<template>
  <h4 style="background-color: #c7f4ff;  color: white;" font-bold p-3 content-center text-lg text-gray-500 p-4>学期选择</h4>
  <div class="absolute;" style="margin-bottom: -60px;">
    <el-switch @change="toggleCheckAll" v-model="isCheckAll" />
    <p>
      全选
    </p>
  </div>
  <div v-loading="isLoading" style="background-color: #def6ff; padding: 10px 60px 20px 60px; color: def6ff;" flex
    flex-justify-center rounded-md b-rounded-2>
    <el-checkbox-group @change="changeSelectedTerms" v-model="selectedTerms">
      <el-checkbox :key="term.key" :label="term.key" v-for="term in allTerms"
        :disabled="!terms.map(term => term.key).includes(term.key)">
        {{ term.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<style scoped lang="scss"></style>
