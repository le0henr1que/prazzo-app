import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import Button from "../../components/button";
import Typography from "../../components/text";
import { Plan } from "../../enum/plan";
import { useAuth } from "../../hook/auth";
import { colors } from "../../styles/colors";
import { ScreensType } from "../index.screens";
import { Header } from "./components/header";
import AccountConfig from "./components/list-config";
import ListHelp from "./components/list-suport";
import { PremiumInformation } from "./components/premium-information";
import { UserInformation } from "./components/user-information";

function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();

  const { signOut, user } = useAuth();
  const { name: userPlan } = user?.subscription?.plan || { name: Plan.FREE };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary["700"] }}>
      <ImageBackground
        source={require("../../../assets/background.png")}
        style={styles.banner}
        resizeMode="contain"
        resizeMethod="auto"
        imageStyle={{ left: 140 }}
      >
        <Header />
        <View style={{ marginTop: 8 }}>
          <UserInformation />
        </View>
        {userPlan === Plan.FREE && (
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 19,
            }}
          >
            <PremiumInformation />
          </View>
        )}
      </ImageBackground>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <AccountConfig userPlan={userPlan} />
        <ListHelp />
        <View style={styles.versionInfo}>
          <Typography variant="SM" family="regular" color={colors.neutral[5]}>
            Versão 1.2.3 (3232832893298)
          </Typography>
        </View>
        <View style={styles.logout}>
          <Button
            variant="neutral"
            size="medium"
            onPress={() => {
              signOut();
            }}
          >
            Sair do Aplicativo
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    paddingBottom: 19,
    height: "auto",
  },
  logout: {
    marginTop: 10,
    display: "flex",
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  versionInfo: {
    marginTop: 14,
    display: "flex",
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#fff",
    paddingTop: 24,
  },
});

export default Profile;
