import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useDialogNotification } from "../../hook/notification/hooks/actions";
import { ScreensType } from "../index.screens";
import { useForgotPasswordMutation, useVerifyByPasswordMutation, useVerifyMutation } from "../../hook/auth/slice/auth-api";
import Button from "../../components/button";
import { colors } from "../../styles/colors";
import Typography from "../../components/text";
import { Input } from "../../components/input/input.style";
import { CustomToast } from "../../components/toast";
import { useCodeCheckMutation } from '../../hook/auth/slice/auth-api';
import { useToast } from "../../hook/toast/useToast";

export default function ConfirmCode() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const route = useRoute();
  const { mode, email, name, password } = route.params as {
    mode:  "register" | "reset";
    email: string;
    name?: string;
    password?: string;
  };
  

  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(62);
  const [resendCode ] = useCodeCheckMutation();
  const [resendResetCode] = useForgotPasswordMutation();
  const [loadingResend, setLoadingResend] = useState(false);

  const inputs = useRef<(TextInput | null)[]>([]);
  const [hasError, setHasError] = useState(false);

  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const {toast, showToast, hideToast} = useToast();

  const handleInputChange = async (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);

    if (text && index < code.length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      await handleValidateCode(newCode.join(""));
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (text === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  React.useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const formattedTimer = `0${Math.floor(timer / 60)}:${
    timer % 60 < 10 ? "0" : ""
  }${timer % 60}`;

  const handleResendCode = async () => {
    console.log('Tentando reenviar código...');
    try {
      setLoadingResend(true); 
      if (mode === "register") {
        await resendCode({
          email,
          name: name!,
          password: password!,
        }).unwrap();
      } else if (mode === "reset") {
        await resendResetCode({ email }).unwrap();
      }
      showToast("Código reenviado com sucesso!", "success");
      setTimer(62);
    } catch (err: any) {
      console.log("Erro completo:", JSON.stringify(err, null, 2));
      showToast(err?.data?.message || "Erro ao reenviar código.", "danger");
    } finally{
      setLoadingResend(false);
    }
  };

  const [verify, { isLoading: loadingRegister }] = useVerifyMutation();
  const [verifyReset, { isLoading: loadingReset }] =
    useVerifyByPasswordMutation();
  const isLoading = mode === "register" ? loadingRegister : loadingReset;
  const { handleNotification } = useDialogNotification();

  const handleValidateCode = async (code: string) => {
    try {
      if (mode === "register") {
        const result = await verify({
          email,
          token: code,
        }).unwrap();
        setHasError(false);
        console.log(result);
        navigation.navigate("StoreRegistrationFlow", { ...result, name });
      } else {
        const { access_token } = await verifyReset({
          email,
          token: code,
        }).unwrap();
      navigation.navigate("NewPassword", {
          email,
          accessToken: access_token,
        } as any);
      }
    } catch (error: any) {
      setHasError(true);
      showToast("Código de confirmação inválido", "danger"); 
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {toast && (
        <CustomToast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onHide={hideToast}
          style={{ alignSelf: "center" }}
        />
      )}
      <View></View>
      <View>
        <Typography variant="XL" family="bold" style={styles.title}>
          Insira o código de confirmação
        </Typography>
        <Typography variant="SM" family="medium" style={styles.subtitle}>
          Um código de 4 dígitos foi enviado para o email
          {"\n"}
          <Typography variant="SM" family="medium" style={styles.email}>
            {email}
          </Typography>
        </Typography>

        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              // ref={(ref) => (inputs.current[index] = ref)}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={[
                styles.input,
                focusIndex === index && styles.focusedStyle,
                hasError && Input.inputError,
              ]}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              maxLength={1}
              value={digit}
              onFocus={() => setFocusIndex(index)}
              onBlur={() => setFocusIndex(null)}
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace("", index);
                }
              }}
              autoFocus={index === 0}
            />
          ))}
        </View>
      </View>
      <View>
        <Button
          onPress={() => handleValidateCode(code.join(""))}
          variant="primary"
          type="fill"
          size="large"
          isLoading={isLoading || loadingResend}
          disabled={isLoading || loadingResend}
        >
          {isLoading
            ? "Validando..."
            : loadingResend
            ? "Reenviando código..."
            : "Validar código"}
        </Button>
        {timer > 0 ? (
          <Typography variant="BASE" family="medium" style={styles.resendText}>
            Não recebeu o código?{" "}
            <Typography variant="BASE" family="medium" style={styles.timer}>
              Aguarde {formattedTimer}
            </Typography>
          </Typography>
        ) : (
          <Button
            onPress={handleResendCode}
            type="ghost"
            size="large"
            disabled={false}
          >
            Reenviar código
          </Button>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    color: colors.neutral["500"],
  },
  email: {
    fontWeight: "normal",
    color: colors.brand.default,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    marginBottom: 24,
  },
  input: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.neutral["300"],
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4CAF93",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendText: {
    marginTop: 16,
    textAlign: "center",
    color: colors.neutral["900"],
  },
  timer: {
    color: colors.neutral["500"],
  },
  focusedStyle: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.primary["600"],
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
  },
});
