import { createContext, useEffect, useState } from 'react';
import api from '../services/Api';

export const AuthContext = createContext({});

const USER_STORAGE_KEY = '@BiblioTech:user';
const TOKEN_STORAGE_KEY = '@BiblioTech:token';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storagedUser = localStorage.getItem(USER_STORAGE_KEY);

            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
            }
        } catch (error) {
            console.error('Erro ao recuperar usuário da sessão:', error);
            localStorage.removeItem(USER_STORAGE_KEY);
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        } finally {
            setLoading(false);
        }
    }, []);

    async function login(loginData) {
        const response = await api.post('/auth/login', loginData);
        const userData = response.data;

        if (!userData?.id || !userData?.perfil) {
            throw new Error('Resposta de login inválida.');
        }

        setUser(userData);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

        return userData;
    }

    function logout() {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setUser(null);
    }

    const isAdmin = user?.perfil === 'ADMINISTRADOR';
    const isAluno = user?.perfil === 'ALUNO';
    const isSupervisor = user?.perfil === 'SUPERVISOR';

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                login,
                logout,
                isAdmin,
                isAluno,
                isSupervisor
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}