import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function DigraphModeSelect() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Type</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: '/digraph/levels',
            params: { type: 'consonant' },
          })
        }
      >
        <Text style={styles.buttonText}>Consonant Digraphs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: '/digraph/levels',
            params: { type: 'vowel' },
          })
        }
      >
        <Text style={styles.buttonText}>Vowel Digraphs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  title:{ fontSize:26, fontWeight:'bold', marginBottom:30 },
  button:{ backgroundColor:'#1a85b6ff', padding:15, marginBottom:15, borderRadius:10, width:250 },
  buttonText:{ color:'#fff', fontSize:18, textAlign:'center' },
});
