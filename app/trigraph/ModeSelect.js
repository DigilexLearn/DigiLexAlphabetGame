// // app/trigraph/ModeSelect.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function TrigraphModeSelect() {
//   const router = useRouter();

//   const trigraphs = [
//     { label: 'SCH', value: 'sch' },
//     { label: 'THR', value: 'thr' },
//     { label: 'STR', value: 'str' },
//     { label: 'SPL', value: 'spl' },
//     { label: 'SPR', value: 'spr' }
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select a Trigraph</Text>

//       {trigraphs.map((tg) => (
//         <TouchableOpacity
//           key={tg.value}
//           style={styles.button}
//           onPress={() => router.push(`/trigraph/levels?trigraph=${tg.value}`)}
//         >
//           <Text style={styles.buttonText}>{tg.label}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 10,
//     marginVertical: 8,
//     width: 200,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//   },
// });
// app/trigraph/ModeSelect.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TrigraphModeSelect() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Trigraph Type</Text>

      {/* Consonant Trigraphs */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/trigraph/consonant')}
      >
        <Text style={styles.buttonText}>Consonant Trigraphs</Text>
      </TouchableOpacity>

      {/* Vowel Trigraphs */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/trigraph/vowel')}
      >
        <Text style={styles.buttonText}>Vowel Trigraphs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  button: { backgroundColor: '#2196F3', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 10, marginVertical: 10, width: 220, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
