import { createContext, useContext, useState, useEffect } from "react";
import { getUsers } from "../services/userApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const users = await getUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password 
    );
    if (foundUser ) {
      const userData = { email: foundUser.email, name: foundUser.name, role: foundUser.role };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
