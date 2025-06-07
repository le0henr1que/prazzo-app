import messaging from "@react-native-firebase/messaging";
import notifee, { EventType } from "@notifee/react-native";
import { AppState } from "react-native";

/**
 * Função para exibir a notificação localmente usando o Notifee
 */
export async function displayNotification(notificationData: any) {
  const { title, body, notificationType } = notificationData;

  // Exemplo: tratar tipos de notificação
  switch (notificationType) {
    case "chat":
      console.log("Exibindo notificação de chat...");
      break;
    case "alert":
      console.log("Exibindo notificação de alerta...");
      break;
    default:
      console.log("Exibindo notificação genérica...");
  }

  await notifee.displayNotification({
    title: title || "Notificação",
    body: body || "",
    android: {
      channelId: "default",
      smallIcon: "ic_launcher", // nome do ícone (res/drawable)
      pressAction: {
        id: "default",
      },
    },
  });
}

/**
 * Lidar com mensagens recebidas em foreground
 */
export function onMessageListener() {
  return messaging().onMessage(async (remoteMessage) => {
    console.log("Mensagem recebida em foreground:", remoteMessage);

    // Notificação customizada com base no payload
    const { notification, data } = remoteMessage;
    const notificationData = {
      title: notification?.title,
      body: notification?.body,
      notificationType: (data as any).notificationType,
    };
    await displayNotification(notificationData);
  });
}

/**
 * Lidar com eventos de clique em notificações
 */
export function onNotificationInteractionListener() {
  return notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      console.log("Usuário clicou na notificação:", detail.notification);
      // Por exemplo, navegar para a tela apropriada
    }
  });
}
