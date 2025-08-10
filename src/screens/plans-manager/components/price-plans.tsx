import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Typography from "../../../components/text";
import { colors } from "../../../styles/colors";
import { Ionicons } from "@expo/vector-icons";

interface PricingPlansProps {
  selectedPlan: string;
  setSelectedPlan: (planId: string) => void;
}

const PricingPlans: React.FC<PricingPlansProps> = ({
  selectedPlan,
  setSelectedPlan,
}) => {
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const renderCheckmark = () => (
    <View style={styles.checkmark}>
      <Text style={styles.checkmarkText}>
        <Ionicons name="checkmark" size={16} color="#ffffff" />
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Plano Anual */}
      <TouchableOpacity
        style={[
          styles.planCard,
          selectedPlan === "annual" && styles.selectedPlanCard,
        ]}
        onPress={() => handlePlanSelect("annual")}
        activeOpacity={0.8}
      >
        <View style={styles.planHeader}>
          <Typography
            variant={"BASE"}
            family={"medium"}
            color={colors.neutral[7]}
          >
            R$ 166,00/ano
          </Typography>
          {selectedPlan === "annual" && renderCheckmark()}
        </View>

        <Typography
          variant={"SM"}
          family={"medium"}
          color={colors.neutral[5]}
          //   style={{ width: "90%" }}
        >
          Teste tudo grátis por 1 semana e depois pague apenas{" "}
          <Text style={{ color: colors.neutral[7] }}>
            R$ 449,99/ano (R$ 10,00 mês){" "}
          </Text>
        </Typography>
      </TouchableOpacity>

      {/* Plano Mensal */}
      <TouchableOpacity
        style={[
          styles.planCard,
          selectedPlan === "monthly" && styles.selectedPlanCard,
        ]}
        onPress={() => handlePlanSelect("monthly")}
        activeOpacity={0.8}
      >
        <View style={styles.planHeader}>
          <Typography
            variant={"BASE"}
            family={"medium"}
            color={colors.neutral[7]}
          >
            R$ 16,00/mês
          </Typography>
          {selectedPlan === "monthly" && renderCheckmark()}
        </View>

        <Typography
          variant={"SM"}
          family={"medium"}
          color={colors.neutral[5]}
          //   style={{ width: "90%" }}
        >
          Teste tudo gratis por 1 semana e depois pague apenas{" "}
          <Text style={{ color: colors.neutral[7] }}>R$ 39,99/mês </Text>
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    // marginTop: 100,
  },
  planCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 16,
  },
  selectedPlanCard: {
    borderColor: colors.neutral[7],
    borderWidth: 2,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.neutral[7],
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default PricingPlans;
