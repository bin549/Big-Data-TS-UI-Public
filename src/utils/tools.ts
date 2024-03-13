export function getGradeList() {
  const gradeList = [
    { gradeId: 1, gradeName: "一年级" },
    { gradeId: 2, gradeName: "二年级" },
    { gradeId: 3, gradeName: "三年级" },
    { gradeId: 4, gradeName: "四年级" },
    { gradeId: 5, gradeName: "五年级" },
    { gradeId: 6, gradeName: "六年级" }
  ];
  return gradeList;
}


export function countContent(arr) {
  const contentMap = {}
  for (const item of arr) {
    const content = item.content
    if (!contentMap[content])
      contentMap[content] = 0
    contentMap[content]++
  }
  const contents = []
  const frequencies = []
  for (const [content, frequency] of Object.entries(contentMap)) {
    contents.push(content)
    frequencies.push(frequency)
  }
  return [contents, frequencies]
}
