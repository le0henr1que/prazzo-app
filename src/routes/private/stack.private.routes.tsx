import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Screen from "../../screens/index.screens";
import { useNotificationsSetup } from "../../hook/use-notification-setup";
import { useState } from "react";
import TabRoutes from "./tab.private.routes";
const Stack = createNativeStackNavigator();

export default function StackPrivateRoute() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  useNotificationsSetup(setFcmToken);
  console.log("FCM Token:", fcmToken);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScamProduct"
        component={Screen.ScamProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProduct"
        component={Screen.AddProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Screen.Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={Screen.EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModifyPassword"
        component={Screen.ModifyPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FAQ"
        component={Screen.FAQ}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlansManager"
        component={Screen.PlansManager}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlanPremium"
        component={Screen.PlanPremium}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageNotifications"
        component={Screen.ManageNotifications}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
