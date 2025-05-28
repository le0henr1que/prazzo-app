import { Ionicons } from "@expo/vector-icons";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import InfiniteScrollWithLoad from "../../components/infinite-scroll-with-load";
import ProductCard from "../../components/product-card";
import SearchInput from "../../components/search-input";
import { useAuth } from "../../hook/auth";
import { useGetBatchsQuery } from "../../services/batch";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";
import { useBatchFilterActions } from "./ducks/filter/hooks/actions";
import { useFilterState } from "./ducks/filter/hooks/filterState";
import Header from "../../components/header";

const PER_PAGE = 10;

function Products() {
  const { control } = useForm();
  const { user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { updateFilter } = useBatchFilterActions();
  const isFocused = useIsFocused();
  const route = useRoute();
  const { productInformation } = (route.params as any) || {};
  const filterState = useFilterState();
  const { filters } = filterState || { filters: {} };
  const {
    data: batchs,
    isLoading,
    refetch,
    isFetching,
  } = useGetBatchsQuery({
    search: {
      search: filters.search,
      page: filters?.page || 1,
      perPage: PER_PAGE,
    },
  });

  useLayoutEffect(() => {
    updateFilter({ key: "search", value: productInformation?.code });
    if (isFocused) {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, isFocused]);

  const handleBarcodePress = () => {
    navigation.navigate("ScamProduct", { isSearch: true });
  };

  const handleFloatingButtonPress = () => {
    navigation.navigate("ScamProduct", { isSearch: false });
  };
  const renderItem = ({ item }: { item: any }) => {
    return <ProductCard item={item} />;
  };

  const keyExtractor = (item: any) => item.id.toString();
  return (
    <View style={{ flex: 1 }}>
      <Header.Root>
        <Text>dsdsa</Text>
      </Header.Root>
      <View style={styles.container}>
        <View style={styles.searchProducts}>
          <SearchInput
            name="search"
            productCode={filters.search}
            control={control}
            onBarcodePress={handleBarcodePress}
          />
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Todos os produtos</Text>
          <Text style={styles.badge}>{batchs?.meta?.total}</Text>
        </View>

        <InfiniteScrollWithLoad
          flatStyle={{
            width: "100%",
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
          }}
          dataResponse={batchs}
          isLoading={isLoading}
          refetch={refetch}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          hookModifyPaginated={updateFilter}
        />

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleFloatingButtonPress}
        >
          <Ionicons name="add" size={16} color="white" />
          <Text style={styles.floatingButtonText}> Adicionar produtos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  searchProducts: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  badge: {
    display: "flex",
    paddingHorizontal: 6,
    paddingVertical: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: typography.fontFamily.medium,
    gap: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F3F4F6",
  },
  containerTitle: {
    flexDirection: "row",
    display: "flex",
    gap: 7,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 16,
  },
  title: {
    color: "#000",
    fontSize: 14,
    fontStyle: "normal",
    fontFamily: typography.fontFamily.medium,
    lineHeight: 20,
  },
  floatingButton: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    position: "absolute",
    bottom: 20,
    right: 15,
    height: 44,
    padding: 12,
    borderRadius: 30,
    backgroundColor: colors.primary["600"],
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  floatingButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 13,
    fontStyle: "normal",
    fontFamily: typography.fontFamily.semibold,
    lineHeight: 20,
  },
});

export default Products;
