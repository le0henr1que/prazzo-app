// src/screens/HomeScreen/screens/expirations/components/FilterModalize.tsx
import { Image, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { colors } from "../styles/colors";

const CardPermission = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.radioItem}>
        <Image source={require("../../assets/bell.png")} />
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: colors.neutral["900"],
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Administrador
          </Text>
          <Text style={styles.radioItemText}>
            Possui todos os acessos do APP.
          </Text>
        </View>
        <RadioButton value="yes" color={colors.primary["600"]} />
      </View>
      <View style={styles.radioItem}>
        <Image source={require("../../assets/bell.png")} />
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: colors.neutral["900"],
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Membro
          </Text>
          <Text style={styles.radioItemText}>
            Cadastra produtos e gerencia a loja
          </Text>
        </View>
        <RadioButton value="yes" color={colors.primary["600"]} />
      </View>
      <View style={styles.radioItem}>
        <Image source={require("../../assets/bell.png")} />
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: colors.neutral["900"],
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Visualizador
          </Text>
          <Text style={styles.radioItemText}>Somente visualiza os dados</Text>
        </View>
        <RadioButton value="yes" color={colors.primary["600"]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    width: "100%",
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingBottom: 50,
  },
  radioItem: {
    gap: 12,
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
  radioItemText: {
    flex: 1,
    flexWrap: "wrap",
    color: colors.neutral["900"],
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 20,
  },
});

export default CardPermission;
