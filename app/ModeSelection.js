// app/ModeSelection.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ModeSelection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Game</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/BossyRModeSelect')}
      >
        <Text style={styles.buttonText}>Bossy R Game</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/digraph/ModeSelect')}
      >
        <Text style={styles.buttonText}>Digraph Game</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/trigraph/ModeSelect')}
      >
        <Text style={styles.buttonText}>Trigraph Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  title:{ fontSize:26, fontWeight:'bold', marginBottom:30 },
  button:{ backgroundColor:'#28A745', padding:15, marginBottom:15, borderRadius:10, width:250 },
  buttonText:{ color:'#fff', fontSize:18, textAlign:'center' },
});
