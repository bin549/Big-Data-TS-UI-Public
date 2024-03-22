<script setup lang="ts">
import { ref } from "vue";

import student_card_img from "@/assets/evaluationAnalysis/student-4-2.png"
import teacher_card_img from "@/assets/evaluationAnalysis/teacher-6.png"
import type { CardItem } from "@/types/evaluationAnalysis.ts"

const emits = defineEmits(["setPageState"])

const card_items = ref<CardItem[]>([
  {
    title: "学生评价",
    description: "学生评价是指根据一定的标准，通过使用一定的技术和方法，以学生为评价对象所进行的价值判断!",
    cover_img: student_card_img,
    index: 2
  },
  {
    title: "教师评价",
    description: "教师评价是教育管理的重要方面,也是促进教育发展和教师发展的重要手段,正在被更多的学校采纳。",
    cover_img: teacher_card_img,
    index: 3
  },
])
</script>

<template>
  <div>
    <div class="index-card" absolute l-1320 t-20 flex flex-row>
      <div class="index-card-item" c-black w-40 h-65 m-20 @click="emits('setPageState', card_item.index)"
        v-for="card_item in card_items">
        <div class="index-card-item-img">
          <img :src="card_item.cover_img" />
        </div>
        <div class="index-card-item-text">
          <h3>{{ card_item.title }}</h3>
          <p>{{ card_item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-card {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  background-color: #def6ff;
}

.index-card-item {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  text-align: center;
  overflow: hidden;
  background-color: #f2fafe;
}

.index-card-item-img {
  height: 60%;
}

.index-card-item-text {
  height: 40%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.index-card-item-text p {
  text-align: center;
  width: 80%;
  margin-top: 4px;
  font-size: 8px;
}

.index-card-item:hover {
  cursor: pointer;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>
