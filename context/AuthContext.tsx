'use client';
import { createContext, useState, useEffect, useContext } from "react";
import { getAuthCookie, setAuthCookie, removeAuthCookie } from './cookieUtils';
import { User, AuthContextType} from '@/types/context/AuthContext';
import {useRouter} from 'next/navigation';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC< {children: React.ReactNode}> = ({children}) =>{
    
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const navToHomePage = (user: User) =>{
        let homePage;
        if (user.role == 0){
            homePage = `/superAdmin/${user.userName}`
        }else {
            homePage = `/${user.userName}`
        }
        router.push(homePage)
    };
    const login = (user: User) => {
        setUser(user),
        setAuthCookie(user)
        navToHomePage(user)
        };

    const logout = () => {
        setUser(null);
        removeAuthCookie();
        router.replace('/login');
    };

    useEffect(() => {
        const userData = getAuthCookie();
        if (userData) {
            setUser(userData); 
        }
    }, []);
        
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error ("useAuth must be used within AuthProvider");
    return context
};
