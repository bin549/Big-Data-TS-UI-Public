<script setup lang="ts">
import {ref} from "vue"
import {getTeacherList} from "@/api/base"

import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue"
import TeacherAvatarCard from "@/components/evaluationAnalysis/teacher/teacherEvaluation/TeacherAvatarCard.vue"
import BaseSpinner from "@/components/evaluationAnalysis/utils/BaseSpinner.vue"

const selectedSchoolId = ref<number>()
const isLoading = ref<boolean>(true)
const teachers = ref<any>([])

const emits = defineEmits(["checkTeacherEvaluation"])

async function handleChangeSelectedSchoolId(schoolId) {
  isLoading.value = true
  teachers.value = []
  const res = await getTeacherList({
    school_id: schoolId
  })
  teachers.value = res.data.map(({teacherId, teacherName, sex}: any) => ({
    id: teacherId,
    name: teacherName,
    sex,
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
  <div style="background-color: #def6ff" class="content" flex flex-col flex-items-center>
    <el-divider/>
    <div style="background-color: #def6ff"  w-full class="nav-bar" flex flex-col rounded-md b-rounded-2 mt-2 mb-2>
      <SchoolSelectionBox @reset="handleReset" @changeSelectedSchoolId="handleChangeSelectedSchoolId"/>
    </div>
    <el-divider/>
    <div class="avatar-avatar-container justify-center items-center flex; ">
      <BaseSpinner v-if="isLoading"/>
      <el-row style="width: 95%; left: 2%;" class="absolute;" v-else>
        <el-col class="flex" :xs="8" :sm="6" :md="4" :lg="3" :xl="1" v-for="(teacher, index) in teachers"
          style=" padding: 5px;">
          <TeacherAvatarCard @click="emits('checkTeacherEvaluation')" :sex="teacher.sex" :name="teacher.name" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">

.avatar-avatar-container {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 70vh;
  width: 95%;
}

.avatar-container::-webkit-scrollbar {
  width: 10px;
  /* 设置滚动条的宽度 */
}

.avatar-container::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /* 设置滚动条的背景颜色 */
}

.avatar-container::-webkit-scrollbar-thumb {
  background-color: #888;
  /* 设置滚动条的滑块颜色 */
}

.avatar-container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
  /* 设置鼠标悬停时滚动条滑块的颜色 */
}
</style>
