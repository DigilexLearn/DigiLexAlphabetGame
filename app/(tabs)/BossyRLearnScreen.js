import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';

const exampleWords = {
  ar: ['car', 'star', 'shark'],
  er: ['her', 'term', 'fern'],
  ir: ['bird', 'shirt', 'girl'],
  or: ['fork', 'storm', 'horse'],
  ur: ['fur', 'burn', 'turn'],

  br: ['broom', 'brick', 'bread'],
  cr: ['crab', 'crack', 'crow'],
  dr: ['drum', 'drink', 'drop'],
  fr: ['frog', 'fruit', 'frame'],
  gr: ['grape', 'green', 'grin'],
  pr: ['prize', 'print', 'proud'],
  tr: ['tree', 'train', 'track'],

  mixed: ['car', 'storm', 'bird', 'fruit', 'train', 'turn'],
};

export default function BossyRLearnScreen() {
 const { level } = useLocalSearchParams();
const levelText = level ? level.toUpperCase() : '...';

  const router = useRouter();

  const key = level?.toLowerCase();
  const words = exampleWords[key] || [];
<Text style={styles.header}>📚 Let's Learn the "{levelText}" Sound!</Text>

  const speakText = `Let's learn the ${level?.toUpperCase()} sound!`;
  React.useEffect(() => {
    if (level) {
      Speech.speak(speakText);
    }
  }, [level]);

  const handleSpeak = (word) => {
    Speech.speak(word);
  };

  const handleStart = () => {
    router.push({ pathname: '/(tabs)/BossyRGame', params: { level } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Let's Learn the "{level?.toUpperCase()}" Sound!</Text>
      {words.map((word, index) => (
        <TouchableOpacity key={index} onPress={() => handleSpeak(word)} style={styles.wordBtn}>
          <Text style={styles.word}>🔊 {word}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={handleStart} style={styles.startBtn}>
        <Text style={styles.startText}>🚀 Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  wordBtn: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  word: {
    fontSize: 20,
    textAlign: 'center',
  },
  startBtn: {
    marginTop: 30,
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
  },
  startText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
