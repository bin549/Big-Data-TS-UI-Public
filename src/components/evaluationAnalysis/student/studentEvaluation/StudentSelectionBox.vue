<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getClassList, getGradeList, getStudentList} from "@/api/base.ts";

const selectedGradeId = ref<number>();
const selectedStudentId = ref<number>(0);
const classes = ref<any>([])

const props = defineProps({
  selectedSchoolId: Number,
})

const emits = defineEmits(["setUpTerm", "changeSelectedStudentId"])

const grades = ref<any>([])
const selectedClassId = ref<string>("");
const students = ref<any>([]);

async function changeGradeId() {
  selectedGradeId.value = grades.value[0].id
  await refresh()
}

async function refresh() {
  selectedClassId.value = null
  selectedStudentId.value = null
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
  emits("setUpTerm", selectedGradeId.value)
  await getStudents()
}

async function getGrades() {
  await getGradeList().then((res: any) => {
    grades.value = res.data
    selectedGradeId.value = grades.value[0].id
  })
}

async function getStudents() {
  await getStudentList({
    class_id: selectedClassId.value
  }).then((res: any) => {
    students.value = res.data.map(({id, name}: any) => ({
      id: id,
      name: name,
    }))
  })
  if (students.value.length === 0) return;
  selectedStudentId.value = students.value[0].id
  changeSelectedStudentId()
}

function changeSelectedStudentId() {
  emits("changeSelectedStudentId", selectedStudentId.value)
}

function reset() {
  selectedGradeId.value = null
  selectedClassId.value = null
  selectedStudentId.value = null
}

onMounted(async () => {
  await getGrades();
})

defineExpose({
  changeGradeId,
  reset,
});
</script>

<template>
  <div style="background-color: #caf0f8" mt--3>
    <h4 font-bold pl-3 content-center text-lg text-gray-500>学生选择</h4>
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
            <el-select @change="getStudents" v-model="selectedClassId" placeholder="请选择班级">
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
      <el-col :xs="8" :lg="8" :xl="8">
        <el-form>
          <el-form-item label-width="100px" label="学生:">
            <el-select @change="changeSelectedStudentId" v-model="selectedStudentId" placeholder="请选择学生">
              <el-option
                v-for="student in students"
                :key="student.id"
                :label="student.name"
                :value="student.id"
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
