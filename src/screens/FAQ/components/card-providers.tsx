import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDialogModal } from "../../../hook/handle-modal/hooks/actions";
import { colors } from "../../../styles/colors";
import { ScreensType } from "../../index.screens";

export const CardFAQ = () => {
  const navigate = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const { handleModal } = useDialogModal();

  const handleMember = () => {};

  return (
    <TouchableOpacity style={styles.card} onPress={() => handleMember()}>
      <View
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <View>
            <Text style={styles.name}>Pagamentos</Text>
            <Text style={styles.role}>Dúvida sobre pagamentos</Text>
          </View>
        </View>

        <TouchableOpacity>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["500"]}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20,
    gap: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  name: {
    color: colors.neutral["900"],
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  role: {
    color: "#595959",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  backgroundImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  button: {
    marginTop: 12,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary["600"],
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "black",
  },
});
