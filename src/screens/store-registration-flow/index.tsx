import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ProgressBar, RadioButton } from "react-native-paper";
import Svg, { Path } from "react-native-svg";
import { useDispatch } from "react-redux";
import LoadingIcon1 from "../../../assets/icons/loading";
import CustomIcon from "../../../assets/icons/logo2";
import PersonIcon2 from "../../../assets/icons/person-icon2";
import StoreIcon2 from "../../../assets/icons/store-icon2";
import {
  labelNotificationTimeEnum,
  NotificationTimeEnum,
} from "../../enum/notification";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";
import Button from "../../components/button";
import { CustomInput } from "../../components/input";
import { Input } from "../../components/input/input.style";
import { useRegisterMutation } from "../../hook/auth/slice/auth-api";
import { setToken } from "../../hook/auth/slice/auth-slice";
import { useAuth } from "../../hook/auth";
import SwitchStoreLoad from "../../components/switch-store-load";
import messaging from "@react-native-firebase/messaging";

const Stack = createNativeStackNavigator();

// Barra de progresso
const ProgressHeader = ({ progress }: { progress: number }) => (
  <ProgressBar
    progress={progress}
    color={colors.primary["600"]}
    style={styles.progressBar}
  />
);

//tela0: Objetivo do estabelcimento

function ObjectiveScreen({
  navigation,
  formMethods,
}: {
  navigation: any;
  formMethods: any;
}) {
  const [checked, setChecked] = useState("owners");
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const [isModalVisible, setIsModalVisible] = useState(false);
  setValue("Objective", checked);
  const onSubmit = (data: any) => {
    if (checked === "member") {
      setIsModalVisible(true); // Exibe o modal
    } else {
      navigation.navigate("Establishment", { ...data });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 24,
          marginBottom: 32,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <CustomIcon />
        </View>
        <View>
          <Text style={styles.title}>
            Antes de começarmos, qual seu objetivo com o aplicativo.
          </Text>
          <Text style={styles.subtitle}>
            Selecione se você é o dono da sua própria loja, promotor de
            merchandising se foi convidado para acessar uma loja existente.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.radioItem, checked === "owner" && styles.checked]}
          onPress={() => setChecked("owner")}
        >
          <View style={styles.radioGroup1}>
            <View style={styles.icon}>
              <StoreIcon2 />
            </View>
            <View>
              <Text style={styles.titleButton}>Sou dono da loja</Text>
              <Text style={styles.radioText}>
                Quero gerenciar e administrar meu {"\n"}
                próprio estabelecimento.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioItem, checked === "member" && styles.checked]}
          onPress={() => setChecked("member")}
        >
          <View style={styles.radioGroup1}>
            <View style={styles.icon}>
              <PersonIcon2 />
            </View>
            <View>
              <Text style={styles.titleButton}>Sou membro (convidado)</Text>
              <Text style={styles.radioText}>
                Fui convidado para colaborar em uma {"\n"}loja e possuo o código
                de acesso.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ gap: 16 }}>
        <Button
          style={styles.button}
          type="fill"
          size="large"
          onPress={handleSubmit(onSubmit)}
        >
          Continuar
        </Button>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Insira abaixo o código recebido
            </Text>
            <View style={styles.divider} />
            <View style={styles.inputViewCod}>
              <CustomInput
                errors={errors}
                name="cod"
                placeholder="Ex: 12345344343"
              />
            </View>
            <View style={styles.divider2} />
            <View style={styles.buttonModalG}>
              <Button
                style={styles.button3}
                type="fill"
                size="medium"
                variant="neutral"
                onPress={() => navigation.goBack()}
              >
                Cancelar
              </Button>
              <Button
                style={styles.button2}
                type="fill"
                size="large"
                onPress={handleSubmit(onSubmit)}
              >
                Continuar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Tela 1: Nome do Estabelecimento
