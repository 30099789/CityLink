import { getEvents, saveEvents } from "../data/mockData";

export { getEvents, saveEvents };

export function getEventById(id) {
  return getEvents().find((e) => e.id === id) || null;
}
