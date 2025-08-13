import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Typography from "../components/text";
import { colors } from "../styles/colors";

interface contentProps {
  content: React.ReactNode;
  title: string;
}

type ModalContextType = {
  openModal: (content: contentProps) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useBottomSheetModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error("useBottomSheetModal must be used within ModalProvider");
  return ctx;
};

export const BottomSheetModalGlobalProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [modalTitle, setModalTitle] = useState<string>("");
  const windowHeight = useMemo(() => Dimensions.get("window").height, []);
  const snapPoints = useMemo(() => ["95%"], []);
  const animatedIndex = useSharedValue(-1);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const openModal = useCallback((contentProps: contentProps) => {
    setModalContent(contentProps?.content);
    setModalTitle(contentProps?.title);
    setTimeout(() => {
      modalRef.current?.present();
    }, 0);
  }, []);
  const closeModal = useCallback(() => {
    modalRef.current?.dismiss();
  }, []);

  const onDismiss = useCallback(() => {
    setModalContent(null);
    setModalTitle("");
    animatedIndex.value = -1;
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    animatedIndex.value = index;
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.4}
      />
    ),
    []
  );
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <BottomSheetModalProvider>
        {children}
        <BottomSheetModal
          ref={modalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          enableDynamicSizing={true}
          maxDynamicContentSize={windowHeight * 0.85}
          animateOnMount
          onDismiss={onDismiss}
          onChange={handleSheetChanges}
          animationConfigs={animationConfigs}
          backgroundStyle={{ backgroundColor: "white" }}
          handleStyle={{ backgroundColor: "transparent" }}
          backdropComponent={renderBackdrop}
        >
          {modalTitle && (
            <View style={styles.sheetHeader}>
              <Typography
                variant="LG"
                family="semibold"
                color={colors.neutral[7]}
              >
                {modalTitle}
              </Typography>
            </View>
          )}
          <BottomSheetScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            {modalContent}
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    minHeight: 100, // Altura mínima para pequenos conteúdos
  },
  sheetHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    paddingBottom: 20,
    paddingTop: 16,
  },
  sheet: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 100,
    flexGrow: 1,
  },
});
