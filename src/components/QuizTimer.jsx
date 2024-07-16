import React, { useEffect, useState } from "react";

const QuizTimer = ({ timeOut, onTimeout }) => {
  const [remainingTime, setRemainingTIme] = useState(timeOut);
  useEffect(() => {
    console.log("timeout");
     setTimeout(onTimeout, timeOut);
    // return () => {
        
    //      clearTimeout(timer)
    // }
  }, [timeOut, onTimeout]);

  useEffect(() => {
    console.log("interval");
    setInterval(() => {
      setRemainingTIme((previousTime) => previousTime - 100);
    }, 100);
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeOut} />;
};

export default QuizTimer;
