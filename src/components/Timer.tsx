import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setNeedReset } from '../state/slices/timerSlice';
import { useState, useEffect } from 'react';
import { calculateTime, padZeros, roundNumber } from '../utils/timeUtils';

const Timer: React.FC = () => {
  const [second, setSecond] = useState(0);
  const { isPaused, needReset } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPaused) {
      return;
    }
    const interval = setInterval(() => {
      setSecond(second => roundNumber(second + 0.1));
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (!needReset) {
      return;
    }
    setSecond(0);
    dispatch(setNeedReset(false));
  }, [needReset]);

  const { displaySecond, displayMinute, displayHour } = calculateTime(second);

  return (
    <>
      {padZeros(displayHour, 3, 0)}:{padZeros(displayMinute, 2, 0)}:{padZeros(displaySecond, 2, 1)}
    </>
  )
};

export default Timer;
