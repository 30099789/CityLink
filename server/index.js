// ─────────────────────────────────────────────────────────────────────────────
// CityLink Smart Community Portal — Express API Server
// Run:  cd server && npm install && npm run dev
// API:  http://localhost:3001/api
// ─────────────────────────────────────────────────────────────────────────────
import express  from "express";
import cors     from "cors";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join }  from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH   = join(__dirname, "data", "db.json");

// ── DB helpers (JSON file ) ─────────────────────────────────
function readDB() {
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}
function writeDB(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// ── App setup ─────────────────────────────────────────────────────────────────
const app  = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" })); // allow Vite dev server
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api", (req, res) => {
  res.json({ message: "CityLink API is running", version: "1.0.0" });
});

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────
const ADMIN_ACCOUNTS = [
  { email: "admin@citylink.gov", password: "admin123", role: "admin", name: "Admin User" },
  { email: "staff@citylink.gov", password: "staff123", role: "staff", name: "Staff Member" },
];

// POST /api/auth/login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required." });

  // Check admin accounts first
  const admin = ADMIN_ACCOUNTS.find(a => a.email === email && a.password === password);
  if (admin) {
    return res.json({ success: true, user: { email: admin.email, name: admin.name, role: admin.role } });
  }

  // Check registered users
  const db   = readDB();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user)
    return res.status(401).json({ error: "Invalid email or password." });
  if (user.status === "Inactive")
    return res.status(403).json({ error: "Your account has been deactivated." });

  res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

// POST /api/auth/register
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Name, email, and password are required." });

  const db = readDB();
  if (db.users.find(u => u.email === email))
    return res.status(409).json({ error: "An account with this email already exists." });

  const newUser = {
    id:       `u${Date.now()}`,
    name, email, password,
    role:     "user",
    status:   "Active",
    joined:   new Date().toISOString().slice(0, 10),
  };
  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({
    success: true,
    user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// EVENTS  — GET / POST / PUT / DELETE
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/events", (req, res) => {
  res.json(readDB().events);
});

app.get("/api/events/:id", (req, res) => {
  const event = readDB().events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found." });
  res.json(event);
});

app.post("/api/events", (req, res) => {
  const db    = readDB();
  const event = { id: `evt-${Date.now()}`, ...req.body };
  db.events.push(event);
  writeDB(db);
  res.status(201).json(event);
});

app.put("/api/events/:id", (req, res) => {
  const db  = readDB();
  const idx = db.events.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Event not found." });
  db.events[idx] = { ...db.events[idx], ...req.body };
  writeDB(db);
  res.json(db.events[idx]);
});

app.delete("/api/events/:id", (req, res) => {
  const db = readDB();
  db.events = db.events.filter(e => e.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ─────────────────────────────────────────────────────────────────────────────
// ANNOUNCEMENTS  — GET / POST / PUT / DELETE
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/announcements", (req, res) => {
  const { status } = req.query;
  let items = readDB().announcements;
  if (status) items = items.filter(a => a.status === status);
  res.json(items);
});

app.get("/api/announcements/:id", (req, res) => {
  const item = readDB().announcements.find(a => a.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Announcement not found." });
  res.json(item);
});

app.post("/api/announcements", (req, res) => {
  const db   = readDB();
  const item = { id: `ann-${Date.now()}`, ...req.body };
  db.announcements.push(item);
  writeDB(db);
  res.status(201).json(item);
});

app.put("/api/announcements/:id", (req, res) => {
  const db  = readDB();
  const idx = db.announcements.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Announcement not found." });
  db.announcements[idx] = { ...db.announcements[idx], ...req.body };
  writeDB(db);
  res.json(db.announcements[idx]);
});

app.delete("/api/announcements/:id", (req, res) => {
  const db = readDB();
  db.announcements = db.announcements.filter(a => a.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ─────────────────────────────────────────────────────────────────────────────
// FEEDBACK  — GET / POST / PUT
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/feedback", (req, res) => {
  const { email } = req.query;
  let items = readDB().feedback;
  if (email) items = items.filter(f => f.userEmail === email);
  res.json(items);
});

app.post("/api/feedback", (req, res) => {
  const db   = readDB();
  const item = {
    id:            `fb-${Date.now()}`,
    status:        "New",
    submittedDate: new Date().toISOString().slice(0, 10),
    response:      "",
    ...req.body,
  };
  db.feedback.push(item);
  writeDB(db);
  res.status(201).json(item);
});

app.put("/api/feedback/:id", (req, res) => {
  const db  = readDB();
  const idx = db.feedback.findIndex(f => f.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Feedback not found." });
  db.feedback[idx] = { ...db.feedback[idx], ...req.body };
  writeDB(db);
  res.json(db.feedback[idx]);
});

// ─────────────────────────────────────────────────────────────────────────────
// BOOKINGS  — GET / POST / PUT / DELETE
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/bookings", (req, res) => {
  const { email } = req.query;
  let items = readDB().bookings;
  if (email) items = items.filter(b => b.userEmail === email);
  res.json(items);
});

app.post("/api/bookings", (req, res) => {
  const db   = readDB();
  const item = {
    id:          `bk-${Date.now()}`,
    bookingDate: new Date().toISOString().slice(0, 10),
    status:      "Confirmed",
    ...req.body,
  };
  db.bookings.push(item);
  writeDB(db);
  res.status(201).json(item);
});

app.put("/api/bookings/:id", (req, res) => {
  const db  = readDB();
  const idx = db.bookings.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Booking not found." });
  db.bookings[idx] = { ...db.bookings[idx], ...req.body };
  writeDB(db);
  res.json(db.bookings[idx]);
});

app.delete("/api/bookings/:id", (req, res) => {
  const db = readDB();
  db.bookings = db.bookings.filter(b => b.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ─────────────────────────────────────────────────────────────────────────────
// USERS  — GET / PUT / DELETE (admin only — enforced on frontend)
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/users", (req, res) => {
  const users = readDB().users.map(({ password, ...u }) => u); // never return passwords
  res.json(users);
});

app.put("/api/users/:id", (req, res) => {
  const db  = readDB();
  const idx = db.users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "User not found." });
  const { password, ...updates } = req.body; // ignore password changes via this route
  db.users[idx] = { ...db.users[idx], ...updates };
  writeDB(db);
  const { password: _p, ...safe } = db.users[idx];
  res.json(safe);
});

app.delete("/api/users/:id", (req, res) => {
  const db = readDB();
  db.users = db.users.filter(u => u.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ─────────────────────────────────────────────────────────────────────────────
// START
// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n CityLink API running at http://localhost:${PORT}/api\n`);
  console.log("   Endpoints:");
  console.log("   POST   /api/auth/login");
  console.log("   POST   /api/auth/register");
  console.log("   GET    /api/events");
  console.log("   GET    /api/announcements?status=Published");
  console.log("   GET    /api/feedback?email=user@email.com");
  console.log("   GET    /api/bookings?email=user@email.com");
  console.log("   GET    /api/users\n");
});
