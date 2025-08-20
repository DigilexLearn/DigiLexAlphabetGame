// firebaseHelper.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const logUserProgress = async (userId, level, data) => {
  try {
    await addDoc(collection(db, "userProgress"), {
      userId,
      level,
      ...data,
      timestamp: serverTimestamp(),
    });
    console.log("Progress logged:", data);
  } catch (error) {
    console.error("Error logging progress:", error);
  }
};
