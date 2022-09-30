export interface Choice {
    id: number
    isCorrect: boolean
    text: string
}

export interface QuestionInterface {
    id: number
    question: string
    question_type: "mult" | "ident"
    choices: Array<Choice>
    index: number
}

export interface Assessment {
    id: number
    key: string
    subject: number
    name: string
    date: string
    questions: Array<QuestionInterface>
}

export interface Subject {
    id: number
    name: string
    section: number
    assessments: Array<Assessment>
}

export interface Section {
    id: number
    name: string
    subjects: Array<Subject>
}

export interface State {
    data: { data: Section, server: string, gpl: Assessment }
    setdata: React.Dispatch<{ data: Section, server: string, gpl: Assessment }>
}
