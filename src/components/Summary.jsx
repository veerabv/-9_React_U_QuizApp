import React from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

const Summary = ({ userAnswers }) => {

    const skippedAnswer = userAnswers.filter((answer) => answer === null);
    const correctAnswer = userAnswers.filter((answer,index) => answer ===QUESTIONS[index].answers[0]);

    const skippedShare = Math.round((skippedAnswer.length/userAnswers.length)*100);
    const correctShare = Math.round((correctAnswer.length/userAnswers.length)*100);
    const wrongShare = 100 - (skippedShare+correctShare)
  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
            let cssClass = "user-answer";
            if(answer === null){
                cssClass += " skipped";
            }else if(answer === QUESTIONS[index].answers[0]){
                cssClass += " correct"; 
            }else{
                cssClass += " wrong";
            }
          return (
            <li key={answer}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
