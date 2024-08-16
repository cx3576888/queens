import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setNeedReset } from '../state/slices/timerSlice';
import { useEffect, useState } from 'react';
import { roundNumber } from '../utils/timeUtils';

export const useReduxSecondCounter = () => {
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

  return second;
};
