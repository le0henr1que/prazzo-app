import React, { useState, useEffect, useCallback, JSX } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { colors } from "../../styles/colors";

interface InfiniteScrollWithLoadProps {
  renderItem: ({ item }: { item: any }) => JSX.Element;
  keyExtractor: (item: any) => string;
  dataResponse: any;
  isLoading: boolean;
  refetch: () => Promise<any>;
  hookModifyPaginated: any;
  flatStyle?: any;
}

const InfiniteScrollWithLoad: React.FC<InfiniteScrollWithLoadProps> = ({
  renderItem,
  keyExtractor,
  dataResponse,
  isLoading,
  refetch,
  hookModifyPaginated,
  flatStyle,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  useEffect(() => {
    if (dataResponse?.meta?.currentPage !== 1) {
      hookModifyPaginated({
        key: "page",
        value: 1,
      });
    }
  }, []);

  useEffect(() => {
    setData([]);
    if (dataResponse?.data) {
      setData((prevData) => {
        const existingIds = new Set(prevData.map((item) => item.id));
        const newData = dataResponse.data.filter(
          (item: any) => !existingIds.has(item.id)
        );
        return [...prevData, ...newData];
      });
    }
    setIsFetchingMore(false);
  }, [dataResponse]);

  const fetchMoreData = () => {
    if (isFetchingMore || !dataResponse?.meta?.next) return;

    setIsFetchingMore(true);
    hookModifyPaginated({
      key: "page",
      value: (dataResponse?.meta?.currentPage ?? 1) + 1,
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  return (
    <View style={styles.container}>
      <Text style={{ padding: 20, fontSize: 16 }}>
        {isLoading ? "Carregando..." : `Total de itens: ${data.length}`}
      </Text>
      {!isLoading && (
        <FlatList
          data={data}
          style={[!flatStyle && styles.scrollCard, flatStyle]}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            isFetchingMore ? (
              <ActivityIndicator size="large" color={colors.primary[600]} />
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scrollCard: {
    width: "100%",
    flex: 1,
    padding: 20,
    marginTop: -40,
  },
});

export default InfiniteScrollWithLoad;
