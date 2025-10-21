import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SuggestScreen() {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSuggestions();
  }, []);

  async function loadSuggestions() {
    try {
      const jsonValue = await AsyncStorage.getItem("@suggestions");
      const savedSuggestions = jsonValue ? JSON.parse(jsonValue) : [];
      setSuggestions(savedSuggestions);
    } catch (e) {
      console.log("Erro ao carregar sugestões:", e);
    }
  }

  async function handleSubmit() {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setError("Digite um desafio válido.");
      return;
    }

    const newSuggestion = { id: suggestions.length + 1, text: trimmedText };
    const updatedSuggestions = [...suggestions, newSuggestion];

    try {
      await AsyncStorage.setItem("@suggestions", JSON.stringify(updatedSuggestions));
      setSuggestions(updatedSuggestions);
      setText("");
      setError("");
      Keyboard.dismiss();
      Alert.alert("Obrigado!", "Seu desafio foi enviado com sucesso!");
    } catch (e) {
      console.log("Erro ao salvar sugestão:", e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sugira um novo desafio:</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={text}
        onChangeText={(t) => {
          setText(t);
          if (t.trim()) setError("");
        }}
        placeholder="Digite aqui..."
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <FlatList
        style={{ marginTop: 20 }}
        data={suggestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.suggestionText}>• {item.text}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start", padding: 20, backgroundColor: "#F2F2F7" },
  label: { fontSize: 18, marginBottom: 10, fontWeight: "600", color: "#333" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 5, backgroundColor: "#fff" },
  inputError: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 8 },
  button: { backgroundColor: "#4CAF50", padding: 14, borderRadius: 12, alignItems: "center", marginBottom: 20 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  suggestionText: { fontSize: 16, color: "#333" },
});
