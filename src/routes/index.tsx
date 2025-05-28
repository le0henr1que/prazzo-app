import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import LoadingScreen from "../components/load";
import { useAuth } from "../hook/auth";
import StackPrivateRoute from "./private/stack.private.routes";
import StackPublicRoute from "./public/stack.public.routes";

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function Routes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer theme={MyTheme}>
      {isAuthenticated ? <StackPrivateRoute /> : <StackPublicRoute />}
    </NavigationContainer>
  );
}
