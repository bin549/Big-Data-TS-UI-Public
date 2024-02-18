<script setup lang="ts">

</script>

<template>
  <div style="background-color: #def6ff" rounded-md b-rounded-2>
    <h4 font-bold pl-3 content-center text-lg text-gray-500 mt-4>数据统计</h4>
    <div h-full>
      <el-row>
        <el-col :span="4" b-gray b-1>
          <div content-center style="font-size: 14px;">
            评价总数
          </div>
        </el-col>
        <el-col :span="8" b-gray b-1>
          <div class="grid-content ep-bg-purple-light"/>
          615
        </el-col>
        <el-col :span="4" b-gray b-1>
          <div content-center style="font-size: 14px;">
            平均每学期给出的评价数
          </div>
        </el-col>
        <el-col :span="8" b-gray b-1>
          <div class="grid-content ep-bg-purple"/>
          205
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" b-gray b-1>
          <div content-center style="font-size: 14px;">
            正面评价
          </div>
        </el-col>
        <el-col :span="8" b-gray b-1>
          <div class="grid-content ep-bg-purple-light"/>
          488 / 79.35%
        </el-col>
        <el-col :span="4" b-gray b-1>
          <div class="grid-content ep-bg-purple"/>
          负面评价
        </el-col>
        <el-col :span="8" b-gray b-1>
          <div class="grid-content ep-bg-purple"/>
          127 / 20.65%
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" b-gray b-1>
          <div content-center style="font-size: 14px;">
            给出最多的评价前三
          </div>
        </el-col>
        <el-col :span="20" b-gray b-1>
          <div content-center style="font-size: 14px;">
            音乐-音乐课前能够做到准备好书本安静等待。 共95次
            音乐-二（7）班获得第六周不带书的人最少、铃鼓... 共51次
            音乐-二（7）班获得第三周不带书的人最少、铃鼓... 共51次
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
