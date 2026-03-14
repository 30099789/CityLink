import api, { checkServer } from "./api";
import { getUsers, saveUsers } from "../data/mockData";

export async function fetchUsers() {
  if (await checkServer()) {
    const data = await api.getUsers();
    saveUsers(data);
    return data;
  }
  return getUsers();
}

export async function updateUser(id, updates) {
  if (await checkServer()) {
    return await api.updateUser(id, updates);
  }
  const users = getUsers();
  const updated = users.map(u => u.id === id ? { ...u, ...updates } : u);
  saveUsers(updated);
  return updated.find(u => u.id === id);
}

export async function deleteUser(id) {
  if (await checkServer()) {
    return await api.deleteUser(id);
  }
  const users = getUsers().filter(u => u.id !== id);
  saveUsers(users);
}

export { getUsers, saveUsers };
