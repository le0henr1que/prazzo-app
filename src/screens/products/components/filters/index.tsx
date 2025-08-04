import { StyleSheet } from "react-native";
import { View } from "react-native";
import InputSearch from "./input-filter";
import PillsList from "./pill-list-filter";

export default function Filters() {
  return (
    <View style={styles.container}>
      {/* InputSearch */}
      <View>
        <InputSearch />
      </View>
      {/* PillSearch */}
      <View>
        <PillsList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
