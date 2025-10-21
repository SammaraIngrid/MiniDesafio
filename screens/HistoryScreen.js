import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const HISTORY_KEY = "challengeHistory";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await AsyncStorage.getItem(HISTORY_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        parsed.sort((a, b) => b.timestamp - a.timestamp);
        setHistory(parsed);
      }
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Desafios</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.dateTime}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F2F2F7" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 14, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  date: { fontSize: 14, color: "#888", marginBottom: 4 },
  text: { fontSize: 16, color: "#333" },
});
