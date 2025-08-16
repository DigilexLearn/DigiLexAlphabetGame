// hooks/useProgressTracker.js
import { useCallback, useRef } from 'react';
import { logEvent, upsertProgress } from '../app/firebase/firebaseConfig';
import { useState } from 'react';
// replace with your auth if you have it
const getUserId = () => 'anonymous'; 


// export function useProgressTracker() {
//   const [progress, setProgress] = useState(0);
//   const increment = () => setProgress(prev => prev+1);
//   return { progress, increment };
// }



export function useProgressTracker(moduleName) {
  const userIdRef = useRef(getUserId());
  

  const recordWordResult = useCallback(async (levelId, word, correct) => {
    const userId = userIdRef.current;
    await logEvent(userId, moduleName, { levelId, word, correct });
  }, [moduleName]);

  const markLevelComplete = useCallback(async (levelId, stats) => {
    const userId = userIdRef.current;
    await upsertProgress(userId, moduleName, levelId, {
      ...stats, // e.g., { correct:3, total:3 }
      completed: true,
    });
  }, [moduleName]);

  return { recordWordResult, markLevelComplete };


  


}
