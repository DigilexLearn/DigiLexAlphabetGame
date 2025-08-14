// app/trigraph/game.js
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import TrigraphData from '../data/TrigraphData';
import { useProgressTracker } from '../../hooks/useProgressTracker';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function TrigraphGame() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const level = useMemo(() => TrigraphData.find((x) => x.id === id), [id]);

  const { recordWordResult, markLevelComplete } = useProgressTracker('Trigraphs');

  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState('blend');
  const [picked, setPicked] = useState([]);
  const [choices, setChoices] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (!level) return;
    const tokens = level.words[wordIndex].tokens;
    setChoices(shuffle(tokens));
    setPicked([]);
    setPhase('blend');
    Speech.speak(level.words[wordIndex].text, { language:'en-US' });
  }, [level, wordIndex]);

  if (!level) {
    return (
      <View style={styles.container}>
        <Text>Sound not found.</Text>
        <TouchableOpacity onPress={() => router.back()}><Text>Back</Text></TouchableOpacity>
      </View>
    );
  }

  const currentWord = level.words[wordIndex];
  const target = currentWord.tokens.join('');

  const onPick = (tok) => {
    if (phase !== 'blend') return;
    const next = [...picked, tok];
    setPicked(next);
    const built = next.join('');
    if (built.length >= target.length) {
      const correct = built === target;
      if (correct) {
        Speech.speak(currentWord.text, { language:'en-US' });
        setTimeout(() => setPhase('segment'), 300);
      } else {
        Alert.alert('Try again', 'Order not correct — reset!');
        setPicked([]);
      }
    }
  };

  const onSegmentPick = async (tok) => {
    if (phase !== 'segment') return;
    const trickyToken = level.id;
    const correct = tok === trickyToken || tok.includes(trickyToken);
    await recordWordResult(level.id, currentWord.text, !!correct);
    if (correct) setCorrectCount((c) => c + 1);

    if (wordIndex < level.words.length - 1) {
      setWordIndex((i) => i + 1);
    } else {
      await markLevelComplete(level.id, { correct: correctCount + (correct ? 1 : 0), total: level.words.length });
      Alert.alert('Great!', 'Level done. Back to Mode Select.', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/ModeSelect') },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{level.title.toUpperCase()}</Text>
      <Text style={styles.sub}>Word {wordIndex + 1} of {level.words.length}</Text>

      <View style={styles.wordBox}>
        <Text style={styles.big}>{currentWord.text}</Text>
        <TouchableOpacity onPress={() => Speech.speak(currentWord.text, { language:'en-US' })}>
          <Text style={styles.link}>🔊 Speak</Text>
        </TouchableOpacity>
      </View>

      {phase === 'blend' ? (
        <>
          <Text style={styles.step}>Step 1: Tap tokens in order</Text>
          <View style={styles.row}>
            {choices.map((tok, idx) => (
              <TouchableOpacity key={idx} style={styles.token} onPress={() => onPick(tok)}>
                <Text style={styles.tokenText}>{tok}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.pickedRow}>
            {picked.map((tok, idx) => (
              <View key={idx} style={styles.pickedToken}>
                <Text style={styles.pickedText}>{tok}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <>
          <Text style={styles.step}>Step 2: Which chunk makes the sound “{level.title}”?</Text>
          <View style={styles.row}>
            {shuffle(currentWord.tokens).map((tok, idx) => (
              <TouchableOpacity key={idx} style={styles.token} onPress={() => onSegmentPick(tok)}>
                <Text style={styles.tokenText}>{tok}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, justifyContent:'center' },
  header:{ fontSize:28, fontWeight:'800', textAlign:'center' },
  sub:{ textAlign:'center', marginBottom:8, opacity:0.7 },
  wordBox:{ alignItems:'center', marginVertical:10 },
  big:{ fontSize:36, fontWeight:'800' },
  link:{ marginTop:6, textDecorationLine:'underline' },
  step:{ marginTop:10, textAlign:'center', fontSize:16, fontWeight:'700' },
  row:{ flexDirection:'row', flexWrap:'wrap', justifyContent:'center', marginTop:8 },
  token:{ padding:12, borderWidth:1, borderRadius:10, margin:6, minWidth:56, alignItems:'center' },
  tokenText:{ fontSize:18, fontWeight:'700' },
  pickedRow:{ flexDirection:'row', justifyContent:'center', marginTop:10, minHeight:56 },
  pickedToken:{ padding:10, borderWidth:1, borderRadius:10, margin:4, backgroundColor:'#eee' },
  pickedText:{ fontSize:18, fontWeight:'700' },
  back:{ alignSelf:'center', marginTop:16 }
});
