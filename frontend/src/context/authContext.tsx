import { createContext, useState } from "react";
import { type User } from '../types/types';
// le context d'utilisation va contenir l'user de l'utilisateur
// tous les enfants de ce context aura acces a cet id nom , email

interface AuthContextType {
    user: User | null;
    login: (u : User) => void,
    logout: () => void;
  }

// Nous allons creer notre type d'authentification
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider : React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    
    const login = (u : User) => {
         
        setUser(u);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

