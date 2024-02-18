<script setup lang="ts">
import { ref } from "vue";
import { getSubjectList } from "@/api/base.ts";

const props = defineProps({
  selectedSchoolId: Number
})
import { Option } from "@/types"

const selectedSubjects = ref<any>([])
const subjects = ref<Option[]>([])
const is_loading = ref<boolean>(true)

async function getSubjects() {
  is_loading.value = true
  selectedSubjects.value = []
  const res = await getSubjectList({
    school_id: props.selectedSchoolId
  })
  subjects.value = res.data.map(({ id, subject }: any) => ({
    key: id,
    label: subject,
    disabled: false,
  }))
  is_loading.value = false
}

const emits = defineEmits(["changeSelectedSubjects"])

function onChangeSelectedSubjects() {
  emits('changeSelectedSubjects', selectedSubjects.value)
}

defineExpose({
  getSubjects,
})
</script>

<template>
  <h4 style="background-color: #c7f4ff;  color: white;" font-bold p-3 content-center text-lg text-gray-500 p-4>科目选择</h4>
  <div v-loading="is_loading" style="background-color: #def6ff;" class="flex flex-justify-center items-center rounded-md b-rounded-2 h-60">
    <el-checkbox-group @change="onChangeSelectedSubjects" v-model="selectedSubjects" style=" width:85%;">
      <el-checkbox :key="subject.key" :label="subject.key" v-for="subject in subjects" >
        {{ subject.label }}
        </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<style scoped lang="scss"></style>
