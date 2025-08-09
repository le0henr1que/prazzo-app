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
  BottomSheetView,
  useBottomSheetSpringConfigs,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Animated, { useSharedValue } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions, StyleSheet } from "react-native";

type ModalContextType = {
  openModal: (content: React.ReactNode) => void;
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
  children: React.ReactNode;
}) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const windowHeight = useMemo(() => Dimensions.get("window").height, []);
  const snapPoints = useMemo(() => ["90%"], []);
  const animatedIndex = useSharedValue(-1);
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const openModal = useCallback((node: React.ReactNode) => {
    setContent(node);
    setIsModalVisible(true);
    animatedIndex.value = 0; // Inicia a animação imediatamente
    setTimeout(() => {
      modalRef.current?.present();
    }, 0);
  }, []);

  const closeModal = useCallback(() => {
    modalRef.current?.dismiss();
  }, []);

  const onDismiss = useCallback(() => {
    setContent(null);
    setIsModalVisible(false);
    animatedIndex.value = -1;
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    animatedIndex.value = index;
    if (index === -1) {
      setIsModalVisible(false);
    }
  }, []);

  // 🎯 Componente de backdrop usando o oficial do @gorhom
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
          enablePanDownToClose
          enableDynamicSizing
          maxDynamicContentSize={windowHeight * 0.92}
          animateOnMount
          onDismiss={onDismiss}
          onChange={handleSheetChanges}
          animationConfigs={animationConfigs}
          backgroundStyle={{ backgroundColor: "white" }}
          handleStyle={{ backgroundColor: "transparent" }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.sheet}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {content}
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
