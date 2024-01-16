<script setup lang="ts">
import {ref} from "vue"
import {getStudentList} from "@/api/base"

import SchoolSelectionBox from "@/components/evaluationAnalysis/common/SchoolSelectionBox.vue";
import ClassSelectionBox from "@/components/evaluationAnalysis/common/ClassSelectionBox.vue";

type classSelectionBoxCtx = InstanceType<typeof ClassSelectionBox>
const classSelectionBox = ref<null | classSelectionBoxCtx>(null)

const selectedSchoolId = ref<number>();
const emits = defineEmits(["checkStudentEvaluation"])
const students = ref<any>([])
const isLoading = ref<boolean>(false)


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
    students.value = res.data.map(({id, name}: any) => ({
      id: id,
      name: name,
    }))
  })
  isLoading.value = false
}

function checkEvaluationData(index) {
  emits("checkStudentEvaluation")
}
</script>

<template>
  <div class="content" flex flex-col flex-items-center>
    <el-divider/>
    <div bg-white w-full class="nav-bar" flex flex-col rounded-md b-rounded-2 mt-2 mb-2>
      <SchoolSelectionBox @reset="handleReset" @changeSelectedSchoolId="handleChangeSelectedSchoolId"/>
      <el-divider/>
      <ClassSelectionBox ref="classSelectionBox" @changeSelectedClassId="handleChangeSelectedClassId" :selectedSchoolId="selectedSchoolId"/>
    </div>
    <el-divider/>
    <el-table
      ref="singleTableRef"
      :data="students"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"/>
      <el-table-column property="name" label="姓名" width="120"/>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="checkEvaluationData(scope.$index)"
          >
            查看评价信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<style scoped lang="scss">

</style>
