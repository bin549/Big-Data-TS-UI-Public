<script setup lang="ts">
import {ref, onMounted} from "vue"
import {getClassList, getGradeList} from "@/api/base.ts";

const selectedGradeId = ref<number>();
const selectedClassId = ref<string>("");
const classes = ref<any>([])

const props = defineProps({
  selectedSchoolId: Number,
})
const emits = defineEmits(["changeSelectedClassId"])

const grades = ref<any>([])

async function changeGradeId() {
  selectedGradeId.value = grades.value[0].id
  await refresh()
}

async function getGrades() {
  await getGradeList().then((res: any) => {
    grades.value = res.data
    selectedGradeId.value = grades.value[0].id
  })
}

async function refresh() {
  selectedClassId.value = null
  await getClassList({
    school_id: props.selectedSchoolId,
    grade_id: selectedGradeId.value
  }).then((res: any) => {
    classes.value = res.data.map(({classId, className}: any) => ({
      id: classId,
      name: className,
    }))
  })
  if (classes.value.length === 0) return;
  selectedClassId.value = classes.value[0].id
  changeSelectedClassId()
}


function changeSelectedClassId() {
  emits("changeSelectedClassId", selectedClassId.value)
}

onMounted(async () => {
  await getGrades();
})

defineExpose({
  changeGradeId,
});
</script>

<template>
  <div mt--3>
    <h4 style="background-color: #c7f4ff;  color: white;" font-bold pl-3 content-center text-lg>班级选择</h4>
    <el-row>
      <el-col :xs="8" :lg="8" :xl="8">
        <el-form>
          <el-form-item label-width="100px" label="年级:">
            <el-select @change="refresh" v-model="selectedGradeId" placeholder="请选择年级">
              <el-option
                v-for="grade in grades"
                :key="grade.id"
                :label="grade.name"
                :value="grade.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="8" :lg="8" :xl="8">
        <el-form>
          <el-form-item label-width="100px" label="班级:">
            <el-select @change="changeSelectedClassId" v-model="selectedClassId" placeholder="请选择班级">
              <el-option
                v-for="cls in classes"
                :key="cls.id"
                :label="cls.name"
                :value="cls.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>
