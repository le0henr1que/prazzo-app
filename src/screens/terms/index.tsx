import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Termos e Condições</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Aceitação dos Termos</Text>
          <Text style={styles.text}>
            Ao acessar e usar este aplicativo, você concorda em cumprir estes
            termos e condições. Se você não concordar com qualquer parte destes
            termos, não poderá acessar o aplicativo.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Conta e Autenticação</Text>
          <Text style={styles.text}>
            • O aplicativo utiliza autenticação do Google para login.{"\n"}•
            Você é responsável por manter a confidencialidade de sua conta.
            {"\n"}• Todas as atividades realizadas em sua conta são de sua
            responsabilidade.{"\n"}• Reservamo-nos o direito de encerrar contas
            que violem estes termos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Coleta e Uso de Dados</Text>
          <Text style={styles.text}>
            • Coletamos e processamos dados pessoais conforme necessário para o
            funcionamento do aplicativo.{"\n"}• Utilizamos Firebase para
            armazenamento e processamento de dados.{"\n"}• Seus dados são
            protegidos de acordo com a LGPD (Lei Geral de Proteção de Dados).
            {"\n"}• Você tem direito a solicitar acesso, correção ou exclusão de
            seus dados pessoais.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Permissões do Aplicativo</Text>
          <Text style={styles.text}>
            O aplicativo solicita as seguintes permissões:{"\n"}• Câmera: Para
            captura de imagens{"\n"}• Microfone: Para gravação de áudio{"\n"}•
            Armazenamento: Para salvar e acessar arquivos{"\n"}• Notificações:
            Para envio de alertas e atualizações{"\n"}• Internet: Para
            comunicação com nossos servidores
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Notificações</Text>
          <Text style={styles.text}>
            • Utilizamos Firebase Cloud Messaging (FCM) para enviar
            notificações.{"\n"}• Você pode gerenciar suas preferências de
            notificação nas configurações do aplicativo.{"\n"}• As notificações
            podem incluir atualizações importantes, alertas e comunicações do
            sistema.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Pagamentos e Assinaturas</Text>
          <Text style={styles.text}>
            • O aplicativo utiliza o sistema de pagamentos do Google Play Store.
            {"\n"}• As assinaturas são renovadas automaticamente, a menos que
            canceladas.{"\n"}• Você pode gerenciar suas assinaturas através das
            configurações da Play Store.{"\n"}• Reembolsos são regidos pelas
            políticas da Play Store.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Propriedade Intelectual</Text>
          <Text style={styles.text}>
            • Todo o conteúdo do aplicativo é protegido por direitos autorais.
            {"\n"}• Você não pode copiar, modificar ou distribuir o conteúdo sem
            autorização.{"\n"}• O uso do aplicativo não concede direitos de
            propriedade intelectual.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            8. Limitação de Responsabilidade
          </Text>
          <Text style={styles.text}>
            • O aplicativo é fornecido "como está", sem garantias de qualquer
            tipo.{"\n"}• Não nos responsabilizamos por danos indiretos ou
            consequenciais.{"\n"}• Nos reservamos o direito de modificar ou
            descontinuar o serviço a qualquer momento.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Alterações nos Termos</Text>
          <Text style={styles.text}>
            • Podemos modificar estes termos a qualquer momento.{"\n"}•
            Alterações significativas serão notificadas através do aplicativo.
            {"\n"}• O uso continuado do aplicativo após as alterações constitui
            aceitação dos novos termos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Contato</Text>
          <Text style={styles.text}>
            Para questões relacionadas a estes termos, entre em contato através
            do suporte do aplicativo.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
});
