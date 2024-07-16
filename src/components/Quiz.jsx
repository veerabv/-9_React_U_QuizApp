import { useState ,useCallback, useRef} from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png"
import QuizTimer from "./QuizTimer";

export default function Quiz() {
  const shuffledAnswers = useRef()
  const [answerState , setAnswerState] = useState("")
  //   const [activeQuestionIndex, setActiveQuestion] = useState(0);  //comment this state because we can derived this state from below state
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = answerState === "" ? userAnswers.length : userAnswers.length-1; // this is the derived state from the above state
  
  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setAnswerState("answered")
    setUserAnswers((previousUserAnswer) => {
      return [...previousUserAnswer, answer];
    });
    setTimeout(()=>{
      if(answer === QUESTIONS[activeQuestionIndex].answers[0]){
        setAnswerState("correct")
      }else {
        setAnswerState("wrong")
      }
      setTimeout(()=>{
        setAnswerState("")
      },2000)
      
    },1000)
  },[])


const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null) , [handleSelectAnswer])

  if (quizIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }
  if(!shuffledAnswers.current){
    // i changed this line here from top to avoid the error in the suffledAnswers error , we can try by putting these line above the if statement
   shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
   shuffledAnswers.current.sort(() => Math.random() - 0.5); // the sort function swap if the value is -1 or negative , so the random gives value 0 to 1 so i sub 0.5 to suffles the answers

  // the issue in the previous code is that we shuffle the answer for everytime the components rerendering .to avoid this we use ref 

  }
  

  return (
    <div id="quiz">

      <QuizTimer key = {activeQuestionIndex} timeOut={15000} onTimeout={handleSkipAnswer}/>  {/*Key is not only used to render list the key prop is used to destroy the old element and create the new one */}
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            const isSelected = userAnswers[userAnswers.length -1] === answer;
            let cssClass = '';
            if(answerState === "answered" && isSelected){
              cssClass="selected"
            }
            if((answerState === "correct" || answerState === "wrong") && isSelected){
              cssClass = answerState;
            }
           return <li key={answer} className="answer">
            <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
          }
            
          )}
        </ul>
      </div>
    </div>
  );
}