function EstablishmentScreen({
  navigation,
  formMethods,
  route,
}: {
  navigation: any;
  formMethods: any;
  route: any;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = formMethods;
  const [isFocused, setIsFocused] = useState(false);
  const [checked, setChecked] = useState("");
  const storeName = watch("storeName");
  const onSubmit = (data: any) => {
    navigation.navigate("Notifications", { ...data, ...route });
  };
  useEffect(() => {
    if (storeName && storeName.trim() !== "") {
      setChecked(storeName);
    } else {
      setChecked("");
    }
  }, [storeName]);

  return (
    <View style={styles.container}>
      <View>
        <ProgressHeader progress={0.0} />

        <View>
          <Text style={styles.title}>
            Seja bem vindo <Text style={styles.highlight}>{route?.name}</Text>.
            Para começar, insira o nome do seu estabelecimento.
          </Text>
          <Text style={styles.subtitle}>
            Não se preocupe, você poderá alterar os dados depois.
          </Text>
        </View>
        <View style={Input.inputView}>
          <Text style={Input.label}>Nome do estabelecimento</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                errors={errors}
                name="storeName"
                placeholder="Ex: Loja Estrela"
                onBlur={() => {
                  setIsFocused(false);
                  onBlur();
                }}
                onFocus={() => setIsFocused(true)}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="storeName"
          />
          {errors.storeName && (
            <Text style={Input.errorText}>
              Nome do estabelecimento é obrigatório.
            </Text>
          )}
        </View>
      </View>
      <View>
        <Button
          style={[styles.button, checked === "" && { opacity: 0.5 }]}
          type="fill"
          size="large"
          onPress={handleSubmit(onSubmit)}
          disabled={checked === ""}
        >
          Continuar
        </Button>
      </View>
    </View>
  );
}

// Tela 2: Deseja receber notificações?
function NotificationsScreen({
  navigation,
  formMethods,
}: {
  navigation: any;
  formMethods: any;
}) {
  const [checked, setChecked] = useState("");
  const { setValue, handleSubmit } = formMethods;
  const route = useRoute();
  const params = route.params;
  useEffect(() => {
    setValue("notifications", checked);
  }, [checked]);

  const onSubmit = (data: any) => {
    navigation.navigate("Expiration", { ...data, ...params });
  };

  const CustomIcon = () => (
    <Svg width="11" height="10" viewBox="0 0 11 10" fill="none">
      <Path
        d="M2.0625 5.625L4.25 7.8125L9.25 2.8125"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  return (
    <View style={styles.container}>
      <View>
        <ProgressHeader progress={0.5} />
        <View>
          <Text style={styles.title}>
            Certo! Você deseja receber notificações dos vencimentos?
          </Text>
          <Text style={styles.subtitle}>
            Iremos notificar para você quando o produto ou o lote estiver
            vencido ou próximo da data de validade. Não se preocupe, você poderá
            alterar isso depois.
          </Text>
        </View>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioItemNotification,
              checked === "yes" && styles.checked,
            ]}
            onPress={() => setChecked("yes")}
          >
            <Image source={require("../../../assets/bell.png")} />
            <Text style={styles.radioItemText}>
              Sim, desejo receber notificações pelo{" "}
              <Text style={{ fontFamily: typography.fontFamily.bold }}>
                aplicativo
              </Text>
            </Text>
            <View style={styles.radioButton}>
              {checked === "yes" && (
                <View style={styles.radioButtonChecked}>
                  <Svg width="11" height="10" viewBox="0 0 11 10" fill="none">
                    <Path
                      d="M2.0625 5.625L4.25 7.8125L9.25 2.8125"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioItemNotification,
              checked === "not" && styles.checked,
              { justifyContent: "center", alignItems: "center" },
            ]}
            onPress={() => setChecked("not")}
          >
            <Image source={require("../../../assets/not-bell.png")} />
            <Text style={styles.radioItemText}>
              Não desejo receber notificações
            </Text>
            {checked === "not" && <Text style={styles.checkMark}>✔</Text>}
            <View style={styles.radioButton}>
              {checked === "not" && (
                <View style={styles.radioButtonChecked}>
                  <Svg width="11" height="10" viewBox="0 0 11 10" fill="none">
                    <Path
                      d="M2.0625 5.625L4.25 7.8125L9.25 2.8125"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ gap: 16 }}>
        <Button
          style={[styles.button, checked === "" && { opacity: 0.5 }]}
          type="fill"
          size="large"
          onPress={handleSubmit(onSubmit)}
          disabled={checked === ""}
        >
          Continuar
        </Button>
        <Button
          type="fill"
          size="medium"
          variant="neutral"
          onPress={() => navigation.goBack()}
        >
          Voltar
        </Button>
      </View>
    </View>
  );
}

