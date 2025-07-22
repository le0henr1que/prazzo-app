import React, { useEffect } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import Modal from "react-native-modal";
import { useDialogModalState } from "../../hook/handle-modal/hooks/dialog-modal-state";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";

const CustomModal = () => {
  const { isOpen, element, title } = useDialogModalState();
  const { handleModal } = useDialogModal();

  useEffect(() => {
    if (isOpen) {
      Keyboard.dismiss();
    }
  }, [isOpen]);

 console.log("element:", element);
 console.log("isValidElement:", React.isValidElement(element));

  const handleClose = () => {
    handleModal({ isOpen: false });
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      onSwipeComplete={handleClose}
      swipeDirection={["down"]}
      style={styles.modal}
      backdropOpacity={0.5}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver={false}
      propagateSwipe
    >
      <View style={styles.contentContainer}>
        <View style={styles.handleIndicator} />
        {title && (
          <View style={styles.containerText}>
            <Text style={styles.titleStyle}>{title}</Text>
          </View>
        )}
        <View style={styles.container}>
          {React.isValidElement(element) ? element : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  contentContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 100,
  },
  handleIndicator: {
    backgroundColor: "#DEDEDE",
    height: 6,
    width: 40,
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 10,
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
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 76,
    borderBottomColor: "#DEDEDE",
    borderBottomWidth: 1,
  },
  container: {
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default CustomModal;
