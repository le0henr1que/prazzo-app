import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../styles/colors";
import { typography } from "../../../styles/typography";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "phosphor-react-native";

export default function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", marginTop:8 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeft size={24} color={colors.neutral[7]} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text
            style={styles.title}
          >
            Fornecedores
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
    borderBottomColor: colors.neutral["200"],
    borderBottomWidth: 1,
  },
  header:{
    display:"flex",
    width: 375,
    marginLeft: 16,
  },
  title:{
    color: colors.neutral[7],
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    lineHeight: 24,
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
});
