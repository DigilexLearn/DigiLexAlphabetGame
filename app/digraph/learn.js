import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { consonantData, vowelData } from '../data/DigraphData';

export default function DigraphLearn() {
  const { word, type = 'consonant' } = useLocalSearchParams();
  const router = useRouter();

  const data = type === 'vowel' ? vowelData : consonantData;

  // Find word from data
  let wordItem = null;
  for (const level in data) {
    const found = data[level].find((item) => item.word === word);
    if (found) {
      wordItem = found;
      break;
    }
  }

  if (!wordItem) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, color: 'red' }}>Word not found!</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const speak = (text) => {
    Speech.speak(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{wordItem.word}</Text>
      <Image source={wordItem.image} style={styles.image} />
      <Text style={styles.example}>{wordItem.example}</Text>

      <TouchableOpacity style={styles.button} onPress={() => speak(wordItem.word)}>
        <Text style={styles.buttonText}>🔊 Hear Word</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
  <Text style={styles.buttonText}>Back</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 150, height: 150, marginBottom: 20 },
  example: { fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
  backBtn: { padding: 10, marginTop: 8 },
  backText: { fontSize: 16, color: '#2196F3' },
});
