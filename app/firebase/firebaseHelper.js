// app/firebase/firebaseHelper.js
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

/**
 * Logs user progress to Firestore under "userProgress" collection.
 * 
 * @param {string} userId - Unique user ID
 * @param {string} gameName - Name of the game/module (e.g., 'BossyRGame')
 * @param {object} progressData - Object containing progress details such as level, word, selected option, etc.
 */
export const logUserProgress = async (userId, gameName, progressData) => {
  try {
    await addDoc(collection(db, "userProgress"), {
      userId,
      game: gameName,
      ...progressData,
      timestamp: new Date(),
    });
    console.log("✅ Progress saved successfully.");
  } catch (error) {
    console.error("❌ Error saving progress:", error);
  }
};
