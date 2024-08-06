import { useState, useEffect } from 'react';
import { calculateTime, padZeros, roundNumber } from '../utils/timeUtils';

const Timer: React.FC = () => {
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(second => roundNumber(second + 0.1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const { displaySecond, displayMinute, displayHour } = calculateTime(second);

  return (
    <>
      {padZeros(displayHour, 3, 0)}:{padZeros(displayMinute, 2, 0)}:{padZeros(displaySecond, 2, 1)}
    </>
  )
};

export default Timer;
