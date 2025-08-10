import { Image, StyleSheet, View } from "react-native";
import { colors } from "../../../styles/colors";
import Typography from "../../../components/text";
import { Plan } from "../../../enum/plan";
import { useAuth } from "../../../hook/auth";
import { useEffect, useState } from "react";
import { API_URL } from "@env";

const Badge = ({ plan }: { plan: Plan }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: -7,
      alignSelf: "center",
      padding: 4,
      borderRadius: 4,
      backgroundColor: plan === Plan.FREE ? "white" : "#00A2E9",
    }}
  >
    <Typography
      color={plan === Plan.FREE ? colors.brand.dark : "white"}
      variant="XS"
      family="bold"
    >
      {plan}
    </Typography>
  </View>
);

export function UserInformation() {
  const { isLoading, user } = useAuth();
  const { name: userPlan } = user?.subscription?.plan || { name: Plan.FREE };
  const [avatar, setAvatar] = useState<string | null>(null);

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
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "flex-start",
        }}
      >
        <Image
          key="avatar"
          source={{
            uri: avatar || "https://via.placeholder.com/64",
          }}
          style={styles.image}
          onError={(error) =>
            console.log("Image load error:", error.nativeEvent.error)
          }
        />
        <Badge plan={userPlan} />
      </View>
      <View style={styles.title}>
        <Typography variant="LG" family="semibold" color={colors.white}>
          {user?.name || "Usuário Desconhecido"}
        </Typography>
        <Typography variant="SM" family="medium" color={colors.white}>
          Dono
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    flexDirection: "row",
    width: "100%",
    gap: 13,
  },
  title: {
    flex: 1,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.white,
    resizeMode: "cover",
    backgroundColor: colors.neutral["200"],
  },
});
