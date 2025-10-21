import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HistoryScreen from "./screens/HistoryScreen";
import HomeScreen from "./screens/HomeScreen";
import MotivationsScreen from "./screens/MotivationsScreen";
import SuggestScreen from "./screens/SuggestScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Mini Desafios">
        <Stack.Screen name="Mini Desafios" component={HomeScreen} />
        <Stack.Screen name="Histórico" component={HistoryScreen} />
        <Stack.Screen name="Motivações" component={MotivationsScreen} />
        <Stack.Screen name="Sugerir Desafio" component={SuggestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
