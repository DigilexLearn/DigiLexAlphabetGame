import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ModeSelection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Module</Text>

      {/* Bossy R Game */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/BossyRModeSelect")}
      >
        <Text style={styles.buttonText}>Bossy R Game</Text>
      </TouchableOpacity>

      {/* Digraph Game */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/digraph/ModeSelect")}
      >
        <Text style={styles.buttonText}>Digraph Game</Text>
      </TouchableOpacity>

      {/* Trigraph Game */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/trigraph/ModeSelect")}
      >
        <Text style={styles.buttonText}>Trigraph Game</Text>
      </TouchableOpacity>

      {/* Alphabet Game
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/games/AlphabetScreen")}
      >
        <Text style={styles.buttonText}>Alphabet Game</Text>
      </TouchableOpacity> */}

      {/* Word Match Game */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/games/WordMatchScreen")}
      >
        <Text style={styles.buttonText}>Word Match Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: 220,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18 },
});
