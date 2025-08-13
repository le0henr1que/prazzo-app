import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../../styles/colors";
import { CaretDown } from "phosphor-react-native";
import { useBottomSheetModal } from "../../../../hook/modal-provider";
import FilterOptions from "./components/filter-options";
import { useBatchFilterActions } from "../../ducks/filter/hooks/actions";
import { useFilterState } from "../../ducks/filter/hooks/filterState";

interface FilterPill {
  id: string;
  label: string;
  options?: string[];
}

const filterOptionsA: FilterPill[] = [
  { id: "Vencidos", label: "Vencidos", options: ["Vencido 1", "Vencido 2"] },
  {
    id: "Categorias",
    label: "Categorias",
    options: [
      "Categoria 1",
      "Categoria 2",
      "Categoria 3",
      "Categoria 4",
      "Categoria 5",
      "Categoria 6",
      "Categoria 7",
      "Categoria 8",
      "Categoria 9",
      "Categoria 10",
      "Categoria 11",
      "Categoria 12",
      "Categoria 13",
      "Categoria 14",
      "Categoria 15",
      "Categoria 16",
      "Categoria 17",
      "Categoria 18",
      "Categoria 19",
      "Categoria 20",
      "Categoria 21",
      "Categoria 22",
      "Categoria 23",
      "Categoria 24",
      "Categoria 25",
      "Categoria 26",
      "Categoria 27",
      "Categoria 28",
      "Categoria 29",
      "Categoria 30",
      "Categoria 31",
      "Categoria 32",
      "Categoria 33",
      "Categoria 34",
      "Categoria 35",
      "Categoria 36",
      "Categoria 37",
      "Categoria 38",
      "Categoria 39",
      "Categoria 40",
      "Categoria 41",
      "Categoria 42",
      "Categoria 43",
      "Categoria 44",
      "Categoria 45",
      "Categoria 46",
      "Categoria 47",
      "Categoria 48",
      "Categoria 49",
      "Categoria 50",
      "Categoria 51",
      "Categoria 52",
      "Categoria 53",
      "Categoria 54",
      "Categoria 55",
      "Categoria 56",
      "Categoria 57",
      "Categoria 58",
      "Categoria 59",
      "Categoria 60",
      "Categoria 61",
      "Categoria 62",
      "Categoria 63",
      "Categoria 64",
      "Categoria 65",
      "Categoria 66",
      "Categoria 67",
      "Categoria 68",
      "Categoria 69",
    ],
  },
  { id: "Tipo", label: "Tipo", options: ["Tipo 1", "Tipo 2"] },
];

export default function PillsList() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { openModal, closeModal } = useBottomSheetModal();
  const { updateFilter } = useBatchFilterActions();
  const filterState = useFilterState();

  console.log(filterState);

  const handleFilterPress = (filterId: string) => {
    setSelectedFilter(filterId);
    updateFilter({ key: "filterId", value: filterId });
    openModal({
      content: <FilterOptions options={filterOptionsA} />,
      title:
        filterOptionsA.find((filter) => filter.id === filterId)?.label ?? "",
    });
    // Aqui você pode adicionar a lógica para filtrar os produtos
    console.log("Filtro selecionado:", filterId);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        {filterOptionsA.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.pill,
              selectedFilter === filter.id && styles.pillSelected,
            ]}
            onPress={() => handleFilterPress(filter.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.pillText,
                selectedFilter === filter.id && styles.pillTextSelected,
              ]}
            >
              {filterState?.filters?.[filter.id] ?? filter.label}
            </Text>
            <CaretDown
              size={16}
              color={
                selectedFilter === filter.id
                  ? colors.brand.default
                  : colors.neutral[600]
              }
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 4,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.neutral[100],
    borderWidth: 1,
    borderColor: colors.neutral[300],
    marginRight: 8,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
  pillSelected: {
    backgroundColor: colors.brand.light,
    borderColor: "#247BA04D",
  },
  pillText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.neutral[600],
    fontFamily: "Inter_600SemiBold",
  },
  pillTextSelected: {
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    color: colors.brand.default,
  },
});
