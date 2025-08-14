// app/trigraph/levels.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import TrigraphData from '../data/TrigraphData';

export default function TrigraphLevels() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trigraphs — Choose a Sound</Text>

      <FlatList
        data={TrigraphData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/trigraph/learn', params: { id: item.id } })}
          >
            <Text style={styles.sound}>{item.title}</Text>
            <Text style={styles.level}>{item.levelName}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, justifyContent:'center' },
  title:{ fontSize:24, fontWeight:'700', textAlign:'center', marginBottom:16 },
  card:{ padding:16, borderRadius:12, borderWidth:1, marginBottom:12 },
  sound:{ fontSize:20, fontWeight:'700' },
  level:{ opacity:0.7, marginTop:4 },
  backBtn:{ alignSelf:'center', padding:10, marginTop:8 },
  backText:{ fontSize:16 }
});
