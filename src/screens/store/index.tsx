import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { JSX } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PencilIcon from "../../../assets/icons/pencil-icon";
import TruckIcon from "../../../assets/icons/truck-icon";
import { colors } from "../../styles/colors";
import { ScreensType } from "../index.screens";
import { useGetOneOrganizationQuery } from "../../services/organization";
import { useAuth } from "../../hook/auth";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral["50"],
  },
  badgePro: {
    display: "flex",
    height: 16,
    paddingHorizontal: 4,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9B600",
    borderRadius: 4,
    top: 3,
    right: 3,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: 25,
    backgroundColor: "red",
    borderRadius: 10,
    height: 20,
    minWidth: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  badgeProTitle: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 16,
    letterSpacing: 0,
  },
  banner: {
    width: "100%",
    height: 200,
  },
  cardOptionsTitle: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    fontSize: 14,
    fontWeight: 500,
  },
  cardOptionsTextTitle: {
    color: colors.neutral["900"],
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  cardOptionsTextDescription: {
    color: colors.neutral["500"],
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  titleOptions: {
    color: colors.neutral["700"],
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    padding: 20,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerOptions: { paddingHorizontal: 20, flex: 1 },
  iconsHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  containerInformations: {
    padding: 20,
    width: "100%",
  },
  information: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    marginTop: -100,
    height: 275,
    alignSelf: "stretch",
  },
  informationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  informationContent: {
    gap: 12,
    marginTop: 12,
    alignItems: "center",
    width: "100%",
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  card: {
    flex: 1,
    padding: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral["200"],
  },
  cardOptions: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  titleCard: {
    color: colors.neutral["500"],
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  valueCard: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  title1: {
    color: colors.primary["700"],
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  title2: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  title3: {
    color: colors.neutral["600"],
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  icon: {
    padding: 4,
    height: 32,
    width: 32,
    justifyContent: "center",
    display: "flex",
    backgroundColor: colors.primary["50"],
    borderRadius: 4,
    flexShrink: 0,
  },
  Ticon: {
    padding: 4,
    height: 32,
    width: 32,
    justifyContent: "center",
    display: "flex",
    backgroundColor: colors.danger["50"],
    borderRadius: 4,
    flexShrink: 0,
  },
  Hicon: {
    marginTop: 36,
    padding: 4,
    height: 32,
    width: 32,
    justifyContent: "center",
    flexShrink: 0,
    display: "flex",
    borderRadius: 22.5,
    backgroundColor: colors.neutral["100"],
    marginLeft: "auto",
  },
});

const Avatar = ({ uri }: { uri: any }) => (
  <View style={styles.avatarContainer}>
    <Image source={{ uri }} style={styles.avatar} />
  </View>
);

type InfoCardTitle =
  | "Total de produtos"
  | "Vencidos"
  | "Próximos de vencer"
  | "Membros da loja";

const iconMap: Record<InfoCardTitle, JSX.Element> = {
  "Total de produtos": (
    <Ionicons name="cube" size={24} color={colors.primary[600]} />
  ),
  Vencidos: <Ionicons name="trash" size={24} color={colors.danger[600]} />,
  "Próximos de vencer": (
    <Ionicons name="warning" size={24} color={colors.warning[600]} />
  ),
  "Membros da loja": <Ionicons name="people" size={24} color="#118ACE" />,
};

interface InfoCardProps {
  title: InfoCardTitle;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value }) => {
  const icon = iconMap[title];

  return (
    <View style={styles.card}>
      <Text style={styles.titleCard}>{title}</Text>
      <View style={styles.cardContent}>
        {icon}
        <Text style={styles.valueCard}>{value}</Text>
      </View>
    </View>
  );
};

const StoreInformation = () => {
  const { user } = useAuth();
  const {
    data: currentStore,
    isLoading: isLoadingStore,
    refetch: refetchUserDataStore,
  } = useGetOneOrganizationQuery({
    id: user?.currentOrganizationId || "",
  });
  return (
    <View style={styles.information}>
      <View style={styles.informationHeader}>
        <View>
          <Text style={styles.title1}>Você está em:</Text>
          <Text style={styles.title2}>{(currentStore as any)?.name ?? ""}</Text>
          <Text style={styles.title3}>
            {(currentStore as any)?.address?.street},{" "}
            {(currentStore as any)?.address?.number},
            {(currentStore as any)?.address?.neighborhood}
          </Text>
        </View>
        <Avatar uri="https://via.placeholder.com/150" />
      </View>
      <View style={styles.informationContent}>
        <View style={styles.contentRow}>
          <InfoCard
            title="Total de produtos"
            value={
              (currentStore as any)?.metrics?.products?.total.toString() || "0"
            }
          />
          <InfoCard
            title="Vencidos"
            value={
              (currentStore as any)?.metrics?.products?.expired.toString() ||
              "0"
            }
          />
        </View>
        <View style={styles.contentRow}>
          <InfoCard
            title="Próximos de vencer"
            value={
              (
                currentStore as any
              )?.metrics?.products?.near_expiration.toString() || "0"
            }
          />
          <InfoCard
            title="Membros da loja"
            value={
              (currentStore as any)?.metrics?.users?.total.toString() || "0"
            }
          />
        </View>
      </View>
    </View>
  );
};

const options = [
  {
    title: "Editar dados",
    description: "Atualize os dados da sua loja",
    icon: <PencilIcon />,
    isPro: false,
    redirectTo: "EditDataStore",
  },
  {
    title: "Gerenciar Lojas",
    description: "Crie novas lojas e alterne entre elas",
    icon: (
      <Ionicons
        name="storefront"
        size={24}
        color={colors.primary[600]}
        style={styles.icon}
      />
    ),
    isPro: true,
    redirectTo: "ManageStores",
  },
  {
    title: "Gerenciar membros",
    description: "Adicione membros as suas lojas",
    icon: (
      <Ionicons
        name="people"
        size={24}
        color={colors.primary[600]}
        style={styles.icon}
      />
    ),
    isPro: true,
    redirectTo: "Members",
  },
  {
    title: "Gerenciar fornecedores",
    description: "Adicione fornecedores em cada loja",
    icon: <TruckIcon />,
    isPro: true,
    redirectTo: "Supplier",
  },
  // {
  //   title: "Exportar relatórios",
  //   description: "Exporte relatórios detalhados da sua loja",
  //   icon: (
  //     <Ionicons
  //       name="documents"
  //       size={24}
  //       color={colors.primary[600]}
  //       style={styles.icon}
  //     />
  //   ),
  //   isPro: true,
  //   redirectTo: "ExportReport",
  // },
  // {
  //   title: "Excluir loja",
  //   description: "Apagar todos os dados dessa loja",
  //   icon: (
  //     <Ionicons
  //       name="trash"
  //       size={24}
  //       color={colors.danger[600]}
  //       style={styles.Ticon}
  //     />
  //   ),
  //   isPro: false,
  //   redirectTo: "DeleteStore",
  // },
];
const StoreOptions = ({ options }: any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardOptions}
      onPress={() => navigation.navigate(options?.redirectTo as never)}
    >
      {options.icon}
      <View>
        <View style={styles.cardOptionsTitle}>
          <Text style={styles.cardOptionsTextTitle}>{options?.title}</Text>
          {options.isPro && (
            <View style={styles.badgePro}>
              <Text style={styles.badgeProTitle}>PRO</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardOptionsTextDescription}>
          {options?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MyStore = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const notificationCount = 1;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/banner.png")}
        style={styles.banner}
        resizeMode="cover"
      >
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.iconsHeader}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={colors.neutral[900]}
                style={styles.Hicon}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("Notification")}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={colors.neutral[900]}
                  style={styles.Hicon}
                />

                {notificationCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={styles.containerInformations}>
        <StoreInformation />
      </View>
      <View style={styles.containerOptions}>
        <Text style={styles.titleOptions}>Serviços</Text>
        <FlatList
          data={options}
          renderItem={({ item }) => (
            <StoreOptions key={item.title} options={item} />
          )}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default MyStore;
