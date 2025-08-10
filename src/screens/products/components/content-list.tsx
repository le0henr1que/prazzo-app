import LottieView from "lottie-react-native";
import { Image, StyleSheet, View } from "react-native";
import ProductCard from "../../../components/product-card";
import Typography from "../../../components/text";
import { useGetBatchsQuery } from "../../../services/batch";
import { colors } from "../../../styles/colors";
import { useBatchFilterActions } from "../ducks/filter/hooks/actions";
import { useFilterState } from "../ducks/filter/hooks/filterState";
import InfiniteList from "./filters/components/ininite-load";

const PER_PAGE = 10;

export default function ContentList() {
  const filterState = useFilterState();
  const { updateFilter } = useBatchFilterActions();
  const { filters } = filterState || { filters: {} };

  const { data, isLoading, isFetching, error } = useGetBatchsQuery({
    search: {
      page: filters?.page || 1,
      perPage: PER_PAGE,
    },
  });

  const handlePageChange = (page: number) => {
    updateFilter({ key: "page", value: page });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContent}>
        <Typography family="medium" variant="BASE" color={colors.neutral[7]}>
          Lista de produtos
        </Typography>
        <View style={styles.roundedCount}>
          <Typography family="semibold" variant="XS" color={colors.brand.dark}>
            {data?.meta?.total || 0}
          </Typography>
        </View>
      </View>

      {data?.meta?.total > 0 && (
        <InfiniteList
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={(item) => String(item?.id)}
          perPage={PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}

      {data?.meta?.total === 0 && (
        <View style={styles.emptyState}>
          <Image
            source={require("../../../../assets/default/caixa-vazia.png")}
            style={{ width: 108, height: 122, resizeMode: "contain" }}
          />
          <View style={styles.emptyTextWrapper}>
            <Typography
              family="medium"
              variant="BASE"
              color={colors.neutral[7]}
              style={{ textAlign: "center", marginTop: 8 }}
            >
              Nenhum produto cadastrado
            </Typography>
            <Typography
              family="regular"
              variant="SM"
              color={colors.neutral[5]}
              style={{ textAlign: "center", width: 200 }}
            >
              Os produtos da sua loja serão exibidos aqui
            </Typography>
          </View>
        </View>
      )}
      {isLoading && filterState?.filters.products === 0 && (
        <View style={styles.emptyState}>
          <LottieView
            source={require("../../../../assets/lottie/spiner-load-default.json")}
            autoPlay
            loop
            style={{ width: 60, height: 60 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  titleContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  roundedCount: {
    backgroundColor: "#F1F9FE",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#DCEFFA",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    height: "75%",
  },
  emptyTextWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 6,
  },
});
