import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";

export type CustomBottomSheetProps = {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  contentContainerStyle?: ViewStyle;
  backgroundStyle?: ViewStyle;
} & Omit<BottomSheetModalProps, "children" | "snapPoints">;

export type CustomBottomSheetRef = {
  present: () => void;
  close: () => void;
};

const CustomBottomSheet = forwardRef<
  CustomBottomSheetRef,
  CustomBottomSheetProps
>(
  (
    {
      children,
      snapPoints = ["50%"],
      contentContainerStyle,
      backgroundStyle,
      ...rest
    },
    ref
  ) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      present: () => bottomSheetRef.current?.present(),
      close: () => bottomSheetRef.current?.close(),
    }));

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={[styles.background, backgroundStyle]}
        {...rest}
      >
        <ScrollView
          contentContainerStyle={[styles.content, contentContainerStyle]}
        >
          {children}
        </ScrollView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  background: {
    borderRadius: 20,
  },
  content: {
    padding: 16,
  },
});

export default CustomBottomSheet;
