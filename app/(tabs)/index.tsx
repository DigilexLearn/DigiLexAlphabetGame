import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Game!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/ModeSelection')}   // ✅ ModeSelection screen par jaayega
      >
        <Text style={styles.buttonText}>Start Learning </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 40 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 18 }
});
