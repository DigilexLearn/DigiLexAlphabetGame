import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Game!</Text>

      {/* Purana button */}
      <TouchableOpacity style={styles.buttonGreen} onPress={() => router.push('/ModeSelection')}>
        <Text style={styles.buttonText}>Start Learning</Text>
      </TouchableOpacity>

      {/* Naya button */}
      <TouchableOpacity style={styles.buttonPink} onPress={() => router.push('/games/WordMatchScreen')}>
        <Text style={styles.buttonText}>Play Word Match</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', gap: 14 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 24 },
  buttonGreen: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, minWidth: 220, alignItems: 'center' },
  buttonPink: { backgroundColor: '#E8A2B4', padding: 15, borderRadius: 8, minWidth: 220, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
