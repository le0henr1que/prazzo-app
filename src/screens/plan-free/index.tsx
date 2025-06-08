"use client";

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import * as RNIap from "react-native-iap";
import { useCreatePaymentRequestMutation } from "../../services/subscription";

// Mock icons - in a real app, you'd use react-native-vector-icons or similar
const Icon = ({
  name,
  color = "#0EA5E9",
}: {
  name: string;
  color?: string;
}) => (
  <View style={[styles.iconPlaceholder, { backgroundColor: color }]}>
    <Text style={styles.iconText}>{name.charAt(0).toUpperCase()}</Text>
  </View>
);

const CheckIcon = () => (
  <View style={styles.checkIcon}>
    <Text style={styles.checkText}>✓</Text>
  </View>
);

const CloseIcon = () => (
  <View style={styles.closeIcon}>
    <Text style={styles.closeText}>✕</Text>
  </View>
);
const subscriptionSkus = ["pro_teste_prazzo"];

export default function PlanScreen() {
  const [subscriptions, setSubscriptions] = useState<RNIap.Subscription[]>([]);
  const [createPaymentRequest, { isLoading: isLoadingPaymentMathod }] =
    useCreatePaymentRequestMutation();
  useEffect(() => {
    const initIAP = async () => {
      try {
        const connected = await RNIap.initConnection();
        if (connected) {
          const subs = await RNIap.getSubscriptions({ skus: subscriptionSkus });
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

  const [selectedPlan, setSelectedPlan] = useState<"annual" | "monthly">(
    "annual"
  );

  const handlePlanSelect = (plan: "annual" | "monthly") => {
    setSelectedPlan(plan);
  };

  const handleStartTrial = async () => {
    try {
      if (subscriptions.length === 0) {
        Alert.alert("Assinatura não encontrada");
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
            paymentToken: (responseSubs as any)[0].purchaseToken || "",
          });
          await createPaymentRequest({
            googlePlanId: subscription.productId,
            paymentToken: (responseSubs as any)[0].purchaseToken || "",
          }).unwrap();
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

  const handleClose = () => {
    console.log("Closing screen");
    // Implementar navegação de volta
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0EA5E9" />

      {/* Blue Header Section */}
      <View style={styles.blueSection}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.logo}>prazzo</Text>
            <Text style={styles.proLabel}>PRO</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <CloseIcon />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Seja PRO e adquira{"\n"}inúmeras funções novas
        </Text>
      </View>

      {/* White Content Section */}
      <View style={styles.whiteSection}>
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>O plano PRO inclui:</Text>

            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Icon name="∞" />
                <Text style={styles.featureText}>Produtos ilimitados</Text>
              </View>

              <View style={styles.featureItem}>
                <Icon name="🏪" />
                <Text style={styles.featureText}>
                  Gerenciar múltiplas lojas
                </Text>
              </View>

              <View style={styles.featureItem}>
                <Icon name="👥" />
                <Text style={styles.featureText}>Convidar membros</Text>
              </View>

              <View style={styles.featureItem}>
                <Icon name="📋" />
                <Text style={styles.featureText}>Cadastro de fornecedores</Text>
              </View>

              <View style={styles.featureItem}>
                <Icon name="📍" />
                <Text style={styles.featureText}>
                  Cadastro de local de produtos
                </Text>
              </View>
            </View>
          </View>

          {/* Pricing Options */}
          <View style={styles.pricingSection}>
            {/* Annual Plan - Highlighted */}
            <TouchableOpacity
              style={[
                styles.pricingOption,
                selectedPlan === "annual" && styles.pricingOptionSelected,
              ]}
              onPress={() => handlePlanSelect("annual")}
              activeOpacity={0.7}
            >
              <View style={styles.pricingHeader}>
                <View style={styles.pricingContent}>
                  <Text
                    style={[
                      styles.price,
                      selectedPlan === "annual" && styles.priceSelected,
                    ]}
                  >
                    R$ 166,00/ano
                  </Text>
                  <Text
                    style={[
                      styles.pricingDescription,
                      selectedPlan === "annual" &&
                        styles.pricingDescriptionSelected,
                    ]}
                  >
                    Teste tudo por 1 semana e depois pague{"\n"}
                    apenas <Text style={styles.boldText}>R$ 449,99/ano</Text> (
                    <Text style={styles.boldText}>R$ 10,00 mês</Text>)
                  </Text>
                </View>
                {selectedPlan === "annual" && <CheckIcon />}
              </View>
            </TouchableOpacity>

            {/* Monthly Plan */}
            <TouchableOpacity
              style={[
                styles.pricingOption,
                selectedPlan === "monthly" && styles.pricingOptionSelected,
              ]}
              onPress={() => handlePlanSelect("monthly")}
              activeOpacity={0.7}
            >
              <View style={styles.pricingHeader}>
                <View style={styles.pricingContent}>
                  <Text
                    style={[
                      styles.price,
                      selectedPlan === "monthly" && styles.priceSelected,
                    ]}
                  >
                    R$ 16,00/mês
                  </Text>
                  <Text
                    style={[
                      styles.pricingDescription,
                      selectedPlan === "monthly" &&
                        styles.pricingDescriptionSelected,
                    ]}
                  >
                    Teste tudo por 1 semana e depois pague{"\n"}
                    apenas <Text style={styles.boldTextGray}>R$ 39,99/mês</Text>
                  </Text>
                </View>
                {selectedPlan === "monthly" && <CheckIcon />}
              </View>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <Text style={styles.termsText}>
            Ao continuar, você concorda com os{" "}
            <Text style={styles.termsLink}>termos de uso</Text>
          </Text>

          {/* Spacer for fixed button */}
          <View style={styles.buttonSpacer} />
        </ScrollView>

        {/* Fixed CTA Button */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleStartTrial}>
            <Text style={styles.ctaButtonText}>Começar 1 semana grátis</Text>
          </TouchableOpacity>

          {/* Home Indicator */}
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0EA5E9",
  },
  blueSection: {
    backgroundColor: "#0EA5E9",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  proLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  closeButton: {
    padding: 5,
  },
  closeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    marginBottom: 30,
  },
  whiteSection: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  featuresSection: {
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 15,
  },
  featuresList: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  featureText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
  },
  pricingSection: {
    marginBottom: 30,
  },
  pricingOption: {
    backgroundColor: "#F8FAFC",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  pricingOptionSelected: {
    backgroundColor: "#EFF6FF",
    borderColor: "#0EA5E9",
  },
  pricingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  pricingContent: {
    flex: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 5,
  },
  priceSelected: {
    color: "#0EA5E9",
  },
  pricingDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  pricingDescriptionSelected: {
    color: "#6B7280",
  },
  boldText: {
    fontWeight: "bold",
    color: "#0EA5E9",
  },
  boldTextGray: {
    fontWeight: "bold",
    color: "#374151",
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0EA5E9",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  checkText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  termsLink: {
    color: "#0EA5E9",
    textDecorationLine: "underline",
  },
  buttonSpacer: {
    height: 100, // Space for fixed button
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  ctaButton: {
    backgroundColor: "#0EA5E9",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  ctaButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#000",
    borderRadius: 3,
    alignSelf: "center",
  },
});
