import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TrigraphModeSelect() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Trigraph Type</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/trigraph/level?type=consonant')}
      >
        <Text style={styles.buttonText}>Consonant Trigraphs</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/trigraph/level?type=vowel')}
      >
        <Text style={styles.buttonText}>Vowel Trigraphs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#E91E63', padding: 15, borderRadius: 10, marginBottom: 15 },
  buttonText: { color: '#fff', fontSize: 18 }
});
