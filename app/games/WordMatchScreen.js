import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import * as Speech from "expo-speech";
import { db } from "../firebase/firebaseConfig";  
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "expo-router";  // ✅ Router import

export default function WordMatchGame() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [gameOver, setGameOver] = useState(false); // ✅ new state
  const router = useRouter();

  // ✅ Local image assets
  const WORD_BANK = [
    { word: "cat", image: require("../../assets/images/cat.png") },
    { word: "dog", image: require("../../assets/images/dog.png") },
    { word: "pen", image: require("../../assets/images/pen.png") },
    { word: "sun", image: require("../../assets/images/sun.png") },
    { word: "book", image: require("../../assets/images/book.png") },
    { word: "bus", image: require("../../assets/images/bus.png") },
    { word: "cake", image: require("../../assets/images/cake.png") },
  ];

  useEffect(() => {
    nextRound();
  }, []);

  const speakWord = (word) => {
    Speech.speak(word, { language: "en-US" });
  };

  const nextRound = () => {
    if (round >= 5) {
      setGameOver(true); // ✅ Game khatam
      return;
    }

    const newWord = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
    setCurrentWord(newWord);

    const shuffled = [...WORD_BANK].sort(() => 0.5 - Math.random()).slice(0, 4);
    if (!shuffled.some((item) => item.word === newWord.word)) {
      shuffled[0] = newWord;
    }
    setOptions(shuffled);

    setRound(round + 1);
    speakWord(newWord.word);
  };

  const handleAnswer = (option) => {
    if (option.word === currentWord.word) {
      setScore(score + 1);
      Alert.alert("✅ Correct!", `+1 point`, [{ text: "Next", onPress: nextRound }]);
    } else {
      Alert.alert("❌ Wrong!", "Try again", [{ text: "Next", onPress: nextRound }]);
    }
  };

  const saveProgress = async () => {
    try {
      await addDoc(collection(db, "wordMatchScores"), {
        score: score,
        timestamp: new Date(),
      });
      Alert.alert("✅ Saved!", "Your score has been saved.");
    } catch (error) {
      console.log("Error saving score:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word Match Game</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.round}>Round: {round}/5</Text>

      {!gameOver ? (
        <>
          <Text style={styles.question}>Select the word you heard:</Text>

          {currentWord && (
            <TouchableOpacity onPress={() => speakWord(currentWord.word)} style={styles.listenButton}>
              <Text style={styles.optionText}>🔊 Listen Again</Text>
            </TouchableOpacity>
          )}

          <View style={styles.optionsContainer}>
            {options.map((opt, index) => (
              <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(opt)}>
                <Image source={opt.image} style={styles.image} />
                <Text style={styles.optionText}>{opt.word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.endGameContainer}>
          <Text style={styles.finalScore}>🎉 Final Score: {score}</Text>

          <TouchableOpacity style={styles.saveButton} onPress={saveProgress}>
            <Text style={styles.saveText}>Save Score</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/ModeSelection")}>
            <Text style={styles.backText}>⬅ Back to Modes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  score: { fontSize: 18, marginBottom: 5 },
  round: { fontSize: 16, marginBottom: 20 },
  question: { fontSize: 20, marginBottom: 20 },
  listenButton: { backgroundColor: "#87CEEB", margin: 10, padding: 12, borderRadius: 10 },
  optionsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9c2ff",
    margin: 8,
    padding: 10,
    borderRadius: 10,
    width: "40%",
  },
  optionText: { fontSize: 18, marginLeft: 10 },
  image: { width: 40, height: 40, resizeMode: "contain" },
  endGameContainer: { alignItems: "center", marginTop: 20 },
  finalScore: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  saveButton: { backgroundColor: "#c45d9cff", padding: 12, borderRadius: 8, marginBottom: 15 },
  saveText: { color: "#fff", fontSize: 18 },
  backButton: { backgroundColor: "#a7419eff", padding: 12, borderRadius: 8 },
  backText: { color: "#fff", fontSize: 18 },
});
