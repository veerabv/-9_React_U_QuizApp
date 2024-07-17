import React, { useEffect, useState } from "react";

const QuizTimer = ({ timeOut, onTimeout,mode }) => {
  const [remainingTime, setRemainingTIme] = useState(timeOut);

//   react strict mode will call the function twice so we have to cleanup the code
  useEffect(() => {
    // console.log("timeout");
     const timer = setTimeout(onTimeout, timeOut);
     return () => {
        clearTimeout(timer)
     }
 
  }, [timeOut, onTimeout]);

  useEffect(() => {
    // console.log("interval");
    const interval = setInterval(() => {
      setRemainingTIme((previousTime) => previousTime - 100);
    }, 100);
    return () => {
        clearInterval(interval)
    }
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeOut}  className={mode}/>;
};

export default QuizTimer;
