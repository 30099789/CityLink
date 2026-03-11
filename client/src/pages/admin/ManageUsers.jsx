import { useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, saveUsers } from "../../data/mockData";

const ROLE_COLORS  = { admin: "bg-blue-50 text-blue-700 border-blue-100", staff: "bg-emerald-50 text-emerald-700 border-emerald-100", user: "bg-slate-100 text-slate-600 border-slate-200" };
const STATUS_COLORS = { Active: "bg-green-50 text-green-700 border-green-100", Inactive: "bg-red-50 text-red-700 border-red-100" };

export default function ManageUsers() {
  const [users, setUsers]   = useState(getUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  function toggleStatus(id) {
    const updated = users.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u);
    saveUsers(updated);
    setUsers(updated);
  }

  function changeRole(id, role) {
    const updated = users.map((u) => u.id === id ? { ...u, role } : u);
    saveUsers(updated);
    setUsers(updated);
  }

  function removeUser(id) {
    if (!window.confirm("Remove this user?")) return;
    const updated = users.filter((u) => u.id !== id);
    saveUsers(updated);
    setUsers(updated);
  }

  const roles = ["All", "admin", "staff", "user"];
  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = filter === "All" || u.role === filter;
    return matchSearch && matchRole;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav title="Manage Users" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Users</h1>
            <p className="text-sm text-slate-500">{users.length} registered accounts</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="text" placeholder="Search name or email…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20" />
          <div className="flex gap-2">
            {roles.map((r) => (
              <button key={r} onClick={() => setFilter(r)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${filter === r ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {["admin","staff","user"].map((role) => (
            <div key={role} className="bg-white rounded-xl border border-slate-200 px-4 py-3 text-center shadow-sm">
              <div className="text-xl font-bold text-slate-900">{users.filter((u) => u.role === role).length}</div>
              <div className="text-xs text-slate-500 capitalize">{role}s</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <div className="overflow-x-auto"><table className="w-full text-sm min-w-max">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Joined</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr><td colSpan="6" className="text-center py-10 text-slate-400 text-sm">No users found.</td></tr>
              )}
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 hidden sm:table-cell">{u.email}</td>
                  <td className="px-4 py-3.5">
                    <select value={u.role} onChange={(e) => changeRole(u.id, e.target.value)}
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold cursor-pointer focus:outline-none ${ROLE_COLORS[u.role] || ""}`}>
                      <option value="user">user</option>
                      <option value="staff">staff</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[u.status] || ""}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell">{u.joined}</td>
                  <td className="px-4 py-3.5 text-right space-x-2">
                    <button onClick={() => toggleStatus(u.id)} className={`text-xs font-semibold hover:underline ${u.status === "Active" ? "text-orange-500" : "text-green-600"}`}>
                      {u.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => removeUser(u.id)} className="text-xs font-semibold text-red-500 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      </div>
    </div>
  );
}

function AdminNav({ title }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="text-sm text-slate-500 hover:text-slate-900 transition">← Dashboard</Link>
          <span className="text-slate-300">|</span>
          <span className="text-sm font-semibold text-slate-900">{title}</span>
        </div>
        <Link to="/" className="text-xs text-slate-400 hover:text-blue-600 transition">Public site →</Link>
      </div>
    </header>
  );
}
