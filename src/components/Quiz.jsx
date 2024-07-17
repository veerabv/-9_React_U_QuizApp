import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuizTimer from "./QuizTimer";
import Answers from "./Answers";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  //   const [activeQuestionIndex, setActiveQuestion] = useState(0);  //comment this state because we can derived this state from below state
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1; // this is the derived state from the above state

  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(answer) {
    setAnswerState("answered");
    setUserAnswers((previousUserAnswer) => {
      return [...previousUserAnswer, answer];
    });
    setTimeout(() => {
      if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }
      setTimeout(() => {
        setAnswerState("");
      }, 200);
    }, 1000);
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
   
      {/*Key is not only used to render list the key prop is used to destroy the old element and create the new one */}
      <div id="question">
      <QuizTimer
        key={activeQuestionIndex}
        timeOut={10000}
        onTimeout={handleSkipAnswer}
      />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
         key={activeQuestionIndex}
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState = {answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  );
}