// Tela 3: Intervalo de notificações
function ExpirationScreen({
  navigation,
  formMethods,
}: {
  navigation: any;
  formMethods: any;
}) {
  const [checked, setChecked] = useState("");
  const [selected, setSelected] = useState("");
  const [customDays, setCustomDays] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const route = useRoute();
  const params = route.params;
  const onSubmit = (data: any) => {
    const amount = selected || customDays || data.amount; // Exemplo de fallback
    navigation.navigate("Loading", {
      amount: amount,
      ...params,
    });
  };

  useEffect(() => {
    if (selected !== "" || customDays !== "") {
      setChecked("valid");
    } else {
      setChecked("");
    }
  }, [selected, customDays]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View>
          <ProgressHeader progress={1} />
          <Text style={styles.title}>
            Quase lá! Em quantos dias antes do vencimento você deseja ser
            notificado?
          </Text>
          <Text style={styles.subtitle}>
            Configure o intervalo de dias que você deseja receber notificações
            sobre os produtos prestes a vencer.
          </Text>
        </View>
        <View style={{ marginBottom: 32 }}>
          {[
            NotificationTimeEnum.DAILY,
            NotificationTimeEnum.WEEKLY,
            NotificationTimeEnum.HALF_MONTHLY,
            NotificationTimeEnum.MONTHLY,
            NotificationTimeEnum.FORTY_FIVE_DAYS,
            NotificationTimeEnum.THIRTY_MONTHLY,
          ].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => setSelected(option)}
            >
              <RadioButton
                value={option}
                color={colors.primary["600"]}
                status={selected === option ? "checked" : "unchecked"}
                onPress={() => setSelected(option)}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: colors.neutral["900"],
                  lineHeight: 24,
                  fontFamily: typography.fontFamily.semibold,
                  /* fontWeight: 500, */
                }}
              >
                {
                  labelNotificationTimeEnum[
                    option as keyof typeof labelNotificationTimeEnum
                  ]
                }
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View>
        <View style={{ gap: 16 }}>
          <Button
            style={[styles.button, checked === "" && { opacity: 0.5 }]}
            type="fill"
            size="large"
            onPress={handleSubmit(onSubmit)}
            disabled={checked === ""}
          >
            Continuar
          </Button>
          <Button
            type="fill"
            size="medium"
            variant="neutral"
            onPress={() => navigation.goBack()}
          >
            Voltar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

// Tela 4: Carregando
export function RedirectTo() {
  const route = useRoute();
  const { params } = route;
  const { registerAndLogin } = useAuth();

  const onSubmit = async () => {
    console.log("Iniciando o registro e login...", params);
    const fcmToken = await messaging().getToken();

    const data = {
      organization_name: "Primeira Loja",
      isNotification: true,
      notificationInterval: NotificationTimeEnum.DAILY,
      access_token: (params as any)?.access_token,
      notification_token: fcmToken,
    };
    try {
      await registerAndLogin(data);
    } catch (error) {
      console.error("Erro ao registrar e fazer login:", error);
      return;
    }
  };

  useEffect(() => {
    onSubmit();
  }, []);

  return <SwitchStoreLoad />;
}

