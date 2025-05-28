import { useEffect, useRef } from "react";
import { Platform, PermissionsAndroid, Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";

let channelCreated = false;

export function useNotificationsSetup(setFcmToken: (token: string) => void) {
  const lastMessageIdRef = useRef<string | null>(null);

  useEffect(() => {
    console.log("🟢 Registrando listeners de notificação");

    const unsubscribeMessage = messaging().onMessage(async (remoteMessage) => {
      const messageId = remoteMessage.messageId;

      // Evita notificações duplicadas
      if (messageId && messageId === lastMessageIdRef.current) {
        console.log("🔁 Notificação já recebida, ignorando.");
        return;
      }

      lastMessageIdRef.current = messageId ?? null;

      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: "default",
          importance: AndroidImportance.HIGH,
        },
      });
    });

    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        Alert.alert(
          "Notificação aberta!",
          JSON.stringify(remoteMessage.notification?.title)
        );
      }
    );

    // Async para permissões, canal e token
    (async () => {
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

      if (!enabled) {
        Alert.alert("Permissão negada para notificações push");
        return;
      }

      const token = await messaging().getToken();
      setFcmToken(token);

      if (!channelCreated) {
        await notifee.createChannel({
          id: "default",
          name: "Default Channel",
          importance: AndroidImportance.HIGH,
          sound: "default",
        });
        channelCreated = true;
      }

      const initial = await messaging().getInitialNotification();
      if (initial) {
        Alert.alert(
          "App aberto por notificação!",
          JSON.stringify(initial.notification?.title)
        );
      }
    })();

    return () => {
      unsubscribeMessage();
      unsubscribeOpened();
    };
  }, [setFcmToken]);
}
