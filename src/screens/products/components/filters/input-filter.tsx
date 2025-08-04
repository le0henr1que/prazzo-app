import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../styles/colors";

export default function InputSearch() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Procurar por produto ou código"
        placeholderTextColor={colors.neutral["500"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: "100%",
    backgroundColor: colors.neutral["100"],
    textAlignVertical: "top",
    height: 50,
    padding: 12,
    color: colors.neutral["900"],
    borderRadius: 8,
    fontSize: 14,
  },
});
