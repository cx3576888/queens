import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard, setN } from '../state/slices/boardSlice';
import { useEffect, useState } from 'react';
import { useCheckBoard } from '../hooks/useCheckBoard';
import type { PuzzleJsonType } from '../../scripts/download_puzzle';
import PauseOverlay from './PauseOverlay';
import GameCell from './GameCell';
import Cell from '../models/cellModel';

import styles from '../styles/GameBoard.module.css';

interface GameBoardProps {
  puzzleNumber: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ puzzleNumber }) => {
  const [puzzle, setPuzzle] = useState<Cell[][]>([]);
  const { isWin } = useSelector((state: RootState) => state.board);
  const { isPaused } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const puzzleUrl = `puzzles/queens${puzzleNumber}.json`;
        // const puzzleUrl = `../../test/data/puzzles/testPuzzle${puzzleNumber}.json`; // testPuzzles for easier debug
        const response = await fetch(puzzleUrl);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data: PuzzleJsonType = await response.json();
        dispatch(setN(data.queens.length));
        const newPuzzle = data.queens.map((row) => {
          return row.map((cell) => {
            return new Cell(cell.row, cell.col, cell.colorIndex);
          });
        });
        for (let i = 0; i < newPuzzle.length; i++) {
          for (let j = 0; j < newPuzzle[i]!.length; j++) {
            newPuzzle[i]![j]!.prepareBordersMark(newPuzzle[i - 1]?.[j], newPuzzle[i]![j + 1], newPuzzle[i + 1]?.[j], newPuzzle[i]![j - 1]);
          }
        }
        setPuzzle(newPuzzle);
      } catch (e) {
        console.error(e);
      }
    };
    dispatch(clearBoard());
    fetchData();
  }, [puzzleNumber]);

  useCheckBoard(puzzle);

  return (
    <div className={styles.gameBoard}>
      {isPaused && <PauseOverlay />}
      {!isWin && <div className={styles.boardMessage}>gogogo!</div>}
      {isWin && <div className={styles.boardMessage}>You Win!</div>}
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
