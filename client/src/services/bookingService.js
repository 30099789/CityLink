import api, { checkServer } from "./api";
import { getBookings, saveBookings } from "../data/mockData";

export async function fetchBookings(email) {
  if (await checkServer()) {
    const data = await api.getBookings(email);
    if (!email) saveBookings(data);
    return data;
  }
  const data = getBookings();
  return email ? data.filter(b => b.userEmail === email) : data;
}

export async function createBooking(data) {
  if (await checkServer()) return await api.createBooking(data);
  const items = getBookings();
  const item = { ...data, id: `bk-${Date.now()}`, bookingDate: new Date().toISOString().slice(0,10), status: "Confirmed" };
  saveBookings([...items, item]);
  return item;
}

export async function updateBooking(id, data) {
  if (await checkServer()) return await api.updateBooking(id, data);
  const items = getBookings().map(b => b.id === id ? { ...b, ...data } : b);
  saveBookings(items);
  return items.find(b => b.id === id);
}

export async function deleteBooking(id) {
  if (await checkServer()) return await api.deleteBooking(id);
  saveBookings(getBookings().filter(b => b.id !== id));
}

export { getBookings, saveBookings };
