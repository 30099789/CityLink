import { getFeedback, saveFeedback } from "../data/mockData";
export { getFeedback, saveFeedback };
export function getMyFeedback() {
  try {
    const user = JSON.parse(localStorage.getItem("citylink_user"));
    if (!user) return [];
    return getFeedback().filter((f) => f.userEmail === user.email);
  } catch { return []; }
}
