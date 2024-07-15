import { useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png"

export default function Quiz() {
  //   const [activeQuestionIndex, setActiveQuestion] = useState(0);  //comment this state because we can derived this state from below state
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length; // this is the derived state from the above state
  
  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  function handleSelectQuestion(answer) {
    setUserAnswers((previousUserAnswer) => {
      return [...previousUserAnswer, answer];
    });
  }
  if (quizIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }
  // i changed this line here from top to avoid the error in the suffledAnswers error , we can try by putting these line above the if statement
  const suffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  suffledAnswers.sort(() => Math.random() - 0.5); // the sort function swap if the value is -1 or negative , so the random gives value 0 to 1 so i sub 0.5 to suffles the answers

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {suffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectQuestion(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
