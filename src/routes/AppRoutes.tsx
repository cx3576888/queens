import { Route, Routes } from 'react-router';
import { RedirectToHome } from './RedirectToHome';
import App from '../components/App';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/puzzle" element={<App />}>
        <Route path=":puzzleNumberString" />
      </Route>
      <Route path="*" element={<RedirectToHome />} />
    </Routes>
  )
}

export default AppRoutes;
