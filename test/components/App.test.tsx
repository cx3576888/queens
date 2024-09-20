import { customRender } from '../test-utils';
import App from '../../src/components/App';
import { screen } from '@testing-library/react';

vi.mock('../../src/components/Timer', () => {
  return {
    default: () => {
      return <div data-testid='mock-timer'></div>;
    }
  };
});

vi.mock('../../src/components/GameBoard', () => {
  return {
    default: ({ puzzleNumber }: { puzzleNumber: number; }) => {
      return <div data-testid='mock-game-board' data-puzzle-number={puzzleNumber}></div>;
    }
  };
});

vi.mock('../../src/components/GameRule', () => {
  return {
    default: () => {
      return <div data-testid='mock-game-rule'></div>;
    }
  };
});

describe('App', () => {
  test('render App with Timer, GameBoard and GameRule', () => {
    customRender(<App />);
    const mockTimer = screen.getByTestId('mock-timer');
    const mockGameBoard = screen.getByTestId('mock-game-board');
    const mockGameRule = screen.getByTestId('mock-game-rule');

    expect(screen.getByTestId('app-testid')).toBeInTheDocument();
    expect(mockTimer).toBeInTheDocument();
    expect(mockGameBoard).toBeInTheDocument();
    expect(mockGameBoard.hasAttribute('data-puzzle-number')).toBe(true);
    expect(mockGameRule).toBeInTheDocument();
  });
});
