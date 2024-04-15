//评价分析
export default {
  path: "/evaluationAnalysis",
  meta: {
    icon: "system-uicons:book-closed",
    title: "评价分析"
  },
  children: [
    {
      path: "/evaluationAnalysis/evaluationOverview",
      name: "evaluationOverview",
      component: () =>
        import("@/views/welcome/index.vue"),
      meta: {
        title: "模块首页"
      }
    },
    {
      path: "/evaluationAnalysis/studentEvaluation",
      name: "studentEvaluation",
      component: () =>
        import("@/views/evaluationAnalysis/student/studentEvaluation.vue"),
      meta: {
        title: "学生评价"
      }
    },
    {
      path: "/evaluationAnalysis/teacherEvaluation",
      name: "teacherEvaluation",
      component: () =>
        import("@/views/evaluationAnalysis/teacher/teacherEvaluation.vue"),
      meta: {
        title: "教师评价"
      }
    }
  ]
};
