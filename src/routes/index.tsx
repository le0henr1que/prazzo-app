import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hook/auth";
import StackPrivateRoute from "./private/stack.private.routes";
import StackPublicRoute from "./public/stack.public.routes";
import { Text } from "react-native";
import LoadSplash from "../components/load-splash";
import { useNotificationsSetup } from "../hook/use-notification-setup";
import { useState } from "react";

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function Routes() {
  const { isAuthenticated, isLoading, isLoadingOnboarding } = useAuth();
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  useNotificationsSetup(setFcmToken);
  console.log("FCM Token:", fcmToken);
  if (isLoadingOnboarding) {
    return <LoadSplash />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {isAuthenticated ? <StackPrivateRoute /> : <StackPublicRoute />}
    </NavigationContainer>
  );
}
