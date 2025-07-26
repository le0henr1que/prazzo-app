import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { DataPicker } from "./date-picker";
import { OptionsInput } from "./options";
import { Input } from "./input.style";
import { colors } from "../../styles/colors";
import { UseFormClearErrors } from "react-hook-form";

export type Variant = "normal" | "password" | "option" | "date";

export interface CustomInputProps extends Omit<TextInputProps, "onChange"> {
  variant?: Variant;
  errors?: any;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  onBlur?: () => void;
  name: string;
  options?: { id: string; label: string }[];
  onChange?: (value: string) => void;
  clearErrors?: UseFormClearErrors<any>;
  focusedField?: string | null;
  setFocusedField: (name: string | null) => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  variant = "normal",
  errors,
  options,
  onChange,
  onChangeText,
  clearErrors,
  focusedField,
  setFocusedField,
  ...props
}) => {
  const isFocused = focusedField === props.name;
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const hasError = errors && errors[props?.name];

  const handleChange = (text: string) => {
    if (onChange) {
      onChange(text);
    }
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const inputVariant: any = {
    date: () => <DataPicker errors={errors} {...props} onChange={onChange} />,
    option: () => (
      <OptionsInput
        {...props}
        errors={errors}
        options={options}
        onChange={onChange}
      />
    ),
    normal: () => (
      <TextInput
        style={[
          Input.input,
          errors?.[props.name] && Input.inputError,
          isFocused && Input.inputFocused,
        ]}
        placeholderTextColor={
          hasError ? colors.danger.default : colors.neutral["3"]
        }
        onFocus={() => {
          setFocusedField(props.name);
          clearErrors?.(props.name);
        }}
        onBlur={() => setFocusedField(null)}
        onChangeText={handleChange}
        {...props}
      />
    ),
    password: () => (
      <TouchableOpacity style={Input.inputPassword}>
        <TextInput
          style={[
            Input.input,
            errors?.[props.name] && Input.inputError,
            isFocused && Input.inputFocused,
          ]}
          secureTextEntry={!isPasswordVisible}
          onFocus={() => {
            setFocusedField(props.name);
            clearErrors?.(props.name);
          }}
          onBlur={() => setFocusedField(null)}
          onChangeText={handleChange}
          {...props}
        />
        <Ionicons
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          name={isPasswordVisible ? "eye" : "eye-off"}
          size={20}
          style={Input.iconEye}
          color="gray"
        />
      </TouchableOpacity>
    ),
  };

  return inputVariant[variant as any]
    ? inputVariant[variant as any]()
    : inputVariant.normal();
};
