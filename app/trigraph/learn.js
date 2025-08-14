// app/trigraph/learn.js
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import TrigraphData from '../data/TrigraphData';

export default function TrigraphLearn() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const level = useMemo(() => TrigraphData.find((x) => x.id === id), [id]);

  if (!level) {
    return (
      <View style={styles.container}>
        <Text>Sound not found.</Text>
        <TouchableOpacity onPress={() => router.back()}><Text>Back</Text></TouchableOpacity>
      </View>
    );
  }

  const speak = (txt) => Speech.speak(txt, { language: 'en-US' });

  return (
    <View style={styles.container}>
      <Text style={styles.sound}>{level.title}</Text>
      <Text style={styles.intro}>{level.intro}</Text>

      <View style={{ marginVertical: 16 }}>
        {level.words.map((w) => (
          <TouchableOpacity key={w.text} style={styles.example} onPress={() => speak(w.text)}>
            <Text style={styles.word}>{w.text}</Text>
            <Text style={styles.tap}>tap to hear</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.primary}
        onPress={() => router.push({ pathname: '/trigraph/game', params: { id: level.id } })}
      >
        <Text style={styles.primaryText}>Start Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => router.back()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, justifyContent:'center' },
  sound:{ fontSize:48, fontWeight:'800', textAlign:'center' },
  intro:{ marginTop:8, fontSize:16, textAlign:'center' },
  example:{ padding:12, borderWidth:1, borderRadius:10, marginVertical:6, alignItems:'center' },
  word:{ fontSize:22, fontWeight:'700' },
  tap:{ fontSize:12, opacity:0.7 },
  primary:{ marginTop:18, padding:14, borderRadius:12, borderWidth:1, alignItems:'center' },
  primaryText:{ fontSize:18, fontWeight:'700' },
  link:{ alignSelf:'center', marginTop:10 }
});
