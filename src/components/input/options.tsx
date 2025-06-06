import { useState } from "react";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "./input.style";
import { typography } from "../../styles/typography";
import { colors } from "../../styles/colors";
import Svg, { Path } from "react-native-svg";

export function OptionsInput({ options, errors, onChange, ...props }: any) {
  const [isFocused, setIsFocused] = useState(false);
  const { handleModal } = useDialogModal();
  const hasError = errors && errors[props?.name];
  const [optionSeted, setOptionSeted] = useState<any | null>(null);

  const openOptions = () => {
    setIsFocused(true);
    handleModal({
      isOpen: true,
      element: (
        <Text>Teste</Text>
        // <View style={{ paddingVertical: 16, width: "100%" }}>
        //   <ScrollView
        //     style={{
        //       maxHeight: 200,
        //       marginTop: 16,
        //       marginBottom: 16,
        //       width: "100%",
        //     }}
        //   >
        //     {options?.map((option: any) => (
        //       <TouchableOpacity
        //         key={option?.id}
        //         style={{
        //           paddingVertical: 12,
        //           paddingHorizontal: 36,
        //           display: "flex",
        //           flexDirection: "column",
        //           justifyContent: "flex-start",
        //           alignItems: "flex-start",
        //           width: "100%",
        //           borderBottomColor: "#E5E7EB",
        //           borderBottomWidth: 0.5,
        //         }}
        //         onPress={() => {
        //           setOptionSeted(option);
        //           handleModal({ isOpen: false });
        //           if (onChange) {
        //             onChange(option.id);
        //           }
        //         }}
        //       >
        //         <Text
        //           style={{
        //             color: "#111827",
        //             fontFamily: "Inter",
        //             fontSize: 16,
        //             fontStyle: "normal",
        //             fontWeight: 500,
        //             lineHeight: 24,
        //           }}
        //         >
        //           {option?.label}
        //         </Text>
        //       </TouchableOpacity>
        //     ))}
        //   </ScrollView>
        // </View>
      ),
    });
  };

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity onPress={() => openOptions()}>
        <TextInput
          style={[
            isFocused
              ? { ...Input.focusedStyle }
              : hasError
              ? Input.styleError
              : Input.style,
            { color: "white" },
          ]}
          {...props}
          value={optionSeted?.label || ""}
          editable={false}
          pointerEvents="none"
        />
        <View style={{ position: "absolute", top: 12, left: 16, right: 16 }}>
          <Text
            style={{
              fontSize: typography.size.base,
              lineHeight: typography.lineHeight.base,
              color: colors.neutral["900"],
            }}
          >
            {optionSeted?.label}
          </Text>
        </View>
        <View style={{ position: "absolute", right: 10, top: 15 }}>
          <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
            <Path
              d="M13.3538 6.95336L8.35378 11.9534C8.30734 11.9998 8.2522 12.0367 8.1915 12.0619C8.1308 12.0871 8.06574 12.1 8.00003 12.1C7.93432 12.1 7.86926 12.0871 7.80856 12.0619C7.74786 12.0367 7.69271 11.9998 7.64628 11.9534L2.64628 6.95336C2.57627 6.88343 2.52859 6.79431 2.50926 6.69726C2.48994 6.60022 2.49984 6.49963 2.53772 6.40821C2.5756 6.31679 2.63936 6.23843 2.7201 6.18489C2.80084 6.13135 2.89556 6.105 2.99253 6.10936C3.0895 6.11372 3.18247 6.14856 3.25903 6.20936L8.00003 10.7924L12.741 6.20936C12.8176 6.14856 12.9106 6.11372 13.0075 6.10936C13.1045 6.105 13.1992 6.13135 13.2799 6.18489C13.3607 6.23843 13.4244 6.31679 13.4623 6.40821C13.5002 6.49963 13.5101 6.60022 13.4908 6.69726C13.4715 6.79431 13.4238 6.88343 13.3538 6.95336Z"
              fill="#1F2937"
            />
          </Svg>
        </View>
      </TouchableOpacity>
    </View>
  );
}
