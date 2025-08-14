import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { consonantData, vowelData } from '../data/DigraphData';

export default function DigraphLevels() {
  const router = useRouter();
  const { type = 'consonant' } = useLocalSearchParams(); // fixed

  const data = type === 'vowel' ? vowelData : consonantData;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'vowel' ? 'Vowel Digraphs' : 'Consonant Digraphs'}
      </Text>

      <FlatList
        data={Object.keys(data)}
        keyExtractor={(level) => level}
        renderItem={({ item: levelName }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.levelTitle}>{levelName.toUpperCase()}</Text>
            {data[levelName].map((wordItem) => (
              <TouchableOpacity
                key={wordItem.word}
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: '/digraph/learn',
                    params: { word: wordItem.word },
                  })
                }
              >
                <Image source={wordItem.image} style={styles.image} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.sound}>{wordItem.word}</Text>
                  <Text style={styles.example}>{wordItem.example}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={() =>
                router.push({
                  pathname: '/digraph/game',
                  params: { type, level: levelName }, // pass type & level
                })
              }
            >
              <Text style={styles.buttonText}>Play Game</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

<TouchableOpacity
  style={[styles.button, { marginTop: 10 }]}
  onPress={() =>
    router.push({
      pathname: '/digraph/Scores',
      params: { userId: 'guest' }, // ya actual userId agar login system hai
    })
  }
>
  <Text style={styles.buttonText}>View Past Scores</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  levelTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 10 },
  image: { width: 60, height: 60, borderRadius: 8 },
  sound: { fontSize: 18, fontWeight: '700' },
  example: { opacity: 0.7 },
  backBtn: { alignSelf: 'center', padding: 10, marginTop: 8 },
  backText: { fontSize: 16, color: '#2196F3' },
  button: { backgroundColor:'#4CAF50', padding:10, borderRadius:8, alignItems:'center' },
  buttonText: { color:'#fff', fontSize:16 }
});
