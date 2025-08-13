import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView,Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SearchIcon from "../../../assets/icons/search";
import Button from "../../components/button";
import InfiniteScrollWithLoad from "../../components/infinite-scroll-with-load";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";
import { useGetSuppliersQuery } from "../../services/supplier";
import { colors } from "../../styles/colors";
import { CardProviders } from "./components/card-provider";
import { useSupplierFilterActions } from "./ducks/filter/hooks/actions";
import { useFilterState } from "./ducks/filter/hooks/filterState";
import Header from "./components/header";
import { FormProviderAction } from "./components/form-provider-action";
import { MagnifyingGlass, Plus } from "phosphor-react-native";
import { typography } from "../../styles/typography";
import { FormProvider } from "./components/form-provider-edit";
import { useToast } from "../../hook/toast/useToast";
import { CustomToast } from "../../components/toast";

  const PER_PAGE = 10;

  export default function Supplier() {
    const inputRef = useRef<TextInput>(null);
    const { control } = useForm();
    const { handleModal } = useDialogModal();
    const filterState = useFilterState();
    const [data, setData] = useState<any[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    

    const { filters } = filterState || { filters: {} };
    const {
      data: supplier,
      refetch,
      isFetching,
      isLoading,
    } = useGetSuppliersQuery({
      search: {
        search: filters?.search ?? "",
        page: filters?.page || 1,
        perPage: PER_PAGE,
      },
    });

    const { updateFilter } = useSupplierFilterActions();

    const {toast, showToast, hideToast} = useToast();
    
    // type ToastProps = {
    //   message: string;
    //   type?: "success" | "danger" | "info" | "warning";
    //   onHide: () => void;
    // };

    const handleAddProvider = () => {
      handleModal({
        isOpen: true,
        element:( <FormProvider  onSuccess={() => refetch()}
        />
      ),
        title: "Adicionar Fornecedor",
      });
    };

    const handleInputChange = (value: string) => {
      updateFilter({ key: "search", value });
      updateFilter({ key: "page", value: 1 });
    };

    const debouncedHandleInputChange = useCallback(
      debounce(handleInputChange, 500),
      []
    );

    const handleFocus = () => {
      inputRef.current?.focus();
    };

    useEffect(() => {
    if (supplier?.data) {
      setData(supplier.data);
    } else {
      setData([]);
    }
    setIsFetchingMore(false);
  }, [supplier]);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      refetch().finally(() => {
        setRefreshing(false);
      });
    }, [refetch]);

    const fetchMoreData = () => {
      if (isFetchingMore || !supplier?.meta?.next) return;

      setIsFetchingMore(true);
      updateFilter({ key: "page", value: (filters?.page ?? 1) + 1 });
    };

    const isLoad = isLoading || isFetching;

    const renderItem = ({ item }: { item: any }) => {
      return <CardProviders key={item.id} supplier={item} showToast={showToast}/>; // Substitua pelo seu componente de item
    };
    const keyExtractor = (item: any) => item.id.toString();

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Header />
        </SafeAreaView>
        {toast && (
                <CustomToast
                  key={toast.id}
                  message={toast.message}
                  type={toast.type}
                  onHide={hideToast}
                  style={{ alignSelf: "center" }}
                />
              )}
        <View style={styles.searchProducts}>
          <View style={styles.containerInput}>
            <TouchableOpacity onPress={handleFocus}>
              <MagnifyingGlass size={24} />
            </TouchableOpacity>
            <Controller
              control={control}
              name={"search"}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  placeholder="Procurar fornecedor"
                  placeholderTextColor= {colors.neutral[5]}
                  onChangeText={(text) => {
                    onChange(text);
                    debouncedHandleInputChange(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />

          </View>
        </View>

        {/* <LoadTable isLoading={isLoad} dataTableLength={supplier?.data.length} /> */}
   {supplier?.data?.length === 0 && !isLoading && !isFetching ? (
          <View style={styles.emptyContainer}>
            <Image
              source={
              filters.search
              ? require("../../../assets/no-suppliers.png") // imagem quando procurou e não achou
              : require("../../../assets/truck.png")        // imagem quando não há nenhum fornecedor inicial
                    }
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>{filters.search
          ? "Nenhum fornecedor encontrado para sua pesquisa."
          : "Nenhum fornecedor cadastrado."}</Text>
            <Text style={styles.emptySubText}> {filters.search
          ? "Tente uma pesquisa diferente ou verifique a ortografia."
          : "Adicione um fornecedor para começar."}</Text>
          </View>
        ) : (
        <InfiniteScrollWithLoad
          hookModifyPaginated={updateFilter}
          dataResponse={supplier}
          isLoading={isLoading || isFetching}
          refetch={refetch}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          flatStyle={styles.scrollCard}
        />
        )}
        {/* {!isLoad && (
          <FlatList
            style={styles.scrollCard}
            data={data}
            renderItem={({ item }) => (
              <CardProviders key={item.id} supplier={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              isFetchingMore ? (
                <ActivityIndicator size="large" color={colors.primary[500]} />
              ) : null
            }
          />
        )} */}
        <View style={styles.footerButtom}>
          <Button onPress={handleAddProvider}><Plus size={24} />Adicionar fornecedor</Button>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  scrollCard: {
    width: "100%",
    flex: 1,
    padding: 20,
    marginTop: -40,
  },
  footerButtom: {
    display: "flex",
    width: "100%",
    padding: 20,
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  containerInput: {
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
    fontSize: typography.size.small,
    fontFamily: typography.fontFamily.medium,
    lineHeight: typography.lineHeight.small,
  },
  searchProducts: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    marginBottom: 24,
  },
   emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 70,
    bottom: 100,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.medium,
    lineHeight: typography.lineHeight.base,
    color: colors.neutral[7],
  },
   emptySubText: {
    fontSize: typography.size.small,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.small,
    color: colors.neutral[5],
  },
});
