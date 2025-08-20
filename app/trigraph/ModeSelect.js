import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TrigraphModeSelect() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Trigraph Type</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: '/trigraph/levels', params: { type: 'consonant' } })}
      >
        <Text style={styles.buttonText}>Consonant Trigraphs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: '/trigraph/levels', params: { type: 'vowel' } })}
      >
        <Text style={styles.buttonText}>Vowel Trigraphs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff', padding:20 },
  title:{ fontSize:26, fontWeight:'bold', marginBottom:30, color:'#333' },
  button:{ backgroundColor:'#1a85b6ff', paddingVertical:12, paddingHorizontal:25, borderRadius:10, marginVertical:10, width:240, alignItems:'center' },
  buttonText:{ color:'#fff', fontSize:18, fontWeight:'600' },
});
