import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MOTIVATIONS } from "../data/MotivationsCard.js";

export default function MotivationsScreen() {
  const [frase, setFrase] = useState("");

  function getRandomMotivation() {
    const random = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
    setFrase(random.text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motive-se 🎉</Text>
      <Pressable style={styles.button} onPress={getRandomMotivation}>
        <Text style={styles.buttonText}>Gerar frase motivacional</Text>
      </Pressable>

      {frase ? <Text style={styles.frase}>{frase}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 18, marginVertical: 4 },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  frase: { fontSize: 18, fontStyle: "italic", marginTop: 20, textAlign: "center" },
});
