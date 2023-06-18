import { Button } from '@mui/material'
import { reset } from "canvas-confetti"
import { useQuestionsData } from "./hooks/useQuestionsData"
import { useQuestionsStore } from './store/questions'

export const Footer = () => {
    const {correcta, incorrectas, unanswered} = useQuestionsData()
    const reset = useQuestionsStore(state => state.reset)

    return(
        <footer style={{marginTop: '16px'}}>
            <strong>
                {`✅ ${correcta} Correctas- ❎ ${incorrectas} Incorrectas- ❓ ${unanswered} Sin Responder`}
            </strong>
            <Button onClick={() => reset()}>
                Reset Game 
            </Button>
        </footer>
    )
}