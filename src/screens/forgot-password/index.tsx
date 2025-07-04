import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import Button from "../../components/button";
import { CustomInput } from "../../components/input";
import Typography from "../../components/text";
import { colors } from "../../styles/colors";
import { Input } from "../../components/input/input.style";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreensType } from "../index.screens";
import { useForgotPasswordMutation } from "../../hook/auth/slice/auth-api";
import { styles } from "./forgotPassword.styles";
import { useMeQuery } from "../../services/me";
import BackIconcon from "../../../assets/icons/backIcon";


interface FormData {
  email: string;
}

export default function ForgotPassword() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<FormData>();
  const { data: me } = useMeQuery();
  const [forgotPassword ] = useForgotPasswordMutation();

  const formValues = watch();
  const isFormValid = () => {
    return Object.values(formValues).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log("Submitting forgot password with data:", data);
      console.log("Current user ID:", me?.id);
      const response = await forgotPassword({ email: data.email }).unwrap();
      console.log("Forgot password response:", response);


      navigation.navigate("ConfirmCode", {
        mode: "reset",
        email: data.email,
      } as never);
    } catch (e: any) {
        const msg =
          e.data?.message ||
          "Ocorreu um erro ao tentar enviar o código de recuperação.";
      }
  };
    
   return (
     <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={{ flex: 1 }}
     >
       <ScrollView contentContainerStyle={{ flex: 0 }}>
         <View style={styles.container}>
           <ImageBackground
             source={require("../../../assets/background.png")}
             style={styles.header}
             resizeMode="contain"
             resizeMethod="auto"
             imageStyle={{ left: 140 }}
           >
             <View style={styles.textHeader}>
               
                 <BackIconcon />
               
               <Typography
                 variant="3XL"
                 family="semibold"
                 style={{
                   color: "white",
                 }}
               >
                 Esqueci a senha
               </Typography>
             </View>
           </ImageBackground>
           <View style={styles.body}>
             <View style={styles.bodyContent}>
               <View style={Input.inputView}>
                 <Typography variant="SM" family="semibold" style={Input.label}>
                   Email
                 </Typography>
                 <Controller
                   control={control}
                   rules={{
                     required: "O email é obrigatório",
                     pattern: {
                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                       message: "Email inválido",
                     },
                   }}
                   render={({ field: { onChange, onBlur, value } }) => (
                     <CustomInput
                       name="email"
                       errors={errors}
                       placeholder="Digite seu email"
                       onChangeText={onChange}
                       clearErrors={clearErrors}
                       focusedField={focusedField}
                       setFocusedField={setFocusedField}
                       value={value}
                     />
                   )}
                   name="email"
                 />
                 {errors.email && (
                   <Text style={Input.errorText}>{errors.email.message}</Text>
                 )}
               </View>

               <View style={{ width: "100%", marginTop: 22 }}>
                 <Button
                   type="fill"
                   size="large"
                   isLoading={loading}
                   onPress={handleSubmit(onSubmit)}
                   disabled={loading || !isFormValid()}
                 >
                   Recuperar conta
                 </Button>
               </View>
               <View />
               <View>
                 <Typography
                   variant="SM"
                   family="medium"
                   style={{
                     marginTop: 42,
                     textAlign: "center",
                     color: colors.neutral["500"],
                   }}
                 >
                   Não possui conta?
                   <Typography
                     onPress={() => navigation.navigate("Register")}
                     variant="SM"
                     family="bold"
                     style={{
                       marginTop: 16,
                       textAlign: "center",
                       color: colors.brand.default,
                     }}
                   >
                     {" "}
                     Registre-se
                   </Typography>
                 </Typography>
               </View>
             </View>
           </View>
         </View>
       </ScrollView>
     </KeyboardAvoidingView>
   );
}
