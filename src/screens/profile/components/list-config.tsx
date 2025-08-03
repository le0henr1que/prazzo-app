import { View } from "react-native";
import { List, ListProps } from "../../../components/list/list";
import Typography from "../../../components/text";
import { Plan } from "../../../enum/plan";
import { colors } from "../../../styles/colors";

export default function AccountConfig({ userPlan }: { userPlan: Plan }) {
  const accountConfig: ListProps[] = [
    {
      title: "Informações Pessoais",
      description: "Nome, email, número",
      redirectTo: "EditProfile",
      icon: "UserSquare",
      weight: "fill",
    },
    {
      title: "Alterar Senha",
      description: "Altere a senha da sua conta",
      redirectTo: "ModifyPassword",
      icon: "Password",
    },
    {
      title: "Minha assinatura",
      description: "Gerencie seu plano",
      redirectTo: userPlan === Plan.FREE ? "PlanScreen" : "PlanPro",
      icon: "Medal",
      weight: "fill",
    },
    {
      title: "Gerenciar notificações",
      description: "Configure os alertas do aplicativo",
      redirectTo: "Notification",
      weight: "fill",
      icon: "BellSimple",
    },
  ];

  return (
    <View>
      <Typography
        variant="BASE"
        family="semibold"
        style={{ paddingHorizontal: 16 }}
        color={colors.neutral[7]}
      >
        Configurações da conta
      </Typography>
      <View style={{ marginTop: 8 }}>
        <List options={accountConfig} />
      </View>
    </View>
  );
}
