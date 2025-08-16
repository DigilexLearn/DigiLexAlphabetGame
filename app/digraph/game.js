import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { consonantData, vowelData } from '../data/DigraphData';
import * as Speech from 'expo-speech';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function DigraphGame() {
  const { level, type = 'consonant', userId = 'guest' } = useLocalSearchParams();
  const router = useRouter();

  const dataSource = type === 'vowel' ? vowelData : consonantData;
  const words = dataSource[level] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentWord = words[currentIndex];

  // End of game check
  useEffect(() => {
    if (currentIndex >= words.length && words.length > 0) {
      const uploadScore = async () => {
        try {
          await addDoc(collection(db, 'digraphScores'), {
            userId,
            type,
            level,
            score,
            timestamp: serverTimestamp()
          });
        } catch (e) {
          console.error('Error uploading score:', e);
        }
      };
      uploadScore();

      Alert.alert(
        '🎉 Game Over',
        `Your score: ${score}`,
        [
          { text: 'View Scores', onPress: () => router.push(`/digraph/Scores?userId=${userId}`) },
          { text: 'Back to Levels', onPress: () => router.replace('/digraph/levels') }
        ]
      );
    }
  }, [currentIndex]);

  if (!currentWord) return <Text>No words found for this level.</Text>;

  // Get all unique sounds from data
  const allSounds = Array.from(
    new Set(Object.values(dataSource).flat().map(item => item.sound))
  );

  // Get wrong options (exclude correct)
  const wrongOptions = allSounds
    .filter(sound => sound !== currentWord.sound)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2); // pick only 2 wrong sounds

  // Merge and shuffle
  const options = [currentWord.sound, ...wrongOptions].sort(() => Math.random() - 0.5);

  const handleAnswer = (selected) => {
    if (selected === currentWord.sound) {
      // Correct answer
      setScore(prev => prev + 1);
      Alert.alert('✅ Correct!', 'Good job!', [
        { text: 'Next', onPress: () => setCurrentIndex(prev => prev + 1) }
      ]);
    } else {
      // Wrong answer
      Alert.alert('❌ Wrong', 'Try again!', [{ text: 'OK' }]);
    }
  };

  const handleSpeak = () => {
    const textToSpeak = `${currentWord.word}. Sound is ${currentWord.sound}. Example: ${currentWord.example}`;
    Speech.speak(textToSpeak);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is the sound in this word?</Text>
      <Text style={styles.word}>{currentWord.word}</Text>

      <TouchableOpacity style={styles.speakBtn} onPress={handleSpeak}>
        <Text style={styles.speakText}>🔊 Hear Word</Text>
      </TouchableOpacity>

      {options.map((option, idx) => (
        <TouchableOpacity key={idx} style={styles.option} onPress={() => handleAnswer(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  title: { fontSize:22, textAlign:'center', marginBottom:20 },
  word: { fontSize:30, textAlign:'center', marginBottom:20 },
  option: { padding:15, backgroundColor:'#ddd', marginVertical:5, borderRadius:8 },
  optionText: { fontSize:18, textAlign:'center' },
  speakBtn: { backgroundColor:'#2196F3', padding:10, borderRadius:8, marginBottom:20 },
  speakText: { color:'#fff', fontSize:16, textAlign:'center' },
  scoreText: { fontSize:18, fontWeight:'700', textAlign:'center', marginTop:20 }
});
