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
import {
  GoogleSignin,
  User,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import * as RNIap from "react-native-iap";

// Configure Google Sign-In
GoogleSignin.configure({
  iosClientId:
    "57942026538-9eollahbv2cekm62deuaqhunvq8od6vf.apps.googleusercontent.com",
});

const itemSkus = ["android.test.purchased"];
const subscriptionSkus = ["prazzo"]; // Use o ID da assinatura criada
const subscriptionOffers = ["oferta-prazzo"]; // IDs de oferta no Google Play

export default function App() {
  const [auth, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [products, setProducts] = useState<RNIap.Product[]>([]);
  const [subscriptions, setSubscriptions] = useState<RNIap.Subscription[]>([]);

  // Inicializa conexão com IAP uma única vez
  useEffect(() => {
    const initIAP = async () => {
      try {
        const connected = await RNIap.initConnection();
        if (connected) {
          const items = await RNIap.getProducts({ skus: itemSkus });
          setProducts(items);

          const subs = await RNIap.getSubscriptions({ skus: subscriptionSkus });
          setSubscriptions(subs);
        }
      } catch (err) {
        console.error("Erro ao inicializar IAP:", err);
      }
    };
    initIAP();

    return () => {
      RNIap.endConnection();
    };
  }, []);

  // Configuração do FCM e notificação
  useEffect(() => {
    const setupFCM = async () => {
      if (Platform.OS === "android" && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permissão de notificação negada pelo usuário.");
          return;
        }
      }

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        setFcmToken(token);
        console.log("FCM Token:", token);
      } else {
        Alert.alert("Permissão negada para notificações push");
      }
    };

    setupFCM();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
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

    notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
      sound: "default",
    });

    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        Alert.alert(
          "Notificação aberta!",
          JSON.stringify(remoteMessage.notification?.title)
        );
      }
    );

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

  // Google Sign In
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

  // Compra de produto (não-assinatura)
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

  // Compra de assinatura (agora com offerToken!)
  async function handleBuySubscription() {
    try {
      if (subscriptions.length === 0) {
        Alert.alert("Assinatura não encontrada");
        return;
      }

      const subscription = subscriptions[0];

      if (Platform.OS === "android") {
        // Para Android: buscar a oferta
        const { subscriptionOfferDetails } = subscription;
        if (subscriptionOfferDetails && subscriptionOfferDetails.length > 0) {
          const offerToken = subscriptionOfferDetails[0].offerToken; // Pega o primeiro offerToken
          await RNIap.requestSubscription({
            sku: subscription.productId,
            subscriptionOffers: [
              {
                sku: subscription.productId,
                offerToken: offerToken,
              },
            ],
            andDangerouslyFinishTransactionAutomaticallyIOS: false,
          });
        } else {
          Alert.alert("Não há ofertas disponíveis para esta assinatura.");
        }
      } else {
        // iOS
        await RNIap.requestSubscription({
          sku: subscription.productId,
          andDangerouslyFinishTransactionAutomaticallyIOS: false,
        });
      }
    } catch (err) {
      console.error("Erro ao assinar:", err);
      Alert.alert("Erro ao assinar", String(err));
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
          <Text>Please sign in to continue.</Text>
        </>
      ) : (
        <View>
          <Text>Welcome, {auth.user.name}!</Text>
          <Text>Email: {auth.user.email}</Text>
          <Image
            source={auth.user.photo ? { uri: auth.user.photo } : undefined}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Button title="Sign out" onPress={handleGoogleSignOut} />
          <Text selectable style={{ marginTop: 10, fontSize: 12 }}>
            FCM Token: {fcmToken}
          </Text>
          <Button title="Comprar Plano" onPress={handleBuyPlan} />
          <Button title="Assinar Plano" onPress={handleBuySubscription} />
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
