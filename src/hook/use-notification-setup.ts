import { useEffect, useRef, useState } from "react";
import { Platform, PermissionsAndroid, Alert, Text, View } from "react-native";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { useDialogModal } from "./handle-modal/hooks/actions";

let channelCreated = false;
let pendingNotification: any = null;
let globalHandleModal: any = null;
let isHomeReady = false;

export function setHomeReady(ready: boolean) {
  isHomeReady = ready;
  if (ready && pendingNotification && globalHandleModal) {
    handlePendingNotification();
  }
}

async function handlePendingNotification() {
  if (!pendingNotification) return;

  await notifee.displayNotification({
    title: pendingNotification.notification?.title,
    body: pendingNotification.notification?.body,
    android: {
      channelId: "default",
      importance: AndroidImportance.HIGH,
    },
  });

  if (pendingNotification?.data?.NOTIFICATION_TYPE === "WELCOME") {
    globalHandleModal({
      isOpen: true,
    });
  }
  pendingNotification = null;
}

export async function triggerNotificationAcceptance(): Promise<boolean> {
  if (Platform.OS === "android" && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Permissão de notificação negada pelo usuário.");
      return false;
    }
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    Alert.alert("Permissão negada para notificações push");
    return false;
  }

  if (!channelCreated) {
    await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
      sound: "default",
    });
    channelCreated = true;
  }

  // Se houver uma notificação pendente e a home estiver pronta, exibe ela agora
  if (pendingNotification && isHomeReady) {
    await handlePendingNotification();
  }

  return true;
}

export function useNotificationsSetup(setFcmToken: (token: string) => void) {
  const lastMessageIdRef = useRef<string | null>(null);
  const { handleModal } = useDialogModal();
  const [isNotificationAccepted, setIsNotificationAccepted] = useState(false);

  // Atualiza o handleModal global quando o componente monta
  useEffect(() => {
    globalHandleModal = handleModal;
    return () => {
      globalHandleModal = null;
    };
  }, [handleModal]);

  useEffect(() => {
    console.log("🟢 Registrando listeners de notificação");

    const unsubscribeMessage = messaging().onMessage(async (remoteMessage) => {
      const messageId = remoteMessage.messageId;
      console.log(remoteMessage.data, "NOTIFICACAO");

      if (messageId && messageId === lastMessageIdRef.current) {
        console.log("🔁 Notificação já recebida, ignorando.");
        return;
      }

      lastMessageIdRef.current = messageId ?? null;

      // Se as notificações não foram aceitas ainda, armazena a notificação
      if (!isNotificationAccepted) {
        pendingNotification = remoteMessage;
        return;
      }

      // Se as notificações já foram aceitas, mas a home não está pronta, armazena
      if (!isHomeReady) {
        pendingNotification = remoteMessage;
        return;
      }

      // Se as notificações foram aceitas e a home está pronta, exibe normalmente
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: "default",
          importance: AndroidImportance.HIGH,
        },
      });

      if (remoteMessage?.data?.NOTIFICATION_TYPE === "WELCOME") {
        handleModal({
          isOpen: true,
        });
      }
    });

    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        Alert.alert(
          "Notificação aberta!",
          JSON.stringify(remoteMessage.notification?.title)
        );
      }
    );

    // Check for initial notification
    (async () => {
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
  }, [setFcmToken, isNotificationAccepted, handleModal]);

  // Função para atualizar o estado de aceite das notificações
  const updateNotificationAcceptance = (accepted: boolean) => {
    setIsNotificationAccepted(accepted);
  };

  return { updateNotificationAcceptance };
}
