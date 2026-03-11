import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const ADMIN_CREDENTIALS = [
  { email: "admin@citylink.gov", password: "admin123", role: "admin", name: "Admin User" },
  { email: "staff@citylink.gov", password: "staff123", role: "staff", name: "Staff Member" },
];

function getStoredUser() {
  try {
    const u = JSON.parse(localStorage.getItem("citylink_user"));
    return u && typeof u === "object" ? u : null;
  } catch { return null; }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  function login(email, password) {
    const match = ADMIN_CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    );
    if (match) {
      const u = { email: match.email, role: match.role, name: match.name };
      localStorage.setItem("citylink_user", JSON.stringify(u));
      setUser(u);
      return { success: true, role: match.role };
    }
    try {
      const users = JSON.parse(localStorage.getItem("citylink_users")) || [];
      const found = users.find((u) => u.email === email && u.password === password);
      if (found) {
        const u = { email: found.email, role: found.role || "user", name: found.name };
        localStorage.setItem("citylink_user", JSON.stringify(u));
        setUser(u);
        return { success: true, role: u.role };
      }
    } catch {}
    return { success: false, error: "Invalid email or password." };
  }

  function register(name, email, password) {
    try {
      const users = JSON.parse(localStorage.getItem("citylink_users")) || [];
      if (users.find((u) => u.email === email)) {
        return { success: false, error: "An account with this email already exists." };
      }
      const newUser = {
        id: `u${Date.now()}`, name, email, password,
        role: "user", status: "Active",
        joined: new Date().toISOString().slice(0, 10),
      };
      users.push(newUser);
      localStorage.setItem("citylink_users", JSON.stringify(users));
      const u = { email: newUser.email, role: newUser.role, name: newUser.name };
      localStorage.setItem("citylink_user", JSON.stringify(u));
      setUser(u);
      return { success: true };
    } catch {
      return { success: false, error: "Registration failed. Please try again." };
    }
  }

  function logout() {
    localStorage.removeItem("citylink_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAdmin({ children }) {
  const { user } = useAuth();
  if (!user || (user.role !== "admin" && user.role !== "staff")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-500 mb-6">You must be signed in as an admin to view this page.</p>
          <a href="/login" className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition">
            Go to Login
          </a>
        </div>
      </div>
    );
  }
  return children;
}
