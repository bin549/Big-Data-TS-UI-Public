<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getAreaList, getProvinceList, getSchoolList} from "@/api/base.ts";

defineProps({
  selectedSchoolId: Number,
})

const emits = defineEmits(["changeSelectedSchoolId", "reset"])

const provinces = ref<any>();
const selectedProvinceId = ref<number>();
const citys = ref<any>([]);
const selectedCityId = ref<number>();
const schools = ref<any>([]);
const currentSelectedSchoolId = ref<any>([]);

async function getProvinces() {
  await getProvinceList().then((res: any) => {
    provinces.value = res.data.map(({provinceId, provinceName}: any) => ({
      id: provinceId,
      name: provinceName,
    }))
  })
  if (provinces.value.length === 0) {
    return
  }
  selectedProvinceId.value = provinces.value[0].id
  await getAreas()
}

async function getAreas() {
  await getAreaList({
    province_id: selectedProvinceId.value
  }).then((res: any) => {
    citys.value = res.data.map(({areaCode, cityName}: any) => ({
      id: areaCode,
      name: cityName,
    }))
  })
  if (citys.value.length === 0) {
    selectedCityId.value = null
    resetSelectionState()
    return;
  }
  selectedCityId.value = citys.value[0].id
  await getSchools()
}

async function getSchools() {
  await getSchoolList({city_id: selectedCityId.value}).then((res: any) => {
    schools.value = res.data.map(({schoolId, schoolName}: any) => ({
      id: schoolId,
      name: schoolName,
    }))
  })
  if (schools.value.length === 0) {
    currentSelectedSchoolId.value = null
    resetSelectionState()
    return;
  }
  currentSelectedSchoolId.value = schools.value[0].id
  await changeSchoolId()
}

function resetSelectionState() {
  emits("reset")
}

function changeSchoolId() {
  emits("changeSelectedSchoolId", currentSelectedSchoolId.value)
}

onMounted(async () => {
  await getProvinces()
});
</script>

<template>
  <div style="background-color: #def6ff" mb--8>
    <h4 style="background-color: #c7f4ff;  color: white;" font-bold pl-3 content-center text-lg text-gray-500>学校选择</h4>
    <el-row flex flex-justify-center content-center>
      <el-col :xs="8" :lg="8" :xl="8">
        <el-form>
          <el-form-item label-width="100px" label="省份:">
            <el-select
              @change="getAreas()"
              v-model="selectedProvinceId"
              placeholder="请选择省份"
            >
              <el-option
                v-for="province in provinces"
                :key="province.id"
                :label="province.name"
                :value="province.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="8" :lg="8" :xl="8">
        <el-form>
          <el-form-item label-width="100px" label="城市:">
            <el-select @change="getSchools" v-model="selectedCityId" placeholder="请选择城市">
              <el-option
                v-for="city in citys"
                :key="city.id"
                :label="city.name"
                :value="city.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="8" :lg="8" :xl="8">
        <el-form>
          <el-form-item label-width="100px" label="学校:">
            <el-select @change="changeSchoolId" v-model="currentSelectedSchoolId" placeholder="请选择学校">
              <el-option
                v-for="school in schools"
                :key="school.id"
                :label="school.name"
                :value="school.id"
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
