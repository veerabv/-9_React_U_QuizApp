import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
 
  //   const [activeQuestionIndex, setActiveQuestion] = useState(0);  //comment this state because we can derived this state from below state
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =userAnswers.length ; // this is the derived state from the above state

  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    
    setUserAnswers((previousUserAnswer) => {
      return [...previousUserAnswer, answer];
    });
   
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkip={handleSkipAnswer}
      />
      {/*Key is not only used to render list the key prop is used to destroy the old element and create the new one */}
    </div>
  );
}
