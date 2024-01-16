<script setup lang="ts">
import {router} from "@/router"
import {useAppStoreHook} from "@/store/modules/app";

const pureApp = useAppStoreHook();
import {computed, onMounted, ref} from "vue";
import StudentEvaluation from "@/views/evaluationAnalysis/student/studentEvaluation.vue";
import TeacherEvaluation from "@/views/evaluationAnalysis/teacher/teacherEvaluation.vue";
import TeacherRanking from "@/views/evaluationAnalysis/teacher/teacherRanking.vue";
import BookLoader from "@/components/evaluationAnalysis/utils/BookLoader.vue";
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
  if (!isCollapse.value)
    pureApp.toggleSideBar()
  setPageState(1)
})
</script>

<template>
  <!--  <BookLoader v-if="isLoading"/>-->
  <div style="background-color: #E8E6D5" w-full h-full absolute>
    <div>
      <el-button @click="setPageState(submodule.index)">概览</el-button>
      <el-button @click="setPageState(submodule.teacher_evaluation)" v-if="isTeacherRank">教师评价</el-button>
      <el-button @click="setPageState(submodule.teacher_rank)" v-if="isTeacher">教师排行</el-button>
      <el-button @click="setPageState(submodule.student_data)" v-if="isStudent">学生检索</el-button>
      <el-button @click="setPageState(submodule.teacher_data)" v-if="isTeacher || isTeacherRank">教师检索</el-button>
      <el-button @click="setPageState(submodule.student_evaluation)" v-if="isStudentData">学生评价</el-button>
    </div>
    <div>
      <div class="index-card" absolute l-1320 t-20 flex flex-row v-if="isIndex">
        <div class="index-card-item" c-black w-40 h-65 m-20 @click="setPageState(submodule.student_evaluation)">
          <div class="index-card-item-img">
            <img src="@/assets/evaluationAnalysis/student-4-2.png"/>
          </div>
          <div class="index-card-item-text">
            <h3>学生评价</h3>
            <p>学生评价是指根据一定的标准，通过使用一定的技术和方法，以学生为评价对象所进行的价值判断!</p>
          </div>
        </div>
        <div class="index-card-item" c-black w-40 h-65 m-20 @click="setPageState(submodule.teacher_evaluation)">
          <div class="index-card-item-img">
            <img src="@/assets/evaluationAnalysis/teacher-6.png"/>
          </div>
          <div class="index-card-item-text">
            <h3>教师评价</h3>
            <p>教师评价是教育管理的重要方面,也是促进教育发展和教师发展的重要手段,正在被更多的学校采纳。 </p>
          </div>
        </div>
      </div>
    </div>
    <student-evaluation v-if="isStudent"/>
    <teacher-evaluation v-if="isTeacher"/>
    <teacher-ranking v-if="isTeacherRank"/>
    <student-data @checkStudentEvaluation="handleCheckStudentEvaluation" v-if="isStudentData"/>
    <teacher-data v-if="isTeacherData"/>
  </div>
</template>

<style scoped lang="scss">
.index-card {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  background-color: #ffffff;
}

.index-card-item {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  text-align: center;
  overflow: hidden;
  background-color: #ffffff;
}

.index-card-item-img {
  height: 60%;
}

.index-card-item-text {
  height: 40%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.index-card-item-text p{
  text-align: center;
  width: 80%;
  margin-top: 4px;
  font-size: 8px;
}
.index-card-item:hover {
  cursor: pointer;
  transform: translateY(-8px);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
