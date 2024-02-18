<script setup lang="ts">
import {ref} from "vue";
import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue";
import StudentSelectionBox from "@/components/evaluationAnalysis/student/studentEvaluation/StudentSelectionBox.vue";
import TermSelectionBox from "@/components/evaluationAnalysis/common/TermSelectionBox.vue";
import SubjectSelectionBox from "@/components/evaluationAnalysis/common/SubjectSelectionBox.vue";
import StudentStatisticsChart from "@/components/evaluationAnalysis/student/studentEvaluation/StudentStatisticsChart.vue";
import StudentBarChart from "@/components/evaluationAnalysis/student/studentEvaluation/StudentBarChart.vue";

const selectedSchoolId = ref<number>();
const selectedStudentId = ref<number>(1);
const selectedTerms = ref<any>([1]);
const selectedSubjects = ref<any>([1]);
type studentSelectionBoxCtx = InstanceType<typeof StudentSelectionBox>
const studentSelectionBox = ref<null | studentSelectionBoxCtx>(null)
type subjectSelectionBoxCtx = InstanceType<typeof SubjectSelectionBox>
const subjectSelectionBox = ref<null | subjectSelectionBoxCtx>(null)
type termSelectionBoxCtx = InstanceType<typeof TermSelectionBox>
const termSelectionBox = ref<null | termSelectionBoxCtx>(null)
type studentStatisticsChartCtx = InstanceType<typeof StudentStatisticsChart>
const studentStatisticsChart = ref<null | studentStatisticsChartCtx>(null)

function handleChangeSelectedSchoolId(schoolId) {
  selectedSchoolId.value = schoolId
  setTimeout(() => {
    studentSelectionBox.value?.changeGradeId();
  }, 100)
  // subjectSelectionBox.value?.getSubjects();
}

function handleReset() {
  studentSelectionBox.value?.reset()
}

function handleChangeSelectedTerms(terms) {
  selectedTerms.value = terms
  studentStatisticsChart.value?.refresh()
}

function handleChangeSelectedSubjects(subjects) {
  selectedSubjects.value = subjects
}

function handleChangeSelectedStudentId(studentId) {
  selectedStudentId.value = studentId
  studentStatisticsChart.value?.refresh()
}

function handleSetupTerm(gradeId) {
  termSelectionBox.value?.setupTerms(gradeId);
}
</script>

<template>
  <div class="content" flex flex-col flex-items-center>
    <el-divider/>
    <div style="background-color: #def6ff" w-full class="nav-bar" flex flex-col rounded-md b-rounded-2 mt-2 mb-2>
      <SchoolSelectionBox @reset="handleReset" @changeSelectedSchoolId="handleChangeSelectedSchoolId"/>
      <el-divider/>
      <StudentSelectionBox ref="studentSelectionBox" :selectedSchoolId="selectedSchoolId"
                           @setUpTerm="handleSetupTerm"
                           @changeSelectedStudentId="handleChangeSelectedStudentId"/>
    </div>
    <el-divider/>
    <div w-full flex flex-col flex-items-center>
      <el-row w-full class="term-selection">
        <el-col :xs="24" :lg="12" :xl="8" b-rounded-2 rounded-md>
          <TermSelectionBox ref="termSelectionBox" @changeSelectedTerms="handleChangeSelectedTerms"/>
          <el-divider/>
          <SubjectSelectionBox ref="subjectSelectionBox" :selectedSchoolId="selectedSchoolId"
                               @changeSelectedSubjects="handleChangeSelectedSubjects"/>
        </el-col>
        <el-col :lg="1">
          <el-divider/>
        </el-col>
        <el-col :xs="24" :lg="11" :xl="8">
          <div b-rounded-2 h-180 flex flex-col>
            <StudentStatisticsChart ref="studentStatisticsChart" :selectedStudentId="selectedStudentId" :selectedTerms="selectedTerms" />
            <el-divider/>
            <StudentBarChart/>
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
