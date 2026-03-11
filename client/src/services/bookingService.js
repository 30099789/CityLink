import { getBookings, saveBookings } from "../data/mockData";
export { getBookings, saveBookings };
export function getMyBookings() {
  try {
    const user = JSON.parse(localStorage.getItem("citylink_user"));
    if (!user) return [];
    return getBookings().filter((b) => b.userEmail === user.email);
  } catch { return []; }
}
