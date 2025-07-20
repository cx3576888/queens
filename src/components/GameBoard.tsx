import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard, setN } from '../state/slices/boardSlice';
import { setStatus } from '../state/slices/timerSlice';
import { useEffect, useState } from 'react';
import { usePuzzleNumber } from '../hooks/usePuzzleNumber';
import { useCheckBoard } from '../hooks/useCheckBoard';
import { initPlaceholderPuzzle, initNewPuzzle } from '../utils/puzzleUtils';
import PauseOverlay from './PauseOverlay';
import GameCell from './GameCell';

import styles from '../styles/GameBoard.module.css';

const GameBoard: React.FC = () => {
  const [puzzle, setPuzzle] = useState(initPlaceholderPuzzle(6));
  const { isWin } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const { puzzleNumber } = usePuzzleNumber();

  useEffect(() => {
    const fetchData = async () => {
      setPuzzle(initPlaceholderPuzzle(6));
      dispatch(setStatus('loading'));
      try {
        const puzzleUrl = `../puzzles/queens${puzzleNumber}.json`;
        // const puzzleUrl = `../../test/data/puzzles/testPuzzle${puzzleNumber}.json`; // testPuzzles for easier debug
        const response = await fetch(puzzleUrl);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        const newPuzzle = initNewPuzzle(data);
        setPuzzle(newPuzzle);
        dispatch(setN(newPuzzle.length));
        dispatch(setStatus('loadSuccess'));
        dispatch(clearBoard());
      } catch (e) {
        // queens${puzzleNumber}.json not exist, exists but invalid JSON, network error, etc
        console.error(e);
        setPuzzle(initPlaceholderPuzzle(1));
        dispatch(setN(-1));
        dispatch(setStatus('loadError'));
      }
    };
    fetchData();
  }, [puzzleNumber]);

  useCheckBoard(puzzle);

  useEffect(() => {
    if (isWin) {
      dispatch(setStatus('win'));
    }
  }, [isWin]);

  return (
    <div className={styles.gameBoard}>
      <PauseOverlay />
      {puzzle.map((row, i) => {
        return (
          <div key={`#${puzzleNumber}_row${i + 1}`} className={styles.gameBoardRow}>
            {row.map(cellInstance => {
              return <GameCell key={`#${puzzleNumber}_${cellInstance.row}-${cellInstance.col}`} cellInstance={cellInstance} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
