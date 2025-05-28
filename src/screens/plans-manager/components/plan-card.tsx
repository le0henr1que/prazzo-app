import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../styles/colors";
import { Plan } from "../../../enum/plan";

export default function PlanCard({ variant }: { variant: Plan }) {
  return (
    <View
      style={{
        borderRadius: 8,
        padding: 16,
        width: "100%",
        alignSelf: "stretch",
        borderWidth: 1,
        borderColor: colors.neutral["300"],
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
        }}
      >
        <View
          style={{
            borderRadius: 32,
            width: 32,
            height: 32,
            backgroundColor:
              variant === Plan.FREE ? colors.primary["500"] : "#E8CC3C",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {variant === Plan.PRO ? (
            <Ionicons name="trophy-sharp" size={16} color="white" />
          ) : (
            <Ionicons name="trophy-sharp" size={16} color="white" />
          )}
        </View>
        <View>
          <Text
            style={{
              color: colors.neutral["500"],
              fontSize: 12,
              fontWeight: "600",
              lineHeight: 16,
            }}
          >
            Seu Plano
          </Text>
          <Text
            style={{
              color: colors.neutral["900"],
              fontSize: 16,
              fontWeight: "600",
              lineHeight: 24,
            }}
          >
            Plano {variant}
          </Text>
          <Text
            style={{
              color: colors.neutral["500"],
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 20,
            }}
          >
            Nosso plano mais básico
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
