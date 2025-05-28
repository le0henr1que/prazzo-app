import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackIconV2 from "../../../assets/icons/backIcon-v2";
import { colors } from "../../styles/colors";
import CardNotification from "./components/card-notification";
import { ScrollView } from "react-native-gesture-handler";
import { ScreensType } from "../index.screens";

const notifications = [
  {
    id: "1",
    title: "Tomate g2 Blaster Gomes",
    description: "O produto está vencido há",
    boldText: "dois dias",
    date: new Date("2024-02-12").getTime(), // Timestamp
    time: "Há 2 minutos",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    title: "Tomate g2 Blaster Gomes",
    description: "O Lote L20240910 está vencido há",
    boldText: "um dia",
    date: new Date("2024-02-13").getTime(),
    time: "Há 3 minutos",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "3",
    title: "Tomate g2 Blaster Gomes",
    description: "O produto está próximo de vencer",
    boldText: "em dois dias",
    date: new Date("2024-02-16").getTime(),
    time: "Há 5 minutos",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "4",
    title: "Cenoura Premium",
    description: "O produto está próximo de vencer",
    boldText: "em três dias",
    date: new Date("2024-02-17").getTime(),
    time: "Há 10 minutos",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "5",
    title: "Batata Doce",
    description: "O produto venceu há",
    boldText: "cinco dias",
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
    time: "Há 15 minutos",
    image: "https://via.placeholder.com/50",
  },
];

enum NotificationType {
  VENCIDO = "VENCIDO",
  PROXIMO_A_VENCER = "PROXIMO_A_VENCER",
  GERAIS = "GERAIS",
}

const status = {
  [NotificationType.VENCIDO]: {
    title: "Vencido ",
    color: colors.danger["600"],
    background: colors.danger["50"],
  },
  [NotificationType.PROXIMO_A_VENCER]: {
    title: "Próximos de vencer",
    color: colors.warning["600"],
    background: colors.warning["50"],
  },
  [NotificationType.GERAIS]: {
    title: "Gerais",
    color: colors.primary["600"],
    background: colors.primary["50"],
  },
};

export default function Notification() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();

  const [stateFilter, setStateFilter] = useState<NotificationType>(
    NotificationType.VENCIDO
  );

  const defineStyle = (type: NotificationType) =>
    stateFilter === type ? styles.tabsButtonActive : styles.tabsButton;

  const currentDate = new Date().getTime();

  const filteredNotifications = notifications.filter((item) => {
    if (stateFilter === NotificationType.VENCIDO) {
      return item.date < currentDate;
    }
    if (stateFilter === NotificationType.PROXIMO_A_VENCER) {
      return item.date > currentDate;
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIconV2 />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={defineStyle(NotificationType.VENCIDO)}
          onPress={() => setStateFilter(NotificationType.VENCIDO)}
        >
          <Text style={styles.tabText}>Vencidos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defineStyle(NotificationType.PROXIMO_A_VENCER)}
          onPress={() => setStateFilter(NotificationType.PROXIMO_A_VENCER)}
        >
          <Text style={styles.tabText}>Próximos de vencer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defineStyle(NotificationType.GERAIS)}
          onPress={() => setStateFilter(NotificationType.GERAIS)}
        >
          <Text style={styles.tabText}>Gerais</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView>
          {filteredNotifications.map((item) => (
            <CardNotification
              item={item}
              key={item.id}
              status={status[stateFilter].title}
              color={status[stateFilter].color}
              background={status[stateFilter].background}
              alreadyRead={item.date < currentDate}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF",
    padding: 10,
  },
  header: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.neutral["900"],
    lineHeight: 24,
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral["200"],
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  tabsButton: {
    height: "100%",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tabsButtonActive: {
    borderBottomColor: colors.primary["600"],
    borderBottomWidth: 2,
    height: "100%",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.neutral["900"],
    lineHeight: 24,
  },
  activeTab: {},

  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
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
  expiredTag: {
    color: colors.danger["600"],
    fontWeight: "500",
    fontSize: 12,
  },
  tag: {
    backgroundColor: colors.danger["50"],
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
