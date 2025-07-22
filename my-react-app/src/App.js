import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth/auth';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Redirect root to /auth */}
          <Route path="/" element={<Navigate to="/auth" replace />} />

          {/* Auth page */}
          <Route path="/auth" element={<Auth />} />

          {/* Dashboard page */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Fallback for 404 */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
