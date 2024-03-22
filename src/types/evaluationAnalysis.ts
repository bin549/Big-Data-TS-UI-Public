
export interface CardItem {
    title: string
    description: string
    cover_img: string
    index: number
}

export interface StudentEvaluation {
    content: string
    score: number
}

export interface StudentHistory {
    id: number
    content: string
    score: number
    subjectId: number
}

export interface Option {
  key: number
  label: string
  disabled: boolean
}

export interface WeekOption {
    id: number
    name: string
}

export interface StudentRow {
    id: string
    name: string
    scoreAvg: number
    scoreTotal: number
    scoreWeek: number
    starWeek: number
    starProgress: number
}