import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import TrigraphData from '../data/TrigraphData';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function shuffle(a){ return [...a].sort(() => Math.random() - 0.5); }

export default function TrigraphGame() {
  const { id, userId = 'guest' } = useLocalSearchParams();
  const router = useRouter();

  const level = useMemo(() => TrigraphData.find(x => x.id === id), [id]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (level?.words[idx]) {
      const textToSpeak = `${level.words[idx]}. Which trigraph sound does it have?`;
      Speech.speak(textToSpeak, { language:'en-US' });
    }
  }, [level, idx]);

  if (!level) {
    return <View style={styles.container}><Text>Sound not found.</Text></View>;
  }

  const currentWord = level.words[idx];
  const allSameTypeSounds = TrigraphData.filter(x => x.type === level.type).map(x => x.title);
  const distractors = shuffle(allSameTypeSounds.filter(s => s !== level.title)).slice(0, 2);
  const options = shuffle([level.title, ...distractors]);

  const handleAnswer = async (choice) => {
    if (choice === level.title) {
      setScore(s => s + 1);
      Alert.alert('✅ Correct!', 'Great job!', [
        { text: 'Next', onPress: () => setIdx(i => i + 1) }
      ]);
    } else {
      Alert.alert('❌ Wrong', 'Try again!');
    }
  };

  // End of game
  useEffect(() => {
    if (!level) return;
    if (idx >= level.words.length && level.words.length > 0) {
      (async () => {
        try {
          await addDoc(collection(db, 'trigraphScores'), {
            userId,
            type: level.title,        // sound e.g. 'sch'
            level: level.levelName || level.type, // optional label
            score,
            timestamp: serverTimestamp(),
          });
        } catch (e) {
          console.error('Error uploading score:', e);
        }
      })();

      Alert.alert(
        '🎉 Game Over',
        `Your score: ${score}/${level.words.length}`,
        [
          { text: 'View Scores', onPress: () => router.push(`/trigraph/Scores?userId=${userId}`) },
          { text: 'Back to Levels', onPress: () => router.replace(`/trigraph/levels?type=${level.type}`) }
        ]
      );
    }
  }, [idx]);

  if (idx >= level.words.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick the trigraph sound:</Text>
      <Text style={styles.word}>{currentWord}</Text>

      <TouchableOpacity style={styles.speakBtn} onPress={() => Speech.speak(currentWord, { language:'en-US' })}>
        <Text style={styles.speakText}>🔊 Hear Word</Text>
      </TouchableOpacity>

      {options.map((opt, i) => (
        <TouchableOpacity key={i} style={styles.option} onPress={() => handleAnswer(opt)}>
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, justifyContent:'center' },
  title:{ fontSize:22, textAlign:'center', marginBottom:20 },
  word:{ fontSize:30, textAlign:'center', marginBottom:20, fontWeight:'800' },
  option:{ padding:15, backgroundColor:'#ddd', marginVertical:5, borderRadius:8 },
  optionText:{ fontSize:18, textAlign:'center' },
  speakBtn:{ backgroundColor:'#2196F3', padding:10, borderRadius:8, marginBottom:20 },
  speakText:{ color:'#fff', fontSize:16, textAlign:'center' },
  scoreText:{ fontSize:18, fontWeight:'700', textAlign:'center', marginTop:20 }
});
