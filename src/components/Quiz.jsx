import { useState } from "react";
import QUESTIONS from "../questions";

export default function Quiz() {
  //   const [activeQuestionIndex, setActiveQuestion] = useState(0);  //comment this state because we can derived this state from below state
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length; // this is the derived state from the above state
  function handleSelectQuestion(answer) {
    setUserAnswers((previousUserAnswer) => {
      return [...previousUserAnswer, answer];
    });
  }
  return (
    <div id='quiz'>
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
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
