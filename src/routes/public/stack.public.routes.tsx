import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Screen from "../../screens/index.screens";
import { Text } from "react-native";
import { useState } from "react";
import { useNotificationsSetup } from "../../hook/use-notification-setup";
import { useMediaPermissions } from "../../hook/use-media-setup";
import { useAuth } from "../../hook/auth";

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  useNotificationsSetup(setFcmToken);
  console.log("FCM Token:", fcmToken);

  return <Text>Home Screen: {fcmToken}</Text>;
}

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
          component={Screen.StoreRegistrationFlow}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
