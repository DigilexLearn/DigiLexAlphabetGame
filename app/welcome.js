// app/WelcomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Digilex</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/ModeSelection')}>
        <Text style={styles.buttonText}>Start Learning</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  title: { fontSize:28, fontWeight:'bold', marginBottom:30 },
  button: { backgroundColor:'#28A745', padding:15, borderRadius:10, width:250 },
  buttonText: { color:'#fff', fontSize:18, textAlign:'center' },
});
