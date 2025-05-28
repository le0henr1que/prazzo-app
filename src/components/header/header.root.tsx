import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style.header";
import { ReactNode } from "react";

export default function Root({ children }: { children: ReactNode }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}
