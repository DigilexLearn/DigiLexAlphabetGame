import { useState } from 'react';


export const useStreakSystem = () => {
  const [streak, setStreak] = useState(0);

  const updateStreak = () => {
    setStreak((prev) => prev + 1);
  };

  const resetStreak = () => {
    setStreak(0);
  };

  return { streak, updateStreak, resetStreak };
};

