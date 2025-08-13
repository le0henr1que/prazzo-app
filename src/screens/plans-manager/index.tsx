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
import { Alert, Platform } from "react-native";
import { useEffect, useState } from "react";
import * as RNIap from "react-native-iap";

const subscriptionSkus = ["pro_teste_prazzo", "pro_teste_prazzo"];

export default function PlansManager() {
  const navigation = useNavigation();
  const [subscriptions, setSubscriptions] = useState<RNIap.Subscription[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  // TODO: Replace with actual mutation
  const createPaymentRequest = async () =>
    Promise.resolve({ unwrap: () => Promise.resolve() });

  useEffect(() => {
    const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async (purchase) => {
        // Verifica se a compra está pendente ou já foi consumida/cancelada
        if (
          purchase?.purchaseStateAndroid === 1 || // 1 = PURCHASED
          purchase?.transactionReceipt // iOS: se tem recibo, foi comprado
        ) {
          // Aqui é chamado quando a compra é concluída e a modal fecha
          console.log("Compra concluída:", purchase);
          const googlePlanId = purchase?.productId ?? "";
          const paymentToken = (purchase as any)?.purchaseToken ?? "";
          navigation.navigate("PlanScreenLoad", {
            googlePlanId,
            paymentToken,
          });
        } else {
          // Compra não foi concluída, não redireciona
          console.log("Compra não concluída ou cancelada:", purchase);
        }
      }
    );

    return () => {
      purchaseUpdateSubscription?.remove();
    };
  }, []);

  useEffect(() => {
    const initIAP = async () => {
      try {
        const connected = await RNIap.initConnection();
        if (connected) {
          const subs = await RNIap.getSubscriptions({
            skus: subscriptionSkus,
          });
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
  const handleStartTrial = async () => {
    try {
      if (subscriptions.length === 0) {
        // Alert.alert("Assinatura não encontrada");
        console.log("Assinatura não encontrada");
        return;
      }
      const subscription = subscriptions[0];
      if (Platform.OS === "android") {
        // Para Android: buscar a oferta
        const { subscriptionOfferDetails } = subscription as any;
        if (subscriptionOfferDetails && subscriptionOfferDetails.length > 0) {
          const offerToken = subscriptionOfferDetails[0].offerToken;
          const responseSubs = await RNIap.requestSubscription({
            sku: subscription.productId,
            subscriptionOffers: [
              {
                sku: subscription.productId,
                offerToken: offerToken,
              },
            ],
            andDangerouslyFinishTransactionAutomaticallyIOS: false,
          });
          console.log({
            googlePlanId: subscription.productId,
            paymentToken: (responseSubs as any)[0]?.purchaseToken || "",
          });

          console.log("Assinatura iniciada:", responseSubs);
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
  };

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
        <PricingPlans
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
      </ScrollView>

      <View style={styles.bottomDown}>
        <Button
          type="fill"
          size="large"
          onPress={handleStartTrial}
          disabled={!selectedPlan}
        >
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
