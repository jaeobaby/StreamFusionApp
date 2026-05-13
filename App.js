import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { View, ActivityIndicator } from "react-native";
import { authListener } from "./utils/authManager";
import LoginScreen from "./screens/LoginScreen";
import DiscoverScreen from "./screens/DiscoverScreen";
import RecommendationsScreen from "./screens/RecommendationsScreen";
import QueueScreen from "./screens/QueueScreen";
import WatchedHistoryScreen from "./screens/WatchedHistoryScreen";
import SearchScreen from "./screens/SearchScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#00FFFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#000" },
        headerStyle: { backgroundColor: "#000" },
        headerTitleStyle: { color: "#00FFFF" },
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "Discover") icon = "compass";
          else if (route.name === "Queue") icon = "list";
          else if (route.name === "Recommendations") icon = "sparkles";
          else if (route.name === "History") icon = "time";
          else if (route.name === "Search") icon = "search";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Queue" component={QueueScreen} />
      <Tab.Screen name="Recommendations" component={RecommendationsScreen} />
      <Tab.Screen name="History" component={WatchedHistoryScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authListener((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00FFFF" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={{ colors: { background: "#000" } }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
