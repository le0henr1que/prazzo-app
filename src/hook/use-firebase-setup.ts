import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { PermissionsAndroid, Platform } from "react-native";

export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === "android") {
      // 📱 Android 13+ requer POST_NOTIFICATIONS explicitamente
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: "Permissão de Notificações",
            message:
              "Precisamos da sua permissão para enviar notificações importantes.",
            buttonPositive: "Permitir",
            buttonNegative: "Negar",
          }
        );
        console.log("Permissão POST_NOTIFICATIONS:", granted);

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("❌ Permissão de notificações negada no Android 13+");
          return false;
        }
      }
      // 🔔 Para Android abaixo de 13, não precisa pedir explicitamente POST_NOTIFICATIONS
      console.log(
        "✅ Permissão de notificação para Android concedida (ou não requerida)"
      );
      return true;
    }

    if (Platform.OS === "ios") {
      // 🍏 No iOS, precisa pedir explicitamente via Firebase Messaging
      const authStatus = await messaging().requestPermission({
        alert: true,
        badge: true,
        sound: true,
      });
      console.log("Status da permissão iOS:", authStatus);

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log("❌ Permissão de notificações negada no iOS");
        return false;
      }

      console.log("✅ Permissão de notificação no iOS concedida");
      return true;
    }

    // Caso não seja iOS nem Android, retornamos false
    return false;
  } catch (error) {
    console.error("Erro ao pedir permissão de notificação:", error);
    return false;
  }
};

export async function getFcmToken(): Promise<string | null> {
  try {
    const token = await messaging().getToken();
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Erro ao obter token FCM:", error);
    return null;
  }
}

export async function createDefaultNotificationChannel() {
  // Para Android: criar canal para notificação
  await notifee.createChannel({
    id: "default",
    name: "Notificações padrão",
    importance: AndroidImportance.HIGH,
  });
}
