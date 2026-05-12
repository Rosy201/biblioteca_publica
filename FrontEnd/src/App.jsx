import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import UserManagement from './pages/UserManagement';
import CollectionManagement from './pages/CollectionManagement';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eff6ff] to-[#fefce8]">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Apenas logados (Alunos e Supervisores) */}
            <Route path="/acervo" element={
              <ProtectedRoute>
                <CollectionManagement />
              </ProtectedRoute>
            } />

            {/* Apenas Supervisores */}
            <Route path="/usuarios" element={
              <ProtectedRoute roleRequired="SUPERVISOR">
                <UserManagement />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
