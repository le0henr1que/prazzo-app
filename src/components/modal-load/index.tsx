import LottieView from "lottie-react-native";
import React from "react";
import { Modal, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Typography from "../text";
import { colors } from "../../styles/colors";

interface ModalLoadProps {
  visible: boolean;
  text?: string;
}

const ModalLoad: React.FC<ModalLoadProps> = ({
  visible,
  text = "Carregando...",
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <LottieView
            source={require("../../../assets/lottie/spiner-load-default.json")}
            autoPlay
            loop
            style={styles.animation}
          />
          {text && (
            <Typography
              family="medium"
              variant="BASE"
              color={colors.neutral[5]}
            >
              {text}
            </Typography>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  animation: {
    width: 60,
    height: 60,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    textAlign: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ModalLoad;
