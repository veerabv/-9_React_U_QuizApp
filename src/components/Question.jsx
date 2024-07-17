import { useState } from "react";
import QUESTIONS from "../questions";
import QuizTimer from "./QuizTimer";
import Answers from "./Answers";

const Question = ({
  index,
  

  onSelectAnswer,
  onSkip,
}) => {
  const [answer, setAnswer] = useState({ selectedAnswer: "", isCorrect: null });
  function handleSelectAnswer(answer) {
    setAnswer({ selectedAnswer: answer, isCorrect: null });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      })
      setTimeout(()=>{
        onSelectAnswer(answer);
      },2000)
    }, 1000);
  }
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect? 'correct' : 'wrong';
    } else if (answer.selectedAnswer){
        answerState = 'answered';
    }
    

  return (
    <div id="question">
      <QuizTimer timeOut={15000} onTimeout={onSkip} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
