import React, { JSX, useEffect, useState, useMemo, useCallback } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";
import { useBatchFilterActions } from "../../../ducks/filter/hooks/actions";

interface InfiniteListProps<T> {
  data?: { data: T[]; meta?: any };
  isLoading: boolean;
  isFetching: boolean;
  renderItem: ({ item }: { item: T }) => JSX.Element;
  keyExtractor: (item: T) => string;
  perPage?: number;
  onPageChange?: (page: number) => void;
}

export default function InfiniteList<T>({
  data,
  isLoading,
  isFetching,
  renderItem,
  keyExtractor,
  perPage = 10,
  onPageChange,
}: InfiniteListProps<T>) {
  const [products, setProducts] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Acumula dados de forma mais eficiente - REMOVIDO existingIds da dependência
  useEffect(() => {
    if (data?.data) {
      setProducts((prev) => {
        if (isRefreshing) {
          setIsRefreshing(false);
          setInitialLoaded(true);
          return data.data;
        }

        // Para primeira carga, simplesmente define os dados
        if (prev.length === 0) {
          setInitialLoaded(true);
          return data.data;
        }

        // Para cargas subsequentes, filtra duplicatas usando IDs dos produtos anteriores
        const prevIds = new Set(prev.map((item: any) => item.id));
        const newItems = data.data.filter((item: any) => !prevIds.has(item.id));
        return [...prev, ...newItems];
      });
      setIsLoadingMore(false);
    }
  }, [data, isRefreshing]); // REMOVIDO existingIds

  const loadMore = useCallback(() => {
    if (isFetching || isLoading || isLoadingMore || isRefreshing) return;
    if (data?.meta?.next) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      onPageChange?.(nextPage);
    }
  }, [
    isFetching,
    isLoading,
    isLoadingMore,
    isRefreshing,
    data?.meta?.next,
    page,
    onPageChange,
  ]);

  const refreshList = useCallback(() => {
    setIsRefreshing(true);
    setPage(1);
    setInitialLoaded(false);
    onPageChange?.(1);
  }, [onPageChange]);

  return (
    <FlatList
      style={{ width: "100%", marginTop: 16 }}
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        gap: 8,
        paddingBottom: 350,
      }}
      onEndReachedThreshold={0.3}
      onEndReached={loadMore}
      refreshing={isRefreshing}
      showsVerticalScrollIndicator={false} // Remove o indicador de scroll vertical
      showsHorizontalScrollIndicator={false} // Remove o indicador de scroll horizontal
      onRefresh={refreshList}
      initialNumToRender={5} // Reduzido para acelerar primeira renderização
      maxToRenderPerBatch={3} // Reduzido
      windowSize={5} // Reduzido
      removeClippedSubviews={true}
      // REMOVIDO getItemLayout se não souber a altura exata
      ListFooterComponent={() => (
        <View
          style={{
            alignItems: "center",
            paddingVertical: 16,
            marginTop: -20,
          }}
        >
          {isLoadingMore && (
            <LottieView
              source={require("../../../../../../assets/lottie/spiner-load-default.json")}
              autoPlay
              loop
              style={{ width: 60, height: 60 }}
            />
          )}
        </View>
      )}
    />
  );
}
