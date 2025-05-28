// src/screens/HomeScreen/screens/expirations/components/FilterModalize.tsx
import { forwardRef, useEffect, useRef } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { useDialogNotification } from "../../hook/notification/hooks/actions";
import { useDialogNotificationState } from "../../hook/notification/hooks/dialog-modal-state";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

const ModalNotification = forwardRef(() => {
  const { variant, message, isOpen, title } = useDialogNotificationState() as {
    variant: "error" | "success" | "info" | "warning";
    message: string;
    isOpen: boolean;
    title: string;
  };

  const variantsType = {
    error: {
      color: colors.danger["600"],
      backgroundColor: colors.danger["100"],
      icon: "warning-sharp" as const,
    },
    success: {
      color: colors.success["600"],
      backgroundColor: colors.success["100"],
      icon: "checkmark-sharp" as const,
    },
    info: {
      color: colors.info["600"],
      backgroundColor: colors.info["100"],
      icon: "information-sharp" as const,
    },
    warning: {
      color: colors.warning["600"],
      backgroundColor: colors.warning["100"],
      icon: "warning-sharp" as const,
    },
  };

  const { handleNotification } = useDialogNotification();
  const modalizeRef = useRef<Modalize>(null);
  const closeModal = () => {
    handleNotification({ isOpen: false });
  };
  useEffect(() => {
    if (isOpen) {
      modalizeRef.current?.open();
      Keyboard.dismiss();
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
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <View
          style={{
            backgroundColor: variantsType[variant]?.backgroundColor,
            width: 64,
            height: 64,
            borderRadius: 64,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons
            name={variantsType[variant]?.icon}
            size={40}
            color={variantsType[variant]?.color}
          />
        </View>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.textMessage}>{message}</Text>
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 48,
  },
  textMessage: {
    color: "#4B5563",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24,
  },
  titleStyle: {
    color: "#212121",
    textAlign: "center",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 28,
  },
  containerText: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
  },
  container: {
    marginBottom: 48,
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

export default ModalNotification;
