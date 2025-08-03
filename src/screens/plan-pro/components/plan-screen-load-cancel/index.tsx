import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { Image, StyleSheet, Text, Vibration, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../../components/button";
import Typography from "../../../../components/text";
import { useDialogModal } from "../../../../hook/handle-modal/hooks/actions";
import { colors } from "../../../../styles/colors";
import { useCancelPlanMutation } from "../../../../services/subscription";

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
export default function PlanScreenLoadCancel() {
  const { handleModal } = useDialogModal();
  const navigation = useNavigation();
  const [cancelPlan] = useCancelPlanMutation();
  const route = useRoute();

  useEffect(() => {
    const processPayment = async () => {
      try {
        const { googlePlanId, paymentToken } = route.params as {
          googlePlanId?: string;
          paymentToken?: string;
        };
        // Vibration.vibrate([0, 80, 120, 80]);
        // console.log("Processamento de pagamento concluído", "AAAAAAAAAA");
        // handleModal({
        //   isOpen: true,
        //   element: <AlertStatusOk />,
        // });
        await cancelPlan({
          googlePlanId: googlePlanId ?? "",
          paymentToken: paymentToken ?? "",
        }).unwrap();

        navigation.navigate("Home");
      } catch (error) {
        handleModal({
          isOpen: true,
          element: <AlertStatusError />,
        });
        navigation.navigate("Home");
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
        {/* <LottieView
          source={require("../../../../../assets/lottie/xnkQTBo0KA.json")}
          autoPlay
          loop
          style={styles.animation}
        /> */}
        <Ionicons
          name="close-circle-outline"
          size={96}
          color={colors.danger[600]}
        />
      </View>

      <SafeAreaView edges={["bottom"]}>
        <View style={styles.bottomContainer}>
          <Typography variant="BASE" family="regular">
            Aguarde até que o processamento de cancelamento seja concluído
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
