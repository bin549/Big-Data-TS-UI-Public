<script setup lang="ts">
import { ref } from "vue";
import { getSubjectList } from "@/api/base.ts";

const props = defineProps({
  selectedSchoolId: Number
})
import { Option } from "@/types"

const selectedSubjects = ref<any>([])
const subjects = ref<Option[]>([])
const isLoading = ref<boolean>(true)
const isCheckAll = ref<boolean>(false)

async function getSubjects() {
  isLoading.value = true
  selectedSubjects.value = []
  const res = await getSubjectList({
    school_id: props.selectedSchoolId
  })
  subjects.value = res.data.map(({ id, subject }: any) => ({
    key: id,
    label: subject,
    disabled: false,
  }))
  isCheckAll.value = true
  toggleCheckAll()
  isLoading.value = false
}

function onChangeSelectedSubjects() {
  isCheckAll.value = selectedSubjects.value.length === subjects.value.length ? true : false
  emits('changeSelectedSubjects', selectedSubjects.value)
}

function toggleCheckAll() {
  selectedSubjects.value = isCheckAll.value ? subjects.value.map((subject) => subject.key) : []
  onChangeSelectedSubjects()
}

const emits = defineEmits(["changeSelectedSubjects"])

defineExpose({
  getSubjects,
})
</script>

<template>
  <h4 style="background-color: #c7f4ff;  color: white;" font-bold p-3 content-center text-lg text-gray-500 p-4>科目选择
  </h4>
  <div class="absolute;" style="margin-bottom: -60px;">
    <el-switch @change="toggleCheckAll" v-model="isCheckAll" />
    <p>
      全选
    </p>
  </div>
  <div v-loading="isLoading" style="background-color: #def6ff;"
    class="flex flex-justify-center items-center rounded-md b-rounded-2 h-60">
    <el-checkbox-group @change="onChangeSelectedSubjects" v-model="selectedSubjects" style=" width:85%;">
      <el-checkbox :key="subject.key" :label="subject.key" v-for="subject in subjects">
        {{ subject.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<style scoped lang="scss"></style>
