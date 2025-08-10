import type { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { roundNumber } from '../utils/timeUtils';
import { reportResult } from '../utils/reportUtils';
import { usePuzzleNumber } from './usePuzzleNumber';

export const useReduxSecondCounter = () => {
  const [second, setSecond] = useState(0);
  const { status } = useSelector((state: RootState) => state.timer);
  const { puzzleNumber } = usePuzzleNumber();

  useEffect(() => {
    switch (status) {
      case "loadSuccess":
      case "loadError":
      case "paused":
        return;
      case "win":
        reportResult({ puzzleNumber, win: true, time: second, timeStamp: Date.now() })
        return;
      case "loading":
        setSecond(0);
        break;
    }
    const interval = setInterval(() => {
      setSecond(second => roundNumber(second + 0.1));
    }, 100);
    return () => clearInterval(interval);
  }, [status]);

  return second;
};
