import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => void;
  loadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// FUTURE BACKEND: This provider will connect to Firebase Auth or a custom JWT endpoint.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        // Force refresh from users array on boot to sync state
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUser = users.find((u: User) => u.id === parsed.id);
        if (updatedUser) {
          setUser(updatedUser);
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        }
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoadingAuth(false);
  }, []);

  const refreshUser = () => {
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) return;
    
    try {
      const parsed = JSON.parse(savedUser);
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUser = users.find((u: User) => u.id === parsed.id);
      
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    } catch (e) {
      console.error("Failed to refresh user", e);
    }
  };

  const login = async (username: string, password?: string) => {
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Read from localStorage users array instead of MOCK_USERS to preserve admin edits
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => 
      (u.username.toLowerCase() === username.toLowerCase() || 
      (u.minecraftUsername && u.minecraftUsername.toLowerCase() === username.toLowerCase())) &&
      (!password || !u.password || u.password === password) // Basic password check if provided and exists
    );
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
    } else {
      throw new Error("User not found");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, refreshUser, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
