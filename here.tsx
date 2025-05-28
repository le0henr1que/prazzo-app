import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
// import { useFonts } from "expo-font"; // ADICIONE ESTA LINHA
import {
  GoogleSignin,
  User,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import * as RNIap from "react-native-iap";

GoogleSignin.configure({
  iosClientId:
    "57942026538-9eollahbv2cekm62deuaqhunvq8od6vf.apps.googleusercontent.com",
});

const itemSkus = ["android.test.purchased"];

export default function App() {
  // // ADICIONE ESTE BLOCO:
  // const [fontsLoaded] = useFonts({
  //   "DancingScript-Regular": require("./assets/fonts/DancingScript-VariableFont_wght.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null; // Ou um SplashScreen
  // }

  const [auth, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [products, setProducts] = useState<RNIap.Product[]>([]);

  // Solicita permissão e pega o token FCM
  useEffect(() => {
    async function setupFCM() {
      if (Platform.OS === "android" && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permissão de notificação negada pelo usuário.");
          return;
        }
      }

      // Solicita permissão para receber notificações
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // Pega o token FCM
        const token = await messaging().getToken();
        setFcmToken(token);
        console.log("FCM Token:", token);
      } else {
        Alert.alert("Permissão negada para notificações push");
      }
    }

    setupFCM();

    // Listener para notificações recebidas em foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Exibe notificação local na bandeja do sistema
      console.log("Mensagem recebida em foreground:", remoteMessage);
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: "default",
          importance: AndroidImportance.HIGH,
        },
      });
    });

    // Crie o canal de notificação Android (apenas uma vez)
    notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
      sound: "default", // Garante que o canal terá som padrão
    });

    // Listener para notificações abertas pelo usuário
    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        Alert.alert(
          "Notificação aberta!",
          JSON.stringify(remoteMessage.notification?.title)
        );
      }
    );

    // Checa se o app foi aberto por uma notificação (quando fechado)
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          Alert.alert(
            "App aberto por notificação!",
            JSON.stringify(remoteMessage.notification?.title)
          );
        }
      });

    return () => {
      unsubscribe();
      unsubscribeOpened();
    };
  }, []);

  useEffect(() => {
    RNIap.initConnection().then(async () => {
      const items = await RNIap.getProducts(itemSkus);
      setProducts(items);
    });
    return () => {
      RNIap.endConnection();
    };
  }, []);

  async function handleGoogleSignIn() {
    if (loading) return;
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setAuth(response.data);
        console.log("User signed in:", response.data);
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignOut() {
    try {
      await GoogleSignin.signOut();
      setAuth(null);
      console.log("User signed out");
    } catch (error) {
      console.error("Error during Google Sign-Out:", error);
    }
  }

  async function handleBuyPlan() {
    try {
      if (products.length > 0) {
        await RNIap.requestPurchase({ sku: products[0].productId });
      } else {
        Alert.alert("Produto não encontrado");
      }
    } catch (err) {
      Alert.alert("Erro ao comprar", String(err));
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!auth ? (
        <>
          <Button
            title={loading ? "Signing in..." : "Sign in with Google"}
            onPress={handleGoogleSignIn}
            disabled={loading}
          />
          <Text style={{ fontFamily: "DancingScript-Regular" }}>
            Please sign in to continue.
          </Text>
        </>
      ) : (
        <View>
          <Text style={{ fontFamily: "DancingScript-Regular" }}>
            Welcome, {auth.user.name}!
          </Text>
          <Text style={{ fontFamily: "DancingScript-Regular" }}>
            Email: {auth.user.email}
          </Text>
          <Image
            source={auth.user.photo ? { uri: auth.user.photo } : undefined}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Button title="Sign out" onPress={handleGoogleSignOut} />
          <Text
            selectable
            style={{
              marginTop: 10,
              fontSize: 12,
              fontFamily: "DancingScript-Regular",
            }}
          >
            FCM Token: {fcmToken}
          </Text>
          <Button title="Comprar Plano" onPress={handleBuyPlan} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
