import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import api, { checkServer } from "../services/api";

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

  async function login(email, password) {
    // Always allow hardcoded admin/staff accounts first (no server needed)
    const admin = ADMIN_CREDENTIALS.find(c => c.email === email && c.password === password);
    if (admin) {
      const u = { email: admin.email, role: admin.role, name: admin.name };
      localStorage.setItem("citylink_user", JSON.stringify(u));
      setUser(u);
      return { success: true, role: admin.role };
    }

    // Try API server
    const online = await checkServer();
    if (online) {
      try {
        const data = await api.login(email, password);
        localStorage.setItem("citylink_user", JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, role: data.user.role };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    // Fallback: localStorage
    try {
      const users = JSON.parse(localStorage.getItem("citylink_users")) || [];
      const found = users.find(u => u.email === email && u.password === password);
      if (found) {
        const u = { email: found.email, role: found.role || "user", name: found.name };
        localStorage.setItem("citylink_user", JSON.stringify(u));
        setUser(u);
        return { success: true, role: u.role };
      }
    } catch {}
    return { success: false, error: "Invalid email or password." };
  }

  async function register(name, email, password) {
    const online = await checkServer();
    if (online) {
      try {
        const data = await api.register(name, email, password);
        localStorage.setItem("citylink_user", JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    // Fallback: localStorage
    try {
      const users = JSON.parse(localStorage.getItem("citylink_users")) || [];
      if (users.find(u => u.email === email))
        return { success: false, error: "An account with this email already exists." };
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

export function useAuth() { return useContext(AuthContext); }

// Any admin or staff
export function RequireAdmin({ children }) {
  const { user } = useAuth();
  if (!user || (user.role !== "admin" && user.role !== "staff"))
    return <AccessDenied message="You must be signed in as an admin or staff member." />;
  return children;
}

// Full admins only
export function RequireAdminOnly({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin")
    return <AccessDenied message="This area is restricted to administrators only." sub="Staff members do not have permission to access this section." />;
  return children;
}

function AccessDenied({ message, sub }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center p-8 max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.982l-6.97-12.077A2 2 0 0010.03 3.03L3.06 15.018A2 2 0 005.07 19z"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-500 text-sm mb-1">{message}</p>
        {sub && <p className="text-slate-400 text-xs mb-6">{sub}</p>}
        <div className="flex gap-3 justify-center mt-6">
          <Link to="/admin" className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition">← Dashboard</Link>
          <Link to="/login" className="px-4 py-2 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition">Switch Account</Link>
        </div>
      </div>
    </div>
  );
}