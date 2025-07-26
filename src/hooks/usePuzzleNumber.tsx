import { useParams } from 'react-router';
import { latestPuzzleNumber } from '../utils/puzzleUtils';

export const usePuzzleNumber = () => {
  const { puzzleNumberString } = useParams();
  let puzzleNumber;
  let needRedirect = false;
  if (puzzleNumberString === "today") {
    puzzleNumber = latestPuzzleNumber;
    needRedirect = false;
  } else if (puzzleNumberString === "yesterday") {
    puzzleNumber = latestPuzzleNumber - 1;
    needRedirect = false;
  } else if (puzzleNumber === "" || isNaN(Number(puzzleNumberString))) {
    puzzleNumber = latestPuzzleNumber;
    needRedirect = true;
  } else {
    puzzleNumber = Number(puzzleNumberString);
    needRedirect = false;
  }
  return { puzzleNumber, needRedirect }
};
