import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DotsVerticalV2 from "../../../../assets/icons/dots-verticalv2";
import { colors } from "../../../styles/colors";
import { useDialogModal } from "../../../hook/handle-modal/hooks/actions";
import CardNotificationAction from "../../../components/card-notification-action";

export default function CardNotification({
  item,
  status,
  color,
  background,
  alreadyRead,
}: any) {
  const { handleModal } = useDialogModal();

  const handleNotification = () => {
    console.log("Abrir Notificação");
    handleModal({ isOpen: true, element: <CardNotificationAction /> });
  };

  return (
    <View
      style={{
        ...styles.notificationCard,
        backgroundColor: alreadyRead ? color.white : colors.primary["50"],
      }}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ ...styles.tag, backgroundColor: background }}>
            <Text style={{ ...styles.expiredTag, color: color }}>
              ● {status}
            </Text>
          </View>
          <TouchableOpacity onPress={handleNotification}>
            <DotsVerticalV2 />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {item.description}{" "}
          <Text style={styles.boldText}>{item.boldText}</Text>
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationCard: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral["200"],
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  expiredTag: { fontWeight: "500", fontSize: 12 },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 3,
  },
  description: {
    color: "#444",
    fontSize: 12,
  },
  boldText: {
    fontWeight: "bold",
  },
  time: {
    color: "#999",
    fontSize: 12,
    marginTop: 5,
  },
});