// export default function StoreRegistrationFlow() {
//   const formMethods = useForm();
//   const route = useRoute();

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Objective">
//         {(props) => <ObjectiveScreen {...props} formMethods={formMethods} />}
//       </Stack.Screen>
//       <Stack.Screen name="Establishment">
//         {(props) => (
//           <EstablishmentScreen
//             {...props}
//             formMethods={formMethods}
//             route={route.params}
//           />
//         )}
//       </Stack.Screen>
//       <Stack.Screen name="Notifications">
//         {(props) => (
//           <NotificationsScreen {...props} formMethods={formMethods} />
//         )}
//       </Stack.Screen>
//       <Stack.Screen name="Expiration">
//         {(props) => <ExpirationScreen {...props} formMethods={formMethods} />}
//       </Stack.Screen>
//       <Stack.Screen name="Loading" component={LoadingScreen} />
//     </Stack.Navigator>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 60,
    justifyContent: "space-between",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 32,
    fontFamily: typography.fontFamily.extrabold,
    color: colors.neutral["900"],
    lineHeight: 28,
    marginBottom: 16,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    color: "#71727A",
    /* fontWeight: "normal", */
    fontFamily: typography.fontFamily.regular,
    lineHeight: 24,
    textAlign: "left",
  },
  highlight: {
    color: colors.primary["600"],
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: colors.primary["600"],
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: colors.primary["600"],
  },
  radioItem: {
    gap: 8,
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.neutral["300"],
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
    padding: 16,
    position: "relative",
  },
  radioItemNotification: {
    gap: 8,
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.neutral["300"],
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    position: "relative",
  },

  radioItemText: {
    flex: 1,
    flexWrap: "wrap",
    // fontFamily: "Inter_400Regular",
    color: colors.neutral["900"],
    fontSize: 14,
    /* fontWeight: "normal", */
    fontFamily: typography.fontFamily.regular,
    lineHeight: 20,
  },
  radioGroup1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "12dp",
    flex: 1,
    flexBasis: 0,
    flexShrink: 0,
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    color: colors.neutral["900"],
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "medium",
  },
  titleButton: {
    fontSize: 14,
    color: colors.neutral["900"],
    /* fontWeight: 600,
    fontStyle: "normal", */
    fontFamily: typography.fontFamily.semibold,
    lineHeight: 20,
  },
  radioText: {
    fontSize: 14,
    fontStyle: "normal",
    color: colors.neutral["500"],
    lineHeight: 20,
    fontWeight: "normal",
    marginTop: 6,
  },
  checked: {
    borderWidth: 2,
    borderColor: "#0891B2",
    backgroundColor: "#FFF",
  },
  logo: {
    alignItems: "center",
    marginTop: 3,
    marginBottom: 32,
  },
  checkMark: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  radioButton: {
    height: 16,
    width: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.neutral["400"],
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonChecked: {
    height: 16,
    width: 16,
    borderRadius: 10,
    backgroundColor: colors.primary["600"],
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 12,
    padding: 10,
    height: 40,
    width: 40,
    justifyContent: "center",
    flexShrink: 0,
    display: "flex",
    borderRadius: 20,
    backgroundColor: colors.primary["50"],
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    flexShrink: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#FFF",
    paddingTop: 8,
    alignItems: "center",
    height: 335,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 28,
    marginBottom: 20,
    marginTop: 16,
  },
  modalText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  buttonModalG: {
    paddingHorizontal: 16,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
    flexDirection: "row",

    marginTop: 16,
  },
  button2: {
    backgroundColor: colors.primary["600"],
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 8,
    gap: 8,
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  button3: {
    backgroundColor: colors.neutral["100"],
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 139,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  inputViewCod: {
    width: "100%",
    display: "flex",
    gap: 6,
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral["200"],
    marginBottom: 24,
    width: 400,
  },
  divider2: {
    height: 1,
    backgroundColor: colors.neutral["200"],
    marginTop: 83,
    width: 400,
  },
});
