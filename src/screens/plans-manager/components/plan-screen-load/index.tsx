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
import Button from "../../../../components/button";
import { Ionicons } from "@expo/vector-icons";
import { Vibration } from "react-native";

const AlertStatusOk = () => {
  const { handleModal } = useDialogModal();

  return (
    <View>
      <SafeAreaView edges={["bottom"]}>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 24,
            paddingHorizontal: 16,
            alignContent: "center",
            gap: 12,
          }}
        >
          <LottieView
            source={require("../../../../../assets/lottie/JAjQ58rkNt.json")}
            autoPlay
            loop={false}
            style={styles.animationCard}
          />
          <View
            style={{
              width: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Typography
              variant="LG"
              family="semibold"
              color={colors.neutral[7]}
            >
              Parabéns, agora você é{" "}
              <Text style={{ color: colors.brand.default }}>PRO</Text>{" "}
            </Typography>
            <Typography
              variant="BASE"
              family="regular"
              color={colors.neutral[6]}
              style={{ textAlign: "center" }}
            >
              Aproveite todos os benefícios que o aplicativo oferece no plano
              PRO{" "}
            </Typography>
          </View>
        </View>
        <View
          style={{
            paddingTop: 16,
            paddingHorizontal: 16,
            width: "100%",
            borderTopWidth: 1,
            borderColor: colors.neutral[3],
          }}
        >
          <Button
            type="fill"
            size="large"
            onPress={() => {
              handleModal({
                isOpen: false,
              });
            }}
          >
            Aproveitar plano
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
};
const AlertStatusError = () => {
  const { handleModal } = useDialogModal();

  return (
    <View>
      <SafeAreaView edges={["bottom"]}>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 24,
            paddingHorizontal: 16,
            alignContent: "center",
            gap: 12,
          }}
        >
          <Ionicons
            name="alert-circle-sharp"
            size={24}
            color={colors.danger[600]}
          />

          <View
            style={{
              width: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Typography
              variant="LG"
              family="semibold"
              color={colors.neutral[7]}
            >
              Pagamento não realizado
            </Typography>
            <Typography
              variant="BASE"
              family="regular"
              color={colors.neutral[6]}
              style={{ textAlign: "center" }}
            >
              Ocorreu um problema ao processar sua compra. Por favor, verifique
              sua conexão e tente novamente. Se o problema persistir, entre em
              contato com o suporte.{" "}
            </Typography>
          </View>
        </View>
        <View
          style={{
            paddingTop: 16,
            paddingHorizontal: 16,
            width: "100%",
            borderTopWidth: 1,
            borderColor: colors.neutral[3],
          }}
        >
          <Button
            type="fill"
            size="large"
            onPress={() => {
              handleModal({
                isOpen: false,
              });
            }}
          >
            Aproveitar plano
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
};
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
        Vibration.vibrate([0, 80, 120, 80]);
        console.log("Processamento de pagamento concluído", "AAAAAAAAAA");
        handleModal({
          isOpen: true,
          element: <AlertStatusOk />,
        });
      } catch (error) {
        navigation.navigate("Home");
        handleModal({
          isOpen: true,
          element: <AlertStatusError />,
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
          source={require("../../../../../assets/lottie/xnkQTBo0KA.json")}
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
    width: 150,
    height: 96,
  },
  animationCard: {
    width: 190,
    height: 190,
  },
  phraseText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
  },
});
