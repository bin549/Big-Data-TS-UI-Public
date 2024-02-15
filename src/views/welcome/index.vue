<script setup lang="ts">
import {router} from "@/router"
import {useAppStoreHook} from "@/store/modules/app";

const pureApp = useAppStoreHook();
import {computed, onMounted, ref} from "vue";
import StudentEvaluation from "@/views/evaluationAnalysis/student/studentEvaluation.vue";
import TeacherEvaluation from "@/views/evaluationAnalysis/teacher/teacherEvaluation.vue";
import TeacherRanking from "@/views/evaluationAnalysis/teacher/teacherRanking.vue";
import BookLoader from "@/components/evaluationAnalysis/utils/BookLoader.vue";
import IndexCard from "@/components/evaluationAnalysis/IndexCard.vue";
import StudentData from "@/views/evaluationAnalysis/student/StudentData.vue";
import TeacherData from "@/views/evaluationAnalysis/teacher/TeacherData.vue";

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

function setPageState(index) {
  isLoading.value = true
  isIndex.value = false
  isStudent.value = false
  isTeacher.value = false
  isTeacherRank.value = false
  isStudentData.value = false
  isTeacherData.value = false
  if (index == 1) isIndex.value = true
  if (index == 2) isStudent.value = true
  if (index == 3) isTeacher.value = true
  if (index == 4) isTeacherRank.value = true
  if (index == 5) isStudentData.value = true
  if (index == 6) isTeacherData.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 0)
}

const submodule = {
  index: 1,
  student_evaluation: 2,
  teacher_evaluation: 3,
  teacher_rank: 4,
  student_data: 5,
  teacher_data: 6,
}

function handleCheckStudentEvaluation() {
  setPageState(2)
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
  <div style="background-color: #def6ff;" w-full h-full absolute>
    <div>
      <el-button @click="setPageState(submodule.index)">概览</el-button>
      <el-button @click="setPageState(submodule.teacher_evaluation)" v-if="isTeacherRank">教师评价</el-button>
      <el-button @click="setPageState(submodule.teacher_rank)" v-if="isTeacher">教师排行</el-button>
      <el-button @click="setPageState(submodule.student_data)" v-if="isStudent">学生检索</el-button>
      <el-button @click="setPageState(submodule.teacher_data)" v-if="isTeacher || isTeacherRank">教师检索</el-button>
      <el-button @click="setPageState(submodule.student_evaluation)" v-if="isStudentData">学生评价</el-button>
    </div>
    <index-card v-if="isIndex" @setPageState="setPageState"/>
    <student-evaluation v-if="isStudent"/>
    <teacher-evaluation v-if="isTeacher"/>
    <teacher-ranking v-if="isTeacherRank"/>
    <student-data @checkStudentEvaluation="handleCheckStudentEvaluation" v-if="isStudentData"/>
    <teacher-data v-if="isTeacherData"/>
  </div>
</template>

<style scoped lang="scss">
</style>
