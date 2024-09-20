import type { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { roundNumber } from '../utils/timeUtils';

export const useReduxSecondCounter = () => {
  const [second, setSecond] = useState(0);
  const { status } = useSelector((state: RootState) => state.timer);

  useEffect(() => {
    if (status === 'loading') {
      setSecond(0);
    }
    if (status !== 'running') {
      return;
    }
    const interval = setInterval(() => {
      setSecond(second => roundNumber(second + 0.1));
    }, 100);
    return () => clearInterval(interval);
  }, [status]);

  return second;
};
