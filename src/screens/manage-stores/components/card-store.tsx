import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ScreensType } from "../../index.screens";
import { useAuth } from "../../../hook/auth";
import SwitchStoreLoad from "../../../components/switch-store-load";

export interface IOrganization {
  id: string;
  name: string;
  address: any;
  ownerId: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  urlBanner: string | null;
  urlImage: string | null;
  version: number;
  metrics: any;
}

export interface OrganizationResponseMeta {
  currentPage: number;
  lastPage: number;
  next: number | null;
  perPage: number;
  prev: number | null;
  total: number;
}

export interface OrganizationListResponse {
  data: IOrganization[];
  meta: OrganizationResponseMeta;
}

export const CardStore = ({ item }: { item: IOrganization }) => {
  const navigate = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const { switchStore, isLoadingSwitchStore } = useAuth();

  const handleSwitchStore = async (storeId: string) => {
    try {
      await switchStore(storeId);
    } catch (error) {
      console.error("Erro ao trocar de loja:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={require("../../../../assets/banner.png")}
        style={styles.backgroundImage}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item?.name}</Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-sharp"
            size={18}
            color={colors.primary["700"]}
          />
          <Text style={styles.infoText}>
            {" "}
            {item?.address?.street}, {item?.address?.number},
            {item?.address?.neighborhood}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="people" size={18} color={colors.primary["700"]} />
          <Text style={styles.infoText}>
            {item?.metrics?.users?.total.toString() || "0"} Membros
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSwitchStore(item.id)}
        >
          <Text style={styles.buttonText}>Acessar loja</Text>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: "https://link-do-logo" }} style={styles.logo} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    marginBottom: 16,
    width: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  button: {
    marginTop: 12,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary["600"],
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    position: "absolute",
    top: 90,
    right: 15,
    width: 56,
    height: 56,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "black",
  },
});
