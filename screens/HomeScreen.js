import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ChallengeCard from "../components/ChallengeCard";
import { CHALLENGES } from "../data/challenges";

const HISTORY_KEY = "challengeHistory";

export default function HomeScreen({ navigation }) {
  const [challenge, setChallenge] = useState(null);
  const [points, setPoints] = useState(0);

  function getRandomChallenge() {
    const random = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    setChallenge(random);
  }

  async function completeChallenge() {
    setPoints(points + 10);

    if (challenge) {
      try {
        const historyData = await AsyncStorage.getItem(HISTORY_KEY);
        const history = historyData ? JSON.parse(historyData) : [];

        const now = new Date();
        const newEntry = {
          id: challenge.id,
          text: challenge.text,
          dateTime: now.toLocaleDateString("pt-BR") + " " + now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          timestamp: now.getTime(),
        };

        history.push(newEntry);
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        alert("✅ Desafio concluído e salvo no histórico!");
      } catch (error) {
        console.error("Erro ao salvar no histórico:", error);
      }
    }

    setChallenge(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Desafios</Text>

      {challenge ? (
        <ChallengeCard challenge={challenge} onComplete={completeChallenge} />
      ) : (
        <TouchableOpacity style={styles.generateButton} onPress={getRandomChallenge}>
          <Text style={styles.generateButtonText}>Gerar Desafio</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.points}>🏆 Pontos: {points}</Text>

      <View style={styles.nav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Histórico")}>
          <Text>📜 Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Motivações")}>
          <Text>💪 Motivações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Sugerir Desafio")}>
          <Text>💡 Sugerir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F2F2F7", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#333" },
  generateButton: {
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  generateButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  points: { fontSize: 20, marginTop: 20, color: "#333", fontWeight: "600" },
  nav: { flexDirection: "row", marginTop: 40, justifyContent: "space-around", width: "100%" },
  navButton: { backgroundColor: "#fff", padding: 12, borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
});
