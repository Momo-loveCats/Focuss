import { createContext, useState } from "react";
import {  type User } from '../types/types';
import { loginn, registerr } from "../api/services/auth.services";
// le context d'utilisation va contenir l'user de l'utilisateur
// tous les enfants de ce context aura acces a cet id nom , email

interface AuthContextType {
    user: User | null;
    login: (email : string, password : string) => void,
    logout: () => void;
    register : (email : string, password : string, name : string) => void
  }

// Nous allons creer notre type d'authentification
 

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);


// Nous renvoyons un composant qui va fournir le context au enfants
export const AuthProvider : React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    
    const login = async (email : string, password : string) => {
        try {
            const response = await loginn(email, password);
            localStorage.setItem("token", response.token);
            setUser(response.user);
        } catch  {
            throw new Error("Email ou mot de passe invalide");
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    const register = async (email : string, password : string, name : string) => {
        try {
            await registerr(email, password, name);
        } catch  {
            throw new Error("Compte existant");
        }
    }

    return (
        <AuthContext.Provider value={{user, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

