<script setup lang="ts">
import { onMounted, ref } from "vue";
import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue";
import SubjectSelectionBox from "@/components/evaluationAnalysis/common/SubjectSelectionBox.vue";
import TermSelectionBox from "@/components/evaluationAnalysis/common/TermSelectionBox.vue";
import TeacherRankingBarChart from "@/components/evaluationAnalysis/teacher/teacherRanking/teacherRankingBarChart.vue";
import { getSchoolEvaluation } from "@/api/base.ts"
import { ElMessage } from "element-plus";

type subjectSelectionBoxCtx = InstanceType<typeof SubjectSelectionBox>
const subjectSelectionBox = ref<null | subjectSelectionBoxCtx>(null)
const selectedSchoolId = ref<number>();
const selectedTerms = ref<any>([]);
const selectedSubjects = ref<any>([]);
type termSelectionBoxCtx = InstanceType<typeof TermSelectionBox>
const termSelectionBox = ref<null | termSelectionBoxCtx>(null)

type teacherRankingBarChartCtx = InstanceType<typeof TeacherRankingBarChart>
const teacherRankingBarChart = ref<null | teacherRankingBarChartCtx>(null)


function handleChangeSelectedTerms(terms) {
  selectedTerms.value = terms
}

function handleChangeSelectedSubjects(subjects) {
  selectedSubjects.value = subjects
}

function handleChangeSelectedSchoolId(schoolId) {
  selectedSchoolId.value = schoolId
  setTimeout(() => {
    termSelectionBox.value?.getTerms()
    subjectSelectionBox.value?.getSubjects();
  }, 100)
}

async function fetchData() {
  // selectedStudentEvaluations.value = []
  // teacherStatisticsChart.value?.cleanData()
  if (!selectedSchoolId.value) {
    return
  }
  if (selectedTerms.value.length === 0) {
    // teacherBarChart.value?.disposeChart()
    ElMessage.warning("请先选择评语学期！")
    return
  }
  if (selectedSubjects.value.length === 0) {
    // teacherBarChart.value?.disposeChart()
    ElMessage.warning("请先选择评语科目！")
    return
  }
  // isLoading.value = true;
  console.log(selectedSubjects.value.toString())
  // console.log(selectedTerms.value.toString())
  const res = await getSchoolEvaluation({
    school_id: selectedSchoolId.value,
    subject_ids: selectedSubjects.value.toString(),
    term_ids: selectedTerms.value.toString()
  });
  console.log(res.data)
  // selectedStudentEvaluations.value = res.data.map(({ content, score }: any) => ({
  //   content: content,
  //   score: score,
  // }))
  // teacherBarChart.value?.disposeChart()
  // setTimeout(() => {
  //   teacherStatisticsChart.value?.fetchData()
  //   teacherBarChart.value?.initChart()
  // }, 300)
  // setTimeout(() => {
  //   isLoading.value = false;
  // }, 200)
}

</script>

<template>
  <div class="content" flex flex-col flex-items-center>
    <el-divider />
    <div style="background-color: #def6ff;" w-full h-25 class="nav-bar" flex flex-col gap-y-0>
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
          <teacherRankingBarChart ref="teacherRankingBarChart" />
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
