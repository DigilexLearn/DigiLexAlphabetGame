import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TrigraphData from '../data/TrigraphData';

export default function Levels() {
  const { type = 'consonant' } = useLocalSearchParams();
  const router = useRouter();

  const items = TrigraphData.filter(x => x.type === type);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'vowel' ? 'Vowel Trigraphs' : 'Consonant Trigraphs'}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/trigraph/learn', params: { id: item.id } })}
            >
              <Text style={styles.sound}>{item.title}</Text>
              <Text style={styles.example}>{item.intro}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playBtn}
              onPress={() => router.push({ pathname: '/trigraph/game', params: { id: item.id, userId: 'guest' } })}
            >
              <Text style={styles.playText}>Play Game</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {/* ✅ Centered Back Button like Digraph */}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  title:{ fontSize:24, fontWeight:'700', textAlign:'center', marginBottom:16 },
  card:{ padding:14, borderRadius:12, borderWidth:1, borderColor:'#ddd', marginBottom:12 },
  sound:{ fontSize:20, fontWeight:'800' },
  example:{ opacity:0.7, marginTop:4 },
  playBtn:{ marginTop:10, backgroundColor:'#681068ff', padding:10, borderRadius:8, alignItems:'center' },
  playText:{ color:'#fff', fontWeight:'700' },

  // ✅ Consistent Back Button UI
  button: {
    marginTop: 16,
    alignSelf: 'center',
    backgroundColor: '#734381ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
