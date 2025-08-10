import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Plus } from "phosphor-react-native";
import { useCallback } from "react";
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Typography from "../../components/text";
import { useBottomSheetModal } from "../../hook/modal-provider";
import { colors } from "../../styles/colors";
import ContentList from "./components/content-list";
import Filters from "./components/filters";
import { Header } from "./components/header";

function Products() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(colors.brand.default);
      StatusBar.setBarStyle("light-content");
      return () => {
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setBarStyle("dark-content");
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <Header />
      </View>

      {/* Filtros */}
      <View style={{ paddingTop: 41 }}>
        <Filters />
      </View>

      {/* Conteudo/Lotes */}
      <View style={{ marginTop: 16 }}>
        <ContentList />
      </View>
      {/* 
     
      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          navigation.navigate("ScamProduct", {
            isSearch: false,
            screenKey: Date.now().toString(),
          })
        }
      >
        <Plus size={16} color="white" />
        <Typography
          variant="SM"
          family="semibold"
          color={colors.white}
          style={{ marginTop: -1 }}
        >
          Adicionar produtos
        </Typography>
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  chips: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  note: {
    fontSize: 12,
    color: "#666",
  },
  floatingButton: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    position: "absolute",
    bottom: 20,
    right: 15,
    height: 44,
    padding: 12,
    borderRadius: 30,
    backgroundColor: colors.brand.default,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default Products;
