<script setup lang="ts">
import {ref} from "vue";
import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue";
import SubjectSelectionBox from "@/components/evaluationAnalysis/common/SubjectSelectionBox.vue";
import TermSelectionBox from "@/components/evaluationAnalysis/common/TermSelectionBox.vue";
import TeacherRankingBarChart from "@/components/evaluationAnalysis/teacher/teacherRanking/teacherRankingBarChart.vue";

type subjectSelectionBoxCtx = InstanceType<typeof SubjectSelectionBox>
const subjectSelectionBox = ref<null | subjectSelectionBoxCtx>(null)
const selectedSchoolId = ref<number>(1);
const selectedTerms = ref<any>([1, 2]);
const selectedSubjects = ref<any>([1, 2]);

function handleChangeSelectedTerms(terms) {
  selectedTerms.value = terms
}

function handleChangeSelectedSubjects(subjects) {
  selectedSubjects.value = subjects
}

function handleChangeSelectedSchoolId(schoolId) {
  selectedSchoolId.value = schoolId
  subjectSelectionBox.value?.getSubjects();
}
</script>

<template>
  <div class="content" flex flex-col flex-items-center>
    <el-divider/>
    <div bg-white w-full h-25 class="nav-bar" flex flex-col gap-y-0>
      <div>
        <SchoolSelectionBox @changeSelectedSchoolId="handleChangeSelectedSchoolId"/>
      </div>
    </div>
    <el-divider/>
    <div w-full flex flex-col flex-items-center>
      <el-row w-full class="term-selection">
        <el-col :xs="24" :lg="12" :xl="8">
          <TermSelectionBox @changeSelectedTerms="handleChangeSelectedTerms"/>
          <el-divider/>
          <SubjectSelectionBox ref="subjectSelectionBox" :selectedSchoolId="selectedSchoolId"
                               @changeSelectedSubjects="handleChangeSelectedSubjects"/>
        </el-col>
        <el-col :lg="1">
        </el-col>
        <el-col :xs="24" :lg="11" :xl="8">
          <teacherRankingBarChart/>
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
