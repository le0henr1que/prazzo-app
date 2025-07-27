"use client";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Header from "../../components/header";
import Typography from "../../components/text";
import CardPlan from "./components/card";
import ListPlan from "./components/list-plan";
import Button from "../../components/button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlanPro() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Header.Root>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            height: 56,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#343330" />
          </TouchableOpacity>
          <Typography variant={"BASE"} family={"semibold"}>
            Minha Assinatura
          </Typography>
        </View>
      </Header.Root>
      <View style={styles.content}>
        <View style={styles.columnCard}>
          <CardPlan />
        </View>
        <View style={styles.columList}>
          <ListPlan />
        </View>
      </View>

      <View style={styles.bottomDown}>
        <Button
          type="outlined"
          variant="danger"
          size="large"
          onPress={() => console.log("Assinar")}
        >
          Cancelar Assinatura
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    flex: 1,
  },
  columnCard: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 22,
  },
  columList: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  bottomDown: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#EDF2F7",
    shadowColor: "#979797",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8, // for Android shadow
  },
});
