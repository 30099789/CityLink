const BASE_URL = "http://localhost:3001/api";

// Reset cache on every page load so data is always fresh
let serverAvailable = null;

export async function checkServer() {
  // Always re-check — don't cache
  try {
    const res = await fetch(`${BASE_URL}`, { signal: AbortSignal.timeout(1500) });
    serverAvailable = res.ok;
  } catch {
    serverAvailable = false;
  }
  return serverAvailable;
}

async function request(method, path, body = null) {
  const opts = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

const api = {
  // AUTH
  login:    (email, password)       => request("POST", "/auth/login",    { email, password }),
  register: (name, email, password) => request("POST", "/auth/register", { name, email, password }),

  // EVENTS
  getEvents:   ()         => request("GET",    "/events"),
  getEvent:    (id)       => request("GET",    `/events/${id}`),
  createEvent: (data)     => request("POST",   "/events", data),
  updateEvent: (id, data) => request("PUT",    `/events/${id}`, data),
  deleteEvent: (id)       => request("DELETE", `/events/${id}`),

  // ANNOUNCEMENTS
  getAnnouncements:   (status)   => request("GET",    `/announcements${status ? `?status=${status}` : ""}`),
  createAnnouncement: (data)     => request("POST",   "/announcements", data),
  updateAnnouncement: (id, data) => request("PUT",    `/announcements/${id}`, data),
  deleteAnnouncement: (id)       => request("DELETE", `/announcements/${id}`),

  // FEEDBACK
  getFeedback:    (email)    => request("GET",  `/feedback${email ? `?email=${email}` : ""}`),
  createFeedback: (data)     => request("POST", "/feedback", data),
  updateFeedback: (id, data) => request("PUT",  `/feedback/${id}`, data),

  // BOOKINGS
  getBookings:    (email)    => request("GET",    `/bookings${email ? `?email=${email}` : ""}`),
  createBooking:  (data)     => request("POST",   "/bookings", data),
  updateBooking:  (id, data) => request("PUT",    `/bookings/${id}`, data),
  deleteBooking:  (id)       => request("DELETE", `/bookings/${id}`),

  // USERS
  getUsers:   ()          => request("GET",    "/users"),
  updateUser: (id, data)  => request("PUT",    `/users/${id}`, data),
  deleteUser: (id)        => request("DELETE", `/users/${id}`),
};

export default api;