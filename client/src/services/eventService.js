import api, { checkServer } from "./api";
import { getEvents, saveEvents } from "../data/mockData";

export async function fetchEvents() {
  if (await checkServer()) {
    const data = await api.getEvents();
    saveEvents(data);
    return data;
  }
  return getEvents();
}

export async function createEvent(data) {
  if (await checkServer()) return await api.createEvent(data);
  const events = getEvents();
  const item = { ...data, id: `evt-${Date.now()}` };
  saveEvents([...events, item]);
  return item;
}

export async function updateEvent(id, data) {
  if (await checkServer()) return await api.updateEvent(id, data);
  const events = getEvents().map(e => e.id === id ? { ...e, ...data } : e);
  saveEvents(events);
  return events.find(e => e.id === id);
}

export async function deleteEvent(id) {
  if (await checkServer()) return await api.deleteEvent(id);
  saveEvents(getEvents().filter(e => e.id !== id));
}

export { getEvents, saveEvents };
