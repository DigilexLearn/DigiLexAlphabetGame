// app/(tabs)/BossyRLevels.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function BossyRLevels() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Choose Your Level</Text>

      {[
        { label: '🟢 AR Words', level: 'ar', color: '#9acd32' },
        { label: '🟡 ER Words', level: 'er', color: '#f0ad4e' },
        { label: '🔵 IR Words', level: 'ir', color: '#87ceeb' },
        { label: '🟣 OR Words', level: 'or', color: '#9370db' },
        { label: '🔴 UR Words', level: 'ur', color: '#d9534f' },
        { label: '⭐ Mixed (All)', level: 'mixed', color: '#20c997' },
      ].map(({ label, level, color }) => (
        <TouchableOpacity
          key={level}
          style={[styles.levelButton, { backgroundColor: color }]}
          onPress={() => router.push(`/(tabs)/BossyRLearnScreen?level=${level}`)}
        >
          <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
      ))}
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
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  levelButton: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
});
