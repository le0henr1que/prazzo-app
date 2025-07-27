"use client";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import Header from "../../components/header";
import Typography from "../../components/text";

import Button from "../../components/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../styles/colors";
import { head } from "lodash";
import { Text } from "react-native";
import { Image } from "react-native";
import PricingPlans from "./components/price-plans";

export default function PlansManager() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container} edges={["bottom", "top"]}>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              style={{ width: 81, height: 19 }}
              source={require("../../../assets/default/prazologo.webp")}
              resizeMode="contain"
            />
          </View>
          <View style={styles.bedge}>
            <Typography
              variant={"SM"}
              family={"semibold"}
              color={colors.brand.dark}
            >
              PRO
            </Typography>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeRounded}
          >
            <Ionicons name="close" size={24} color={colors.brand.dark} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={{ marginBottom: 20 }}>
          <Typography
            variant={"2XL"}
            family={"semibold"}
            color={colors.white}
            style={{ marginTop: 12, marginBottom: 6 }}
          >
            Com o PRO, fica ainda mais fácil cuidar do seu estoque
          </Typography>
        </View>
        <View>
          <Typography variant={"SM"} family={"semibold"} color={colors.white}>
            O plano PRO inclui:
          </Typography>
          <View style={styles.cardContent}>
            <View style={styles.list}>
              <View style={styles.listItem}>
                <Ionicons name="infinite" size={24} color={colors.brand.dark} />
                <Typography
                  variant={"SM"}
                  family={"medium"}
                  color={colors.neutral[6]}
                >
                  Produtos ilimitados
                </Typography>
              </View>
              <View style={styles.listItem}>
                <Ionicons
                  name="storefront-sharp"
                  size={24}
                  color={colors.brand.dark}
                />
                <Typography
                  variant={"SM"}
                  family={"regular"}
                  color={colors.neutral[6]}
                >
                  Gerenciar multiplas lojas
                </Typography>
              </View>
              <View style={styles.listItem}>
                <Ionicons
                  name="person-sharp"
                  size={24}
                  color={colors.brand.dark}
                />
                <Typography
                  variant={"SM"}
                  family={"regular"}
                  color={colors.neutral[6]}
                >
                  Convidar membros
                </Typography>
              </View>
              <View style={styles.listItem}>
                <Ionicons
                  name="briefcase-sharp"
                  size={24}
                  color={colors.brand.dark}
                />
                <Typography
                  variant={"SM"}
                  family={"regular"}
                  color={colors.neutral[6]}
                >
                  Cadastro de fornecedores
                </Typography>
              </View>
              <View style={styles.listItem}>
                <Ionicons
                  name="location-sharp"
                  size={24}
                  color={colors.brand.dark}
                />
                <Typography
                  variant={"SM"}
                  family={"regular"}
                  color={colors.neutral[6]}
                >
                  Cadastro de local de produtos
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.contentBottom}
        showsVerticalScrollIndicator={false}
      >
        <PricingPlans />
      </ScrollView>

      <View style={styles.bottomDown}>
        <Button type="fill" size="large" onPress={() => console.log("Assinar")}>
          Começar 1 semana grátis
        </Button>
        <Typography variant={"SM"} family={"medium"} color={colors.neutral[6]}>
          Ao continuar, voce concorda com os{" "}
          <Text style={{ color: colors.brand.dark }}>termos de uso</Text>
        </Typography>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.dark,
  },
  contentBottom: {
    flex: 2,
    width: "100%",
    backgroundColor: colors.white,
    paddingTop: 100,
    marginTop: -100,
    zIndex: -1,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bedge: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 3,
    marginTop: -5,
  },
  cardContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    backgroundColor: colors.white,
    borderColor: colors.neutral[3],
    marginTop: 6,
    gap: "8px",
    alignSelf: "stretch",
  },
  closeRounded: {
    borderRadius: 999,
    padding: 4,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
    alignItems: "center",
    gap: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  content: {
    paddingHorizontal: 16,
  },

  bottomDown: {
    width: "100%",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopColor: colors.neutral[3],
    // paddingBottom: 20,
    borderTopWidth: 1,
  },
});
