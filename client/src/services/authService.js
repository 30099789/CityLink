export function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem("citylink_user")) || null; }
  catch { return null; }
}
