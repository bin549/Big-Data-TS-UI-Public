<script setup lang="ts">

import { ref } from "vue";
import { getTeacherList } from "@/api/base.ts";

const props = defineProps({
  selectedSchoolId: Number
})

const selectedTeacherId = ref<number>(1);
const teachers = ref<any>([]);

async function getTeachers() {
  console.log(props.selectedSchoolId)
  const res = await getTeacherList({
    school_id: props.selectedSchoolId
  })
  teachers.value = res.data.map(({ teacherId, teacherName }: any) => ({
    id: teacherId,
    name: teacherName,
  }))
  selectedTeacherId.value = teachers.value[0].id
}

defineExpose({
  getTeachers,
});
</script>

<template>
  <div style="background-color: #def6ff" mt--3>
    <h4 font-bold pl-3 content-center text-lg text-gray-500>教师选择</h4>
    <el-row>
      <el-col style="background-color: #def6ff" :xs="6" :lg="6" :xl="6">
        <el-form>
          <el-form-item label-width="100px" label="教师:">
            <el-select v-model="selectedTeacherId" placeholder="请选择教师">
              <el-option v-for="teacher in teachers" :key="teacher.id" :label="teacher.name" :value="teacher.id" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss"></style>
