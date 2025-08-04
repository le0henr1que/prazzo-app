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
} from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions, StyleSheet, Pressable, View } from "react-native";

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
  const windowHeight = useMemo(() => Dimensions.get("window").height, []);
  const snapPoints = useMemo(() => ["90%"], []);
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const openModal = useCallback((node: React.ReactNode) => {
    setContent(node);
    setTimeout(() => {
      modalRef.current?.present();
    }, 0); // deixa o content renderizar antes do cálculo
  }, []);

  const closeModal = useCallback(() => {
    modalRef.current?.dismiss();
  }, []);

  const onDismiss = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {/* Overlay preto semi-transparente atrás da modal */}
      {content && <Pressable style={styles.overlay} onPress={closeModal} />}
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
          animationConfigs={animationConfigs}
          backgroundStyle={{ backgroundColor: "white" }}
          handleStyle={{ backgroundColor: "transparent" }}
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
    backgroundColor: "rgba(0,0,0,0.35)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // zIndex removido para garantir que a modal fique acima
  },
  sheet: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    // **não** usar flex:1
  },
  scrollContent: {
    paddingBottom: 40,
    // aqui o conteúdo define a altura; nada mais pressupõe altura fixa
  },
});
