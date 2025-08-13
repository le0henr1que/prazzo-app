import { StyleSheet, Text, View } from "react-native";
import Typography from "../../../components/text";
import { colors } from "../../../styles/colors";
import { Ionicons } from "@expo/vector-icons";

export default function ListPlan() {
  return (
    <View>
      <View style={styles.title}>
        <Typography
          variant={"BASE"}
          family={"semibold"}
          color={colors.neutral[6]}
        >
          O seu plano inclui:
        </Typography>
      </View>
      <View style={styles.list}>
        <View style={styles.listItem}>
          <Ionicons name="checkmark" size={24} color={colors.success[600]} />
          <Typography
            variant={"SM"}
            family={"regular"}
            color={colors.neutral[6]}
          >
            Cadastrar até 100 produtos
          </Typography>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="checkmark" size={24} color={colors.success[600]} />
          <Typography
            variant={"SM"}
            family={"regular"}
            color={colors.neutral[6]}
          >
            Scanear código de barras do produto
          </Typography>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="checkmark" size={24} color={colors.success[600]} />
          <Typography
            variant={"SM"}
            family={"regular"}
            color={colors.neutral[6]}
          >
            Categorizar cada produto
          </Typography>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="checkmark" size={24} color={colors.success[600]} />

          <Typography
            variant={"SM"}
            family={"regular"}
            color={colors.neutral[6]}
          >
            Receber notificações da validade dos produtos
          </Typography>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="checkmark" size={24} color={colors.success[600]} />

          <Typography
            variant={"SM"}
            family={"regular"}
            color={colors.neutral[6]}
          >
            Gerenciar e cadastrar membros
          </Typography>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="checkmark" size={24} color={colors.success[600]} />

          <Typography
            variant={"SM"}
            family={"regular"}
            color={colors.neutral[6]}
          >
            Cadastrar Fornecedores
          </Typography>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="checkmark" size={24} color={colors.success[600]} />

          <Typography
            variant={"SM"}
            family={"regular"}
            color={colors.neutral[6]}
          >
            Exportar relatório
          </Typography>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="checkmark" size={24} color={colors.success[600]} />

          <Typography
            variant={"SM"}
            family={"regular"}
            color={colors.neutral[6]}
          >
            Adicionar lotes de produtos
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 18,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
