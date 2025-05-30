import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useRef } from "react";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../styles/colors";
import SearchIcon from "../../../assets/icons/search";
import { CardMembers } from "./components/card-store";
import Button from "../../components/button";

export default function Members() {
  const inputRef = useRef<TextInput>(null);
  const { control, handleSubmit } = useForm();

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchProducts}>
        <View style={styles.containerInput}>
          <TouchableOpacity onPress={handleFocus}>
            <SearchIcon />
          </TouchableOpacity>
          <Controller
            control={control}
            name={"name"}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Procurar por produto ou código"
                placeholderTextColor="#999"
                onChangeText={onChange}
                onBlur={onBlur}
                value={"productCode"}
              />
            )}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollCard}>
        <CardMembers />
        <CardMembers />
        <CardMembers />
        <CardMembers />
        <CardMembers />
        <CardMembers />
      </ScrollView>
      <View style={styles.footerButtom}>
        <Button onPress={() => console.log("Home")}>Convidar membros</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  scrollCard: {
    width: "100%",
    flex: 1,
    padding: 20,
    marginTop: -40,
  },
  footerButtom: {
    display: "flex",
    width: "100%",
    padding: 20,
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#FFF",
    boxShadow: "0px -4px 12px 0px rgba(151, 151, 151, 0.15)",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral["100"],
    borderRadius: 8,
    gap: 8,
    paddingHorizontal: 10,
    height: 50,
    width: "100%",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.neutral["500"],
  },
  barcodeButton: {
    padding: 8,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },
  searchProducts: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    marginBottom: 24,
  },
});
