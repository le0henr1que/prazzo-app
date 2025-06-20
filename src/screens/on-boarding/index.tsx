import { StatusBar, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { Image } from "react-native";
import Button from "../../components/button";
import Typography from "../../components/text";
import { styles } from "./on-boarding.style";
import { colors } from "../../styles/colors";

interface ButtonsProps {
  navigation: NavigationProp<any>;
}

const OnboardingScreen = ({ navigation }: ButtonsProps) => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <Image
          source={require("../../../assets/init.png")}
          style={styles.Image}
        />
        <Image
          source={require("../../../assets/default/prazologofinal.png")}
          style={styles.logo}
        />
        <View style={styles.divContent}>
          <Typography
            variant="3XL"
            family="bold"
            style={{ color: "rgba(255, 255, 255, 0.90)" }}
          >
            Controle a validade {"\n"}dos seus produtos
          </Typography>
          <Typography
            variant="BASE"
            family="regular"
            style={{ color: "rgba(255, 255, 255, 0.80)" }}
          >
            O Expiral oferece controle preciso das datas{"\n"} de validade, com
            notificações e {"\n"}gerenciamento completo do seu estoque.
          </Typography>
        </View>
      </View>

      <Buttons navigation={navigation} />
      <Typography
        variant="SM"
        family="medium"
        style={{
          textAlign: "center",
          color: colors.neutral["500"],
        }}
      >
        Não possui conta?
        <Typography
          onPress={() => navigation.navigate("Register")}
          variant="SM"
          family="bold"
          style={{
            marginTop: 16,
            textAlign: "center",
            color: colors.brand.default,
          }}
        >
          {" "}
          Registre-se
        </Typography>
      </Typography>
    </>
  );
};

const Buttons = ({ navigation }: ButtonsProps) => (
  <View style={styles.buttonContainer}>
    <View style={{ width: "100%", marginTop: 0 }}>
      <Button
        onPress={() => navigation.navigate("Login")}
        variant="primary"
        type="fill"
        size="large"
        disabled={false}
      >
        Acessar minha conta
      </Button>
    </View>
    <View
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 2,
      }}
    >
      <View style={styles.line} />
      <Typography
        variant="SM"
        family="medium"
        style={{ color: colors.neutral[500] }}
      >
        Ou faça login com
      </Typography>
      <View style={styles.line} />
    </View>

    <View style={{ width: "100%", marginTop: 1 }}>
      <Button
        variant="neutral"
        type="outlined"
        /*    onPress={Login.googleLogin} */
      >
        <Image source={require("../../../assets/google.png")} />
        Google
      </Button>
    </View>
  </View>
);

export default OnboardingScreen;
