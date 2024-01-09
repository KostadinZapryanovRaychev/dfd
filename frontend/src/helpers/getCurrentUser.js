import { getUser } from "../services/userServices";

export async function getCurrentUser(id, setUser) {
  try {
    const user = await getUser(id);
    if (user) {
      setUser(user);
    }
  } catch (e) {
    console.log("Error during getting current user", e);
  }
}
