import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ChallengeCard({ challenge, onComplete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{challenge.text}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#007AFF" }]} onPress={() => shareChallenge(challenge)}>
          <Ionicons name="share-social-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.buttonText}>Compartilhar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#4CAF50" }]} onPress={onComplete}>
          <Text style={styles.buttonText}>✅ Completar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

async function shareChallenge(challenge) {
  try {
    const result = await Share.share({
      message: `Olha esse desafio que estou fazendo: "${challenge.text}". Tente você também!`,
    });

    if (result.action === Share.sharedAction) {
      console.log("Desafio compartilhado!");
    } else if (result.action === Share.dismissedAction) {
      console.log("Compartilhamento cancelado");
    }
  } catch (error) {
    console.log("Erro ao compartilhar:", error);
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 0.48,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
