import debounce from "lodash/debounce";
import { useCallback, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useBatchFilterActions } from "../screens/products/ducks/filter/hooks/actions";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";

const SearchInput = ({ name, control, onBarcodePress, productCode }: any) => {
  const inputRef = useRef<TextInput>(null);
  const { updateFilter } = useBatchFilterActions();

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

  useEffect(() => {
    if (inputRef.current && productCode) {
      inputRef.current.setNativeProps({ text: productCode });
      updateFilter({ key: "search", value: productCode });
    }
  }, [productCode]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFocus}>
        <Ionicons
          name="search-outline"
          size={24}
          color={colors.neutral["500"]}
        />
      </TouchableOpacity>
      <Controller
        control={control}
        name={name}
        defaultValue={productCode || ""}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Procurar por produto ou código"
            placeholderTextColor={colors.neutral[500]}
            onChangeText={(text) => {
              onChange(text);
              debouncedUpdateFilter(text);
            }}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {!productCode ? (
        <TouchableOpacity style={styles.barcodeButton} onPress={onBarcodePress}>
          <Ionicons name="barcode-outline" size={24} color="#343330" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.barcodeButton}
          onPress={() => {
            if (inputRef.current && productCode) {
              inputRef.current.setNativeProps({ text: "" });
              updateFilter({ key: "search", value: "" });
            }
          }}
        >
          <Ionicons name="close" size={24} color="#343330" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral["100"],
    borderRadius: 8,
    gap: 8,
    paddingHorizontal: 10,
    height: 50,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: typography.fontFamily.regular,
    lineHeight: 20,
    color: colors.neutral["500"],
  },
  barcodeButton: {
    padding: 8,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },
});

export default SearchInput;
