<script setup lang="ts">


import {onMounted, ref} from "vue";
import {getTermList} from "@/api/base.ts";

import {Option} from "@/types"

const emits = defineEmits(["changeSelectedTerms"])
const selectedTerms = ref<any>([]);
const all_terms = ref<Option[]>([])
const terms = ref<Option[]>([])
const is_loading = ref<boolean>(true)

async function getTerms() {
  is_loading.value = true
  selectedTerms.value = []
  const res = await getTermList()
  all_terms.value = terms.value = res.data.map(({termId, name}: any) => ({
    key: termId,
    label: name,
    disabled: false,
  }))
  is_loading.value = false
}

function setupTerms(gradeId) {
  terms.value = all_terms.value.slice(0, gradeId * 2)
}

defineExpose({
  setupTerms,
  getTerms,
});


function changeSelectedTerms() {
  emits('changeSelectedTerms', selectedTerms.value)
}

onMounted(async () => {
  await getTerms()
})
</script>

<template>
  <h4 style="background-color: #c7f4ff;  color: white;" font-bold p-3 content-center text-lg text-gray-500 p-4>学期选择</h4>
  <div v-loading="is_loading" style="background-color: #def6ff; padding: 10px 60px 20px 60px; color: def6ff;" flex flex-justify-center rounded-md b-rounded-2 >
    <el-checkbox-group @change="changeSelectedTerms" v-model="selectedTerms">
      <el-checkbox :key="term.key" :label="term.key" v-for="term in all_terms"
                   :disabled="!terms.map(term => term.key).includes(term.key)">
                   {{ term.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<style scoped lang="scss">

</style>
