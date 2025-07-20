import { Navigate } from 'react-router';

export const RedirectToHome: React.FC = () => {
  return <Navigate to={"/puzzle/today"} replace />;
};
