import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { api } from '../services/api';

export interface RegisterUserData {
  name: string;
  email: string;
  phone: string;
  role: Role;
  village: string;
  district: string;
  state?: string;
  aadhaarMasked?: string;
  panMasked?: string;
  dlNumber?: string;
}

interface AuthContextType {
  currentUser: User | null;
  currentRole: Role;
  loginAsRole: (role: Role) => Promise<void>;
  loginWithCredentials: (
    emailOrPhone: string,
    role: Role
  ) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterUserData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<Role>('FARMER');

  useEffect(() => {
    // Load active demo user on initial load
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

  const loginWithCredentials = async (
    emailOrPhone: string,
    role: Role
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmed = emailOrPhone.trim();
    if (!trimmed) {
      return { success: false, error: 'Please enter your registered email or 10-digit mobile number.' };
    }

    const users = await api.getUsers();
    const cleanSearchPhone = trimmed.replace(/\D/g, '');

    const found = users.find((u) => {
      // Role must match
      if (u.role !== role) return false;

      // Email match (case-insensitive)
      const emailMatch = u.email && u.email.toLowerCase() === trimmed.toLowerCase();

      // Mobile match (last 10 digits comparison)
      const cleanUserPhone = (u.phone || '').replace(/\D/g, '');
      const phoneMatch =
        cleanSearchPhone.length >= 10 && cleanUserPhone.endsWith(cleanSearchPhone.slice(-10));

      return emailMatch || phoneMatch;
    });

    if (!found) {
      const isPhone = /^\+?\d[\d\s\-()]+$/.test(trimmed);
      const identifierType = isPhone ? 'mobile number' : 'email address';
      return {
        success: false,
        error: `No registered account found with this ${identifierType} for the ${role} role. Please check credentials or register.`,
      };
    }

    setCurrentUser(found);
    setCurrentRole(role);
    localStorage.setItem('agrishare_active_role', role);
    return { success: true };
  };

  const register = async (
    userData: RegisterUserData
  ): Promise<{ success: boolean; error?: string }> => {
    const users = await api.getUsers();
    const cleanNewPhone = userData.phone.replace(/\D/g, '').slice(-10);
    const cleanEmail = userData.email.trim().toLowerCase();

    // Check if duplicate user exists
    const duplicate = users.find(
      (u) =>
        (u.email && u.email.toLowerCase() === cleanEmail) ||
        (u.phone && u.phone.replace(/\D/g, '').endsWith(cleanNewPhone))
    );

    if (duplicate) {
      if (duplicate.email && duplicate.email.toLowerCase() === cleanEmail) {
        return {
          success: false,
          error: `An account with email "${cleanEmail}" is already registered. Please login.`,
        };
      }
      return {
        success: false,
        error: `An account with mobile number "${userData.phone}" is already registered. Please login.`,
      };
    }

    const newUser = await api.registerUser(userData);
    setCurrentUser(newUser);
    setCurrentRole(newUser.role);
    localStorage.setItem('agrishare_active_role', newUser.role);
    return { success: true };
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
        register,
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
