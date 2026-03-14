import api, { checkServer } from "./api";
import { getFeedback, saveFeedback } from "../data/mockData";

export async function fetchFeedback(email) {
  if (await checkServer()) {
    const data = await api.getFeedback(email);
    if (!email) saveFeedback(data);
    return data;
  }
  const data = getFeedback();
  return email ? data.filter(f => f.userEmail === email) : data;
}

export async function createFeedback(data) {
  if (await checkServer()) return await api.createFeedback(data);
  const items = getFeedback();
  const item = { ...data, id: `fb-${Date.now()}`, status: "New", submittedDate: new Date().toISOString().slice(0,10), response: "" };
  saveFeedback([...items, item]);
  return item;
}

export async function updateFeedback(id, data) {
  if (await checkServer()) return await api.updateFeedback(id, data);
  const items = getFeedback().map(f => f.id === id ? { ...f, ...data } : f);
  saveFeedback(items);
  return items.find(f => f.id === id);
}

export { getFeedback, saveFeedback };
