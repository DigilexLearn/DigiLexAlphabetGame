import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import TrigraphData from '../data/TrigraphData';

export default function TrigraphLearn() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const currentLevel = TrigraphData.find(item => item.id === id);

  if (!currentLevel) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>Sound not found</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const speak = (txt) => Speech.speak(txt, { language: 'en-US' });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentLevel.title.toUpperCase()}</Text>
      <Text style={styles.intro}>{currentLevel.intro}</Text>

      <View style={{ marginTop: 16 }}>
        {currentLevel.words.map((w) => (
          <TouchableOpacity key={w} style={styles.wordBtn} onPress={() => speak(w)}>
            <Text style={styles.word}>{w}</Text>
            <Text style={styles.tap}>tap to hear</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({ pathname: '/trigraph/game', params: { id: currentLevel.id, userId: 'guest' } })
        }
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 40, fontWeight: '800', textAlign: 'center' },
  intro: { marginTop: 8, fontSize: 16, textAlign: 'center', opacity: 0.8 },
  wordBtn: { padding: 12, borderWidth: 1, borderRadius: 10, marginVertical: 6, alignItems: 'center' },
  word: { fontSize: 22, fontWeight: '700' },
  tap: { fontSize: 12, opacity: 0.7 },
  button: {
    marginTop: 18,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#2196F3',
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
