import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./style.header";

export default function Root({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.headerContainer}>{children}</View>
    </SafeAreaView>
  );
}
