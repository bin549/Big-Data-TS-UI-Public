<script setup lang="ts">
import { onMounted, ref } from "vue";
import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue";
import SubjectSelectionBox from "@/components/evaluationAnalysis/common/SubjectSelectionBox.vue";
import TermSelectionBox from "@/components/evaluationAnalysis/common/TermSelectionBox.vue";
import { getSchoolEvaluation } from "@/api/base.ts";
import TeacherRankingBarChart from "@/components/evaluationAnalysis/teacher/teacherRanking/teacherRankingBarChart.vue";

type subjectSelectionBoxCtx = InstanceType<typeof SubjectSelectionBox>
const subjectSelectionBox = ref<null | subjectSelectionBoxCtx>(null)
type termSelectionBoxCtx = InstanceType<typeof TermSelectionBox>
const termSelectionBox = ref<null | termSelectionBoxCtx>(null)
type teacherRankingBarChartCtx = InstanceType<typeof TeacherRankingBarChart>
const teacherRankingBarChart = ref<null | teacherRankingBarChartCtx>(null)

const selectedSchoolId = ref<number>()
const selectedTerms = ref<any>([])
const selectedSubjects = ref<any>([])
const xData = ref<any>([])
const yData = ref<any>([])
const isLoading = ref<boolean>(false)

function handleChangeSelectedSchoolId(schoolId) {
  selectedSchoolId.value = schoolId
  setTimeout(() => {
    subjectSelectionBox.value?.getSubjects();
  }, 500)
}

function handleChangeSelectedTerms(terms) {
  selectedTerms.value = terms
}

function handleChangeSelectedSubjects(subjects) {
  selectedSubjects.value = subjects
  fetchData()
}


async function fetchData() {
  isLoading.value = true;
  const res = await getSchoolEvaluation({
    school_id: selectedSchoolId.value,
    subject_ids: selectedSubjects.value.toString(),
    term_ids: selectedTerms.value.toString()
  })
  if (res.data.length === 0) return
  xData.value = res.data[0]
  yData.value = res.data[1]
  teacherRankingBarChart.value?.disposeChart()
  setTimeout(() => {
    teacherRankingBarChart.value?.initChart()
  }, 500)
  setTimeout(() => {
    isLoading.value = false;
  }, 200)
}

onMounted(() => {
  termSelectionBox.value?.getTerms()
})
</script>

<template>
  <div class="content" flex flex-col flex-items-center>
    <el-divider />
    <div bg-white w-full h-25 class="nav-bar" flex flex-col gap-y-0>
      <div>
        <SchoolSelectionBox @changeSelectedSchoolId="handleChangeSelectedSchoolId" />
      </div>
    </div>
    <el-divider />
    <div w-full flex flex-col flex-items-center>
      <el-row w-full class="term-selection">
        <el-col :xs="24" :lg="12" :xl="8">
          <TermSelectionBox ref="termSelectionBox" @changeSelectedTerms="handleChangeSelectedTerms" />
          <el-divider />
          <SubjectSelectionBox ref="subjectSelectionBox" :selectedSchoolId="selectedSchoolId"
            @changeSelectedSubjects="handleChangeSelectedSubjects" />
        </el-col>
        <el-col :lg="1">
        </el-col>
        <el-col :xs="24" :lg="11" :xl="8">
          <teacherRankingBarChart :xData="xData" :yData="yData" ref="teacherRankingBarChart" />
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
