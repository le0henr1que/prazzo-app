import React, { forwardRef, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { useDialogModalState } from "../../hook/handle-modal/hooks/dialog-modal-state";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";

const Modal = forwardRef(() => {
  const { isOpen, element, title } = useDialogModalState();
  const { handleModal } = useDialogModal();
  const modalizeRef = useRef<Modalize>(null);
  const closeModal = () => {
    handleModal({ isOpen: false });
  };
  useEffect(() => {
    if (isOpen) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [isOpen]);

  return (
    <Modalize
      ref={modalizeRef}
      onClose={closeModal}
      handleStyle={{
        backgroundColor: "#DEDEDE",
        marginTop: 25,
        height: 6,
        width: 40,
        borderRadius: 3,
      }}
      modalStyle={styles.modal}
      adjustToContentHeight={true}
      overlayStyle={styles.overlay}
    >
      {title && (
        <View style={styles.containerText}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      )}
      <View style={styles.container}>{element}</View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleStyle: {
    color: "#333",
    textAlign: "center",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 28,
  },
  containerText: {
    display: "flex",
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    height: 76,
    borderBottomColor: "#DEDEDE",
    borderBottomWidth: 1,
  },
  container: {
    alignItems: "center",
  },
  overlay: {
    zIndex: 1000,
    elevation: 1000,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Modal;
