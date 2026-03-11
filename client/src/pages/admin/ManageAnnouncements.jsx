import { useState } from "react";
import { Link } from "react-router-dom";
import { getAnnouncements, saveAnnouncements } from "../../data/mockData";

const PRIORITY_COLORS = {
  Alert:  "bg-red-50 text-red-700 border-red-100",
  Update: "bg-blue-50 text-blue-700 border-blue-100",
  Notice: "bg-slate-100 text-slate-600 border-slate-200",
};
const STATUS_COLORS = {
  Published: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Draft:     "bg-slate-100 text-slate-600 border-slate-200",
  Scheduled: "bg-orange-50 text-orange-700 border-orange-100",
};
const BLANK = { title: "", summary: "", priority: "Notice", status: "Draft", date: "", category: "", audience: "All" };

export default function ManageAnnouncements() {
  const [items, setItems]       = useState(getAnnouncements);
  const [form, setForm]         = useState(BLANK);
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("All");

  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function openNew()   { setForm(BLANK); setEditing(null); setShowForm(true); }
  function openEdit(a) { setForm({ ...a }); setEditing(a.id); setShowForm(true); }
  function cancel()    { setShowForm(false); setEditing(null); }

  function save(e) {
    e.preventDefault();
    if (!form.title || !form.summary) { alert("Title and summary are required."); return; }
    let updated;
    if (editing) {
      updated = items.map((a) => a.id === editing ? { ...a, ...form } : a);
    } else {
      updated = [...items, { ...form, id: `ann-${Date.now()}` }];
    }
    saveAnnouncements(updated);
    setItems(updated);
    setShowForm(false);
  }

  function remove(id) {
    if (!window.confirm("Delete this announcement?")) return;
    const updated = items.filter((a) => a.id !== id);
    saveAnnouncements(updated);
    setItems(updated);
  }

  function publish(id) {
    const updated = items.map((a) => a.id === id ? { ...a, status: "Published" } : a);
    saveAnnouncements(updated);
    setItems(updated);
  }

  const statuses = ["All", "Published", "Draft", "Scheduled"];
  const filtered = items.filter((a) => {
    const matchFilter = filter === "All" || a.status === filter;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav title="Manage Announcements" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
            <p className="text-sm text-slate-500">{items.length} total announcements</p>
          </div>
          <button onClick={openNew} className="px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition">
            + New Announcement
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input type="text" placeholder="Search announcements…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20" />
          <div className="flex gap-2">
            {statuses.map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${filter === s ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
            <h2 className="text-base font-semibold text-slate-900 mb-5">{editing ? "Edit Announcement" : "New Announcement"}</h2>
            <form onSubmit={save} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Title *</label>
                <input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Announcement title"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Summary *</label>
                <textarea value={form.summary} onChange={(e) => update("summary", e.target.value)} rows={2} placeholder="Brief summary shown in listing…"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/20" />
              </div>
              <SelectField label="Priority"  value={form.priority} onChange={(v) => update("priority", v)} options={["Notice","Update","Alert"]} />
              <SelectField label="Status"    value={form.status}   onChange={(v) => update("status",   v)} options={["Draft","Scheduled","Published"]} />
              <SelectField label="Audience"  value={form.audience} onChange={(v) => update("audience", v)} options={["All","Residents","Staff"]} />
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
                <input value={form.category} onChange={(e) => update("category", e.target.value)} placeholder="Waste, Roads, Events…"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date</label>
                <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20" />
              </div>
              <div className="sm:col-span-2 flex gap-3 justify-end pt-2">
                <button type="button" onClick={cancel} className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">Cancel</button>
                <button type="submit" className="px-5 py-2 text-sm font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-700 transition">{editing ? "Save" : "Create"}</button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <div className="overflow-x-auto"><table className="w-full text-sm min-w-max">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Priority</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr><td colSpan="5" className="text-center py-10 text-slate-400 text-sm">No announcements found.</td></tr>
              )}
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-slate-800">{a.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 hidden sm:block">{a.summary}</div>
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_COLORS[a.priority] || ""}`}>{a.priority}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[a.status] || ""}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell">{a.date}</td>
                  <td className="px-4 py-3.5 text-right space-x-2">
                    {a.status !== "Published" && (
                      <button onClick={() => publish(a.id)} className="text-xs font-semibold text-emerald-600 hover:underline">Publish</button>
                    )}
                    <button onClick={() => openEdit(a)} className="text-xs font-semibold text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => remove(a.id)} className="text-xs font-semibold text-red-500 hover:underline">Delete</button>
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

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
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
