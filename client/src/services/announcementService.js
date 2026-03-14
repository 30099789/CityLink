import api, { checkServer } from "./api";
import { getAnnouncements, saveAnnouncements } from "../data/mockData";

export async function fetchAnnouncements(status) {
  if (await checkServer()) {
    const data = await api.getAnnouncements(status);
    if (!status) saveAnnouncements(data);
    return data;
  }
  const data = getAnnouncements();
  return status ? data.filter(a => a.status === status) : data;
}

export async function createAnnouncement(data) {
  if (await checkServer()) return await api.createAnnouncement(data);
  const items = getAnnouncements();
  const item = { ...data, id: `ann-${Date.now()}` };
  saveAnnouncements([...items, item]);
  return item;
}

export async function updateAnnouncement(id, data) {
  if (await checkServer()) return await api.updateAnnouncement(id, data);
  const items = getAnnouncements().map(a => a.id === id ? { ...a, ...data } : a);
  saveAnnouncements(items);
  return items.find(a => a.id === id);
}

export async function deleteAnnouncement(id) {
  if (await checkServer()) return await api.deleteAnnouncement(id);
  saveAnnouncements(getAnnouncements().filter(a => a.id !== id));
}

export { getAnnouncements, saveAnnouncements };

// ── Legacy exports for backwards compatibility ────────────────────────────────

export const getServices       = () => getAnnouncements();
export const getServiceById    = (id) => getAnnouncements().find(a => a.id === id) || null;
export const getAnnouncementById = (id) => getAnnouncements().find(a => a.id === id) || null;