// app/(tabs)/BossyRConsonantLevels.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function BossyRConsonantLevels() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Bossy R with Consonants</Text>

      {[ 
        { label: 'BR Words', level: 'br' },
        { label: 'CR Words', level: 'cr' },
        { label: 'DR Words', level: 'dr' },
        { label: 'FR Words', level: 'fr' },
        { label: 'GR Words', level: 'gr' },
        { label: 'PR Words', level: 'pr' },
        { label: 'TR Words', level: 'tr' },
        { label: 'Mixed', level: 'consonant-mixed' },
      ].map(({ label, level }) => (
        <TouchableOpacity
          key={level}
          style={styles.levelButton}
          onPress={() => router.push(`/(tabs)/BossyRLearnScreen?level=${level}`)}
        >
          <Text style={styles.buttonText}>🔡 {label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    backgroundColor: '#607d8b',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
