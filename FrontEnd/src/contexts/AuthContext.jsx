import { createContext, useState, useEffect } from 'react';
import api from '../services/Api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@BiblioTech:user');
    if (storagedUser) setUser(JSON.parse(storagedUser));
    setLoading(false);
  }, []);

  async function login(loginData) {
    // Aqui chamamos o endpoint real de autenticação do seu Backend
    const response = await api.post('/auth/login', loginData); 
    const userData = response.data; // Espera-se UsuarioResumoResponse

    setUser(userData);
    localStorage.setItem('@BiblioTech:user', JSON.stringify(userData));
  }

  function logout() {
    localStorage.removeItem('@BiblioTech:user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}