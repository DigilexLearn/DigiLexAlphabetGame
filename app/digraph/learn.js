import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { consonantData, vowelData } from '../data/DigraphData';
import * as Speech from 'expo-speech';

export default function DigraphLearn() {
  const router = useRouter();
  const { word: wordParam, type = 'consonant' } = useLocalSearchParams();
  const [wordItem, setWordItem] = useState(null);

  useEffect(() => {
    const allData = type === 'vowel' ? vowelData : consonantData;
    let found = null;
    for (const level in allData) {
      found = allData[level].find((w) => w.word === wordParam);
      if (found) break;
    }
    setWordItem(found || null);
  }, [wordParam, type]);

  if (!wordItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Word not found!</Text>
      </View>
    );
  }

  const handleSpeak = () => {
    const textToSpeak = `${wordItem.word}. Sound is ${wordItem.sound}. Example: ${wordItem.example}`;
    Speech.speak(textToSpeak);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{wordItem.word}</Text>
      <Image source={wordItem.image} style={styles.image} />
      <Text style={styles.example}>{wordItem.example}</Text>

      <TouchableOpacity style={styles.speakBtn} onPress={handleSpeak}>
        <Text style={styles.speakText}>🔊 Hear Word</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:28, fontWeight:'700', marginBottom:20 },
  image: { width:120, height:120, borderRadius:12, marginBottom:20 },
  example: { fontSize:18, opacity:0.8, textAlign:'center', marginBottom:20 },
  speakBtn: { backgroundColor:'#2196F3', padding:10, borderRadius:8, marginBottom:20 },
  speakText: { color:'#fff', fontSize:16 },
  backBtn: { padding:10 },
  backText: { fontSize:16, color:'#2196F3' },
  errorText: { fontSize:20, color:'red', textAlign:'center' },
});
