<script setup lang="ts">

const emits = defineEmits(["setPageState"])

</script>

<template>
  <div>
    <div class="index-card" absolute l-1320 t-20 flex flex-row >
      <div class="index-card-item" c-black w-40 h-65 m-20 @click="emits('setPageState', 2)">
        <div class="index-card-item-img">
          <img src="@/assets/evaluationAnalysis/student-4-2.png"/>
        </div>
        <div class="index-card-item-text">
          <h3>学生评价</h3>
          <p>学生评价是指根据一定的标准，通过使用一定的技术和方法，以学生为评价对象所进行的价值判断!</p>
        </div>
      </div>
      <div class="index-card-item" c-black w-40 h-65 m-20 @click="emits('setPageState', 3)">
        <div class="index-card-item-img">
          <img src="@/assets/evaluationAnalysis/teacher-6.png"/>
        </div>
        <div class="index-card-item-text">
          <h3>教师评价</h3>
          <p>教师评价是教育管理的重要方面,也是促进教育发展和教师发展的重要手段,正在被更多的学校采纳。 </p>
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  background-color: #caf0f8;
}

.index-card-item {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  text-align: center;
  overflow: hidden;
  background-color: #caf0f8;
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
  transform: translateY(-8px);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
