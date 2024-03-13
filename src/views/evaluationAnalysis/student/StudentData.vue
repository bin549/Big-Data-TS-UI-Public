<script setup lang="ts">
import { ref } from "vue"
import { getStudentList } from "@/api/base"

import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue";
import ClassSelectionBox from "@/components/evaluationAnalysis/common/ClassSelectionBox.vue";
import BaseSpinner from "@/components/evaluationAnalysis/utils/BaseSpinner.vue";
import StudentAvatarCard from "@/components/evaluationAnalysis/student/studentEvaluation/StudentAvatarCard.vue";

type classSelectionBoxCtx = InstanceType<typeof ClassSelectionBox>
const classSelectionBox = ref<null | classSelectionBoxCtx>(null)

const selectedSchoolId = ref<number>();
const emits = defineEmits(["checkStudentEvaluation"])
const students = ref<any>([])
const isLoading = ref<boolean>(true)


function handleChangeSelectedSchoolId(schoolId) {
  selectedSchoolId.value = schoolId
  setTimeout(() => {
    classSelectionBox.value?.changeGradeId();
  }, 100)
}

function handleReset() {
}

function handleSetupTerm(gradeId) {
}

async function handleChangeSelectedClassId(classId) {
  isLoading.value = true
  await getStudentList({
    class_id: classId
  }).then((res: any) => {
    students.value = res.data.map(({ id, name, sex }: any) => ({
      id: id,
      name: name,
      sex: sex,
    }))
  })
  isLoading.value = false
}

function checkEvaluationData(index) {
  emits("checkStudentEvaluation", index)
}
</script>

<template>
  <div class="content" flex flex-col flex-items-center>
    <el-divider />
    <div style="background-color: #def6ff" class="nav-bar flex flex-col rounded-md b-rounded-2 mt-2 mb-2 w-full">
      <SchoolSelectionBox @reset="handleReset" @changeSelectedSchoolId="handleChangeSelectedSchoolId" />
      <el-divider />
      <ClassSelectionBox ref="classSelectionBox" @changeSelectedClassId="handleChangeSelectedClassId"
        :selectedSchoolId="selectedSchoolId" />
    </div>
    <el-divider />
    <div class="avatar-container justify-center items-center flex;">
      <BaseSpinner v-if="isLoading"/>
      <el-row style="width: 95%; left: 2%;" class="absolute;" v-else>
        <el-col class="flex" :xs="8" :sm="6" :md="4" :lg="3" :xl="1" v-for="(student, index) in students"
          style="padding: 5px;"
          @click="checkEvaluationData(index)">
          <StudentAvatarCard :sex="student.sex" :name="student.name" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar-container {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 50vh;
  width: 95%;
}

.avatar-container::-webkit-scrollbar {
  width: 10px;
}

.avatar-container::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.avatar-container::-webkit-scrollbar-thumb {
  background-color: #888;
}

.avatar-container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
