import { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  Keyboard,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils/format-date";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";
import Button from "../button";
import Svg, { Path } from "react-native-svg";
import { Input } from "./input.style";

interface DataPickerProps {
  errors?: Record<string, string>;
  name: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onChange?: (date: string) => void;
  value?: string;
}

export function DataPicker({
  errors,
  name,
  placeholder,
  onChangeText,
  onChange,
  value,
  ...props
}: DataPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);
  const { handleModal } = useDialogModal();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const hasError = errors?.[name];

  useEffect(() => {
    if (value) {
      try {
        const parts = value.split("/");
        if (parts.length === 3) {
          const day = Number.parseInt(parts[0], 10);
          const month = Number.parseInt(parts[1], 10) - 1;
          const year = Number.parseInt(parts[2], 10);

          if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            const date = new Date(year, month, day);
            setSelectedDate(date);
            setTempDate(date);
            setInputValue(formatDate(date, "dd/MM/yyyy"));
          }
        }
      } catch (error) {
        console.error("Error parsing date:", error);
      }
    }
  }, [value]);

  const updateInputValue = (date: Date) => {
    const formattedDate = formatDate(date, "dd/MM/yyyy");
    setInputValue(formattedDate);
    if (onChangeText) {
      onChangeText(formattedDate);
    }
    if (onChange) {
      onChange(formattedDate);
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowAndroidPicker(false);

      if (date && event.type !== "dismissed") {
        setSelectedDate(date);
        updateInputValue(date);
      }
    } else {
      if (date) {
        setTempDate(date);
        setSelectedDate(date);
        updateInputValue(date);
      }
    }
  };

  const preventTouchPropagation = (e: any) => {
    e.stopPropagation();
    return false;
  };

  const openDatePicker = () => {
    Keyboard.dismiss();

    const initialDate = selectedDate || new Date();

    if (Platform.OS === "ios") {
      setTempDate(initialDate);

      handleModal({
        isOpen: true,
        element: (
          <View
            style={styles.iosModalContainer}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={preventTouchPropagation}
            onResponderMove={preventTouchPropagation}
            onResponderRelease={preventTouchPropagation}
            onResponderTerminate={preventTouchPropagation}
            onResponderTerminationRequest={() => false}
          >
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={initialDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                style={styles.iosDatePicker}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  handleModal({ isOpen: false });
                }}
              >
                Selecionar
              </Button>
            </View>
          </View>
        ),
      });
    } else {
      setShowAndroidPicker(true);
    }
  };

  const handleTextChange = (text: string) => {
    let formattedText = text
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");

    setInputValue(formattedText);

    if (formattedText.length === 10) {
      const parts = formattedText.split("/");
      const day = Number.parseInt(parts[0], 10);
      const month = Number.parseInt(parts[1], 10) - 1;
      const year = Number.parseInt(parts[2], 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const date = new Date(year, month, day);
        setSelectedDate(date);
        if (onChangeText) {
          onChangeText(formattedText);
        }
        if (onChange) {
          onChange(formattedText);
        }
      }
    } else {
      if (onChange) {
        onChange(formattedText);
      }
    }
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            isFocused
              ? { ...Input.focusedStyle }
              : hasError
              ? Input.styleError
              : Input.style,
          ]}
          {...props}
          value={inputValue}
          keyboardType="numeric"
          placeholder={placeholder || "Selecione a data"}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity onPress={openDatePicker} style={styles.iconContainer}>
          <Svg width="13" height="15" viewBox="0 0 12 14" fill="none">
            <Path
              d="M11 1.59961H9.5V1.09961C9.5 0.967001 9.44732 0.839824 9.35355 0.746056C9.25979 0.652288 9.13261 0.599609 9 0.599609C8.86739 0.599609 8.74021 0.652288 8.64645 0.746056C8.55268 0.839824 8.5 0.967001 8.5 1.09961V1.59961H3.5V1.09961C3.5 0.967001 3.44732 0.839824 3.35355 0.746056C3.25979 0.652288 3.13261 0.599609 3 0.599609C2.86739 0.599609 2.74021 0.652288 2.64645 0.746056C2.55268 0.839824 2.5 0.967001 2.5 1.09961V1.59961H1C0.734784 1.59961 0.48043 1.70497 0.292893 1.8925C0.105357 2.08004 0 2.33439 0 2.59961V12.5996C0 12.8648 0.105357 13.1192 0.292893 13.3067C0.48043 13.4943 0.734784 13.5996 1 13.5996H11C11.2652 13.5996 11.5196 13.4943 11.7071 13.3067C11.8946 13.1192 12 12.8648 12 12.5996V2.59961C12 2.33439 11.8946 2.08004 11.7071 1.8925C11.5196 1.70497 11.2652 1.59961 11 1.59961ZM11 4.59961H1V2.59961H2.5V3.09961C2.5 3.23222 2.55268 3.35939 2.64645 3.45316C2.74021 3.54693 2.86739 3.59961 3 3.59961C3.13261 3.59961 3.25979 3.54693 3.35355 3.45316C3.44732 3.35939 3.5 3.23222 3.5 3.09961V2.59961H8.5V3.09961C8.5 3.23222 8.55268 3.35939 8.64645 3.45316C8.74021 3.54693 8.86739 3.59961 9 3.59961C9.13261 3.59961 9.25979 3.54693 9.35355 3.45316C9.44732 3.35939 9.5 3.23222 9.5 3.09961V2.59961H11V4.59961Z"
              fill="#1F2937"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      {Platform.OS === "android" && showAndroidPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    top: 16,
  },
  iosModalContainer: {
    paddingVertical: 16,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    position: "relative",
    zIndex: 999,
  },
  datePickerContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1000,
  },
  iosDatePicker: {
    width: "100%",
    height: 200,
  },
  buttonContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  confirmButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
