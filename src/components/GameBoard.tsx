import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard, setN } from '../state/slices/boardSlice';
import { setStatus, type StatusType } from '../state/slices/timerSlice';
import { useEffect, useState } from 'react';
import { useCheckBoard } from '../hooks/useCheckBoard';
import { initPlaceholderPuzzle, initNewPuzzle } from '../utils/puzzleUtils';
import PauseOverlay from './PauseOverlay';
import GameCell from './GameCell';

import styles from '../styles/GameBoard.module.css';
import { useLoaderData, type LoaderFunction } from 'react-router';
import type Cell from '../models/cellModel';


type ttt = {
  puzzle: Cell[][],
  loadStatus: StatusType;
};
export const puzzleLoader: LoaderFunction = async ({ params }) => {
  try {
    const puzzleUrl = `/puzzles/queens${params.puzzleNumber}.json`;
    // const puzzleUrl = `../../test/data/puzzles/testPuzzle${params.puzzleNumber}.json`; // testPuzzles for easier debug
    const response = await fetch(puzzleUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return { puzzle: initNewPuzzle(data), loadStatus: 'loadSuccess' };
  } catch (e) {
    // queens${puzzleNumber}.json not exist, exists but invalid JSON, network error, etc
    console.error(e);
    return { puzzle: initPlaceholderPuzzle(1), loadStatus: 'loadError' };
  }
};

const GameBoard: React.FC = () => {
  const { puzzle, loadStatus } = useLoaderData<ttt>();
  // const [puzzle, setPuzzle] = useState(initPlaceholderPuzzle(6));
  const { isWin } = useSelector((state: RootState) => state.board);
  const { puzzleNumber } = useSelector((state: RootState) => state.gameSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadStatus === 'loadSuccess') {
      console.log('succ disptch');
      dispatch(setN(puzzle.length));
      dispatch(setStatus('loadSuccess'));
      dispatch(clearBoard());
    } else if (loadStatus === 'loadError') {
      console.log('err disptch');
      dispatch(setN(-1));
      dispatch(setStatus('loadError'));
    }
  }, []);

  /*
  useEffect(() => {
    const fetchData = async () => {
      setPuzzle(initPlaceholderPuzzle(6));
      dispatch(setStatus('loading'));
      try {
        const puzzleUrl = `puzzles/queens${puzzleNumber}.json`;
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
  */

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
