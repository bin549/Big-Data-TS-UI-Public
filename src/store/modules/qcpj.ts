/**
 * 作用：pinia实现持久化存储
 * 创建时间：2023/10/03
 */
import { defineStore } from "pinia";

export const useEvaluationStore = defineStore("evaluation", {
  state: () => {
    return {
      provinceList: [],
      scoreData: []
    };
  },
  actions: {
    setProvinceList(data: any) {
      this.provinceList = data;
    },
    setScoreData(data: any) {
      this.scoreData = data;
    }
  },
  getters: {},
  //开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        key: "qcpj_data",
        storage: localStorage
      }
    ]
  }
});
