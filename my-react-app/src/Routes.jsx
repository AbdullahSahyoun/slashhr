// src/Routes.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Contracts from './pages/Employee/Professional/Contracts';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/employee/professional/contracts" element={<Contracts />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}
