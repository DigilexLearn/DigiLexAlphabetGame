import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DigraphScores() {
  const { userId = 'guest' } = useLocalSearchParams();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchScores() {
      try {
        const q = query(
          collection(db, 'digraphScores'),
          where('userId', '==', userId),
          orderBy('timestamp', 'desc')
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setScores(fetched);
      } catch (e) {
        console.error('Error fetching scores:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchScores();
  }, [userId]);

  if (loading) return <ActivityIndicator size="large" style={{ flex:1, justifyContent:'center' }} />;

  if (!scores.length) return (
    <View style={styles.container}>
      <Text style={styles.noScores}>No scores found!</Text>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Past Scores</Text>
      <FlatList
        data={scores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Type: {item.type}</Text>
            <Text style={styles.text}>Level: {item.level}</Text>
            <Text style={styles.text}>Score: {item.score}</Text>
            {item.timestamp?.toDate && (
              <Text style={styles.text}>Date: {item.timestamp.toDate().toLocaleString()}</Text>
            )}
          </View>
        )}
      />
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:'#fff' },
  title:{ fontSize:24, fontWeight:'700', textAlign:'center', marginBottom:20 },
  card:{ padding:15, borderRadius:10, borderWidth:1, borderColor:'#ccc', marginBottom:10 },
  text:{ fontSize:16 },
  noScores:{ fontSize:18, textAlign:'center', marginTop:50 },
  backBtn:{ alignSelf:'center', padding:10, marginTop:10 },
  backText:{ fontSize:16, color:'#2196F3' }
});
