import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useDialogNotification } from "../../hook/notification/hooks/actions";
import { ScreensType } from "../index.screens";
import { useVerifyMutation } from "../../hook/auth/slice/auth-api";
import Button from "../../components/button";
import { colors } from "../../styles/colors";

export default function ConfirmCode() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const route = useRoute();
  const { email, name } = route.params as any;

  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(62);
  const inputs = useRef<(TextInput | null)[]>([]);

  const [focusIndex, setFocusIndex] = useState<number | null>(null);

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

  const [verify, { isLoading }] = useVerifyMutation();
  const { handleNotification } = useDialogNotification();

  const handleValidateCode = async (code: string) => {
    try {
      const result = await verify({
        email,
        token: code,
      }).unwrap();
      console.log(result);
      navigation.navigate("StoreRegistrationFlow", { ...result, name });
    } catch (error: any) {
      handleNotification({
        isOpen: true,
        variant: "error",
        title: "Erro ao validar código",
        message: error?.data?.messages[0] || "Ocorreu um erro",
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View></View>
      <View>
        <Text style={styles.title}>Insira o código de confirmação</Text>
        <Text style={styles.subtitle}>
          Um código de 4 dígitos foi enviado para o email
          {"\n"}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              // ref={(ref) => (inputs.current[index] = ref)}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={[
                focusIndex === index ? styles.focusedStyle : styles.input,
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
          isLoading={isLoading}
          disabled={false}
        >
          Validar código
        </Button>

        <Text style={styles.resendText}>
          Não recebeu o código?{" "}
          <Text style={styles.timer}>Aguarde {formattedTimer}</Text>
        </Text>
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
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
    color: colors.neutral["500"],
    fontWeight: "normal",
    lineHeight: 20,
  },
  email: {
    fontWeight: "normal",
    color: colors.primary["600"],
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
    fontWeight: "normal",
    lineHeight: 24,
    color: colors.neutral["900"],
  },
  timer: {
    fontWeight: "normal",
    lineHeight: 24,
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
