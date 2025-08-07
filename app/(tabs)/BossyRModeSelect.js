// app/(tabs)/BossyRModeSelect.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function BossyRModeSelect() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 What would you like to learn?</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4caf50' }]}
        onPress={() => router.push('/(tabs)/BossyRLevels')}
      >
        <Text style={styles.buttonText}>🟢 Bossy R with Vowels</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2196f3' }]}
        onPress={() => router.push('/(tabs)/BossyRConsonantLevels')}
      >
        <Text style={styles.buttonText}>🔵 Bossy R with Consonants</Text>
      </TouchableOpacity>
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
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    padding: 16,
    marginVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
