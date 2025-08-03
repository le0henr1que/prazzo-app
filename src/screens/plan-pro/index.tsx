import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Typography from "../../components/text";
import Button from "../../components/button";
import Header from "../../components/header";
import CardPlan from "./components/card";
import ListPlan from "./components/list-plan";
import { colors } from "../../styles/colors";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";
import * as RNIap from "react-native-iap";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../services/http";
import { Tags } from "../../utils/tags";

export default function PlanProScreen() {
  const navigation = useNavigation();
  const { handleModal } = useDialogModal();
  const [loading, setLoading] = useState(false);

  // Função para cancelar assinatura Google
  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      // Buscar todas as assinaturas ativas do usuário
      const subscriptions = await RNIap.getAvailablePurchases();
      // Encontrar a assinatura do produto (ajuste conforme seu productId)
      const subscription = subscriptions.find(
        (sub) => sub.productId && sub.productId.includes("")
      ); // ajuste se necessário
      if (!subscription) {
        handleModal({
          isOpen: true,
          element: (
            <>
              <Typography
                variant="BASE"
                family="bold"
                style={{ textAlign: "center", marginBottom: 8 }}
              >
                Nenhuma assinatura ativa encontrada.
              </Typography>
            </>
          ),
        });
        setLoading(false);
        return;
      }
      // Cancelamento: abrir URL de gerenciamento de assinaturas Google
      await RNIap.deepLinkToSubscriptionsAndroid({
        sku: subscription.productId,
      });
      navigation.navigate("PlanScreenLoadCancel", {
        googlePlanId: subscription.productId,
        paymentToken: subscription.transactionId,
      });
      // Opcional: exibir modal de confirmação
    } catch (error) {
      navigation.navigate("PlanScreenLoadCancel", {
        googlePlanId: subscription.productId,
        paymentToken: subscription.transactionId,
      });
      handleModal({
        isOpen: true,
        element: (
          <>
            <Typography
              variant="BASE"
              family="bold"
              style={{
                textAlign: "center",
                marginBottom: 8,
                color: colors.danger[600],
              }}
            >
              Erro ao processar o cancelamento da assinatura.
            </Typography>
          </>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  // Confirmação antes de cancelar
  const confirmCancel = () => {
    handleModal({
      isOpen: true,
      title: "Cancelar assinatura",
      element: (
        <>
          <Typography
            variant="BASE"
            family="bold"
            style={{ textAlign: "center", marginBottom: 8 }}
          >
            Tem certeza que deseja cancelar sua assinatura?
          </Typography>
          <View>
            <Button
              variant="danger"
              size="large"
              isLoading={loading}
              onPress={handleCancelSubscription}
            >
              Confirmar Cancelamento
            </Button>
          </View>
        </>
      ),
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Header.Root>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            height: 56,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#343330" />
          </TouchableOpacity>
          <Typography variant={"BASE"} family={"semibold"}>
            Minha Assinatura
          </Typography>
        </View>
      </Header.Root>
      <View style={styles.content}>
        <View style={styles.columnCard}>
          <CardPlan />
        </View>
        <View style={styles.columList}>
          <ListPlan />
        </View>
      </View>
      <View style={styles.bottomDown}>
        <Button
          type="outlined"
          variant="danger"
          size="large"
          isLoading={loading}
          onPress={confirmCancel}
        >
          Cancelar Assinatura
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    flex: 1,
  },
  columnCard: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 22,
  },
  columList: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  bottomDown: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#EDF2F7",
    shadowColor: "#979797",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8, // for Android shadow
  },
});
