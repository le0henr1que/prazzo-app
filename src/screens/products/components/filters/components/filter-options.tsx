import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useState } from "react";
import { colors } from "../../../../../styles/colors";
import { useBottomSheetModal } from "../../../../../hook/modal-provider";
import Typography from "../../../../../components/text";
import { useBatchFilterActions } from "../../../ducks/filter/hooks/actions";
import { useFilterState } from "../../../ducks/filter/hooks/filterState";

interface FilterPill {
  id: string;
  label: string;
  options?: string[];
}

export default function FilterOptions({ options }: { options: FilterPill[] }) {
  const { closeModal } = useBottomSheetModal();
  const { updateFilter } = useBatchFilterActions();
  const filterState = useFilterState();
  const filterId = filterState?.filters?.filterId;
  // Usa selectedOption se fornecido, senão usa o estado interno
  const currentSelected = filterState?.filters?.selectedOption;
  console.log("FILTRO SELECIONADO:", currentSelected);
  const handleOptionPress = (option: string) => {
    console.log("Opção selecionada:", option);
    updateFilter({ key: filterId, value: option });
    updateFilter({ key: "selectedOption", value: option });
    closeModal();
  };

  return (
    <View style={styles.options}>
      {options
        .find((filter) => filter.id === filterId)
        ?.options?.map((option, index) => {
          const isSelected = currentSelected === option;
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                isSelected && styles.selectedOption,
                index > 0 && styles.optionBorder,
              ]}
              onPress={() => handleOptionPress(option)}
              activeOpacity={0.7}
            >
              <Typography
                family="medium"
                variant="BASE"
                style={[styles.optionText, isSelected && styles.selectedText]}
              >
                {option}
              </Typography>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  options: {
    width: "100%",
    marginTop: 20,
    marginBottom: 60,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 12,
  },
  option: {
    padding: 16,
  },
  selectedOption: {
    backgroundColor: "#DCEFFA",
  },
  optionBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[300],
  },
  optionText: {
    color: colors.neutral[600] || "#525252",
  },
  selectedText: {
    fontWeight: "600",
  },
});
