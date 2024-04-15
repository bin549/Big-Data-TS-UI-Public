import axios from "@/utils/httpx.ts";

export const getProvinceList = (params?: object) => {
  return axios({
    url: "/api/province/list",
    method: "get",
    params: params
  });
};

export const getAreaList = (params?: object) => {
  return axios({
    url: "/api/city/list",
    method: "get",
    params: params
  });
};

export const getSchoolList = (params?: object) => {
  return axios({
    url: "/api/school/list_city",
    method: "get",
    params: params
  });
};

export const getGradeList = () => {
  return axios({
    url: "/api/grade/list",
    method: "get"
  });
};

export const getClassList = (params?: object) => {
  return axios({
    url: "/api/classes/list",
    method: "get",
    params: params
  });
};

export const getTermList = () => {
  return axios({
    url: "/api/semester/list",
    method: "get"
  });
};

export const getSubjectList = (params?: object) => {
  return axios({
    url: "/api/subject/list",
    method: "get",
    params: params
  });
};

export const getStudentList = (params?: object) => {
  return axios({
    url: "/api/student/list",
    method: "get",
    params: params
  });
};

export const getTeacherList = (params?: object) => {
  return axios({
    url: "/api/teacher/list",
    method: "get",
    params: params
  });
};

export const getStudentEvaluation = (params?: object) => {
  return axios({
    url: "/api/student_evaluation/list",
    methos: "get",
    params: params
  });
};


export const getTeacherEvaluation = (params?: object) => {
  return axios({
    url: "/api/student_evaluation/list_teacher",
    methos: "get",
    params: params
  });
};

export const getClassEvaluation = (params?: object) => {
  return axios({
    url: "/api/student_evaluation/list_class",
    methos: "get",
    params: params
  });
};

export const getSchoolEvaluation = (params?: object) => {
  return axios({
    url: "/api/student_evaluation/list_school",
    methos: "get",
    params: params
  });
};


export const getStudentEvaluationWeek = (params?: object) => {
  return axios({
    url: "/api/student_evaluation/list_week",
    methos: "get",
    params: params
  });
};

export const getCoinList = (params?: object) => {
  return axios({
    url: "/api/coin/list",
    methos: "get",
    params: params
  });
}