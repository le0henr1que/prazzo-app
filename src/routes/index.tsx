import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hook/auth";
import StackPrivateRoute from "./private/stack.private.routes";
import StackPublicRoute from "./public/stack.public.routes";
import { Text } from "react-native";
import LoadSplash from "../components/load-splash";
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

  if (isLoadingOnboarding) {
    return <LoadSplash />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {isAuthenticated ? <StackPrivateRoute /> : <StackPublicRoute />}
    </NavigationContainer>
  );
}
