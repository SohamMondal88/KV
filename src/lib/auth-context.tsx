"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type UserRole = "traveler" | "admin" | "homestay_owner" | "guide" | "taxi_owner";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  address?: string;
  city?: string;
  state?: string;
  bio?: string;
  // Provider-specific
  businessName?: string;
  businessAddress?: string;
  verificationStatus?: "pending" | "verified" | "rejected";
  documents?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: { name: string; email: string; password: string; phone?: string; role?: UserRole }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAdmin: boolean;
  isProvider: boolean;
  allUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ADMINS = [
  { id: "admin-1", name: "KuboVista Admin", email: "admin@kubovista.travel", password: "admin123", role: "admin" as UserRole, createdAt: "2024-01-01T00:00:00Z" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Load user and users list on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("kv-user");
    const savedUsers = localStorage.getItem("kv-users");
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch { /* ignore */ }
    }
    if (savedUsers) {
      try { setAllUsers(JSON.parse(savedUsers)); } catch { /* ignore */ }
    } else {
      // Seed with default admins
      const seeded = DEFAULT_ADMINS.map(({ password, ...u }) => u);
      localStorage.setItem("kv-users", JSON.stringify(seeded));
      setAllUsers(seeded);
    }
    setIsLoading(false);
  }, []);

  // Persist user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("kv-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("kv-user");
    }
  }, [user]);

  const getPasswords = (): Record<string, string> => {
    const saved = localStorage.getItem("kv-passwords");
    const parsed = saved ? JSON.parse(saved) : {};
    // Seed admin passwords
    DEFAULT_ADMINS.forEach((a) => {
      if (!parsed[a.email]) parsed[a.email] = a.password;
    });
    return parsed;
  };

  const savePassword = (email: string, password: string) => {
    const passwords = getPasswords();
    passwords[email] = password;
    localStorage.setItem("kv-passwords", JSON.stringify(passwords));
  };

  const login = useCallback(async (email: string, password: string) => {
    const passwords = getPasswords();
    if (passwords[email] !== password) {
      return { success: false, message: "Invalid email or password" };
    }
    const savedUsers = localStorage.getItem("kv-users");
    const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
    const found = users.find((u) => u.email === email);
    if (!found) {
      return { success: false, message: "User not found" };
    }
    setUser(found);
    return { success: true };
  }, []);

  const register = useCallback(async (data: { name: string; email: string; password: string; phone?: string; role?: UserRole }) => {
    const passwords = getPasswords();
    if (passwords[data.email]) {
      return { success: false, message: "Email already registered" };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role || "traveler",
      createdAt: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0B5D3B&color=fff`,
    };

    const savedUsers = localStorage.getItem("kv-users");
    const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
    users.push(newUser);
    localStorage.setItem("kv-users", JSON.stringify(users));
    setAllUsers(users);
    savePassword(data.email, data.password);
    setUser(newUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("kv-user");
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      // Also update in allUsers
      const savedUsers = localStorage.getItem("kv-users");
      const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
      const idx = users.findIndex((u) => u.id === updated.id);
      if (idx >= 0) {
        users[idx] = updated;
        localStorage.setItem("kv-users", JSON.stringify(users));
        setAllUsers(users);
      }
      return updated;
    });
  }, []);

  const isAdmin = user?.role === "admin";
  const isProvider = ["homestay_owner", "guide", "taxi_owner"].includes(user?.role || "");

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile, isAdmin, isProvider, allUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function requireAuth(Component: React.ComponentType) {
  return function AuthGuard(props: any) {
    const { user, isLoading } = useAuth();
    const router = useAuth();
    // This is a simplified guard - in real Next.js app you'd redirect in useEffect
    // Handled per-page instead
    return <Component {...props} />;
  };
}
