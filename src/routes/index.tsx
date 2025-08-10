import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hook/auth";
import StackPrivateRoute from "./private/stack.private.routes";
import StackPublicRoute from "./public/stack.public.routes";
import { Text } from "react-native";
import LoadSplash from "../components/load-splash";
import { useState } from "react";
import ErrorPage from "../components/error-page";

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function Routes() {
  const { isAuthenticated, isLoading, isLoadingOnboarding, isError } =
    useAuth();

  if (isLoadingOnboarding) {
    return <LoadSplash />;
  }
  console.log("Error status:", isError);
  // if (isError) {
  //   return <ErrorPage />;
  // }

  return (
    <NavigationContainer theme={MyTheme}>
      {isAuthenticated ? <StackPrivateRoute /> : <StackPublicRoute />}
    </NavigationContainer>
  );
}
