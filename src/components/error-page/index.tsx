import LottieView from "lottie-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../button";

interface ErrorPageProps {
  onRetry?: () => void;
}

export default function ErrorPage({ onRetry }: ErrorPageProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/default/noprazo-brand.png")}
            style={styles.logo}
          />
        </View>

        {/* Error Illustration */}
        <View style={styles.illustrationContainer}>
          {/* <Image
            source={require("../../../assets/error/error-illustration.png")} // Você precisará adicionar esta imagem
            style={styles.errorIllustration}
          /> */}
        </View>

        {/* Error Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Oops, algo deu errado!</Text>
          <Text style={styles.subtitle}>
            Não conseguimos conectar ao servidor. Tente novamente em alguns
            instantes ou entre em contato com o suporte se o problema persistir.
          </Text>
        </View>

        {/* Retry Button */}
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        )}

        {/* Loading Animation at Bottom */}
        <View>
          <Button>Tentar novamente</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 80,
  },
  logo: {
    width: 146,
    height: 37,
    resizeMode: "contain",
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  errorIllustration: {
    width: 200,
    height: 300,
    resizeMode: "contain",
  },
  messageContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: "#4A90A4",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  animation: {
    width: 60,
    height: 60,
  },
});
