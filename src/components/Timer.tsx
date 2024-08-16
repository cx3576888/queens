import { useReduxSecondCounter } from '../hooks/useReduxSecondCounter';
import { calculateTime, padZeros } from '../utils/timeUtils';

const Timer: React.FC = () => {
  const second = useReduxSecondCounter();
  const { displaySecond, displayMinute, displayHour } = calculateTime(second);

  return (
    <div>
      {padZeros(displayHour, 3, 0)}:{padZeros(displayMinute, 2, 0)}:{padZeros(displaySecond, 2, 1)}
    </div>
  );
};

export default Timer;
