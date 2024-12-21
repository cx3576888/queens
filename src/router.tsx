import { createBrowserRouter } from 'react-router';
import App from './components/App';
import GameBoard from './components/GameBoard';
import { puzzleNumbers } from './utils/puzzleUtils';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'daily/latest',
        element: <GameBoard />,
        loader: () => ({ puzzleNumber: puzzleNumbers[0] })
      },
      {
        path: 'daily/:puzzleNumber',
        element: <GameBoard />,
        loader: ({ params }) => {
          const puzzleNumber = Number(params.puzzleNumber);
          const index = puzzleNumbers.indexOf(puzzleNumber);
          const puzzleNumberIndex = index > -1 ? index : 0;
          return { puzzleNumber: puzzleNumbers[puzzleNumberIndex] };
        }
      }
    ]
  }
]);

export default router;
