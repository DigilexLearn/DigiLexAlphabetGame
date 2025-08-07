import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BossyRData from '../data/BossyRData';
import { useStreakSystem } from './useStreakSystem';
import * as Speech from 'expo-speech';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { logUserProgress } from '../firebase/firebaseHelper';

const BossyRGame = () => {
  const { level, userId = 'defaultUser' } = useLocalSearchParams();
  const router = useRouter();

  // Clean level input (remove whitespace and force lowercase)
  const cleanedLevel = level?.toString().trim().toLowerCase();

  // Load words for current level
  const words = BossyRData[cleanedLevel] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const { streak, updateStreak, resetStreak } = useStreakSystem();

  const demoUserId = 'demoUser123';

  useEffect(() => {
    // Debug logs
    console.log('Level:', cleanedLevel);
    console.log('Words:', words);
    console.log('Current Index:', currentIndex);

    if (words.length > 0 && words[currentIndex]) {
      const correctWord = words[currentIndex];
      const incorrectWords = words.filter((_, index) => index !== currentIndex);
      const shuffled = [correctWord, ...incorrectWords.slice(0, 2)].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
      setSelectedOption(null);
      setIsCorrect(null);
      Speech.speak(correctWord);
    }
  }, [currentIndex, words]);

  const handleOptionSelect = async (option) => {
    if (!selectedOption) {
      const correctWord = words[currentIndex];
      const isCorrectAnswer = option === correctWord;
      setSelectedOption(option);
      setIsCorrect(isCorrectAnswer);

      await logUserProgress(demoUserId, cleanedLevel, {
        word: correctWord,
        selected: option,
        correct: isCorrectAnswer,
        streak: isCorrectAnswer ? streak + 1 : 0,
      });

      if (isCorrectAnswer) {
        updateStreak();
        setTimeout(() => {
          if (currentIndex + 1 < words.length) {
            setCurrentIndex(currentIndex + 1);
          } else {
            router.push('/BossyRLevels'); // Go to level selection
          }
        }, 1000);
      } else {
        resetStreak();
        setShowTryAgain(true);
        setTimeout(() => {
          setShowTryAgain(false);
          setSelectedOption(null);
          setIsCorrect(null);
          setCurrentIndex(0); // restart from beginning
        }, 1000);
      }
    }
  };

  const correctWord = words[currentIndex];
  const capitalWord = correctWord ? correctWord.toUpperCase() : '';
  const levelLabel = cleanedLevel ? cleanedLevel.toUpperCase() : 'LEVEL';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎯 Pick the Correct "{levelLabel}" Word!</Text>
      <Text style={styles.word}>{capitalWord}</Text>

      <View style={styles.optionsContainer}>
        {shuffledOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && (isCorrect ? styles.correct : styles.incorrect),
            ]}
            onPress={() => handleOptionSelect(option)}
          >
            <Text style={styles.optionText}>{option.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {showTryAgain && <Text style={styles.tryAgainText}>❌ Try Again!</Text>}

      <Text style={styles.streakText}>🔥 Score: {streak}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F6F7FB',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#5D3FD3',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
  },
  optionText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  correct: {
    backgroundColor: '#A5D6A7',
  },
  incorrect: {
    backgroundColor: '#EF9A9A',
  },
  tryAgainText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 20,
  },
  streakText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default BossyRGame;
