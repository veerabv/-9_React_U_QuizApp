import QuizTimer from "./QuizTimer";
import Answers from "./Answers";

const Question = ({
  questionText,
  answers,
  answerState,
  selectedAnswer,
  onSelectAnswer,
  onSkip,
}) => {
  return (
    <div id="question">
      <QuizTimer timeOut={10000} onTimeout={onSkip} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
};

export default Question;
