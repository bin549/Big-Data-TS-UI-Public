<script setup lang="ts">
import {ref} from "vue";
import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue";
import SubjectSelectionBox from "@/components/evaluationAnalysis/common/SubjectSelectionBox.vue";
import TermSelectionBox from "@/components/evaluationAnalysis/common/TermSelectionBox.vue";
import TeacherSelectionBox from "@/components/evaluationAnalysis/teacher/teacherEvaluation/TeacherSelectionBox.vue";
import TeacherStatisticsChart from "@/components/evaluationAnalysis/teacher/teacherEvaluation/TeacherStatisticsChart.vue";
import TeacherBarChart from "@/components/evaluationAnalysis/teacher/teacherEvaluation/TeacherBarChart.vue";

const selectedSchoolId = ref<number>();
const selectedTeacherId = ref<number>();
type teacherSelectionBoxCtx = InstanceType<typeof TeacherSelectionBox>
const teacherSelectionBox = ref<null | teacherSelectionBoxCtx>(null)
type subjectSelectionBoxCtx = InstanceType<typeof SubjectSelectionBox>
const subjectSelectionBox = ref<null | subjectSelectionBoxCtx>(null)
type termSelectionBoxCtx = InstanceType<typeof TermSelectionBox>
const termSelectionBox = ref<null | termSelectionBoxCtx>(null)
const selectedTerms = ref<any>([1]);
const selectedSubjects = ref<any>([1])

function handleChangeSelectedSubjects(subjects) {
  selectedSubjects.value = subjects
}

function handleChangeSelectedTerms(terms) {
  selectedTerms.value = terms
}

async function handleChangeSelectedSchoolId(schoolId) {
  selectedSchoolId.value = schoolId
  setTimeout(() => {
    teacherSelectionBox.value?.getTeachers()
    termSelectionBox.value?.getTerms()
    subjectSelectionBox.value?.getSubjects();
  },100)
}

function handleChangeSelectedTeacherId(teacherId) {
  selectedTeacherId.value = teacherId
}
</script>

<template>
  <div class="content" flex flex-col flex-items-center>
    <el-divider/>
    <div style="background-color: #def6ff" w-full class="nav-bar" flex flex-col gap-y-0 rounded-md b-rounded-2>
      <div>
        <el-row flex flex-justify-center content-center>
          <SchoolSelectionBox @changeSelectedSchoolId="handleChangeSelectedSchoolId"/>
          <el-divider/>
          <TeacherSelectionBox :selectedSchoolId="selectedSchoolId" ref="teacherSelectionBox" @changeSelectedTeacherId="handleChangeSelectedTeacherId"/>
        </el-row>
      </div>
    </div>
    <el-divider/>
    <div w-full flex flex-col flex-items-center>
      <el-row w-full class="term-selection">
        <el-col :xs="24" :lg="12" :xl="8">
          <TermSelectionBox ref="termSelectionBox" @changeSelectedTerms="handleChangeSelectedTerms"/>
          <el-divider/>
          <SubjectSelectionBox ref="subjectSelectionBox" :selectedSchoolId="selectedSchoolId"
                               @changeSelectedSubjects="handleChangeSelectedSubjects"/>
        </el-col>
        <el-col :lg="1">
          <el-divider/>
        </el-col>
        <el-col :xs="24" :lg="11" :xl="8">
          <div h-170 flex flex-col>
            <TeacherStatisticsChart/>
            <el-divider/>
            <TeacherBarChart/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.content {
  margin: 0px 0px;
}

.nav-bar {
  width: 90%;
}

.term-selection {
  width: 90%;
}

.main-content {
  margin: 0px !important;
}

@media screen and (max-width: 768px) {
  .nav-bar {
    width: 100%;
  }

  .term-selection {
    width: 100%;
  }
}
</style>
