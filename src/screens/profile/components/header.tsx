import { Bell, Question } from "phosphor-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../styles/colors";
import Typography from "../../../components/text";

export function Header() {
  const notificationCount = 2; // Replace with actual notification count logic
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/default/prazologofinal.png")}
          style={styles.logoWhite}
        />
        <View style={styles.options}>
          <TouchableOpacity style={styles.option}>
            <Question size={24} color={colors.neutral[7]} weight="bold" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Bell size={24} color={colors.neutral[7]} weight="bold" />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Typography variant="SM" family="bold" color={colors.white}>
                  {notificationCount > 99 ? "99+" : notificationCount}
                </Typography>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    // paddingTop: Platform.OS === "android" ? StatusBar?.currentHeight + 20 : 0,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    height: 20,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    zIndex: 1,
  },

  container: {
    width: "100%",
    paddingBottom: 12,
    paddingTop: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  option: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
  options: {
    flexDirection: "row",
    gap: 12,
  },
  logoWhite: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
});
