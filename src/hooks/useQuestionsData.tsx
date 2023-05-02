import { useQuestionsStore } from "../store/questions"

export const useQuestionsData = () => {
    // se observan los cambios de todo el estado
    const questions = useQuestionsStore(state => state.questions)

    let correcta = 0
    let incorrectas = 0
    let unanswered = 0

    questions.forEach(question => {
        const {userSelectedAnswer, correctAnswer} = question
        if(userSelectedAnswer == null) unanswered++
        else if (userSelectedAnswer === correctAnswer) correcta++
        else incorrectas++
    })
    return {correcta, incorrectas, unanswered}
}
