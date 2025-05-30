import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Button from "../../components/button";
import { CustomInput } from "../../components/input";
import { useDialogNotification } from "../../hook/notification/hooks/actions";
import {
  useMeQuery,
  useUpdateUserMutation,
  useUploadUserFileMutation,
} from "../../services/me";
import { colors } from "../../styles/colors";
import { API_URL } from "@env";
import { useToast } from "react-native-toast-notifications";
import { useAuth } from "../../hook/auth";

export default function EditProfile() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [file, setFile] = useState<any>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission.status === "granted" &&
        galleryPermission.status === "granted"
      ) {
        setHasPermission(true);
      } else {
        Alert.alert(
          "Permissões necessárias",
          "Precisamos de permissões para acessar a câmera e galeria."
        );
      }
    })();
  }, []);

  const handleCameraOrGallery = () => {
    Alert.alert("Selecionar imagem", "Escolha uma opção:", [
      {
        text: "Tirar Foto",
        onPress: () => openCamera(),
      },
      {
        text: "Selecionar da Galeria",
        onPress: () => openGallery(),
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  const openCamera = async () => {
    if (!hasPermission) {
      Alert.alert("Erro", "Permissões não concedidas.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    if (!hasPermission) {
      Alert.alert("Erro", "Permissões não concedidas.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { handleNotification } = useDialogNotification();
  const dispatch = useDispatch();
  const [uploadUserFile, { isLoading: isLoadingUrlImage }] =
    useUploadUserFileMutation();
  const toast = useToast();

  const isLoad = isLoading || isLoadingUrlImage;

  const onSubmit = async (data: any) => {
    if (imageUri) {
      try {
        const file = {
          uri: imageUri,
          type: "image/jpeg",
          name: "photo.jpg",
        };
        await uploadUserFile({
          file: file,
        }).unwrap();
      } catch (error) {
        console.log("Upload file error:", error);
      }
    }
    try {
      const updatedUser = await updateUser({
        name: data.username,
        whatsapp_number: data.whatsapp,
        phone_number: data.phone,
        id: user?.id,
        version: user?.version,
      }).unwrap();

      dispatch({
        type: "UPDATE_USER",
        payload: updatedUser,
      });
      navigation.goBack();
      toast.show("Usuário atualizado com sucesso!", {
        type: "success",
        placement: "top",
      });
    } catch (error) {
      toast.show("Erro ao atualizar usuario!", {
        type: "error",
        placement: "top",
      });
    }
  };

  useEffect(() => {
    console.log("Usuário logado:", user);
    setValue("username", user?.name);
    setValue("email", user?.email);
    setValue("whatsapp", user?.whatsapp_number);
    setValue("phone", user?.phone_number);
    if (user && user.avatar) {
      if (user.avatar.startsWith("http")) {
        setImageUri(user.avatar);
      } else {
        setImageUri(user.avatar ? `${API_URL}${user.avatar}` : null);
      }
    }
  }, [user]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={{ padding: 20 }}>
          <View>
            <View style={styles.bannerContainer}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{
                    uri: imageUri || "https://via.placeholder.com/100",
                  }}
                  style={styles.avatar}
                />
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={handleCameraOrGallery}
                >
                  <Ionicons
                    name="camera-outline"
                    size={24}
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Formulário */}
            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Nome do usuário</Text>
                <Controller
                  control={control}
                  rules={{ required: "Nome é obrigatório" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      errors={errors}
                      name="username"
                      placeholder="Digite seu nome"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="username"
                />
                {errors.username && (
                  <Text style={styles.errorText}>
                    {errors.username?.message?.toString()}
                  </Text>
                )}
              </View>
              <View>
                <Text style={styles.label}>Email</Text>
                <Controller
                  control={control}
                  rules={{ required: "Email é obrigatório" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      errors={errors}
                      name="email"
                      placeholder="Ex: 987654321"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text style={styles.errorText}>
                    {errors.email?.message?.toString()}
                  </Text>
                )}
              </View>
              <View>
                <Text style={styles.label}>Número (Whatsapp)</Text>
                <Controller
                  control={control}
                  rules={{ required: "Número é obrigatório" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      errors={errors}
                      name="whatsapp"
                      placeholder="Ex: 1199999999"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="whatsapp"
                />
                {errors.whatsapp && (
                  <Text style={styles.errorText}>
                    {errors.whatsapp.message?.toString()}
                  </Text>
                )}
              </View>
              <View>
                <Text style={styles.label}>Número de telefone</Text>
                <Controller
                  control={control}
                  rules={{ required: "Número é obrigatório" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      errors={errors}
                      name="phone"
                      placeholder="Ex: 987654321"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="phone"
                />
                {errors.phone && (
                  <Text style={styles.errorText}>
                    {errors.phone?.message?.toString()}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View style={styles.footerButtom}>
            <Button onPress={handleSubmit(onSubmit)} isLoading={isLoad}>
              Salvar dados
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  bannerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatarWrapper: {},
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
    flexShrink: 0,
  },
  cameraButton: {
    position: "absolute",
    bottom: 5,
    right: 0,
    backgroundColor: colors.primary["500"],
    borderRadius: 20,
    padding: 5,
  },
  form: {
    marginTop: 20,
    width: 344,
    height: 281,
    gap: 12,
    flexShrink: 0,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
    lineHeight: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  footerButtom: {
    padding: 20,
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#FFF",
    boxShadow: "0px -4px 12px 0px rgba(151, 151, 151, 0.15)",
  },
});
