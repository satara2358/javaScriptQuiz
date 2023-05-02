import { reset } from 'canvas-confetti';
import { type Question } from "../types";   
import { create } from "zustand";
import confetti from 'canvas-confetti'
import { persist } from "zustand/middleware";

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>,
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: ()=> void
    goPreviousQuestion: ()=> void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {
        loading: false,
        questions: [],  
        currentQuestion : 0,

    fetchQuestions: async (limit: number) => {
        const res = await fetch('http://localhost:5173/data.json')
        const json = await res.json()

        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
        set({ questions }) /// 
    },
    
    selectAnswer: (questionId: number, answerIndex: number)=> {
        const {questions} = get()
        // usar el structureClone para clonar el objeto 
        const newQuestions = structuredClone(questions)
        // se encuentra el indice de la pregunta
        const questionIndex = newQuestions.findIndex(q => q.id === questionId)
        // se obtiene la informacion del apregunta 
        const questionInfo = newQuestions[questionIndex]
        // averiaguamos si el user selecciona la respuesta correcta
        const isCorrectUserAnswer = questionInfo.correctAnswer=== answerIndex
        
        if(isCorrectUserAnswer) confetti()
        // enviar esta infoamcion en al copia de la pregunta
        newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex
        }
        // actualizar  estado
        set({questions: newQuestions})
    },

    goNextQuestion: () => {
        const { currentQuestion, questions} = get()
        const nextQuestion = currentQuestion + 1

        if(nextQuestion < questions.length){
            set({ currentQuestion: nextQuestion})
        }
    },

    goPreviousQuestion: () => {
        const { currentQuestion} = get()
        const previousQuestion = currentQuestion - 1 

        if(previousQuestion >= 0){
            set({currentQuestion: previousQuestion})
        }
    },

    reset: () => {
        set({ currentQuestion: 0, questions: []})
    }
}
},{
    name: 'questions'
}))
