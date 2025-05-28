import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";
import Button from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useChoosePlanMutation } from "../../services/plan";
import { Plan } from "../../enum/plan";

export function PlanPremium() {
  const [checked, setChecked] = useState<Plan>(Plan.FREE);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [choosePlan, { isLoading }] = useChoosePlanMutation();
  function choosePlanSub() {
    try {
      console.log(checked);
      choosePlan({ plan: checked }).unwrap();
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#FFFFF", padding: 10 }}>
        <View style={styles.columnCard}>
          <TouchableOpacity
            style={[
              styles.radioItemNotification,
              checked === Plan.FREE && styles.checked,
            ]}
            onPress={() => setChecked(Plan.FREE)}
          >
            <Text style={styles.radioItemText}>
              Plano FREE (APENAS PARA ALTERAR O PLANO, PODE TIRAR SE QUISER)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioItemNotification,
              checked === Plan.PRO && styles.checked,
            ]}
            onPress={() => setChecked(Plan.PRO)}
          >
            <Text style={styles.radioItemText}>
              Plano PRO (APENAS PARA ALTERAR O PLANO, PODE TIRAR SE QUISER)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Botão */}
      <View style={styles.footerButtom}>
        <Button
          isLoading={isLoading}
          style={{
            backgroundColor: "#E8CC3C",
            borderRadius: 8,
            padding: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 48,
          }}
          onPress={() => choosePlanSub()}
        >
          Começar 1 semana grátis
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
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
  columnCard: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  radioItemNotification: {
    gap: 8,
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.neutral["300"],
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    position: "relative",
  },
  checked: {
    borderWidth: 2,
    borderColor: "#0891B2",
    backgroundColor: "#FFF",
  },
  radioItemText: {
    flex: 1,
    flexWrap: "wrap",
    color: colors.neutral["900"],
    fontSize: 14,
    fontFamily: typography.fontFamily.regular,
    lineHeight: 20,
  },
});
