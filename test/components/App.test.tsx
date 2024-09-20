import { customRender } from '../test-utils';
import App from '../../src/components/App';
import { screen } from '@testing-library/react';

vi.mock('../../src/components/Header', () => {
  return {
    default: () => <div data-testid='mock-header'></div>
  };
});

vi.mock('../../src/components/TopBar', () => {
  return {
    default: () => <div data-testid='mock-top-bar'></div>
  };
});

vi.mock('../../src/components/GameBoard', () => {
  return {
    default: () => <div data-testid='mock-game-board'></div>
  };
});

vi.mock('../../src/components/PuzzleControls', () => {
  return {
    default: () => <div data-testid='mock-puzzle-controls'></div>
  };
});

vi.mock('../../src/components/GameRule', () => {
  return {
    default: () => <div data-testid='mock-game-rule'></div>
  };
});

describe('App', () => {
  test('render App with child components', () => {
    customRender(<App />);
    const mockHeader = screen.getByTestId('mock-header');
    const mockTopBar = screen.getByTestId('mock-top-bar');
    const mockGameBoard = screen.getByTestId('mock-game-board');
    const mockPuzzleControls = screen.getByTestId('mock-puzzle-controls');
    const mockGameRule = screen.getByTestId('mock-game-rule');

    expect(mockHeader).toBeInTheDocument();
    expect(mockTopBar).toBeInTheDocument();
    expect(mockGameBoard).toBeInTheDocument();
    expect(mockPuzzleControls).toBeInTheDocument();
    expect(mockGameRule).toBeInTheDocument();
  });
});
