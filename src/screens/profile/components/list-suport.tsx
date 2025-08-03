import { View } from "react-native";
import { List, ListProps } from "../../../components/list/list";
import Typography from "../../../components/text";
import { colors } from "../../../styles/colors";
const listHelp: ListProps[] = [
  {
    title: "Dúvidas frequentes",
    description: "Veja dúvidas frequentes dos usuários",
    redirectTo: "EditProfile",
    isDisabled: true,
    icon: "Question",
    weight: "fill",
  },
  {
    title: "Termos de uso",
    description: "Acesse os termos de uso do app",
    redirectTo: "EditProfile",
    isDisabled: true,
    icon: "Info",
    weight: "fill",
  },
  {
    title: "Compartilhe com um amigo",
    description: "Compartilhe nosso app com algum amigo ",
    redirectTo: "EditProfile",
    isDisabled: true,
    icon: "ShareNetwork",
    weight: "fill",
  },
  {
    title: "Avalie nosso app",
    description: "Sua avaliação é muito importante para nós!",
    redirectTo: "EditProfile",
    isDisabled: true,
    icon: "Star",
    iconColor: "#00A2E9",
    weight: "fill",
  },
];
export default function ListHelp() {
  return (
    <View>
      <Typography
        variant="BASE"
        family="semibold"
        style={{ paddingHorizontal: 16 }}
        color={colors.neutral[7]}
      >
        Suporte
      </Typography>
      <View style={{ marginTop: 8 }}>
        <List options={listHelp} />
      </View>
    </View>
  );
}
