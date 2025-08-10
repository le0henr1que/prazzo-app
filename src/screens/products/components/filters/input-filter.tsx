import { Barcode, MagnifyingGlass } from "phosphor-react-native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useBatchFilterActions } from "../../ducks/filter/hooks/actions";
import { useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";

export default function InputSearch() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { updateFilter } = useBatchFilterActions();
  const inputRef = useRef<TextInput>(null);

  const handleBarcodePress = () => {
    navigation.navigate("ScamProduct", { isSearch: true });
  };
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const debouncedUpdateFilter = useCallback(
    debounce((value) => {
      updateFilter({ key: "search", value });
    }, 300),
    []
  );

  return (
    <View style={styles.container}>
      <MagnifyingGlass style={styles.leftIcon} size={24} color="#343330" />
      <TextInput
        style={styles.input}
        onPress={handleFocus}
        ref={inputRef}
        placeholder="Procurar produto, código ou lote"
        placeholderTextColor={colors.neutral["500"]}
        onChangeText={(text) => {
          debouncedUpdateFilter(text);
        }}
      />
      <TouchableOpacity style={styles.rightIcon} onPress={handleBarcodePress}>
        <Barcode size={24} color="#343330" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: colors.neutral["100"],
    textAlignVertical: "center",
    height: 48,
    paddingLeft: 45,
    paddingRight: 40,
    paddingVertical: 12,
    color: colors.neutral["900"],
    borderRadius: 8,
    fontSize: 14,
  },
  leftIcon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  rightIcon: {
    padding: 12,
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
});
