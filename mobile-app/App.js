import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import NewsDetailsScreen from "./screens/NewsDetailsScreen";
import CampusDetailsScreen from "./screens/CampusDetailsScreen";
import StudiezoekerScreen from "./screens/StudiezoekerScreen";
import GameScreen from "./screens/GameScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#88bc25" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Busleyden Atheneum" }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: "Product" }}
        />

        <Stack.Screen
          name="NewsDetails"
          component={NewsDetailsScreen}
          options={{ title: "Nieuws" }}
        />

        <Stack.Screen
          name="CampusDetails"
          component={CampusDetailsScreen}
          options={{ title: "Campus" }}
        />

        <Stack.Screen
          name="Studiezoeker"
          component={StudiezoekerScreen}
          options={{ title: "Studiezoeker" }}
        />
        
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ title: "BA Boekenjager" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}