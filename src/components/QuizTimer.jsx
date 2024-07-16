import React, { useEffect, useState } from "react";

const QuizTimer = ({ timeOut, onTimeout }) => {
  const [remainingTime, setRemainingTIme] = useState(timeOut);
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeOut);
    // return () => {
        
    //      clearTimeout(timer)
    // }
  }, [timeOut, onTimeout]);

  useEffect(() => {
    setInterval(() => {
      setRemainingTIme((previousTime) => previousTime - 100);
    }, 100);
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeOut} />;
};

export default QuizTimer;
