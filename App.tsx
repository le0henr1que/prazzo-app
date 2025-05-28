import {
  Inter_100Thin,
  Inter_100Thin_Italic,
  Inter_200ExtraLight,
  Inter_200ExtraLight_Italic,
  Inter_300Light,
  Inter_300Light_Italic,
  Inter_400Regular,
  Inter_400Regular_Italic,
  Inter_500Medium,
  Inter_500Medium_Italic,
  Inter_600SemiBold,
  Inter_600SemiBold_Italic,
  Inter_700Bold,
  Inter_700Bold_Italic,
  Inter_800ExtraBold,
  Inter_800ExtraBold_Italic,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { StrictMode, useEffect } from "react";
import { AppRegistry } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import Modal from "./src/components/modalize";
import ModalNotification from "./src/components/notification";
import Routes from "./src/routes";
import { store } from "./store/store";
import { AuthProvider } from "./src/hook/auth";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_100Thin_Italic,
    Inter_200ExtraLight_Italic,
    Inter_300Light_Italic,
    Inter_400Regular_Italic,
    Inter_500Medium_Italic,
    Inter_600SemiBold_Italic,
    Inter_700Bold_Italic,
    Inter_800ExtraBold_Italic,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    // <StrictMode>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Modal />
            <ModalNotification />
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </QueryClientProvider>
        </Provider>
      </ToastProvider>
    </GestureHandlerRootView>
    // </StrictMode>
  );
}

AppRegistry.registerComponent("main", () => App);
