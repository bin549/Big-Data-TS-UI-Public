<script setup lang="ts">
import {ref} from "vue"
import {getTeacherList} from "@/api/base"

import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue";

const selectedSchoolId = ref<number>();
const isLoading = ref<boolean>(false)
const teachers = ref<any>([])

async function handleChangeSelectedSchoolId(schoolId) {
  isLoading.value = true
  const res = await getTeacherList({
    school_id: schoolId
  })
  teachers.value = res.data.map(({teacherId, teacherName}: any) => ({
    id: teacherId,
    name: teacherName,
  }))
  isLoading.value = false
}

function handleReset() {
}


function handleSetupTerm(gradeId) {
}


function handleChangeSelectedStudentId(studentId) {
}

</script>

<template>
  <div class="content" flex flex-col flex-items-center>
    <el-divider/>
    <div bg-white w-full class="nav-bar" flex flex-col rounded-md b-rounded-2 mt-2 mb-2>
      <SchoolSelectionBox @reset="handleReset" @changeSelectedSchoolId="handleChangeSelectedSchoolId"/>
    </div>
    <el-divider/>
    <el-table
      ref="singleTableRef"
      :data="teachers"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"/>
      <el-table-column property="name" label="姓名" width="120"/>
    </el-table>
  </div>

</template>

<style scoped lang="scss">

</style>
