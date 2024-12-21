import { createBrowserRouter } from 'react-router';
import App from './components/App';
import GameBoard, { puzzleLoader } from './components/GameBoard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'daily/:puzzleNumber',
        element: <GameBoard />,
        loader: puzzleLoader
      }
    ]
  }
]);

export default router;
