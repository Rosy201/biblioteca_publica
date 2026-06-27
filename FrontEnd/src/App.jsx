import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import UserManagement from './pages/UserManagement';
import CollectionManagement from './pages/CollectionManagement';
import LeituraPage from './pages/LeituraPage';
import Login from './pages/Login';
import DashboardAdmin from './components/DashboardAdmin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eff6ff] to-[#fefce8]">
          <Header />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Logados: alunos, supervisores e administradores */}
            <Route
              path="/acervo"
              element={
                <ProtectedRoute>
                  <CollectionManagement />
                </ProtectedRoute>
              }
            />

            {/* Supervisores */}
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute roleRequired="SUPERVISOR">
                  <UserManagement />
                </ProtectedRoute>
              }
            />

            {/* Supervisores */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roleRequired="SUPERVISOR">
                  <DashboardAdmin />
                </ProtectedRoute>
              }
            />

            {/* Logados */}
            <Route
              path="/leitura/:livroId"
              element={
                <ProtectedRoute roleRequired="ALUNO">
                  <LeituraPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;