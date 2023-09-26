import { db } from "./confing";

const user_collection = db.collection("users");

export async function getUserTokens(userId: string) {
  try {
    const userTokens = await user_collection.doc(userId).get();
    return userTokens.data()?.tokens;
  } catch (error) {
    throw error;
  }
}
export async function updateUserTokens(userId: string, tokens: number) {
  try {
    const user = user_collection.doc(userId);
    await user.update({
      tokens: tokens,
    });
  } catch (error) {
    throw error;
  }
}
