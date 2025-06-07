import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "../../hook/auth";
import Screen from "../../screens/index.screens";

const Stack = createNativeStackNavigator();

export default function StackPublicRoute() {
  const { toGoOnboarding } = useAuth();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={!toGoOnboarding ? "on-boarding" : "Login"}
      >
        <Stack.Screen
          name="on-boarding"
          component={Screen.OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Screen.Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Screen.Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmCode"
          component={Screen.ConfirmCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoreRegistrationFlow"
          component={Screen.LoadingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
