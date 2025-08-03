import React, { useState, useCallback, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  PanResponder,
} from "react-native";
import BellIcon from "../../../assets/icons/bell";
import InformationIcon from "../../../assets/icons/information";
import { colors } from "../../styles/colors";
import Button from "../../components/button";
import { roles } from "../../enum/role";
import { useMeQuery } from "../../services/me";
import { useDispatch } from "react-redux";
import { API_URL } from "@env";
import { Plan } from "../../enum/plan";
import { PremiumInformation } from "./components/premium-information";
import { useAuth } from "../../hook/auth";
import { ScreensType } from "../index.screens";
import { House } from "phosphor-react-native";

function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const notificationCount = 1;

  const { signOut, isLoading, user } = useAuth();
  const [avatar, setAvatar] = useState<string | null>(null);
  const { name } = user?.subscription?.plan || { name: Plan.FREE };
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const redirectTo = name === Plan.FREE ? "PlanScreen" : "PlanPro";
  // PanResponder para detectar o gesto de puxar
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          // Só permite puxar para baixo
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // Se o usuário puxar mais de 100 pixels, inicia o refresh
          setRefreshing(true);
          // refetch().finally(() => {
          //   setRefreshing(false);
          // });
        }
      },
    })
  ).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setAvatar(user?.avatar);
    // refetch().finally(() => setRefreshing(false));
  }, [user?.avatar]);

  useEffect(() => {
    if (user && user.avatar) {
      if (user.avatar.startsWith("http")) {
        setAvatar(user.avatar);
      } else {
        setAvatar(`${API_URL}${user.avatar}`);
      }
    } else {
      setAvatar(null);
    }
  }, [user]);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {refreshing && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={"white"} />
        </View>
      )}
      <ImageBackground
        source={require("../../../assets/background.png")}
        style={styles.banner}
        resizeMode="contain"
        resizeMethod="auto"
        imageStyle={{ left: 140 }}
      >
        <SafeAreaView style={{ width: "100%", flex: 1 }}>
          <View style={styles.header}>
            <Image
              source={require("../../../assets/only-logo.png")}
              style={styles.logoWhite}
            />
            <View style={styles.iconsHeader}>
              <InformationIcon size={40} />
              <TouchableOpacity
                onPress={() => navigation.navigate("Notification")}
              >
                <BellIcon size={40} color="black" />

                {notificationCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.avatarContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-start",
              }}
            >
              <Image
                key={refreshing ? "refreshing" : "avatar"}
                source={{
                  uri: avatar || "https://via.placeholder.com/64",
                }}
                style={styles.image}
                onError={(error) =>
                  console.log("Image load error:", error.nativeEvent.error)
                }
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: -10,
                  alignSelf: "center",
                  padding: 4,
                  borderRadius: 4,
                  backgroundColor: name === Plan.FREE ? "white" : "#E8CC3C",
                }}
              >
                <Text
                  style={{
                    color: name === Plan.FREE ? colors.primary["600"] : "white",
                    fontSize: 12,
                    fontWeight: "700",
                    lineHeight: 16,
                    textAlign: "center",
                  }}
                >
                  {name}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 18,
                  fontWeight: "600",
                  lineHeight: 28,
                  textAlign: "left",
                }}
              >
                {user?.name}
              </Text>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: "500",
                  lineHeight: 24,
                  textAlign: "left",
                }}
              >
                {roles[user?.roles?.[0] as never] as never}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", padding: 20 }}>
            {name === Plan.FREE && <PremiumInformation />}
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* Conteúdo da Tela */}
      <ScrollView
        style={{
          flex: 1.1,
          backgroundColor: "#fff",
          borderRadius: 24,
          width: "100%",
          marginTop: name === Plan.FREE ? -20 : -180,
          padding: 20,
        }}
      >
        <Text
          style={{
            color: colors.neutral["500"],
            fontSize: 16,
            fontWeight: "500",
            lineHeight: 24,
            textAlign: "left",
            marginBottom: 12,
          }}
        >
          Configurações da conta
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={{
            paddingVertical: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={colors.neutral["900"]}
            />
            <Text
              style={{
                color: colors.neutral["900"],
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24,
                textAlign: "left",
              }}
            >
              Informações Pessoais
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["500"]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("ModifyPassword")}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color={colors.neutral["900"]}
            />
            <Text
              style={{
                color: colors.neutral["900"],
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24,
                textAlign: "left",
              }}
            >
              Alterar Senha
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["500"]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate(redirectTo)}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Ionicons
              name="medal-outline"
              size={24}
              color={colors.neutral["900"]}
            />
            <Text
              style={{
                color: colors.neutral["900"],
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24,
                textAlign: "left",
              }}
            >
              Minhas assinaturas
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["500"]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("ManageNotifications")}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.neutral["900"]}
            />
            <Text
              style={{
                color: colors.neutral["900"],
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24,
                textAlign: "left",
              }}
            >
              Notificações
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["500"]}
          />
        </TouchableOpacity>

        <View>
          <Text
            style={{
              color: colors.neutral["500"],
              fontSize: 16,
              fontWeight: "500",
              lineHeight: 24,
              textAlign: "left",
              marginBottom: 12,
            }}
          >
            Suporte
          </Text>
        </View>

        <TouchableOpacity
          style={{
            paddingVertical: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("FAQ")}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Ionicons
              name="help-circle-outline"
              size={24}
              color={colors.neutral["900"]}
            />
            <Text
              style={{
                color: colors.neutral["900"],
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24,
                textAlign: "left",
              }}
            >
              Central de ajuda
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["500"]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("TermsScreen")}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.neutral["900"]}
            />
            <Text
              style={{
                color: colors.neutral["900"],
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24,
                textAlign: "left",
              }}
            >
              Termos de uso
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["500"]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Ionicons
              name="share-social-outline"
              size={24}
              color={colors.neutral["900"]}
            />
            <Text
              style={{
                color: colors.neutral["900"],
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24,
                textAlign: "left",
              }}
            >
              Compartilhe com um amigo
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["500"]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Ionicons
              name="star-outline"
              size={24}
              color={colors.neutral["900"]}
            />
            <Text
              style={{
                color: colors.neutral["900"],
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24,
                textAlign: "left",
              }}
            >
              Avalie nosso app
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["500"]}
          />
        </TouchableOpacity>

        <View
          style={{
            width: "100%",
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.neutral["500"],
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 20,
              textAlign: "left",
              marginBottom: 12,
            }}
          >
            Versão 1.2.3 (3232832893298)
          </Text>
        </View>
        <Button
          variant="neutral"
          size="medium"
          onPress={() => {
            signOut();
          }}
        >
          Sair do Aplicativo
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loading: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  avatarContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    gap: 13,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    resizeMode: "cover",
    backgroundColor: colors.neutral["200"],
  },
  badge: {
    position: "absolute",
    right: 0,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    height: 20,
    minWidth: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  banner: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.primary["700"],
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    width: "100%",
  },
  logoWhite: {
    height: 40,
    resizeMode: "contain",
  },
  iconsHeader: {
    flexDirection: "row",
    gap: 12,
  },
});

export default Profile;
