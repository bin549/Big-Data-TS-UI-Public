<script setup lang="ts">
import {router} from "@/router"
import {useAppStoreHook} from "@/store/modules/app";

const pureApp = useAppStoreHook();
import {computed, onMounted, ref} from "vue";
import BookLoader from "@/components/evaluationAnalysis/utils/BookLoader.vue";
import StudentEvaluation from "@/views/evaluationAnalysis/student/studentEvaluation.vue";
import TeacherEvaluation from "@/views/evaluationAnalysis/teacher/teacherEvaluation.vue";
import TeacherRanking from "@/views/evaluationAnalysis/teacher/teacherRanking.vue";
import IndexCard from "@/components/evaluationAnalysis/IndexCard.vue";
import StudentData from "@/views/evaluationAnalysis/student/StudentData.vue";
import TeacherData from "@/views/evaluationAnalysis/teacher/TeacherData.vue";
import StudentTable from "@/views/evaluationAnalysis/student/StudentTable.vue";
import {submodule} from "@/store/modules/evaluationAnalysis.ts";

const isCollapse = computed(() => {
  return !pureApp.getSidebarStatus;
});

const isIndex = ref<boolean>(true)
const isStudent = ref<boolean>(false)
const isTeacher = ref<boolean>(false)
const isTeacherRank = ref<boolean>(false)
const isLoading = ref<boolean>(true)
const isStudentData = ref<boolean>(false)
const isTeacherData = ref<boolean>(false)
const isStudentTable = ref<boolean>(false)

function setPageState(index) {
  isLoading.value = true
  isIndex.value = false
  isStudent.value = false
  isTeacher.value = false
  isTeacherRank.value = false
  isStudentData.value = false
  isTeacherData.value = false
  isStudentTable.value = false
  if (index == submodule.index) isIndex.value = true
  if (index == submodule.student_evaluation) isStudent.value = true
  if (index == submodule.teacher_evaluation) isTeacher.value = true
  if (index == submodule.teacher_rank) isTeacherRank.value = true
  if (index == submodule.student_data) isStudentData.value = true
  if (index == submodule.teacher_data) isTeacherData.value = true
  if (index == submodule.student_table) isStudentTable.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 0)
}

onMounted(() => {
  setTimeout(() => {
    if (!isCollapse.value)
      pureApp.toggleSideBar()
  }, 100)
  setPageState(1)
})
</script>

<template>
  <!--  <BookLoader v-if="isLoading"/>-->
  <div style="background-color: #f2fafe;" w-full h-full absolute>
    <div>
      <el-button @click="setPageState(submodule.index)">概览</el-button>
      <el-button @click="setPageState(submodule.teacher_evaluation)" v-if="isTeacherRank">教师评价</el-button>
      <el-button @click="setPageState(submodule.teacher_rank)" v-if="isTeacher">教师排行</el-button>
      <el-button @click="setPageState(submodule.student_data)" v-if="isStudent">学生检索</el-button>
      <el-button @click="setPageState(submodule.teacher_data)" v-if="isTeacher || isTeacherRank">教师检索</el-button>
      <el-button @click="setPageState(submodule.student_evaluation)" v-if="isStudentData || isStudentTable">学生评价</el-button>
      <el-button @click="setPageState(submodule.student_table)" v-if="isStudent">学生统计</el-button>
    </div>
    <index-card v-if="isIndex" @setPageState="setPageState"/>
    <student-evaluation v-if="isStudent"/>
    <teacher-evaluation v-if="isTeacher"/>
    <teacher-ranking v-if="isTeacherRank"/>
    <student-data @checkStudentEvaluation="setPageState(submodule.student_evaluation)" v-if="isStudentData"/>
    <teacher-data @checkTeacherEvalutation="setPageState(submodule.teacher_evaluation)" v-if="isTeacherData"/>
    <student-table v-if="isStudentTable"/>
  </div>
</template>

<style scoped lang="scss">
</style>
