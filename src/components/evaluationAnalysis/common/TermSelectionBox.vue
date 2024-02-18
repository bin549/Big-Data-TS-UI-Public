<script setup lang="ts">


import {onMounted, ref} from "vue";
import {getTermList} from "@/api/base.ts";

import {Option} from "@/types"

const emits = defineEmits(["changeSelectedTerms"])
const selectedTerms = ref<any>([1]);
const all_terms = ref<Option[]>([])
const terms = ref<Option[]>([])

async function getTerms() {
  const res = await getTermList()
  all_terms.value = terms.value = res.data.map(({termId, name}: any) => ({
    key: termId,
    label: name,
    disabled: false,
  }))
}

function setupTerms(gradeId) {
  terms.value = all_terms.value.slice(0, gradeId * 2)
}

defineExpose({
  setupTerms,
});


function changeSelectedTerms() {
  emits('changeSelectedTerms', selectedTerms.value)
}

onMounted(async () => {
  await getTerms()
})
</script>

<template>
  <h4 style="background-color: #def6ff;  color: def6ff;" font-bold p-3 content-center text-lg text-gray-500 p-4>学期选择</h4>
  <div style="background-color: #def6ff; padding: 60px; color: def6ff;" flex flex-justify-center rounded-md b-rounded-2 >
    <el-checkbox-group @change="changeSelectedTerms" v-model="selectedTerms">
      <el-checkbox :key="term.key" :label="term.label" v-for="term in all_terms"
                   :disabled="!terms.map(term => term.key).includes(term.key)"/>
    </el-checkbox-group>
  </div>
</template>

<style scoped lang="scss">

</style>
