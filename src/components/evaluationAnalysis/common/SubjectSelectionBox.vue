<script setup lang="ts">
import {ref} from "vue";
import {getSubjectList} from "@/api/base.ts";

const props = defineProps({
  selectedSchoolId: Number
})
import {Option} from "@/types"

const selectedSubjects = ref<any>([1])
const subjects = ref<Option[]>([])

async function getSubjects() {
  const res = await getSubjectList({
    school_id: props.selectedSchoolId
  })
  subjects.value = res.data.map(({id, subject}: any) => ({
    key: id,
    label: subject,
    disabled: false,
  }))
}

const emits = defineEmits(["changeSelectedSubjects"])

function changeSelectedTerms() {
  emits('changeSelectedSubjects', selectedSubjects.value)
}

defineExpose({
  getSubjects,
})
</script>

<template>
  {{subjects}}
  <h4 style="background-color: #def6ff;" font-bold p-3 content-center text-lg text-gray-500 p-4>科目选择</h4>
  <div style="background-color: #def6ff;" flex flex-justify-center rounded-md b-rounded-2>
    <el-checkbox-group @change="getSubjects" v-model="selectedSubjects">
      <el-checkbox :key="subject.key" :label="subject.label" v-for="subject in subjects"/>
    </el-checkbox-group>
  </div>
</template>

<style scoped lang="scss">

</style>
