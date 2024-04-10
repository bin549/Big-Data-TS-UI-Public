<script lang="ts" setup>
import HeadBoyImg from "@/assets/evaluationAnalysis/Avatar-1-Stu-Boy.png";
import HeadGirlImg from "@/assets/evaluationAnalysis/Avatar-2-Stu-Girl.png";

const props = defineProps({
    sex: String,
    name: String
})
</script>

<template>
    <div class="flex flex-col rounded-1 items-center p-4 student-card"
        style="background-color: #e9f4fa; height: 170px; width: 150px;">
        <img class="rounded-1; " style="width: 90%; " shape="square" :size="100"
            :src="props.sex === '男' ? HeadBoyImg : HeadGirlImg" />
        <h3 style="color: #89CDDF; margin-top: 6px;">{{ props.name }}</h3>
    </div>
</template>

<style scoped>
.student-card {
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
}

.student-card:hover {
  cursor: pointer;
  transform: translateY(-8px);
  transition: all 0.15s;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19);
}
</style>
