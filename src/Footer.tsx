import { useQuestionsStore } from "./store/questions"

export const Footer = () => {

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

    return(
        <footer>
            <strong>
                {`:white-check-mark`}
            </strong>
        </footer>
    )
}