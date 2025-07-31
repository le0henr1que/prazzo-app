import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { colors } from "../../../../styles/colors";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "../../../../components/text";
import { useDialogModal } from "../../../../hook/handle-modal/hooks/actions";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCreatePaymentRequestMutation } from "../../../../services/subscription";

export default function PlanScreenLoad() {
  const { handleModal } = useDialogModal();
  const navigation = useNavigation();
  const [createPaymentRequest, { isLoading: isLoadingPaymentMethod }] =
    useCreatePaymentRequestMutation();
  const route = useRoute();
  useEffect(() => {
    const processPayment = async () => {
      try {
        // Pegue os dados do navigation
        const { googlePlanId, paymentToken } = route.params as {
          googlePlanId?: string;
          paymentToken?: string;
        };

        await createPaymentRequest({
          googlePlanId: googlePlanId ?? "",
          paymentToken: paymentToken ?? "",
        }).unwrap();

        navigation.navigate("Home");

        handleModal({ isOpen: true, element: <Text>Teste</Text> });
      } catch (error) {
        handleModal({
          isOpen: true,
          element: <Text>Erro ao habilitar plano</Text>,
        });
      }
    };

    processPayment();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.topContainer}>
          <Image
            source={require("../../../../../assets/default/noprazo-brand.png")}
            style={{
              resizeMode: "contain",
              marginTop: 24,
            }}
          />
        </View>
      </SafeAreaView>

      <View style={styles.middleContainer}>
        <LottieView
          source={require("../../../../../assets/lottie/house-animation.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <SafeAreaView edges={["bottom"]}>
        <View style={styles.bottomContainer}>
          <Typography variant="BASE" family="regular">
            Estamos habilitando seu novo plano
          </Typography>
          <Typography variant="BASE" family="regular">
            Aguarde alguns segundos...
          </Typography>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Distribui o espaço verticalmente
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: colors.brand.default,
    paddingHorizontal: 20,
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
  },
  middleContainer: {
    flex: 1, // Permite que este container ocupe o espaço restante no meio
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  animation: {
    width: 500,
    height: 500,
  },
  phraseText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
  },
});
