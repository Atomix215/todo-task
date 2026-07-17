import { Route, Routes } from 'react-router';
import Homepage from '../../features/home/pages/Homepage';
import SignupPage from '../../features/auth/pages/SignupPage';
import LoginPage from '../../features/auth/pages/LoginPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}
export default AppRoutes;
