import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  currentRole: Role;
  loginAsRole: (role: Role) => Promise<void>;
  loginWithCredentials: (emailOrPhone: string, role: Role) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<Role>('FARMER');

  useEffect(() => {
    // Load default demo user (Farmer Ramesh Kumar) on initial load
    const savedRole = (localStorage.getItem('agrishare_active_role') as Role) || 'FARMER';
    api.getUserByRole(savedRole).then((user) => {
      setCurrentUser(user);
      setCurrentRole(user.role);
    });
  }, []);

  const loginAsRole = async (role: Role) => {
    const user = await api.getUserByRole(role);
    setCurrentUser(user);
    setCurrentRole(role);
    localStorage.setItem('agrishare_active_role', role);
  };

  const loginWithCredentials = async (emailOrPhone: string, role: Role) => {
    const users = await api.getUsers();
    const found = users.find(
      (u) => (u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone.includes(emailOrPhone)) && u.role === role
    ) || (await api.getUserByRole(role));

    setCurrentUser(found);
    setCurrentRole(role);
    localStorage.setItem('agrishare_active_role', role);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('agrishare_active_role');
  };

  const updateUser = (updates: Partial<User>) => {
    if (currentUser) {
      const updated = { ...currentUser, ...updates };
      setCurrentUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        loginAsRole,
        loginWithCredentials,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
