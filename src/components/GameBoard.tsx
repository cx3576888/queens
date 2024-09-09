import type { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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
  const { isPaused } = useSelector((state: RootState) => state.timer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`puzzles/queens${puzzleNumber}.json`);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data: PuzzleJsonType = await response.json();
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
    fetchData();
  }, [puzzleNumber]);

  return (
    <div className={styles.gameBoard}>
      {isPaused && <PauseOverlay />}
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
